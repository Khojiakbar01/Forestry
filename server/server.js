const nodeEnv = process.env.NODE_ENV;
const { Op } = require("sequelize");

let envPath;
if (nodeEnv === "dev") {
  envPath = ".env.dev";
} else if (nodeEnv === "prod") {
  envPath = ".env.prod";
}
require("dotenv").config({ path: `./${envPath}` });

const app = require("./app");
const db = require("./core/config/db/db");
const PORT = process.env.PORT || 9000;

const User = require("./modules/user/User");

require("./modules/attachment/Attachment");
require("./modules/blanks/Blanks");
require("./modules/faq/Faq");
require("./modules/gallery-item/GalleryItem");
require("./modules/leadership/Leadership");
require("./modules/menu/Menu");
require("./modules/meta-info/MetaInfo");
require("./modules/open-data/Opendata");
require("./modules/open-data-attachment/OpenDataAttachment");
require("./modules/page/Page");
require("./modules/poll-answers/PollAnswers");
require("./modules/press-center/PressCenter");
require("./modules/polls/Polls");
require("./modules/polls-participants/PollParticipants");
require("./modules/regional-offices/RegionalOffices");
require("./modules/statistics/Statistics");
require("./modules/useful-links/UsefulLinks");
require("./modules/virtual-appeals/Applicants");
require("./modules/virtual-appeals/ApplicantsAttachment");

db.authenticate()
  .then(async () => {
    db.sync({
      logging: false,
      // force: true,
    });
    const admin = await User.findAll({
      where: {
        username: { [Op.eq]: "myusername" },
      },
    });

    if (admin.length === 0) {
      const newAdmin = {
        firstName: "Admin1",
        lastName: "Admin1",
        username: "myusername",
        password: "12345678",
      };
      await User.create({ ...newAdmin });
    }
  })
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
