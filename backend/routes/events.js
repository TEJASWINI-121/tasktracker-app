const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all events for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create event
router.post('/', auth, async (req, res) => {
  const { title, description, status, priority, tags, comments, assignee, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ msg: 'Please provide title and date' });
  }
  try {
    const event = new Event({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'Medium',
      tags: tags || [],
      comments: comments || [],
      assignee: assignee || '',
      date,
      user: req.user.id
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update event
router.put('/:id', auth, async (req, res) => {
  const { title, description, status, priority, tags, comments, assignee, date } = req.body;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status, priority, tags, comments, assignee, date },
      { new: true }
    );
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 