const express = require('express');
const router = express.Router();

const Testimonial = require('../../models/testimonial');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');

// Add new testimonial
router.post('/add', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { name, initials, title, quote, rating, isActive } = req.body;

    if (!name || !initials || !title || !quote || !rating) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const testimonial = new Testimonial({
      name,
      initials,
      title,
      quote,
      rating,
      isActive
    });

    const data = await testimonial.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial has been added successfully!',
      testimonial: data
    });
  } catch (err) {
    res.status(400).json({ error: 'Your request could not be processed. Please try again.' });
  }
});

// Get all active testimonials
router.get('/list', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ created: -1 });
    res.status(200).json({
      testimonials
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// Get all testimonials (Admin)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ created: -1 });
    res.status(200).json({
      testimonials
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// Get single testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonialDoc = await Testimonial.findById(req.params.id);

    if (!testimonialDoc) {
      return res.status(404).json({
        message: 'No Testimonial found.'
      });
    }

    res.status(200).json({
      testimonial: testimonialDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// Update testimonial
router.put('/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const update = req.body.testimonial;
    update.updated = Date.now();

    await Testimonial.findByIdAndUpdate(req.params.id, update, { new: true });

    res.status(200).json({
      success: true,
      message: 'Testimonial has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({ error: 'Your request could not be processed. Please try again.' });
  }
});

// Update testimonial active state
router.put('/:id/active', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const update = req.body.testimonial;
    update.updated = Date.now();

    await Testimonial.findByIdAndUpdate(req.params.id, update, { new: true });

    res.status(200).json({
      success: true,
      message: 'Testimonial active state has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// Delete testimonial
router.delete('/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const result = await Testimonial.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Testimonial has been deleted successfully!',
      result
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
