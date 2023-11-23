import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  password: string
}

const initialState: User = {
  password: '',
}

export const verifyingAsync = createAsyncThunk('auth/verifyingAsync',
  async (password: string) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return password
  }
)

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpVerifying(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(verifyingAsync.pending, () => {
      console.log('verifying pending')
    })
    .addCase(verifyingAsync.fulfilled, (state, action: PayloadAction<string>) => {
      state.password = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { signUpVerifying } = auth.actions

export default auth.reducer