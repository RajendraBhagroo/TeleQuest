import isEmpty from "../../utils/is-empty";
import { UPDATE_PROFILE } from "../actions/types";

const initialState = {
  isStudent: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        isStudent: !isEmpty(action.payload)
      };
    default:
      return state;
  }
}
