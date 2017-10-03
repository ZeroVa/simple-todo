var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
  text: {
      type: String,
      required: true
  },
  completed: {
      type: Boolean,
      required: true,
  },
  created: {
    type: Date,
    trim: true
  },
  lastUpdated: {
    type: Date,
    trim: true
  }
});


var ToDo = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;
