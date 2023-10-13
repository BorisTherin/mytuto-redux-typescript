import { useAppSelector } from "../app/hooks"
import { request_Feedback } from "../features/PestoApi/Projects/pestoProjectSlice"

export function Feedbacks() {
  const requestFeedback = useAppSelector(request_Feedback)

  return (
    <div className="feedback">
      <b>
        <u>Feed-Back:</u>
      </b>
      <br />
      <div>
        {requestFeedback?.map((item, index) => {
          return <div key={`feedbacks_${index}`}> {item} </div>
        })}
      </div>
    </div>
  )
}
