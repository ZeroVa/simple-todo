var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
  itemName: {
      type: String,
      required: true
  },
  completed: {
      type: boolean,
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
