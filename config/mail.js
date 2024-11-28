require('dotenv').config();

module.exports = {
  driver: process.env.MAIL_DRIVER,
  defaults: {
    from: {
      email: process.env.DEFAULT_FROM_EMAIL,
      name: process.env.DEFAULT_FROM_NAME,
    },
  },
};
