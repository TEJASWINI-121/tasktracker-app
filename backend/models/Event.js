const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: String,
  text: String,
  date: Date
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  tags: [String],
  comments: [CommentSchema],
  assignee: { type: String },
  date: { type: Date }, // dueDate in frontend
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Event', EventSchema); 