import { useAppDispatch } from "../app/hooks"
import {
  requestPestoApiAsync,
  ApiRequest,
  urls,
  methods,
} from "../features/pestoApi/pestoApiSlice"
import "./project.css"

const API_LIST_ALL_ENTITY: ApiRequest = {
  url: urls.PESTOPROJECT,
  method: methods.GET,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}
export function Project(props: any) {
  //console.log("props: ", props)
  const dispatch = useAppDispatch()
  if (props.outputs && props.outputs[0].id !== 0)
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
              onClick={() =>
                dispatch(requestPestoApiAsync(API_LIST_ALL_ENTITY))
              }
            >
              Edit
            </button>
            <button
              className="button"
              aria-label="Edit"
              onClick={() =>
                dispatch(requestPestoApiAsync(API_LIST_ALL_ENTITY))
              }
            >
              Remove
            </button>
          </div>
        </div>
      )
    })
}
