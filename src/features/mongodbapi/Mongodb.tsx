import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { requestMongoDdAsync, selectInput } from "./mongodbSlice"
import styles from "../counter/Counter.module.css"

export function Mongodb() {
  const input = useAppSelector(selectInput)
  const dispatch = useAppDispatch()
  const [inputValue, setinputValue] = useState("")

  return (
    <div>
      <button
        className={styles.button}
        aria-label="Decrement value"
        onClick={() => dispatch(requestMongoDdAsync())}
      >
        Get
      </button>
      <div className={styles.row}>
        <span className={styles.value}>
          <textarea
            cols={80}
            rows={20}
            /* FIX store effiecient : value={inputValue} to value={input} aka real store hook */
            value={input}
            onChange={(e) => setinputValue(JSON.parse(e.target.value))}
          />
        </span>
      </div>
    </div>
  )
}
