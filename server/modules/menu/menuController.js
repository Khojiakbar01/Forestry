const {validationResult} = require("express-validator");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const Menu = require("../menu/Menu");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const Page = require("../page/Page");
const {Op} = require("sequelize");
const MetaInfo = require("../meta-info/MetaInfo");

exports.getAllMenus = catchAsync(async (req, res) => {


  let reqQuery = {...req.query};
  reqQuery.fields = `id,nameUz,nameRu,nameEn,parentId`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search([`nameUz}`]).sort();
  let allMenus = await Menu.findAndCountAll(queryBuilder.queryOptions);
  allMenus = queryBuilder.createPage(allMenus);

  for (let i = 0; i < allMenus.content.length; i++) {
    if (allMenus.content[i].parentId) {
      const parentMenu = await Menu.findOne({
        where: {id: {[Op.eq]: allMenus.content[i].parentId}},
        attributes: [`name_uz`, 'name_ru',"name_en"],
        raw: true
      });
      // console.log(parentMenu)
      allMenus.content[i].parentMenu = parentMenu;
    }
  }

  // console.log(allMenus.pagination)
  return res.status(200).render("./pages/admin/menu/menu", {
    allMenus: allMenus.content,
    pagination: allMenus.pagination,

  });
});

exports.getMenuForAdd = catchAsync(async (req, res) => {
  const validationErrors = validationResult(req);

  const allMenus = await Menu.findAll({
    attributes: ["id", `name_uz`, 'name_ru',"name_en", "parentId"],
    raw: true,
  });
  return res.status(200).render("./pages/admin/menu/add", {
    errors: validationErrors.errors.map((e) => e),
    allMenus,
data: ''
  });
});

exports.createMenu = catchAsync(async (req, res, next) => {

  const validationErrors = validationResult(req);
  const allMenus = await Menu.findAll({
    attributes: ["id", `name_uz`, 'name_ru', "name_en", "parentId"],
    raw: true,
  });

  // if (validationErrors.errors.length > 0) {
  //   return res.render("./pages/admin/menu/add", {
  //     errors: validationErrors.errors.map((e) => e.msg),
  //     allMenus,
  //    data: req.body
  //
  //   });
  // }
  const existingMenu = await Menu.findOne({
    where: {
      [Op.or]: [{name_uz: req.body.nameUz}, {name_ru: req.body.nameRu}, {name_en: req.body.nameEn}],
    }
  })

  if (existingMenu) {
    return res.render(`./pages/admin/menu/add`, {
      errors: ['Bunday menyu mavjud'],
      allMenus,
      data: req.body
    });
  }
  if (req.body.parentId === '') {
    delete req.body.parentId
    await Menu.create(req.body)
    // res.redirect('/uz/admin/menu')
  } else {
    // const existingMenu =  Menu.findOne()
    const newMenu = await Menu.create(req.body);
  }

  res.redirect(`/admin/menu/?page=1&size=6`)

});

exports.getMenu = async (req, res) => {

  const {id} = req.params;
  const byId = await Menu.findByPk(id);

  const allMenus = await Menu.findAll({
    attributes: ["id", `name_uz`, 'name_ru',"name_en", "parentId"],
    raw: true,
  });

  return res.status(200).render("./pages/admin/menu/edit", {allMenus, byId,});

};

exports.editMenu = async (req, res) => {

  const {id} = req.params;

  const byId = await Menu.findByPk(id);

  if (req.body.parentId === '') {
    delete req.body.parentId

  }
  await byId.update(req.body);

  res.redirect(`/admin/menu/?page=1&size=6`);

};


exports.deleteMenu = catchAsync(async (req, res, next) => {

  const {page} = req.query
  const {id} = req.params;
  const byId = await Menu.findByPk(id);

  if (!byId) {
    return next(new AppError(`${id} bunday idli Menu mavjud emas!!`), 404);
  }
  await byId.destroy();

  res.redirect(`/admin/menu/?page=${page}&size=6`)

});

