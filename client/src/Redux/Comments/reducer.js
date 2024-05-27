import { COMMENT_FAILURE, COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, GET_COMMENT_SUCCESS, PATCH_COMMENT_SUCCESS, POST_COMMENT_SUCCESS } from "./actionType";



const initialState = {
  isLoading: false,
  isError: false,
  comments: [],
};

export const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case COMMENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case COMMENT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case GET_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        comments: payload,
      };
    }
    
    case POST_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case PATCH_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    default:
      return state;
  }
};