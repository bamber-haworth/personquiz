import axios from "axios"
import { ContactValues } from "./contact.type"
import { ResultInformation } from "./result.type"

export const sendResultToUser = async (data: ResultInformation) => {
  try {
   const response = await axios({
    method: 'POST',
    url: '/api/contact',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log('RES', response)
  } catch (error) {
    console.log('Send Result to user Error', error)
  }
}

export const writeDataToSheet =async (data: ContactValues) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/ggsheet',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.log('Write data to Spreadsheet Error', error)
  }
}
