const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'pcbs@pcnl.in', // Your email address
    pass: 'hcygtgklfglvigvw', // Your email password or an app-specific password
  },
});

module.exports = transporter;
