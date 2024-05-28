import axios from "axios";
import { COMMENT_FAILURE, COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, GET_COMMENT_SUCCESS, PATCH_COMMENT_SUCCESS, POST_COMMENT_SUCCESS } from "./actionType";

export const addComment = (commentData, token) => async (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    return axios
        .post(`https://blog-website-7e2f.onrender.com/comments`, commentData, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({ type: POST_COMMENT_SUCCESS });
            return res
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};

export const getComments = () => (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    axios
        .get(`https://blog-website-7e2f.onrender.com/comments`)
        .then((res) => {
            dispatch({ type: GET_COMMENT_SUCCESS, payload: res.data.comments });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};


export const editComment = (id, newComment, token) => async (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    return axios
        .patch(`https://blog-website-7e2f.onrender.com/comments/${id}`, { comment: newComment }, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: PATCH_COMMENT_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};

export const deleteComment = (id, token) => async (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    return axios
        .delete(`https://blog-website-7e2f.onrender.com/comments/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: DELETE_COMMENT_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: COMMENT_FAILURE });
        });
};
