const { validationResult } = require("express-validator");
const Leadership = require("./Leadership");
const Attachment = require("../attachment/Attachment");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");

exports.allLeadershipsView = catchAsync(async (req, res) => {
  let reqQuery = { ...req.query };
  reqQuery.fields = `id,firstName,lastName,middleName,positionUz,admissionDaysUz,phoneNumber,fax,email,biographyUz,avatarId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allLeaderships = await Leadership.findAndCountAll(
    queryBuilder.queryOptions
  );
  allLeaderships = queryBuilder.createPage(allLeaderships);
  res.render("./pages/admin/leadership/leaderships", {
    status: "success",
    message: "",
    error: null,
    allLeaderships: allLeaderships.content,
    pagination: allLeaderships.pagination,
  });
});

exports.leadershipActionsView = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { act } = req.query;
  if (id) {
    if (id === "new") {
      res.render("./pages/admin/leadership/leadershipActions", {
        status: "success",
        message: "",
        errors: [],
        allLeaderships: [],
        pagination: [],
      });
    }
    if (act) {
      if (act === "delete") {
        await Leadership.destroy({ where: { id: { [Op.eq]: +id } } });
        res.redirect("/admin/leaderships");
      } else {
        const byId = await Leadership.findByPk(+id);
        if (!byId) {
          res.redirect("/admin/leaderships");
        }
        res.render("./pages/admin/leadership/leadershipActions", {
          status: "success",
          byId,
          message: "",
          errors: [],
          allLeaderships: [],
          pagination: [],
        });
      }
    }
  }
});
