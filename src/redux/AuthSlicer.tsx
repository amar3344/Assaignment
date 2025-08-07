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
        },
        logoutUser:(state)=>{
            state.token = ""
        }
    }
});

export const { updateToken ,logoutUser} = AuthSlicer.actions;
export default AuthSlicer.reducer;