const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const auth = require('../middleware/authMiddleware');
const Application = require('../models/Application');

const MONGO_URI = 'mongodb://127.0.0.1:27017/birth';

const conn = mongoose.createConnection(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route   POST api/upload/:applicationId
// @desc    Upload documents for a specific application
// @access  Private (Parents only)
router.post('/', auth, upload.single('document'), async (req, res) => {
  const { applicationId, docId } = req.body;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    if (application.parent.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized to upload documents for this application' });
    }

    const newDocument = {
      docId: docId,
      fileName: req.file.filename,
      filePath: `/api/upload/files/${req.file.filename}`,
      uploadDate: new Date()
    };

    application.documents.push(newDocument);
    await application.save();

    res.json({ msg: 'Document uploaded successfully', fileUrl: newDocument.filePath });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/upload/files/:filename
// @desc Display single file object
// @access Public
router.get('/files/:filename', async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    if (file[0].contentType === 'image/jpeg' || file[0].contentType === 'image/png') {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else if (file[0].contentType === 'application/pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image or PDF'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
