import { createSlice } from "@reduxjs/toolkit";
import { PayloadAttributes } from "../../../types";

export const user = createSlice({
    name:"user",
    initialState: {
        id: null,
        name: "",
        last_name: "",
        role: "",
        email: "",
        status: ""
    } as PayloadAttributes,
    reducers:{
        setUser:(state,action)=>{
            state.id=action.payload.id
            state.name=action.payload.name
            state.last_name=action.payload.last_name
            state.role=action.payload.role
            state.email=action.payload.email
            state.status=action.payload.status
        }
    }
})

export const {setUser} = user.actions
export default user.reducer