import { createSlice } from "@reduxjs/toolkit";

const authState = {
    token: ""
}

const AuthSlicer = createSlice({
    name: "authSlicer",
    initialState: authState,
    reducers: {
        updateToken: (state) => {
            state.token = "token";
        }
    }
});

export const { updateToken } = AuthSlicer.actions;
export default AuthSlicer.reducer;