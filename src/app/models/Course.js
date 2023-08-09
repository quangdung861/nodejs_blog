const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

const Course = new Schema(
  {
    name: { type: String, max: 255, required: true },
    description: { type: String, max: 600 },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Course', Course);
