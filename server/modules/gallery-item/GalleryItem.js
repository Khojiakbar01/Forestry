const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/db/db");
const galleryItemTypes = require("../../core/constants/galleryItemTypes");
const Attachments = require("../attachment/Attachment");

const GalleryItem = sequelize.define(
  "galleryItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titleUz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleRu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isLink: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    galleryItemType: {
      type: DataTypes.ENUM(Object.values(galleryItemTypes)),
      allowNull: false,
      defaultValue: galleryItemTypes.GALLERY_ITEM_TYPE_PHOTO,
    },
  },
  {
    underscored: true,
  }
);

Attachments.hasOne(GalleryItem, { foreignKey: "bannerId" });
GalleryItem.belongsTo(Attachments, { as: "banner" });

Attachments.hasOne(GalleryItem, { foreignKey: "attachmentId" });
GalleryItem.belongsTo(Attachments, { as: "attachment" });

module.exports = GalleryItem;
