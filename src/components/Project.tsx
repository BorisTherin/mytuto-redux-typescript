// import { useState } from "react"
import { useAppDispatch /*, useAppSelector*/ } from "../app/hooks"
import {
  requestPestoApiAsync,
  ApiRequest,
  /*request_Output,*/
  urls,
  methods,
} from "../features/pestoApi/pestoApiSlice"
import "./project.css"

const API_UPDATE_FROM_PROJECT_ID: ApiRequest = {
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

const API_DELETE_ENTITY: ApiRequest = {
  baseURL: urls.PESTOPROJECT,
  url: "",
  method: methods.DELETE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

export function Project(props: any) {
  //const requestOutput: any = useAppSelector(request_Output)
  const dispatch = useAppDispatch()
  //const [values, setValues] = useState(props.outputs)

  if (props.outputs && props.outputs[0] && props.outputs[0]._id !== 0) {
    return props.outputs.map((item: any, index: number) => {
      return (
        <div key={item._id} id={"source" + index}>
          <div className="card">
            <div>_id:{item._id}</div>
            <div>name: {item.name}</div>
            <div>git_ssh_uri: {item.git_ssh_uri}</div>
            <div>createdAt: {item.createdAt}</div>
            <div>__v: {item.__v}</div>
            <div>description: {item.description}</div>
            {/*
            <textarea
              id={source_" + item._id }
              rows={5}
              cols={80}
              value={JSON.stringify(values[index])}
              onChange={(e) => setValues([ ...values.splice(index, 1, JSON.parse(e.target.value))])}
            />  
            */}
          </div>
          <div className="control">
            <button
              className="button"
              aria-label="Edit"
              onClick={() => {
                const req = { ...API_UPDATE_FROM_PROJECT_ID }
                const data: any = document.getElementById("source_" + item._id)
                req.data = JSON.parse(data.value)
                dispatch(requestPestoApiAsync(req))
              }}
            >
              Edit
            </button>
            <button
              className="button"
              aria-label="Edit"
              onClick={() => {
                const req = { ...API_DELETE_ENTITY }
                req.url = "/" + item._id
                dispatch(requestPestoApiAsync(req))
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )
    })
  }
}
