import { loginUser } from "./auths";
import { editUserAction } from "./users";

export const editUserAndSyncAuth = (payload) => (dispatch, getState) => {
  //edit user
  dispatch(editUserAction(payload));
  // console.log("payload", payload);

  // ambil user yang baru dari state
  const { users } = getState();
  const updatedUser = users.data.find((user) => user.email === payload.email);
  // console.log("updateuser", updatedUser);

  //synch ke auth.currentuser
  const { auths } = getState();
  if (auths.currentUser?.email === payload.email) {
    dispatch(loginUser(updatedUser));
  }
};
