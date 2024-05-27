const express = require('express');
const { createComment, updateComment, deleteComment, getComments} = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/authMiddleware');

const commentRoute = express.Router();

commentRoute.route('/').post(authMiddleware, createComment).get(getComments);
commentRoute.route('/:id').patch(authMiddleware, updateComment).delete(authMiddleware, deleteComment);

module.exports = { commentRoute };
