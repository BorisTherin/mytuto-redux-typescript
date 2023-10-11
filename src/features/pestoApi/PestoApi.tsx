import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  requestPestoApiAsync,
  request_Output,
  request_Feedback,
  urls,
  methods,
  AxiosRequest,
} from "./pestoApiSlice"
import "../../App.css"
import { Project } from "../../components/Project"
import { randomProject } from "./randomProject" // DEVMODE USEFULL

// EVERY REQUEST IN AXIOS FORMAT
const API_LIST_ALL_ENTITY: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  url: "",
  method: methods.GET,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
const API_CREATE_CONTENT_TYPE: AxiosRequest = {
  baseURL: urls.PESTOPROJECT,
  url: "",
  method: methods.POST,
  data: {
    name: "",
    description: "",
    git_ssh_uri: "",
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

//const API_GET_PROJECT_BY_NAME: AxiosRequest = {}
//const API_GET_PROJECT_BY_URI: AxiosRequest = {}
//const API_UPDATE_FROM_PROJECT_ID: AxiosRequest = {}

export function PestoApi() {
  const requestOutput = useAppSelector(request_Output)
  const requestFeedback = useAppSelector(request_Feedback)
  // console.log("requestOutput: ", requestOutput)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState(randomProject())

  return (
    <div>
      <div>
        <span>
          Feed-Back:
          <br /> {requestFeedback}
        </span>
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
        onClick={() => {
          const data: any = document.getElementById("source")
          API_CREATE_CONTENT_TYPE.data = JSON.parse(data.value)
          dispatch(requestPestoApiAsync(API_CREATE_CONTENT_TYPE))
          setInputValue(randomProject())
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
