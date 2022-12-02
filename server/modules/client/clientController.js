const catchAsync = require("../../core/utils/catchAsync");
const {Op} = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const PressCenter = require("../press-center/PressCenter");
const Attachments = require("../attachment/Attachment");
const {login} = require("../login/authController");

exports.mainPageView = catchAsync(async (req, res) => {
  return res.render("./pages/main");
});

exports.usefulLinksView = catchAsync(async (req, res) => {
  res.render("./pages/useful-links");
});
exports.photoGalleryView = catchAsync(async (req, res) => {
  res.render("./pages/photo-gallery");
});
exports.videoGalleryView = catchAsync(async (req, res) => {
  res.render("./pages/video-gallery");
});

exports.connectionView = catchAsync(async (req, res) => {
  res.render("./pages/connection");
});
exports.eGovernmentView = catchAsync(async (req, res) => {
  res.render("./pages/e-government");
});

exports.informationView = catchAsync(async (req, res) => {
  res.render("./pages/information");
});
// exports.announcementsView = catchAsync(async (req, res) => {
//   res.render("./pages/announcements");
// });
exports.activityView = catchAsync(async (req, res) => {
  res.render("./pages/activity");
});
exports.statistics2017View = catchAsync(async (req, res) => {
  res.render("./pages/statistics-2017");
});
exports.forestFundView = catchAsync(async (req, res) => {
  res.render("./pages/forest-fund");
});
exports.shifobaxshSFView = catchAsync(async (req, res) => {
  res.render("./pages/shifobaxsh-scientific-production");
});
exports.forestFundBrieflyView = catchAsync(async (req, res) => {
  res.render("./pages/forest-fund-briefly");
});
exports.functionAndTasksView = catchAsync(async (req, res) => {
  res.render("./pages/function-and-tasks");
});
exports.managementView = catchAsync(async (req, res) => {
  res.render("./pages/management");
});
exports.centralApparatusView = catchAsync(async (req, res) => {
  res.render("./pages/central-apparatus");
});
exports.structureView = catchAsync(async (req, res) => {
  res.render("./pages/structure");
});
exports.systemOrganizationsView = catchAsync(async (req, res) => {
  res.render("./pages/system-organizations");
});
exports.republicanOrganizationsView = catchAsync(async (req, res) => {
  res.render("./pages/republican-organizations");
});
exports.karakalpakstanOrganizationsView = catchAsync(async (req, res) => {
  res.render("./pages/republic-of-karakalpakstan-structure");
});
exports.andijanStructureView = catchAsync(async (req, res) => {
  res.render("./pages/andijon-structure");
});
exports.hayatView = catchAsync(async (req, res) => {
  res.render("./pages/hayat");
});
exports.communityCouncilView = catchAsync(async (req, res) => {
  res.render("./pages/community-council");
});
exports.ecotourismView = catchAsync(async (req, res) => {
  res.render("./pages/ecotourism");
});
exports.corruptionView = catchAsync(async (req, res) => {
  res.render("./pages/corruption");
});
exports.industryDocumentsView = catchAsync(async (req, res) => {
  res.render("./pages/industry-documents");
});
exports.presidentialDecreeView = catchAsync(async (req, res) => {
  res.render("./pages/presidential-decree");
});
exports.ministersDecreeView = catchAsync(async (req, res) => {
  res.render("./pages/ministers-decree");
});
exports.citizensAppealView = catchAsync(async (req, res) => {
  res.render("./pages/citizens-appeal");
});
// exports.tendersView = catchAsync(async (req, res) => {
//   res.render("./pages/tendering-and-procurement");
// });
exports.pressServiceContactView = catchAsync(async (req, res) => {
  res.render("./pages/contact-the-press-service");
});
exports.faqsView = catchAsync(async (req, res) => {
  res.render("./pages/faqs");
});
exports.managementLecturesView = catchAsync(async (req, res) => {
  res.render("./pages/management-lectures");
});
exports.budgetOpennessView = catchAsync(async (req, res) => {
  res.render("./pages/budget-openness");
});
exports.budgetOpennessReportsView = catchAsync(async (req, res) => {
  res.render("./pages/budget-openness-reports");
});
exports.informationOfSocialImportanceView = catchAsync(async (req, res) => {
  res.render("./pages/information-of-social-importance");
});
exports.investmentProjectsView = catchAsync(async (req, res) => {
  res.render("./pages/investment-projects");
});
