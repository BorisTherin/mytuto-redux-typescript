import { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import {
  RequestProjectList,
  UpdateProjectById,
  DeleteProjectById,
  PestoProjectApiEntity,
} from "../features/PestoApi/Projects/pestoProjectSlice"
import "./project.css"

interface ProjectProps {
  outputs: PestoProjectApiEntity[]
}

export function Project(props: ProjectProps): React.ReactElement {
  // console.log("props: ", props)
  const dispatch = useAppDispatch()
  const [modalValues, setModalValues] = useState<string>()

  function modal(data: PestoProjectApiEntity) {
    console.log("data: ", data)
    const mod: any = document.getElementById("modal")
    mod.style.display = "block"
    setModalValues(JSON.stringify(data))
  }

  function ListProjects(props: any): React.ReactElement {
    //console.log("re props: ", props)
    const outputs = props.outputs
    if (outputs && outputs[0] && outputs[0]._id !== 0) {
      return outputs.map((item: PestoProjectApiEntity): JSX.Element => {
        return (
          <div key={item._id}>
            <div className="card">
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
            <div className="control">
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
      const div: JSX.Element = <div key={0}></div>
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
      <ListProjects {...props} />
    </div>
  )
}
