const { BlogModel } = require("../model/blogModel");


const createBlog = async (req, res) => {
    const { title, content } = req.body;
    try {
        if (!title || !content) {
            return res.status(401).json({ msg: 'Title and content are required fields.' });
        }
        const newBlog = new BlogModel({
            ...req.body, authorId: req.userId,
        });
        await newBlog.save();
        return res.status(200).json({ msg: 'Blog posted successfully', blog: newBlog });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getBlog = async (req, res) => {
    const { page, limit, q } = req.query;
    try {
        const query = q
            ? {
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { content: { $regex: q, $options: 'i' } }
                ]
            }
            : {};
        const blogs = await BlogModel.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await BlogModel.countDocuments(query);
        return res.status(200).json({ blogs, total });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getBlogByUser = async (req, res) => {
    const { page, limit, q } = req.query;
    try {
        const query = q
            ? {
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { content: { $regex: q, $options: 'i' } }
                ],authorId:req.userId
            }
            : { authorId:req.userId };
        const blogs = await BlogModel.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await BlogModel.countDocuments(query);
        return res.status(200).json({ blogs, total });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        if (blog.authorId.toString() !== req.userId.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({ msg: 'Blog has been updated successfully', updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        if (blog.authorId.toString() !== req.userId.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await BlogModel.findByIdAndDelete({ _id: req.params.id });

        return res.status(200).json({ msg: 'Blog has been deleted successfully', blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const likeBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.likes.includes(req.userId)) {
            blog.likes = blog.likes.filter(
                (id) => id.toString() !== req.userId.toString()
            );
        } else {
            blog.likes.push(req.userId);
        }
        await blog.save();
        return res.status(200).json({ msg: 'Blog liked and disliked successfully', blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBlog, getBlog, getBlogById, updateBlog, deleteBlog, likeBlog, getBlogByUser };