import { useState, useEffect } from "react"
import { /*useAppSelector,*/ useAppDispatch } from "../../../app/hooks"
import {
  RequestProjectList,
  CreateProject,
  //UpdateProjectById,
  //DeleteProjectById,
  //request_Output,
} from "./pestoProjectSlice"
import "../../../App.css"
import { Project } from "../../../components/Project"
import { Feedbacks } from "../../../components/Feedbacks"
import { randomProject } from "./randomProject" // DEVMODE USEFULL

export function PestoProject() {
  //const requestOutput = useAppSelector(request_Output)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState(randomProject())

  useEffect(() => {
    dispatch(RequestProjectList())
  }, [dispatch])

  return (
    <div>
      <Feedbacks />
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
        <Project />
      </div>
    </div>
  )
}
