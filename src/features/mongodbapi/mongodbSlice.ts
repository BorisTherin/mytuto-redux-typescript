import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

/* 
  FORKED FROM ../counter/conterSlice.ts IN ORDER TO MAKE MY 1ST PESTO-API REQUEST
*/
const API_URL = "http://localhost:3000/pesto-content-type"

/* schema mongodb
[
  {
    "_id":"65201112f92b3d9b3b7174ab",
    "title":"robe",
    "description":"un autre type de contenu pour mon blog",
    "identifier":"robe",
    "createdAt":"2023-10-06T13:52:18.627Z",
    "__v":0
  }
]
*/

export interface MongoDbShema {
  _id: string
  title: string
  description: string
  createdAt: string
  __v: number
}

export interface MongoDbState {
  value: MongoDbShema
  status: "idle" | "loading" | "failed"
}

const initialState: MongoDbState = {
  value: {
    _id: "",
    title: "",
    description: "",
    createdAt: "",
    __v: 0,
  },
  status: "idle",
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const requestMongoDdAsync = createAsyncThunk(
  "mongodb/request",
  async () => {
    const response = await fetch(API_URL, {
      method: "GET",
      mode: "no-cors",
    })
    if (response && !response.ok) {
      console.log("response.ok = false ")
    }
    //const json: any = await response.json()
    //console.log("json(): ", json)
    console.log("reponse: ", response)
    return JSON.stringify(response)
  },
)

export const mongodbSlice = createSlice({
  name: "mongodb",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(requestMongoDdAsync.pending, (state) => {
        state.status = "loading"
        console.log("requestMongoDdAsync loading")
      })
      .addCase(requestMongoDdAsync.fulfilled, (state, action) => {
        state.status = "idle"
        console.log(API_URL + " fetch fulfilled, payload: ", action.payload)
        state.value = JSON.parse(action.payload)
      })
      .addCase(requestMongoDdAsync.rejected, (state) => {
        state.status = "failed"
        console.log("requestMongoDdAsync failed")
      })
  },
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInput = (state: RootState) => state.mongodb.value

export default mongodbSlice.reducer
