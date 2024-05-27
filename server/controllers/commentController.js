const { CommentModel } = require('../model/commentModel');

const createComment = async (req, res) => {
    try {
        const newComment = new CommentModel({
            ...req.body,
            userId: req.userId,
        });
        await newComment.save();
        return res.status(201).json({ msg: 'comment added successfully', newComment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();
        return res.status(200).json({ comments });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    const { comment } = req.body;
    try {
        const existingComment = await CommentModel.findById(req.params.id);
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (existingComment.userId.toString() !== req.userId.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updatedComment = await CommentModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({ msg: 'comment has been updated successfully' }, updatedComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await CommentModel.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.userId.toString() !== req.userId.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await CommentModel.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createComment, getComments, updateComment, deleteComment
}