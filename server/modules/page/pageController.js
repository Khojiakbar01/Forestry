const {validationResult} = require("express-validator");
const Page = require("./Page");
const Menu = require("../menu/Menu");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const {Op} = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");


exports.getAllPages = catchAsync(async (req, res) => {
  let reqQuery = {...req.query};
  reqQuery.fields = `id,titleUz,titleRu,titleEn,contentUz,contentRu,contentEn,menuId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  let allPages = await Page.findAndCountAll(queryBuilder.queryOptions);
  allPages = queryBuilder.createPage(allPages);


  for (let i = 0; i < allPages.content.length; i++) {
    if (allPages.content[i].menuId) {
      const parentMenu = await Menu.findOne({
        where: {id: {[Op.eq]: allPages.content[i].menuId}},
        attributes: [`name_uz`, 'name_ru', "name_en"],
        raw: true
      });
      allPages.content[i].nameUz = parentMenu.name_uz;
      allPages.content[i].nameRu = parentMenu.name_ru;
      allPages.content[i].nameEn = parentMenu.name_en;
    }
  }


  return res.status(200).render('./pages/admin/page/page', {
    allPages: allPages.content,
    pagination: allPages.pagination,

  })
});


exports.createPage = catchAsync(async (req, res, next) => {

  const validationErrors = validationResult(req);

  const allPages = await Page.findAll({
    attributes: ["id", `title_uz`, 'title_ru', 'title_en', `content_uz`, 'content_ru', 'content_en', "menuId"],
    raw: true,
  });

  if (validationErrors.errors.length > 0) {
    return res.render("./pages/admin/page/add", {
      errors: validationErrors.errors.map((e) => e.msg),
      allPages,
    });
  }

  await Page.create(req.body)
  res.redirect(`/admin/page/?page=1&size=6`)

  // if (req.body.parentId === '') {
  //     delete req.body.parentId
  //     await Page.create(req.body)
  //     // res.redirect('/uz/admin/menu')
  // } else {
  //     const newMenu = await Page.create(req.body);
  // }
});
exports.getPage = async (req, res) => {

  const {id} = req.params;
  const byId = await Page.findByPk(id);

  const allMenus = await Menu.findAll({
    attributes: ["id", `name_uz`, 'name_ru', "name_en", "parentId"],
    raw: true,
  });
  return res.status(200).render("./pages/admin/page/edit", {allMenus, byId,});

};

exports.editPage = async (req, res) => {


  const {id} = req.params;

  const byId = await Page.findByPk(id);

  await byId.update(req.body);
  res.redirect(`/admin/page/?page=1&size=6`);

};

exports.getPageForAdd = catchAsync(async (req, res) => {
  const validationErrors = validationResult(req);

  const allMenus = await Menu.findAll({
    attributes: ["id", `name_uz`, 'name_ru', "name_en", "parentId"],
    raw: true,
  });
  return res.status(200).render("./pages/admin/page/add", {
    errors: validationErrors.errors.map((e) => e),
    allMenus,

  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const {id} = req.params;

  const pagebyId = await Page.findByPk(id);

  if (!pagebyId) {
    return next(new AppError("Bunday Id li page topilmadi"), 404);
  }

  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      pagebyId,
    },
  });
});


exports.deletePage = catchAsync(async (req, res, next) => {
  const {page} = req.query
  const {id} = req.params;
  const byId = await Page.findByPk(id);

  if (!byId) {
    return next(new AppError(`${id} bunday idli Menu mavjud emas!!`), 404);
  }
  await byId.destroy();

  res.redirect(`/admin/page/?page=${page}&size=6`)
});
