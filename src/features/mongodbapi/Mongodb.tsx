import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  requestMongoDdAsync,
  createContentTypeAsync,
  listOutput,
} from "./mongodbSlice"
import styles from "../counter/Counter.module.css"
import { Project } from "../../components/Project"

export function Mongodb() {
  const input = useAppSelector(listOutput)
  console.log("input: ", input)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState(
    '{ "name" : "astroproject2", "description" : "mon site portfoli2o", "git_ssh_uri" : "git@github.com:3forges/poc-redux-thunk2.git" }'
  )
  // setInputValue(input)

  return (
    <div>
      <button
        className={styles.button}
        aria-label="List entities"
        onClick={() => dispatch(requestMongoDdAsync())}
      >
        LIST PROJECTS
      </button>
      <div className={styles.row}>
        <Project inputs={input} />
      </div>
      <div>
        <textarea
          id="source"
          cols={80}
          rows={5}
          /* FIX store effiecient : value={inputValue} to value={input} aka real store hook */
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button
        className={styles.button}
        aria-label="Create Content-Type"
        onClick={() => dispatch(createContentTypeAsync({inputValue}))}
      >
        NEW CONTENT TYPE
      </button>
    </div>
  )
}
