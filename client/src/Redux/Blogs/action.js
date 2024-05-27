import axios from "axios";
import { DELETE_BLOG_SUCCESS, GET_BLOG_SUCCESS, GET_USER_BLOG_SUCCESS, PATCH_BLOG_SUCCESS, GET_SINGLE_BLOG_SUCCESS, POST_BLOG_SUCCESS, BLOG_FAILURE, BLOG_REQUEST, BLOG_TOTAL_SUCCESS, SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS, } from "./actionType";

export const addBlog = (blogData, token) => (dispatch) => {
    dispatch({ type: BLOG_REQUEST });
    return axios
        .post(`https://blog-website-7e2f.onrender.com/blogs`, blogData, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: POST_BLOG_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: BLOG_FAILURE });
        });
};

export const getBlogs = (paramObj) => (dispatch) => {
    dispatch({ type: BLOG_REQUEST });
    axios
        .get(`https://blog-website-7e2f.onrender.com/blogs`, { params: paramObj })
        .then((res) => {
            dispatch({ type: BLOG_TOTAL_SUCCESS, payload: res.data.total })
            dispatch({ type: GET_BLOG_SUCCESS, payload: res.data.blogs });
        })
        .catch(() => {
            dispatch({ type: BLOG_FAILURE });
        });
};
export const getUserBlogs = (paramObj, token) => (dispatch) => {
    dispatch({ type: BLOG_REQUEST });
    axios
        .get(`https://blog-website-7e2f.onrender.com/blogs/user`, { params: paramObj, headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch({ type: BLOG_TOTAL_SUCCESS, payload: res.data.total })
            dispatch({ type: GET_USER_BLOG_SUCCESS, payload: res.data.blogs });
        })
        .catch(() => {
            dispatch({ type: BLOG_FAILURE });
        });
};



export const editBlog = (id, blogData, token) => async (dispatch) => {
    dispatch({ type: BLOG_REQUEST });
    return axios
        .patch(`https://blog-website-7e2f.onrender.com/blogs/${id}`, blogData, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: PATCH_BLOG_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: BLOG_FAILURE });
        });
};

export const deleteBlog = (id, token) => (dispatch) => {
    dispatch({ type: BLOG_REQUEST });
    return axios
        .delete(`https://blog-website-7e2f.onrender.com/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            dispatch({ type: DELETE_BLOG_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: BLOG_FAILURE });
        });
};

export const addUser = (userData) => async (dispatch) => {
    dispatch({ type: SIGNUP_LOADING });
    return axios
        .post(`https://blog-website-7e2f.onrender.com/user/register`, userData)
        .then((res) => {
            dispatch({ type: SIGNUP_SUCCESS });
        })
        .catch(() => {
            dispatch({ type: SIGNUP_ERROR });
        });
};
