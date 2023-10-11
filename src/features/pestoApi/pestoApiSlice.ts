import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"

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

export type PestoContentTypeData = {
  _id?: number
  name: string
  git_ssh_uri: string
  description: string
  title?: string
  createdAt?: string
  identifier?: string
  __v?: number
}

type PestoAnotherTypeData = {
  _id: number
  data: object
}

// AXIOS READY
export type AxiosRequest = {
  baseURL: urls
  url: string
  method: methods
  data?: PestoContentTypeData | PestoAnotherTypeData
  headers?: ApiHeader
}

interface PestoApiRequestState {
  value?: PestoContentTypeData[] | PestoAnotherTypeData[]
  status: "idle" | "loading" | "failed"
  feedback: string
}

const initialState: PestoApiRequestState = {
  value: [],
  status: "idle",
  feedback: "",
}

const ERROR_FEEDBACK: PestoApiRequestState = {
  status: "failed",
  feedback: "",
}

/**
 *  YOUR METHOD FOR YOUR PAGES
 *  < ... onclick="requestPestoApiAsync(YOUR_REQUEST)">
 */
export const requestPestoApiAsync = createAsyncThunk(
  "pestoApi/request",
  async (req: AxiosRequest): Promise<PestoApiRequestState> => {
    try {
      const { data } = await axios<PestoContentTypeData[]>(req)
      return { value: data, status: "loading", feedback: "" }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ERROR_FEEDBACK.feedback = "Axios Error: " + error.message
        return ERROR_FEEDBACK
      } else {
        ERROR_FEEDBACK.feedback = "An unexpected error occurred: " + error
        return ERROR_FEEDBACK
      }
    }
  },
)

// PESTO REDUCERS
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
        state.value = action.payload.value
        state.feedback = action.payload.feedback
      })
      .addCase(requestPestoApiAsync.rejected, (state) => {
        state.status = "failed"
        state.feedback = "rejected"
        console.log(" PESTO REDUCER requestPestoApiAsync failed")
      })
  },
})

// YOUR STORE FOR ANY PAGES
export const request_Feedback = (state: RootState) => state.pestoApi.feedback
export const request_Output = (state: RootState) => state.pestoApi.value

export default pestoApiSlice.reducer
