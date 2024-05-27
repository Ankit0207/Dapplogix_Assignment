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
import CommentComponent from './Comment';

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

export default function CardComponent({ data, handleTrigger }) {
    const [expandedComments, setExpandedComments] = React.useState(false);
    const [expandedAddComments, setAddExpandedComments] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [commentTrigger, setCommentTrigger] = React.useState(0);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const comments = useSelector((store) => store.commentReducer.comments)

    const handleExpandComment = () => {
        setExpandedComments(!expandedComments);
    };
    const handleAddExpandComment = () => {
        setAddExpandedComments(!expandedAddComments);
    };
    const handleCommentTrigger = () => {
        setCommentTrigger(commentTrigger + 1)
    }

    const handleLikeClick = () => {
        axios.put(`https://blog-website-7e2f.onrender.com/blogs/like/${data?._id}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            handleTrigger();
        }).catch((error) => {
            console.log(error)
        })

    };

    const handlePostComment = () => {
        dispatch(addComment({ postId: data?._id, comment: newComment, userName: username }, token)).then(() => {
            setAddExpandedComments(false);
            handleCommentTrigger();
            setExpandedComments(true);
            setNewComment("");
        })

    }

    const filteredComments = comments.filter(comment => comment.postId === data._id);


    React.useEffect(() => {
        dispatch(getComments())
    }, [commentTrigger])

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
                        {filteredComments.length>0 ? filteredComments.map((comment) => <CommentComponent key={comment._id} comment={comment} handleCommentTrigger={handleCommentTrigger} />) : <Typography>No Comments</Typography>}
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
