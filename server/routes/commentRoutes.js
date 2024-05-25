const express = require('express');
const { createComment, updateComment, deleteComment, getCommentsByPostId } = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/authMiddleware');

const commentRoute = express.Router();

commentRoute.route('/').post(authMiddleware, createComment);
commentRoute.route('/:id').put(authMiddleware, updateComment).delete(authMiddleware, deleteComment);
commentRoute.route('/post/:id').get(getCommentsByPostId);

module.exports = { commentRoute };
