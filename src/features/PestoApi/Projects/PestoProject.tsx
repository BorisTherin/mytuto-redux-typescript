import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import {
  RequestProjectList,
  CreateProject,
  UpdateProjectById,
  DeleteProjectById,
  request_Output,
  request_Feedback,
} from "./pestoProjectSlice"
import "../../../App.css"
import { Project } from "../../../components/Project"
import { randomProject } from "./randomProject" // DEVMODE USEFULL

export function PestoProject() {
  const requestOutput = useAppSelector(request_Output)
  const requestFeedback = useAppSelector(request_Feedback)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState(randomProject())

  useEffect(() => {
    dispatch(RequestProjectList())
  }, [])

  return (
    <div>
      <div className="feedback">
        <b>
          <u>Feed-Back:</u>
        </b>
        <br />
        <div>
          {requestFeedback?.map((item, index) => {
            return <div key={index}> {item} </div>
          })}
        </div>
      </div>
      <div>
        <br />
        <textarea
          id="source_new"
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
          const data: any = document.getElementById("source_new")
          await dispatch(CreateProject(JSON.parse(data.value)))
          setInputValue(randomProject())
          dispatch(RequestProjectList())
        }}
      >
        NEW PROJECT
      </button>
      <hr />
      <button
        className="button"
        aria-label="List entities"
        onClick={() => dispatch(RequestProjectList())}
      >
        LIST PROJECTS
      </button>
      <div className="projects">
        <Project outputs={requestOutput} />
      </div>
    </div>
  )
}
