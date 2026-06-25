require('dotenv').config();
const mongoose = require('mongoose');
const Banner = require('./models/banner');
const keys = require('./config/keys');

mongoose.connect(keys.database.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      const banner = new Banner({
        desktopImage: 'https://example.com/desktop.png',
        mobileImage: 'https://example.com/mobile.png'
      });
      await banner.save();
      console.log('Saved banner successfully');
      await Banner.deleteOne({ _id: banner._id });
      console.log('Deleted test banner');
      process.exit(0);
    } catch (err) {
      console.error('DB Error:', err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Connection Error:', err);
    process.exit(1);
  });
