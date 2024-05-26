const express = require('express');
const { getBlog, createBlog, getBlogById, updateBlog, deleteBlog, likeBlog, getBlogByUser } = require('../controllers/blogController');
const { authMiddleware } = require('../middleware/authMiddleware');
const blogRoute = express.Router();

blogRoute.route('/').get(getBlog).get(authMiddleware,getBlogByUser).post(authMiddleware, createBlog);
blogRoute.route('/user').get(authMiddleware,getBlogByUser);
blogRoute
    .route('/:id')
    .get(getBlogById)
    .patch(authMiddleware, updateBlog)
    .delete(authMiddleware, deleteBlog);
blogRoute.route('/:id/like').put(authMiddleware, likeBlog);

module.exports = { blogRoute };
