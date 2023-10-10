import { useAppDispatch } from "../app/hooks"
import {
  requestPestoApiAsync,
  ApiRequest,
  urls,
  methods,
} from "../features/pestoApi/pestoApiSlice"
import "./project.css"

const API_EDIT_ENTITY: ApiRequest = {
  url: urls.PESTOPROJECT,
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
  url: urls.PESTOPROJECT,
  method: methods.DELETE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

export function Project(props: any) {
  console.log("props: ", props)
  const dispatch = useAppDispatch()
  if (props.outputs && props.outputs[0] && props.outputs[0]._id !== 0)
    return props.outputs.map((item: any) => {
      return (
        <div key={item._id}>
          <div className="card">
            <div>id:{item._id}</div>
            <div>name: {item.name}</div>
            <div>git_ssh_uri: {item.git_ssh_uri}</div>
            <div>createdAt: {item.createdAt}</div>
            <div>__v: {item.__v}</div>
            <div>description: {item.description}</div>
          </div>
          <div className="control">
            <button
              className="button"
              aria-label="Edit"
              onClick={() => {
                dispatch(requestPestoApiAsync(API_EDIT_ENTITY))
              }}
            >
              Edit
            </button>
            <button
              className="button"
              aria-label="Edit"
              onClick={() => {
                const req = { ...API_DELETE_ENTITY }
                req.url = API_DELETE_ENTITY.url + "/" + item._id
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
