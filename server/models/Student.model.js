const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: { type: String, enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] },
  program: String,
  background: String,
  image: { type: String, default: 'https://i.imgur.com/r8bo8u7.png' },
  projects: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
  cohort: mongoose.Types.ObjectId
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student