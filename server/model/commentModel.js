const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    userName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true }
}, { versionKey: false, timestamps: true });

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = { CommentModel };