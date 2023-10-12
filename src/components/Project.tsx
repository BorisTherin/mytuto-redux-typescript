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

export function Project(props: ProjectProps) {
  const dispatch = useAppDispatch()
  const [modalValues, setModalValues] = useState<string>()

  function modal(index: number, data: PestoProjectApiEntity) {
    console.log("data: ", data)
    const mod: any = document.getElementById("modal_" + index)
    mod.style.display = "block"
    setModalValues(JSON.stringify(data))
  }

  if (props.outputs && props.outputs[0] && props.outputs[0]._id !== 0) {
    return props.outputs.map((item: PestoProjectApiEntity, index: number) => {
      return (
        <>
          <div key={item._id}>
            <div className="modal" id={`modal_${index}`}>
              EDIT: <br />
              <textarea
                id={`source_update_${index}`}
                rows={5}
                cols={80}
                value={modalValues}
                onChange={(e) => setModalValues(e.target.value)}
                onKeyDown={async (e) => {
                  //console.log(e.key)
                  if (e.key === "Enter") {
                    const mod: any = document.getElementById("modal_" + index)
                    mod.style.display = "none"
                    const source: any = document.getElementById(
                      "source_update_" + index,
                    )
                    const data: PestoProjectApiEntity = JSON.parse(source.value)
                    await dispatch(UpdateProjectById(data))
                    dispatch(RequestProjectList())
                  }
                }}
              />
              <button
                className="button"
                onClick={() => {
                  const mod: any = document.getElementById("modal_" + index)
                  mod.style.display = "none"
                }}
              >
                CANCEL
              </button>
              <button
                className="button"
                onClick={async () => {
                  const mod: any = document.getElementById("modal_" + index)
                  mod.style.display = "none"
                  const source: any = document.getElementById(
                    "source_update_" + index,
                  )
                  const data: PestoProjectApiEntity = JSON.parse(source.value)
                  await dispatch(UpdateProjectById(data))
                  dispatch(RequestProjectList())
                }}
              >
                UPDATE
              </button>
            </div>
            <div id={"source_" + index}>
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
                    // on modal l'obj original props.outputs[x].item
                    modal(index, item)
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
          </div>
        </>
      )
    })
  }
}
