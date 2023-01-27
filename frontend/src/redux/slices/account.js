
import { createSlice} from "@reduxjs/toolkit"

const accounInitialState = {
    email: null
}

export const accountSlice = createSlice({
    name: "account",
    initialState: accounInitialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        }
    }
})

export const { setEmail } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;

