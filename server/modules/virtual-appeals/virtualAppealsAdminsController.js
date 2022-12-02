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

exports.allAppealsView = catchAsync(async (req, res) => {
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,fullName,region,district,appealStatus`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allAppeals = await Applicants.findAndCountAll(queryBuilder.queryOptions);
  allAppeals = queryBuilder.createPage(allAppeals);
  res.render("./pages/admin/virtual-appeals/virtual-appeals", {
    allAppeals: allAppeals.content,
    pagination: allAppeals.pagination,
  });
});

exports.appealStatisticsView = catchAsync(async (req, res) => {
  const appealStatisticsArr = await Applicants.count({
    attributes: ["appeal_status"],
    group: "appeal_status",
  });
  for (let i = 0; i < appealStatisticsArr.length; i++) {
    appealStatistics[appealStatisticsArr[i].appeal_status] =
      appealStatisticsArr[i].count;
  }
  res.render("./pages/virtual-appeal-statistic", {
    errors: "",
    appealStatistics,
    status: "",
    applicantAppealStatus: "",
    appealCode: "",
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appealById = await Applicants.findOne({
    where: { id: { [Op.eq]: id } },
    include: [
      {
        model: ApplicantsAttachment,
        as: "applicantsAttachments",
      },
    ],
  });
  const answerFile = await Attachment.findByPk(appealById.answerFileId);
  const attachments = [];
  for (let i = 0; i < appealById.applicantsAttachments.length; i++) {
    const attachment = await Attachment.findByPk(
      appealById.applicantsAttachments[i].attachmentId
    );
    attachments.push(attachment.name);
  }
  res.render("./pages/admin/virtual-appeals/virtual-appeal-answer", {
    appealById,
    attachments,
    answerFile: answerFile ? answerFile.name : "",
  });
});

exports.appealStatusChangeView = catchAsync(async (req, res, next) => {
  let fileName;
  const id = req.body.id;
  const appealById = await Applicants.findByPk(id);
  await appealById.update({
    appealStatus: req.body.appealStatus,
    appealAnswer: req.body?.appealAnswer,
    answerFileId: req.body?.appealAnswerFileId,
  });
  if (+req.body.appealAnswerFileId) {
    const file = await Attachment.findByPk(+req.body?.appealAnswerFileId);
    if (file) {
      await file.update({ isPermanent: true });
      fileName = file.name;
    }
  }

  if (req.body.appealAnswer) {
    sendVerificationMail({
      to: appealById.email,
      appealCode: appealById.appealCode,
      appealAnswer: req.body?.appealAnswer,
      fileName,
    });
  }
  res.json({
    status: "success",
    message: "",
    fileName,
    error: null,
    data: {},
  });
});
