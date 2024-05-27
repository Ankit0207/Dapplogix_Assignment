import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Stack, TextField, Button, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addComment, getComments } from '../Redux/Comments/action';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardComponent({ data ,handleTrigger}) {
    const [expandedComments, setExpandedComments] = React.useState(false);
    const [expandedAddComments, setAddExpandedComments] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const userId=localStorage.getItem("userId");
    const comments = useSelector((store) => store.commentReducer.comments)

    const handleExpandComment = () => {
        setExpandedComments(!expandedComments);
    };
    const handleAddExpandComment = () => {
        setAddExpandedComments(!expandedAddComments);
    };

    const handleLikeClick = () => {
        axios.put(`https://blog-website-54v1.onrender.com/blogs/like/${data?._id}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            handleTrigger();
        }).catch((error) => {
            console.log(error)
        })
        
    };

    const handlePostComment = (e) => {
        e.preventDefault();
        dispatch(addComment({ postId: data?._id, comment: newComment }, token));
        setAddExpandedComments(false);
        setExpandedComments(true);
        setNewComment("");
    }

    React.useEffect(() => {
        dispatch(getComments(data?._id))
    }, [])

    return (

        <Card sx={{ width: '95%', px: 3, my: 5 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="blog" alt='Remy Sharp' />
                }
                title={data?.title}
                subheader={data?.createdAt.split("T")[0]}
            />
            <CardMedia
                component="img"
                height="250"
                image={data?.image}
                alt={data?.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data?.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '11%' }}>
                    <IconButton aria-label="like" onClick={handleLikeClick}>
                        <FavoriteIcon sx={{ color: data.likes.includes(userId) ? red[500] : 'inherit' }} /> <Typography sx={{ ml: "4px", fontWeight: 600 }}> {data?.likes.length}</Typography>
                    </IconButton>
                    <ExpandMore
                        expand={expandedAddComments}
                        onClick={handleAddExpandComment}
                        aria-expanded={expandedAddComments}
                        aria-label="addComment"
                    >
                        <AddCommentIcon />
                    </ExpandMore>
                </Box>
                <ExpandMore
                    expand={expandedComments}
                    onClick={handleExpandComment}
                    aria-expanded={expandedComments}
                    aria-label="comment"
                >
                    <CommentIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expandedComments} timeout="auto" unmountOnExit>
                <CardContent sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <Stack spacing={2}>
                            {comments.map((comment, index) => (
                                <Typography key={comment?._id} paragraph>
                                    {comment.comment}
                                </Typography>
                            ))}
                        </Stack>
                </CardContent>
            </Collapse>
            <Collapse in={expandedAddComments} timeout="auto" unmountOnExit>
                <CardContent sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handlePostComment}>
                            Post Comment
                        </Button>
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>

    );
}
