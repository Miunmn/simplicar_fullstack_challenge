import mongoose from 'mongoose';
const Schema = mongoose.Schema

const taskSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, 'Task name cannot be blank'],
    minlength: [1, 'Minimum 1 characters required'],
    maxlength: [40, 'First name cannot be that long']
  },
  description:{
    type: String,
    lowercase: true,
    required: [true, 'Desciption cannot be blank'],
    minlength: [1, 'Minimum 1 characters required'],
    maxlength: [120, 'Desciption cannot be that long']
  },
  status: {
    type: String,
    lowercase: true,
    default: "buffer"
  }
})

export default mongoose.model('task', taskSchema)