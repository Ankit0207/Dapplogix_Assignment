import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../Redux/Blogs/action';

const CreateBlogModal = ({handleTrigger}) => {
    const [open, setOpen] = useState(false);
    const [blogData, setBlogData] = useState({ title: "", content: "", image: "" })
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.blogReducer.isLoading);
    const token=localStorage.getItem("token");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        handleTrigger();
        setOpen(false);
        setBlogData({ title: "", content: "", image: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    }

    const handleAddBlog = () => {
        dispatch(addBlog(blogData, token)).then(() => {
            handleClose();
        })

    };

    return (
        <div>
            <Button variant="contained" color="primary" sx={{ color: 'white', display: 'flex', mr: 2 }}
                startIcon={<AddIcon />} onClick={handleClickOpen}>
                Create new blog
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontSize: '25px', fontWeight: '900' }}>Create new blog</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl fullWidth margin="normal">
                            <FormHelperText sx={{ fontSize: '18px', fontWeight: '900' }}>Blog Title</FormHelperText>
                            <TextField
                                name="title"
                                type="text"
                                placeholder="The Art of listening"
                                variant="outlined"
                                onChange={handleChange}
                                value={blogData.title}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormHelperText sx={{ fontSize: '18px', fontWeight: '900' }}>Content</FormHelperText>
                            <TextareaAutosize
                                name="content"
                                placeholder="Write your blog content here"
                                minRows={5}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#c4c4c4', resize: 'none' }}
                                onChange={handleChange}
                                value={blogData.content}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormHelperText sx={{ fontSize: '18px', fontWeight: '900' }}>Image </FormHelperText>
                            <TextField
                                name="image"
                                type="text"
                                variant="outlined"
                                placeholder='Paste your blog image here'
                                onChange={handleChange}
                                value={blogData.image}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ fontSize: '18px', fontWeight: '600' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddBlog}
                        color="primary"
                        variant="contained"
                        disabled={isLoading} sx={{ fontSize: '18px', fontWeight: '500' }}
                    >
                        {isLoading ? 'Loading...' : 'POST'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateBlogModal;
