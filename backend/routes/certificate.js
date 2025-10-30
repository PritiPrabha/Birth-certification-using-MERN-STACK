const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const auth = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const moment = require('moment');

// @route   GET api/certificate/:applicationId
// @desc    Generate and download birth certificate PDF
// @access  Private (Parent who owns application, Admin)
router.get('/:applicationId', auth, async (req, res) => {
  try {
    const { theme } = req.query;

    const application = await Application.findById(req.params.applicationId).populate('verifiedBy', 'name');

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    if (application.status !== 'Approved') {
      return res.status(400).json({ msg: 'Certificate can only be generated for approved applications' });
    }

    if (
      application.parent.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ msg: 'User not authorized to download this certificate' });
    }

    const doc = new PDFDocument();
    let filename = `birth_certificate_${application.certificateId}.pdf`;
    filename = encodeURIComponent(filename);

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    let primaryColor = '#1E40AF';
    let accentColor = '#3B82F6';

    if (theme === 'modern') {
      primaryColor = '#0A771E';
      accentColor = '#4CAF50';
    } else if (theme === 'classic') {
      primaryColor = '#5D4037';
      accentColor = '#8D6E63';
    }

    doc.fontSize(25).fillColor(primaryColor).text('Digital Birth Certificate (Demo Project)', { align: 'center' });
    doc.moveDown();

    doc.lineWidth(5);
    doc.strokeColor(primaryColor).rect(50, 50, 500, 700).stroke();

    doc.fontSize(12).fillColor('black').text('Disclaimer: This is a demo project for learning purposes only.', 50, 760, {
      align: 'center',
      width: 500,
    });

    doc.moveDown();

    doc.fontSize(16).fillColor(accentColor).text('Certificate Details:', { underline: true });
    doc.moveDown();

    doc.fontSize(12).fillColor('black')
      .text(`Child Name: ${application.childName}`)
      .text(`Date of Birth: ${moment(application.childDOB).format('MMMM Do YYYY')}`)
      .text(`Place of Birth: ${application.placeOfBirth}`)
      .text(`Father's Name: ${application.fatherName}`)
      .text(`Mother's Name: ${application.motherName}`)
      .text(`Certificate No.: ${application.certificateId}`)
      .text(`Date of Issue: ${moment(application.dateOfIssue).format('MMMM Do YYYY')}`);
    doc.moveDown();

    if (application.verifiedBy && application.verificationDate) {
      doc.fontSize(12).fillColor('black')
        .text(`Verified By: ${application.verifiedBy.name}`)
        .text(`Verification Date: ${moment(application.verificationDate).format('MMMM Do YYYY, h:mm:ss a')}`);
      if (application.digitalSignature) {
        doc.text(`Digital Signature: ${application.digitalSignature}`);
      }
      doc.moveDown();
    }

    const qrCodeData = `Certificate ID: ${application.certificateId}\nChild: ${application.childName}\nDOB: ${moment(application.childDOB).format('YYYY-MM-DD')}\nVerified By: ${application.verifiedBy ? application.verifiedBy.name : 'N/A'}\nVerification Date: ${application.verificationDate ? moment(application.verificationDate).format('YYYY-MM-DD HH:mm') : 'N/A'}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    doc.image(qrCodeImage, 400, 200, { width: 100 });

    doc.end();

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Application not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/certificate/verify/:certificateId
// @desc    Verify a certificate by its ID
// @access  Public
router.get('/verify/:certificateId', async (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    const application = await Application.findOne({ certificateId }).populate('verifiedBy', 'name facility');

    if (!application) {
      return res.status(404).json({
        status: 'not_found',
        reason: 'No certificate found with this ID.'
      });
    }

    if (application.status === 'Approved') {
      res.json({
        status: 'verified',
        details: {
          certificateId: application.certificateId,
          childName: application.childName,
          dateOfBirth: application.childDOB,
          placeOfBirth: application.placeOfBirth,
          motherName: application.motherName,
          fatherName: application.fatherName,
          issuedDate: application.dateOfIssue,
          verifiedBy: application.verifiedBy ? application.verifiedBy.name : 'N/A',
          facility: application.verifiedBy ? application.verifiedBy.facility : application.attendingHospital || 'N/A',
          verificationDate: application.verificationDate,
        }
      });
    } else {
      res.json({
        status: 'invalid',
        reason: 'This certificate is not yet approved or is invalid.'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
