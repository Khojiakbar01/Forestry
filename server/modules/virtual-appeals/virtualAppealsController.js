const { validationResult } = require("express-validator");
const Applicants = require("./Applicants");
const ApplicantsAttachment = require("./ApplicantsAttachment");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const ShortUniqueId = require("short-unique-id");
const { sendVerificationMail } = require("../../core/utils/mailUtils");
const valErrObjCreater = require("../../core/utils/validationErrorsObjectCreater");
const {
  allDistricts,
  allRegions,
} = require("../../core/constants/uzbekistanRegionsData");

const createAppealStatistics = async () => {
  const appealStatistics = { totalVirtualAppeals: 0 };
  const appealStatisticsArr = await Applicants.count({
    attributes: ["appeal_status"],
    group: "appeal_status",
  });
  for (let i = 0; i < appealStatisticsArr.length; i++) {
    appealStatistics[appealStatisticsArr[i].appeal_status] =
      appealStatisticsArr[i].count;
    if (
      appealStatisticsArr[i].appeal_status !== "REJECTED" &&
      appealStatisticsArr[i].appeal_status !== "NEW"
    ) {
      appealStatistics.totalVirtualAppeals += +appealStatisticsArr[i].count;
    }
  }
  return appealStatistics;
};

const createAppealCode = async () => {
  const uuid = new ShortUniqueId({ length: 8 });
  let appealCode = uuid();
  const exictedAppealCode = await Applicants.findOne({
    where: { appealCode: { [Op.eq]: appealCode } },
  });
  if (exictedAppealCode) {
    createAppealCode();
  }
  return appealCode;
};

exports.appealsView = catchAsync(async (req, res) => {
  res.render("./pages/virtual-appeals", {
    status: "",
    appealCode: "",
    email: "",
    data: {
      fullName: "",
      email: "",
      phoneNumber: "",
      appealText: "",
      gender: "MALE",
      region: "",
      district: "",
      birthDate: "",
      attachments: "",
      passportInformations: "",
      address: "",
    },
    allRegions,
    districts: "",
    errors: "",
  });
});

exports.appealStatisticsView = catchAsync(async (req, res) => {
  const appealStatistics = await createAppealStatistics();
  res.render("./pages/virtual-appeal-statistic", {
    errors: "",
    appealStatistics,
    status: "",
    applicantAppealStatus: "",
    appealCode: "",
    totalVirtualAppeals: appealStatistics.totalVirtualAppeals,
    appealAnswerFile: "",
  });
});

exports.getAllAppeals = catchAsync(async (req, res) => {
  const lang =
    req.params.lang.charAt(0).toUpperCase() + req.params.lang.slice(1);
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,fullName,region,phoneNumber,appealStatus`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allAppeals = await Applicants.findAndCountAll(queryBuilder.queryOptions);
  allAppeals = queryBuilder.createPage(allAppeals);
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      allAppeals,
    },
  });
});

exports.createVirtualAppeal = catchAsync(async (req, res, next) => {
  let passportInformationsErr = "";
  if (!/[A-Z]{2}[0-9]{7}/.test(req.body.passportInformations)) {
    passportInformationsErr = "Passport ma'lumotlari xato kiritildi";
  }
  let districts;
  if (req.body.region) {
    districts = allDistricts.filter((d) => d.region_id === req.body.region);
  }
  const validationErrors = validationResult(req);
  if (validationErrors.errors.length > 0 || passportInformationsErr) {
    const validationErrObj = valErrObjCreater(validationErrors.errors);
    if (passportInformationsErr && !validationErrObj.passportInformations) {
      validationErrObj.passportInformations = passportInformationsErr;
    }
    return res.render("./pages/virtual-appeals", {
      errors: validationErrObj,
      data: req.body,
      allRegions,
      districts,
      status: "",
      appealCode: "",
      email: "",
    });
  }
  const appealCode = await createAppealCode();
  const attachments = JSON.parse(
    req.body.attachments ? req.body.attachments : "[]"
  );
  const appealInfo = req.body;
  appealInfo.region = allRegions.find((r) => r.id === req.body.region).name_uz;
  appealInfo.district = allDistricts.find(
    (d) => d.id === req.body.district
  ).name_uz;
  appealInfo.appealCode = appealCode;
  const newAppeal = await Applicants.create(appealInfo);
  for (let i = 0; i < attachments.length; i++) {
    if (!attachments[i]) continue;
    const attachmentByApplicantsId = await Attachment.findByPk(+attachments[i]);
    const applicantsAttachment = {
      applicantsId: newAppeal.id,
      attachmentId: +attachments[i],
    };
    await ApplicantsAttachment.create(applicantsAttachment);
    await attachmentByApplicantsId.update({ isPermanent: true });
  }
  sendVerificationMail({
    to: newAppeal.email,
    appealCode: newAppeal.appealCode,
  });
  return res.render("./pages/virtual-appeals", {
    status: "success",
    errors: "",
    allRegions,
    data: [],
    districts: "",
    appealCode,
    email: newAppeal.email,
    appealStatistics: "",
  });
});

exports.checkAppealStatus = catchAsync(async (req, res, next) => {
  let appealAnswerFile = "";
  const appealStatistics = await createAppealStatistics();
  const validationErrors = validationResult(req);
  if (validationErrors.errors.length > 0) {
    const validationErrObj = valErrObjCreater(validationErrors.errors);
    return res.render("./pages/virtual-appeal-statistic", {
      errors: validationErrObj,
      appealStatistics,
      status: "error",
      applicantAppealStatus: "",
      appealCode: req.body.appealCode,
      totalVirtualAppeals: appealStatistics.totalVirtualAppeals,
      appealAnswerFile,
    });
  }
  const appealCode = req.body.appealCode;
  const applicantByAppealCode = await Applicants.findOne({
    where: { appealCode: { [Op.eq]: appealCode } },
  });
  if (!applicantByAppealCode) {
    return res.render("./pages/virtual-appeal-statistic", {
      errors: { appealCode: "Parol xato kiritildi" },
      appealStatistics,
      status: "error",
      applicantAppealStatus: "",
      appealCode: req.body.appealCode,
      totalVirtualAppeals: appealStatistics.totalVirtualAppeals,
      appealAnswerFile,
    });
  }
  const applicantAppealStatus = applicantByAppealCode.appealStatus;
  const applicantAppealAnswer = applicantByAppealCode.appealAnswer;

  if (applicantByAppealCode.answerFileId) {
    const appealAnswerFileAttachment = await Attachment.findByPk(
      applicantByAppealCode.answerFileId
    );
    appealAnswerFile = appealAnswerFileAttachment.name;
  }
  return res.render("./pages/virtual-appeal-statistic", {
    errors: "",
    appealStatistics,
    applicantAppealStatus,
    applicantAppealAnswer,
    status: "success",
    appealCode: "",
    totalVirtualAppeals: appealStatistics.totalVirtualAppeals,
    appealAnswerFile,
  });
});

exports.getDistrictsByRegions = catchAsync(async (req, res, next) => {
  const regionId = req.params.regionId;
  const districts = allDistricts.filter(
    (district) => district.region_id === regionId
  );
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      districts,
    },
  });
});
