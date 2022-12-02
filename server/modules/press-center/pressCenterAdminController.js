const {validationResult} = require("express-validator");
const PressCenter = require("./PressCenter");
const AppError = require("../../core/utils/AppError");
const catchAsync = require("../../core/utils/catchAsync");
const {Op} = require("sequelize");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const Attachments = require("../attachment/Attachment");


exports.createPressCenter = catchAsync(async (req, res, next) => {
    const validationErrors = validationResult(req);
    const pressCenterType = req.params.pressType;


    const allPressCenters = await PressCenter.findAll({
        attributes: ["id", `title_uz`, 'title_ru', 'title_en', `text_uz`, 'text_ru', 'text_en', 'bannerId', 'fileId', "type"],
        raw: true,
    });

    if (validationErrors.errors.length > 0) {
        return res.render(`./pages/admin/${pressCenterType}/add`, {
            errors: validationErrors.errors.map((e) => e.msg),
            allPressCenters
        });
    }
    if (req.body.fileId === '') {
        delete req.body.fileId;
    }
    const parsedReqBodyAttachment = req.body.contentattachments ? JSON.parse(req.body.contentattachments) : ""
    for (let i = 0; i < parsedReqBodyAttachment?.length; i++) {

        const att = await Attachments.findByPk(parsedReqBodyAttachment[i])
        await att.update({isPermanent: true})
    }

    await PressCenter.create(req.body)
    res.redirect(`/admin/press-center/${pressCenterType}/?page=1&size=6`)
});

exports.getAllPressCentersView = catchAsync(async (req, res, nest) => {

    const pressCenterType = req.params.pressType;
    let reqQuery = {...req.query};
    reqQuery.fields = `id,titleUz,titleRu,titleEn,textUz,textRu,textEn,type`;
    const queryBuilder = new QueryBuilder(reqQuery);

    queryBuilder.filter().paginate().limitFields().search().sort();
    queryBuilder.queryOptions.where = {
        type: {[Op.eq]: `${pressCenterType.toUpperCase()}`},
        ...queryBuilder.queryOptions.where
    }

    let allPressCenters = await PressCenter.findAndCountAll(
        queryBuilder.queryOptions
    );
    allPressCenters = queryBuilder.createPage(allPressCenters);


    return res.status(200).render(`./pages/admin/${pressCenterType}/${pressCenterType}`, {
        allPressCenters: allPressCenters.content.filter(e => e.type === `${[pressCenterType.toUpperCase()]}`),
        pagination: allPressCenters.pagination,

    })

})

exports.getPressCentersForAddView = catchAsync(async (req, res) => {
    const validationErrors = validationResult(req);

    const pressCenterType = req.params.pressType;

    return res.status(200).render(`./pages/admin/${pressCenterType}/add`, {
        errors: validationErrors.errors.map((e) => e),


    });
});

exports.getPressCentersForEditView = async (req, res) => {
    const pressCenterType = req.params.pressType;

    const {id} = req.params;
    const byId = await PressCenter.findByPk(id);
    if (pressCenterType === 'news') {
        const imageId = await Attachments.findByPk(byId.bannerId)

        byId.imageName = imageId.name
    }


    return res.status(200).render(`./pages/admin/${pressCenterType}/edit`, {byId});

};

exports.editPressCenterView = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const pressCenterType = req.params.pressType;

    const byId = await PressCenter.findByPk(id);

    // console.log(req.body);
    // console.log(byId);

    if (req.body.fileId === '') {
         req.body.fileId=null;
    }
    await byId.update(req.body);
    // console.log(byId)
    res.redirect(`/admin/press-center/${pressCenterType}/?page=1&size=6`);

})
exports.deletePressCenter = catchAsync(async (req, res, next) => {
    const {page} = req.query
    const {id} = req.params;
    const pressCenterType = req.params.pressType;

    const byId = await PressCenter.findByPk(id);

    const tempFile = await Attachments.findByPk(byId.bannerId)
    if (!byId) {
        return next(new AppError(`${id} bunday idli Menu mavjud emas!!`), 404);
    }


    await tempFile.update({isPermanent: false});

    await byId.destroy();

    res.redirect(`/admin/press-center/${pressCenterType}/?page=${page}&size=6`)
});

