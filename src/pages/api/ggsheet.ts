import { google } from 'googleapis'
import dayjs  from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {
    fullName,
    dob,
    phoneNumber,
    zalo,
    email,
    address,
    dream,
    personType
  } = req.body
  const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })
  const today = dayjs().format('DD/MM/YYYY HH:mm')
  const client = await auth.getClient();
  const spreadsheetId = '1Rqo1KPTw4v9PS4f39PG4EyYnQjwyUYu4qwE4e_pBCU0'

  // Instance of Google Sheets API
  const googleSheets = google.sheets({version: "v4", auth: client})

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  })
  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1"
  })
  try {
    //Write row(s) to spreadsheet
    //@ts-ignore
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
        resource: {
        values: [
          [fullName, dob, phoneNumber, email, zalo, address, dream, personType, today]
        ]
      }
    })
    res.json({ message: 'data has been written to your spreadsheet', status: 'success' })
  } catch (error) {
    //@ts-ignore
    console.log('ERR', error?.response.body.errors)
    res.status(500).json({ error: 'Error writing data to spreadsheet' })
  }
}
