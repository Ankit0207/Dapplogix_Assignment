const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image:{type: String, required: true},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { versionKey: false, timestamps: true });

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = { BlogModel };