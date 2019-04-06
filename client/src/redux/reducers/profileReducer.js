import isEmpty from "../../utils/is-empty";
import {
  UPDATE_PROFILE,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING
} from "../actions/types";

const initialState = {
  isStudent: true,
  loading: false,
  profile: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        isStudent: !isEmpty(action.payload)
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
