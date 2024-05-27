import { BLOG_FAILURE, BLOG_REQUEST, BLOG_TOTAL_SUCCESS, DELETE_BLOG_SUCCESS, GET_BLOG_SUCCESS, GET_SINGLE_BLOG_SUCCESS, GET_USER_BLOG_SUCCESS, PATCH_BLOG_SUCCESS, POST_BLOG_SUCCESS, SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./actionType";



const initialState = {
  isLoading: false,
  isError: false,
  totalBlogs: 0,
  blogs: [],
  userBlogs: [],
  singleBlog:{}
};

export const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case BLOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case BLOG_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case GET_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blogs: payload,
      };
    }
    case GET_USER_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userBlogs: payload,
      };
    }
    case GET_SINGLE_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        singleBlog: payload,
      };
    }
    case POST_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case PATCH_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case DELETE_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case BLOG_TOTAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        totalBlogs: payload
      }
    }
    case SIGNUP_LOADING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    default:
      return state;
  }
};