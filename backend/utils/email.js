const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ADMIN_EMAIL = process.env.EMAIL_USER;

async function sendNotification({ subject, text, html }) {
  try {
    await transporter.sendMail({
      from: `"Eritrea Academy" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[Academy] ${subject}`,
      text,
      html: html || text.replace(/\n/g, '<br>'),
    });
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

function notifyRegistration(user) {
  return sendNotification({
    subject: 'New User Registration',
    text: `New user registered:\nName: ${user.name}\nEmail: ${user.email}\nTime: ${new Date().toLocaleString()}`,
    html: `<h2>New User Registration</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${user.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${user.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Time</td><td style="padding:8px;border-bottom:1px solid #eee;">${new Date().toLocaleString()}</td></tr>
      </table>`,
  });
}

function notifyLogin(user) {
  return sendNotification({
    subject: 'User Login',
    text: `User logged in:\nName: ${user.name}\nEmail: ${user.email}\nTime: ${new Date().toLocaleString()}`,
    html: `<h2>User Login</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${user.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${user.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Time</td><td style="padding:8px;border-bottom:1px solid #eee;">${new Date().toLocaleString()}</td></tr>
      </table>`,
  });
}

function notifyEnrollment(user, courseSlug, level) {
  return sendNotification({
    subject: 'Course Enrollment',
    text: `User enrolled in course:\nName: ${user.name}\nEmail: ${user.email}\nCourse: ${courseSlug}\nLevel: ${level}\nTime: ${new Date().toLocaleString()}`,
    html: `<h2>Course Enrollment</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${user.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${user.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Course</td><td style="padding:8px;border-bottom:1px solid #eee;">${courseSlug}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Level</td><td style="padding:8px;border-bottom:1px solid #eee;">${level}</td></tr>
        <tr><td style="padding:8px;color:#666;">Time</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
      </table>`,
  });
}

function notifyPurchase(user, courseSlug) {
  return sendNotification({
    subject: 'Course Purchase',
    text: `User purchased course:\nName: ${user.name}\nEmail: ${user.email}\nCourse: ${courseSlug}\nTime: ${new Date().toLocaleString()}`,
    html: `<h2>Course Purchase</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${user.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${user.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Course</td><td style="padding:8px;border-bottom:1px solid #eee;">${courseSlug}</td></tr>
        <tr><td style="padding:8px;color:#666;">Time</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
      </table>`,
  });
}

function notifyContact({ name, email, message }) {
  return sendNotification({
    subject: 'Contact Form Message',
    text: `Message from ${name} (${email}):\n\n${message}`,
    html: `<h2>Contact Form Message</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
        <tr><td style="padding:8px;color:#666;">Message</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
      </table>`,
  });
}

module.exports = { sendNotification, notifyRegistration, notifyLogin, notifyEnrollment, notifyPurchase, notifyContact };
