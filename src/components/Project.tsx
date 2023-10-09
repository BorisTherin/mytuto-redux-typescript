export function Project(props: any) {
  console.log("props: ", props)
  return props.inputs.map((item: any) => {
    return (
      <>
        <div>
          <span>id={item._id}</span>
          <span>name: {item.name}</span>
          <hr />
          <div>
            <span>git_ssh_uri: {item.git_ssh_uri}</span>
            <span>createdAt: {item.createdAt}</span>
            <span>__v: {item.__v}</span>
          </div>
          <span>description: {item.description}</span>
        </div>
      </>
    )
  })
}
