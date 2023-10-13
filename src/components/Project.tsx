import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import {
  RequestProjectList,
  UpdateProjectById,
  DeleteProjectById,
  PestoProjectApiEntity,
  request_Output,
} from "../features/PestoApi/Projects/pestoProjectSlice"
import "./project.css"

/*
interface ProjectProps {
  outputs: PestoProjectApiEntity[]
}
*/

export function Project() {
  const requestOutput = useAppSelector(request_Output)
  const dispatch = useAppDispatch()
  const [modalValues, setModalValues] = useState<string>()

  function modal(data: PestoProjectApiEntity): void {
    console.log("data: ", data)
    const mod: any = document.getElementById("modal")
    mod.style.display = "block"
    setModalValues(JSON.stringify(data))
  }

  function ListProjects() {
    if (requestOutput && requestOutput[0] && requestOutput[0]._id !== 0) {
      return requestOutput.map((item: any) => {
        return (
          <div key={item._id}>
            <div className="ProjectCard">
              <div>
                <div>_id:</div> <div>{item._id}</div>
              </div>
              <div>
                <div>name:</div> <div>{item.name}</div>
              </div>
              <div>
                <div>git_ssh_uri:</div> <div>{item.git_ssh_uri}</div>
              </div>
              <div>
                <div>createdAt:</div> <div>{item.createdAt}</div>
              </div>
              <div>
                <div>__v:</div> <div>{item.__v}</div>
              </div>
              <div>
                <div>description:</div> <div>{item.description}</div>
              </div>
            </div>
            <div className="controlBar">
              <button
                className="button"
                aria-label="Edit"
                onClick={() => {
                  // on modal l'obj original outputs[x].item
                  modal(item)
                }}
              >
                Edit
              </button>
              <button
                className="button"
                aria-label="Edit"
                onClick={async () => {
                  await dispatch(DeleteProjectById("" + item._id))
                  dispatch(RequestProjectList())
                }}
              >
                Remove
              </button>
            </div>
          </div>
        )
      })
    } else {
      const div = [
        <>
          <div key={0}>
            <div></div>
          </div>
        </>,
      ]
      return div
    }
  }

  return (
    <div>
      <div className="modal" id="modal">
        EDIT: <br />
        <textarea
          id="source_update"
          rows={5}
          cols={80}
          value={modalValues}
          onChange={(e) => setModalValues(e.target.value)}
          onKeyDown={async (e) => {
            // ENTER TO VALID UPDATE
            if (e.key === "Enter") {
              const mod: any = document.getElementById("modal")
              mod.style.display = "none"
              const source: any = document.getElementById("source_update")
              const data: PestoProjectApiEntity = JSON.parse(source.value)
              await dispatch(UpdateProjectById(data))
              dispatch(RequestProjectList())
            }
          }}
        />
        <br />
        <button
          className="button"
          onClick={() => {
            const mod: any = document.getElementById("modal")
            mod.style.display = "none"
          }}
        >
          CANCEL
        </button>
        <button
          className="button"
          onClick={async () => {
            const mod: any = document.getElementById("modal")
            mod.style.display = "none"
            const source: any = document.getElementById("source_update")
            const data: PestoProjectApiEntity = JSON.parse(source.value)
            await dispatch(UpdateProjectById(data))
            dispatch(RequestProjectList())
          }}
        >
          UPDATE
        </button>
      </div>
      <ListProjects />
    </div>
  )
}
