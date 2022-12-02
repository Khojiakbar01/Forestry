const catchAsync = require("../../core/utils/catchAsync");
const QueryBuilder = require("../../core/utils/QueryBuilder");
const {Op} = require("sequelize");
const PressCenter = require("./PressCenter");
const Attachments = require("../attachment/Attachment");

exports.pressCenterView = catchAsync(async (req, res) => {
  const pressCenterType = req.params.pressType;
  const lang =
      req.params.lang.charAt(0) + req.params.lang.slice(1);
  let reqQuery = {...req.query};
  reqQuery.fields = `id,type,viewersCount,bannerId,createdAt`;
  const queryBuilder = new QueryBuilder(reqQuery);
  queryBuilder.filter().paginate().limitFields().search().sort();
  queryBuilder.queryOptions.attributes.push([`title_${lang}`, "title"], [`text_${lang}`, 'text'])
  queryBuilder.queryOptions.where = {
    type: {[Op.eq]: `${pressCenterType.toUpperCase()}`},
    ...queryBuilder.queryOptions.where
  }
  let allPressCenters = await PressCenter.findAndCountAll(
      queryBuilder.queryOptions
  );

  allPressCenters = queryBuilder.createPage(allPressCenters);

  const imageId = await PressCenter.findAll({
    include: {
      model: Attachments,
      as: 'banner',
      attribute: ['id'],
    },
    where: {
      type: 'NEWS'
    }
  })

  let pressCenterTitle = ''
  switch (pressCenterType) {
    case 'news':
      pressCenterTitle = lang === 'uz' ? 'Yangiliklar' : lang === 'ru' ? 'Новости' : lang === 'en' ? 'News' : ''
      break;
    case 'events':
      pressCenterTitle = lang === 'uz' ? `E'lon va voqealar` : lang === 'ru' ? 'Объявления и события' : lang === 'en' ? 'Announcements and events' : ''
      break;
    case 'tenders':
      pressCenterTitle = lang === 'uz' ? 'Tender va xaridlar' : lang === 'ru' ? 'Тендеры и закупки' : lang === 'en' ? 'Tenders and purchases' : ''
      break;
    default :
      break
  }
  let pressCenterHeader = ''
  pressCenterHeader = lang === 'uz' ? 'Matbuot markazi' : lang === 'ru' ? 'Пресс-центр' : lang === 'en' ? 'Press Center' : ''


  return res.status(200).render(`./pages/${pressCenterType}`, {
    allPressCenters: allPressCenters.content.filter(e => e.type === `${[pressCenterType.toUpperCase()]}`),
    imageName: imageId.map(e => e.banner).map(e => e),
    pagination: allPressCenters.pagination,
    pressCenterTitle,
    pressCenterHeader,
    lang
  })
});

exports.pressCenterViewById = catchAsync(async (req, res) => {

  const pressCenterType = req.params.pressType;
  console.log(pressCenterType)

  const lang =
      req.params.lang.charAt(0) + req.params.lang.slice(1);
  const {id} = req.params;

  const byId = await PressCenter.findByPk(id, {
    attributes: ['id', [`title_${lang}`, 'title'], [`text_${lang}`, 'text'], 'viewersCount', 'createdAt', 'bannerId', `fileId`,]
  })
  let viewersCount = byId.viewersCount += 1


  const imageId = await PressCenter.findAll({
    include: {
      model: Attachments,
      as: 'banner',
      attribute: ['id'],

    },
    where: {type: {[Op.eq]: pressCenterType.toUpperCase()}}
  })

  const fileId = await PressCenter.findAll({
    include: {
      model: Attachments,
      as: 'file',
      attribute: ['id'],
    },
    where: {type: {[Op.eq]: pressCenterType.toUpperCase()}}
  })

  let imageName = []
  let fileName = []

  if (pressCenterType === "news") {

    imageName = imageId.filter(e => e.banner?.id === byId.dataValues.bannerId)[0].banner.name;
  }
  if (pressCenterType === "tenders") {

    fileName = fileId.filter(e => e?.file?.id === byId.dataValues.fileId)[0]?.file.name

  }

  let pressCenterTitle = ''
  switch (pressCenterType) {
    case 'news':
      pressCenterTitle = lang === 'uz' ? 'Yangiliklar' : lang === 'ru' ? 'Новости' : lang === 'en' ? 'News' : ''
      break;
    case 'events':
      pressCenterTitle = lang === 'uz' ? `E'lon va voqealar` : lang === 'ru' ? 'Объявления и события' : lang === 'en' ? 'Announcements and events' : ''
      break;
    case 'tenders':
      pressCenterTitle = lang === 'uz' ? 'Tender va xaridlar' : lang === 'ru' ? 'Тендеры и закупки' : lang === 'en' ? 'Tenders and purchases' : ''
      break;
    default :
      break
  }
  let pressCenterHeader = ''
  pressCenterHeader = lang === 'uz' ? 'Matbuot markazi' : lang === 'ru' ? 'Пресс-центр' : lang === 'en' ? 'Press Center' : ''



  await byId.update({viewersCount})
  let fileTitle = ''
  switch (pressCenterType) {
    case 'tenders':
      fileTitle = lang === 'uz' ? 'Faylni yuklab olish' : lang === 'ru' ? 'Скачать файл' : lang === 'en' ? 'Download file' : ''
      break;
    default :
      fileTitle = 'Faylni yuklab olish'
      break
  }
  return res.status(200).render(`./pages/pressCenterById`, {
    byId: byId.dataValues,
    fileName,
    imageName,
    pressCenterType,
    pressCenterTitle,
    pressCenterHeader,
    lang,
    fileTitle,
  })
})