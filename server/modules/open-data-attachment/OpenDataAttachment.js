const sequelize = require("../../core/config/db/db");
const OpenData = require("../open-data/Opendata");
const Attachments = require("../attachment/Attachment");

const OpenDataAttachment = sequelize.define(
  "openDataAttachment",
  {},
  {
    underscored: true,
  }
);

Attachments.hasOne(OpenDataAttachment, { foreignKey: "attachmentId" });
OpenDataAttachment.belongsTo(Attachments, { as: "attachment" });

OpenData.hasMany(OpenDataAttachment, {
  foreignKey: "openDataId",
  as: "openDataAttachments",
  onDelete: "cascade",
});
OpenDataAttachment.belongsTo(OpenData, { as: "openData" });

module.exports = OpenDataAttachment;
