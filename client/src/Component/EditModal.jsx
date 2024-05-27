import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { editBlog } from '../Redux/Blogs/action';
import axios from 'axios';

const EditModal = ({ id, handleTrigger }) => {
    const [open, setOpen] = useState(false);
    const [blogData, setBlogData] = useState({ title: "", content: "", image: "" })
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.blogReducer.isLoading);
    const token = localStorage.getItem("token");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        handleTrigger();
        setOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    }

    const handleEditBlog = () => {
        dispatch(editBlog(id, blogData, token)).then(() => {
            handleClose();
        })

    };

    useEffect(() => {
        axios.get(`https://blog-website-7e2f.onrender.com/blogs/${id}`).then((res) => {
            setBlogData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <Button variant="contained"
                onClick={handleClickOpen}>
                Edit Blog
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontSize: '25px', fontWeight: '900' }}>Edit blog</DialogTitle>
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
                                value={blogData?.title}
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
                                value={blogData?.content}
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
                                value={blogData?.image}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ fontSize: '18px', fontWeight: '600' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditBlog}
                        color="primary"
                        variant="contained"
                        disabled={isLoading} sx={{ fontSize: '18px', fontWeight: '500' }}
                    >
                        {isLoading ? 'Loading...' : 'EDIT'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditModal;
