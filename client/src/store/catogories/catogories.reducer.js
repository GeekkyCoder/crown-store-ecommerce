import { CATOGORIES_ACTION_TYPES } from "./catogories.actionTypes";

const initalState = {
  catogories: [],
  isLoading:false,
  error:null
};

export const catogoriesReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATOGORIES_ACTION_TYPES.FETCH_CATOGORIES_START:
      return {
        ...state,
        isLoading:true,
      };
     case CATOGORIES_ACTION_TYPES.FETCH_CATOGORIES_SUCCESS:
      return {
        ...state,
        isLoading:false,
        catogories:payload
      }
      case CATOGORIES_ACTION_TYPES.FETCH_CATOGORIES_FAIL:
        return {
          ...state,
          error:payload,
          isLoading:true
        } 
    default:
      return state;
  }
};
