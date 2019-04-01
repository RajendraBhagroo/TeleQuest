import isEmpty from "../../utils/is-empty";
import { UPDATE_PROFILE, GET_PROFILE } from "../actions/types";

const initialState = {
  isStudent: true,
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
        profile: action.payload
      };
    default:
      return state;
  }
}
