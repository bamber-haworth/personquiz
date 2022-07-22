import { google } from 'googleapis'
import dayjs  from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

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
      credentials: {
        client_email: clientEmail,
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCzAE1R/Yo731v\nMhMTpAnyQFR0Z1c4g/DdI9sPlkrlXHFEI5CQZESG5RZ8neP4KuOSA/KNByl+G34j\nw+uIAti7gOgIwVu3ApDQhufalaJcGCl4QtOnMPL8rG47XDgpjPXLgyAChImJFVFx\nb/bBZqXiymPFl1rsuIUIdhgE/rc9ZP64I4f0UXVrkIFheyvLt9L453S4AMPken/a\n5ZHoTyqNQOknxTCZWXYa/JeSz7D+g3WWQ3CgVhC46SEPOtPyV4Rkl+1aE1zc4KCg\nVMjy465s3n43xqFraS4J40cwAq29D8eb7MeZM1jcO4oUgAuvvuCHKG94UzGE0R8c\ne1KxmKxhAgMBAAECggEABemVkyLt2fHkROw9qlJydNZhWdkgdhgscYyFjnRkLeWq\nOxm4k7wKB8LLSxlVvTIRZIdXJNMAqOcNDekulxsTA09B0QY2vO1zLMkeH23Rlumq\n1I90B3aTts9FrJU7en4LSykzNFsGe6aDKXtu/2bDW94DEju/qEC01PwUoDjaTJ7c\nY4kMUipyNjPDbkl5gYXhK3FGiKK59CNSMVYL62tjqjd9nIWVTpVt9+WTR+9gSHgM\nmCRm9FeC3WJXEQ4DnJ362jjzdtdO2xJh4yPnEKat1yPYwj6Ub4JnKsoMVBjTQ019\nINS6N6L7xwDHJxZ2T0FrwleMVAnNGAInD2lh1p6u4QKBgQDq8oGY5bcAEAacltil\ntJ/wz1S8bDTJAlwG3qNw3UDCQgnqI/DESgFUszTvDOc+b8Hg/qdctZZTGWbfAhQh\nrUEqwSIPQPQ61IjSbhrPgDe6F+SvbbVEF7UqvtKRGes+7U+OPHW64STms/7Dve7J\n1qH6BcwT3+VVsx3BRRLgLviZOQKBgQDUQHtoU5fxcgVciaetR16T5QGNeQsSsDEt\nSo+oWeLrGcvruvDSpUMU8bHXu2z/tyVQA9KtA4GTKqAfQJkhKx8gfg5p+cquq8zy\nUHRVZSYGVHVZO/bO7v88LI7MPxVOUgu2v0F2axHYlJJhleodRSVZgVe5Z4zsCbzs\nmeXwDdR0aQKBgQCWvJX3QdKCQMXtKz6+Ob+v4WVtKkNHf7MJWUglPl6xA2uXBA4R\n8aUe8YcRpAas4UjTkK5R5dMXZ6G/jHbcEGtSAe1XOgY3xGowECI1ZP7b7z5yawG0\nOT2ruhggri9nBRxYlmO2TYK+XVcjwLT2XDU50wRW7/wUWsHJYQa2PIyUyQKBgBSM\nnaYPGdHVcTFxXluHYl+9NzZENs87Ybd51Yi+Exsh5z1OXwx11ZXMhKRXUAk96Q3j\nIN2BTmU6JkCAV5L/gsb5jVmzRm080t3O7kRqQ5EvUiEujgmg1/MyeSzLGrv3c4zg\n3Wyilxq536Y1BnKJBEGzJRQdM2aS1sitabahECWpAoGBAIlgviDubeG/SBgC2FF8\n0xjdf5Q6O6AerORBjh2a04RCs+RiEM2F+MuAdV9pRXJn6RTZ/V2G8PpBcbKsHBHU\njxSr7YbRzOv0sbSMyxThKqh6/B23p04ApSVnpZhJeUGpwgm95f/gPW+fNhIQ0b19\n9rQwJ83Jnu1UfuC6Bn488VbY\n-----END PRIVATE KEY-----\n",
        client_id: clientId?.replace(/\\n/g, '\n')
      },
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })
  const today = dayjs().format('DD/MM/YYYY HH:mm')
  const client = await auth.getClient();
  const spreadsheetId = '1Rqo1KPTw4v9PS4f39PG4EyYnQjwyUYu4qwE4e_pBCU0'

  // Instance of Google Sheets API
  const googleSheets = google.sheets({version: "v4", auth: client})

  // Get metadata about spreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId
  // })
  // Read rows from spreadsheet
  // const getRows = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: "Sheet1"
  // })
  try {
    //Write row(s) to spreadsheet

    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [fullName, dob, phoneNumber, email, zalo, address, dream, personType, today]
        ]
      },

      // valueInputOption: "USER_ENTERED",
      //   resource: {
      //   values: [
      //     [fullName, dob, phoneNumber, email, zalo, address, dream, personType, today]
      //   ]
      // }
    })
    res.json({ message: 'data has been written to your spreadsheet', status: 'success' })
  } catch (error) {
    //@ts-ignore
    console.log('ERR', error?.response.body.errors)
    res.status(500).json({ error: 'Error writing data to spreadsheet' })
  }
}
