import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import {
  requestPestoApiAsync,
  request_Output,
  request_Feedback,
  urls,
  methods,
  AxiosRequest,
} from "./pestoProjectSlice"
import "../../../App.css"
import { Project } from "../../../components/Project"
import { randomProject } from "./randomProject" // DEVMODE USEFULL

// EVERY REQUEST IN AXIOS FORMAT
const API_LIST_ALL_ENTITY: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.GET,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
const API_CREATE_CONTENT_TYPE: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  method: methods.POST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

//const API_GET_PROJECT_BY_NAME: AxiosRequest = {}
//const API_GET_PROJECT_BY_URI: AxiosRequest = {}
//const API_UPDATE_FROM_PROJECT_ID: AxiosRequest = {}

export function PestoProject() {
  const requestOutput = useAppSelector(request_Output)
  const requestFeedback = useAppSelector(request_Feedback)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState(randomProject())
  //dispatch(requestPestoApiAsync(API_LIST_ALL_ENTITY))

  useEffect(() => {
    dispatch(requestPestoApiAsync(API_LIST_ALL_ENTITY))
  }, [])
  return (
    <div>
      <div className="feedback">
        <b>
          <u>Feed-Back:</u>
        </b>
        <br /> {requestFeedback}
      </div>
      <div>
        <br />
        <textarea
          id="source"
          cols={80}
          rows={5}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button
        className="button"
        aria-label="Create Content-Type"
        onClick={async () => {
          const data: any = document.getElementById("source")
          API_CREATE_CONTENT_TYPE.data = JSON.parse(data.value)
          await dispatch(requestPestoApiAsync(API_CREATE_CONTENT_TYPE))
          setInputValue(randomProject())
          dispatch(requestPestoApiAsync(API_LIST_ALL_ENTITY))
        }}
      >
        NEW PROJECT
      </button>
      <hr />
      <button
        className="button"
        aria-label="List entities"
        onClick={() => dispatch(requestPestoApiAsync(API_LIST_ALL_ENTITY))}
      >
        LIST PROJECTS
      </button>
      <div className="projects">
        <Project outputs={requestOutput} />
      </div>
    </div>
  )
}
