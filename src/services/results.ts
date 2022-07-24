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

export const writeDataToSheet = async (data: ContactValues) => {
  try {
    await fetch('/api/ggsheet' ,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

  } catch (error) {
    console.log('Write data to Spreadsheet Error', error)
  }
}
