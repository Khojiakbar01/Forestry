const express = require("express");
const { body } = require("express-validator");
const clientController = require("./clientController");
const authMiddleware = require("../../core/middlewares/authMiddleware");
const virtualAppealsRouter = require("../virtual-appeals/virtualAppealsRouter");
const attachmentRouter = require("../attachment/attachmentRouter");
const router = express.Router({ mergeParams: true });
const pressCenterRouter = require('../press-center/pressCenterRouter')

router.get("/", clientController.mainPageView);

router.get("/useful-links", clientController.usefulLinksView);
router.get("/photo-gallery", clientController.photoGalleryView);
router.get("/video-gallery", clientController.videoGalleryView);


// router.get("/tendering-and-procurement", clientController.tendersView);
// router.get("/announcements", clientController.announcementsView);

router.get("/connection", clientController.connectionView);
router.get("/e-government", clientController.eGovernmentView);
router.get("/information", clientController.informationView);


router.get("/activity", clientController.activityView);
router.get("/activity/statistics-2017", clientController.statistics2017View);
router.get(
  "/activity/forest-fund-briefly",
  clientController.forestFundBrieflyView
);
router.get("/activity/forest-fund", clientController.forestFundView);
router.get("/function-and-tasks", clientController.functionAndTasksView);
router.get(
  "/activity/shifobaxsh-scientific-production",
  clientController.shifobaxshSFView
);
router.get("/management", clientController.managementView);
router.get("/central-apparatus", clientController.centralApparatusView);
router.get("/structure", clientController.structureView);
router.get("/system-organizations", clientController.systemOrganizationsView);
router.get(
  "/system-organizations/andijon-structure",
  clientController.andijanStructureView
);
router.get(
  "/system-organizations/republic-of-karakalpakstan-structure",
  clientController.karakalpakstanOrganizationsView
);
router.get(
  "/system-organizations/republican-organizations",
  clientController.republicanOrganizationsView
);
router.get("/hayat", clientController.hayatView);
router.get("/community-council", clientController.communityCouncilView);
router.get("/ecotourism", clientController.ecotourismView);
router.get("/corruption", clientController.corruptionView);
router.get("/industry-documents", clientController.industryDocumentsView);
router.get("/presidential-decree", clientController.presidentialDecreeView);
router.get("/ministers-decree", clientController.ministersDecreeView);
router.get("/citizens-appeal", clientController.citizensAppealView);
router.get(
  "/contact-the-press-service",
  clientController.pressServiceContactView
);
router.get("/faqs", clientController.faqsView);
router.get("/management-lectures", clientController.managementLecturesView);
router.get("/budget-openness", clientController.budgetOpennessView);
router.get(
  "/budget-openness/reports",
  clientController.budgetOpennessReportsView
);
router.get(
  "/information-of-social-importance",
  clientController.informationOfSocialImportanceView
);
router.get("/investment-projects", clientController.investmentProjectsView);

router.use("/virtual-appeals", virtualAppealsRouter);
router.use("/attachments", attachmentRouter);
router.use("/press-center",pressCenterRouter);

module.exports = router;
