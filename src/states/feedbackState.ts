import { atom } from 'recoil'

export const feedbackState = atom({
  key: 'feedbacks',
  default: [''],
})
