import { useRecoilState } from 'recoil'
import { feedbackState } from '../states/feedbackState'

const useFeedback = () => {
  const [feedbackResults, setFeedbackResults] = useRecoilState(feedbackState)


  const getFeedbackResult = (result: string) => {
    setFeedbackResults([...feedbackResults, result])
  }


  return {
   feedbackResults,
   getFeedbackResult
  }
}

export default useFeedback
