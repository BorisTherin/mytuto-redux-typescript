import { useAppDispatch } from "../app/hooks"
import { requestMongoDdAsync } from "../features/mongodbapi/mongodbSlice"
import "./project.css"

export function Project(props: any) {
  console.log("props: ", props)
  const dispatch = useAppDispatch()
  return props.inputs.map((item: any) => {
    return (
      <div key={item._id}>
        <div className="card">
          <div>id={item._id}</div>
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
            onClick={() => dispatch(requestMongoDdAsync())}
          >
            Edit
          </button>
          <button
            className="button"
            aria-label="Edit"
            onClick={() => dispatch(requestMongoDdAsync())}
          >
            Remove
          </button>
        </div>
      </div>
    )
  })
}
