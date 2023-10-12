import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import axios from "axios"
// import { useAppDispatch } from "../../../app/hooks"

const API_PORT = "3000"
const API_HOST = "localhost"
const API_BASE_URL = `http://${API_HOST}:${API_PORT}`

// TYPES POUR LA REQUETE AXIOS
type ApiHeader = {
  Accept: string
  "Content-Type": string
}
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
// PESTO DATA TYPES
export type PestoProjectApiEntity = {
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

// AXIOS REQUEST READY
export type AxiosRequest = {
  baseURL: urls
  url?: string
  method: methods
  data?: PestoProjectApiEntity | PestoAnotherTypeData
  headers?: ApiHeader
}

// PESTO REQUEST STATE
interface PestoApiRequestState {
  value?: PestoProjectApiEntity[] | PestoAnotherTypeData[]
  status: "idle" | "loading" | "failed"

  feedbacks: string[]
}

const initialState: PestoApiRequestState = {
  value: [],
  status: "idle",

  feedbacks: [],
}

const ERROR_FEEDBACK: PestoApiRequestState = {
  status: "failed",

  feedbacks: [],
}

const requestPestoApiAsync = createAsyncThunk(
  "pestoApi/request",
  async (req: AxiosRequest): Promise<PestoApiRequestState> => {
    try {
      const { data } = await axios<
        PestoProjectApiEntity[] | PestoAnotherTypeData[]
      >(req)

      return {
        value: data,
        status: "loading",
        feedbacks: [
          "succes: " +
            req.method +
            " " +
            req.baseURL +
            (req.url ? req.url : ""),
        ],
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ERROR_FEEDBACK.feedbacks.splice(0, 0, "Axios Error: " + error.message)
        return ERROR_FEEDBACK
      } else {
        ERROR_FEEDBACK.feedbacks.splice(
          0,
          0,
          "An unexpected error occurred: " + error,
        )
        return ERROR_FEEDBACK
      }
    }
  },
)

// EVERY CRUD PROJECTS REQUEST IN AXIOS FORMAT
export const API_LIST_ALL_ENTITY: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.GET,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export const API_CREATE_CONTENT_TYPE: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.POST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export const API_UPDATE_FROM_PROJECT_BY_ID: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.PUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export const API_DELETE_ENTITY_BY_ID: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.DELETE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
/**
 * --------------------------------------------------------------
 *              METHODS FOR YOUR PAGES
 *
 *  use `< ... onclick={dispatch(CreateProject())}>`
 *  use `< ... onclick={dispatch(RequestProjectList())}>`
 *  use `< ... onclick={dispatch(UpdateProjectById(DATA))}>`
 *  use `< ... onclick={dispatch(DeleteProjectById(DATA))}>`
 * --------------------------------------------------------------
 */
// Create
export const CreateProject = (data: PestoProjectApiEntity) => {
  API_CREATE_CONTENT_TYPE.data = data
  return requestPestoApiAsync(API_CREATE_CONTENT_TYPE)
}
// Retrieve
export const RequestProjectList = () => {
  return requestPestoApiAsync(API_LIST_ALL_ENTITY)
}
// Update
export const UpdateProjectById = (data: PestoProjectApiEntity) => {
  console.log(data)
  API_UPDATE_FROM_PROJECT_BY_ID.url = "/" + data._id
  API_UPDATE_FROM_PROJECT_BY_ID.data = data
  return requestPestoApiAsync(API_UPDATE_FROM_PROJECT_BY_ID)
}
// Delete
export const DeleteProjectById = (id: string) => {
  API_DELETE_ENTITY_BY_ID.url = "/" + id
  return requestPestoApiAsync(API_DELETE_ENTITY_BY_ID)
}

/*
  PESTO REDUCERS
  
  A function that accepts an initial state, 
  an object full of reducer functions, 
  and a "slice name", and automatically generates action creators and 
  action types that correspond to the reducers and state.

  The reducer argument is passed to createReducer().
 */
export const pestoProjectSlice = createSlice({
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
        state.feedbacks.splice(0, 0, action.payload.feedbacks[0])
      })
      .addCase(requestPestoApiAsync.rejected, (state) => {
        state.status = "failed"
        state.feedbacks.splice(0, 0,  "rejected")
        console.log(" PESTO REDUCER requestPestoApiAsync failed")
      })
  },
})

/**
 *  YOUR STORE FOR ANY PAGES
 *  use  `const maVar = useAppSelector(ROOSTATE VAR)`
 */
export const request_Feedback = (state: RootState) => state.pestoApi.feedbacks
export const request_Output = (state: RootState) => state.pestoApi.value

export default pestoProjectSlice.reducer
