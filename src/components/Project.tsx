import { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import {
  requestPestoApiAsync,
  ApiRequest,
  urls,
  methods,
} from "../features/pestoApi/pestoApiSlice"
import "./project.css"

const API_EDIT_ENTITY: ApiRequest = {
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
  // console.log("props: ", props)
  const dispatch = useAppDispatch()
  //const [values, setValues] = useState(props.outputs)
  //if (props.outputs[0]._id !== 0) setValues(props.outputs)

  if (props.outputs && props.outputs[0] && props.outputs[0]._id !== 0) {
    //setValues(props.outputs)
    return props.outputs.map((item: any, index: number) => {
      return (
        <div key={item._id}>
          <div className="card">
            <div>_id:{item._id}</div>
            <div>name: {item.name}</div>
            <div>git_ssh_uri: {item.git_ssh_uri}</div>
            <div>createdAt: {item.createdAt}</div>
            <div>__v: {item.__v}</div>
            <div>description: {item.description}</div>
            {/*
            <textarea
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
                const req = { ...API_DELETE_ENTITY }
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
