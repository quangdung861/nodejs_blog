const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    // _id: { type: Number },
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
    // _id: false,
    timestamps: true,
  },
);

// Add plugin
mongoose.plugin(slug);

// CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});

module.exports = mongoose.model('Course', CourseSchema);
