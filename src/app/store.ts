import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import pestoApiReducer from "../features/PestoApi/Projects/pestoProjectSlice"

export const store = configureStore({
  reducer: {
    pestoApi: pestoApiReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
