import axios from "axios";
import { COMMENT_FAILURE, COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, GET_COMMENT_SUCCESS, PATCH_COMMENT_SUCCESS, POST_COMMENT_SUCCESS } from "./actionType";

export const addComment = (commentData, token) => async (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    return axios
        .post(`https://blog-website-54v1.onrender.com/comments`, commentData, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: POST_COMMENT_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};

export const getComments = (id) => (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    axios
        .get(`https://blog-website-54v1.onrender.com/comments/blog/${id}`)
        .then((res) => {
            dispatch({ type: GET_COMMENT_SUCCESS, payload: res.data.comments });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};


export const editComment = (id,comment,token) => (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    axios
        .put(`https://blog-website-54v1.onrender.com/comments/${id}`,comment,{ headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: PATCH_COMMENT_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};

export const deleteBlog = (id,token) => (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    axios
        .delete(`https://blog-website-54v1.onrender.com/comments/${id}`,{ headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: DELETE_COMMENT_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};
