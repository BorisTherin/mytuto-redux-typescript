import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
/* 
  FORKED FROM ../counter/conterSlice.ts IN ORDER TO MAKE MY 1ST PESTO-API REQUEST
*/
/*
const FRONT_DEV_PORT = "5173"
const FRONT_DEV_HOST = "localhost"
*/
const API_PORT = "3000"
const API_HOST = "localhost"
const API_BASE_URL = `http://${API_HOST}:${API_PORT}`

export enum urls { // STRICT URLS/HOOKS
  PESTOPROJECT = `${API_BASE_URL}/pesto-project`,
  PESTOCONTENT = `${API_BASE_URL}/pesto-content`,
  PESTOCONTENTTYPE = `${API_BASE_URL}/pesto-content-type`,
  PESTOPROJECTNAME = `${API_BASE_URL}/pesto-project/name`,
  PESTOPROJECTURI = `${API_BASE_URL}/pesto-project/uri`,
  PESTOCONTENTTYPEPROJECT = `${API_BASE_URL}/pesto-content-type/project`,
}
export enum methods { // STRICT METHODS
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}
// TYPES POUR LA REQUETE AXIOS
type ApiHeader = {
  Accept: string
  "Content-Type": string
}
type ApiData = {
  name: string
  description: string
  git_ssh_uri: string
}
// AXIOS READY
export type ApiRequest = {
  baseURL: urls
  url: string
  method: methods
  data?: ApiData
  headers?: ApiHeader
}

type PestoContentTypeData = {
  _id: number
  title: string
  description: string
  identifier: string
  createdAt: string
}

type GetPestoContentTypesResponse = {
  data: PestoContentTypeData[]
}

export interface PestoApiRequestState {
  value: Array<object>
  status: "idle" | "loading" | "failed"
}

const initialState: PestoApiRequestState = {
  value: [
    {
      _id: 0,
      name: "",
      git_ssh_uri: "",
      createdAt: "",
      __v: 0,
      description: "",
    },
  ],
  status: "idle",
}

async function requestPestoContentTypes(
  req: ApiRequest,
): Promise<GetPestoContentTypesResponse | String | object[]> {
  try {
    const { data, status } = await axios<GetPestoContentTypesResponse>(req)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message)
      return error.message
    } else {
      console.log("unexpected error: ", error)
      return "An unexpected error occurred"
    }
  }
}

export const requestPestoApiAsync = createAsyncThunk(
  "pestoApi/request",
  async (req: ApiRequest) => {
    let response = await requestPestoContentTypes(req)
    // console.log(" >>>>>>>>>>> [requestPestoApiAsync] reponse: ", response)
    // eslint-disable-next-line prettier/prettier
    if (typeof(response) === "string" ) response = ""
    return response
  },
)

export const pestoApiSlice = createSlice({
  name: "pestoApi",
  initialState,
  reducers: {
    /* EMPTY */
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPestoApiAsync.pending, (state) => {
        state.status = "loading"
        console.log(" PESTO REDUCER requestPestoApiAsync loading")
      })
      .addCase(requestPestoApiAsync.fulfilled, (state, action) => {
        state.status = "idle"
        console.log(" PESTO REDUCER fetch fulfilled, payload: ", action.payload)
        state.value = action.payload
      })
      .addCase(requestPestoApiAsync.rejected, (state) => {
        state.status = "failed"
        console.log(" PESTO REDUCER requestPestoApiAsync failed")
      })
  },
})

export const request_Output = (state: RootState) => state.pestoApi.value

export default pestoApiSlice.reducer
