const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = () => {
  const LinkSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    url: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  const Link = mongoose.model('Link', LinkSchema)

  return { Link }
}