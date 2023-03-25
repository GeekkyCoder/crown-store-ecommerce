import { createSelector } from "reselect";

const userSelectorReducer = (state) => state.user;

const selectUser = createSelector(
  [userSelectorReducer],
  (userSlice) => userSlice.currentUser
);

export const currentUserSelector = createSelector(
  [selectUser],
  (currentUser) => {
    return currentUser;
  }
);
