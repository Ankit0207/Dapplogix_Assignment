import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../Redux/Comments/action';
import Toast from './Toast';

const CommentComponent = ({ comment, handleCommentTrigger }) => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [newCommentText, setNewCommentText] = useState(comment.comment);
    const [openToast, setOpenToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");

    const handleEditOpen = () => {
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleEditConfirm = () => {
        if (newCommentText === "") {
            setToastMessage("Comment is required.")
            setSeverity("info")
            setOpenToast(true);
        } else {
            dispatch(editComment(comment._id, newCommentText, token)).then(() => {
                setToastMessage("Comment Edited.")
                setSeverity("success")
                setOpenToast(true);
                handleCommentTrigger();
                handleEditClose();
            })
        }

    };

    const handleDeleteConfirm = () => {
        dispatch(deleteComment(comment._id, token)).then(() => {
            
            setToastMessage("Comment Deleted.")
            setSeverity("success")
            setOpenToast(true);
            handleCommentTrigger();
            handleDeleteClose();
        })
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Card sx={{ width: '100%', mb: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="commenter">
                        {comment?.userName?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={capitalizeFirstLetter(comment.userName)}
                subheader={new Date(comment.createdAt).toLocaleDateString()}
                action={
                    comment.userId === userId && (

                        <Box>
                            <IconButton aria-label="edit" onClick={handleEditOpen}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={handleDeleteOpen}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )
                }
            />
            <CardContent>
                <Typography variant="body2">
                    {comment.comment}
                </Typography>
            </CardContent>

            {/* Edit Modal */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit your comment below:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditConfirm}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
            >
                <DialogTitle>{"Delete Comment"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this comment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <Toast open={openToast} msg={toastMessage} severity={severity} setOpenToast={setOpenToast} setToastMessage={setToastMessage} />
        </Card>
    );
};

export default CommentComponent;
