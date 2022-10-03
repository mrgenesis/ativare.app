// TODO: criar uma pasta "vendor" para adicionar os aplicativos de terceiros lá. Este arquivo deve constar nesta pasta
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// https://app.sendgrid.com/guide/integrate/langs/nodejs
const sgMail = require('@sendgrid/mail')

module.exports = function sendgrid({ apiKey, from, to, subject, body } = {}) {
  sgMail.setApiKey(apiKey);
  const msg = { from, to, subject, text: body };
  return new Promise((resolve, reject) => {
    sgMail
      .send(msg)
      .then(() => {
        resolve(null);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
