'use strict';

module.exports = function sender(params) {
  const AWS = require('aws-sdk');

  // Help: https://docs.aws.amazon.com/pt_br/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
  const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  const send = ses.sendEmail(params);
  return send.promise()
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.error(err);
    });

}
