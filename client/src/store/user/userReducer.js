const USER_ACTION_TYPES = require("./user.actionTypes");

const INITIAL_STATE = {
  currentUser: null || JSON.parse(localStorage.getItem("user")),
  isLoading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ACTION_TYPES.SET_USER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        isLoading: false,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_ACTION_TYPES.SET_USER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
