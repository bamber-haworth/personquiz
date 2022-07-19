import { useRecoilState } from 'recoil'
import { thankState } from '../states/thankState'

const useThankyou = () => {
  const [isThankyou, setThankyou] = useRecoilState(thankState)


  const navigateThankyou = (result: boolean) => {
   setThankyou(result)
  }


  return {
   isThankyou,
   navigateThankyou
  }
}

export default useThankyou
