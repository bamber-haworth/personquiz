import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware';


export default (req: NextApiRequest, res: NextApiResponse) => httpProxyMiddleware(req, res, {
     // You can use the `http-proxy` option
     target:'https://personquiz.vercel.app/',
     // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
     pathRewrite: {
     '^/api/ggsheet':'https://www.googleapis.com/auth/spreadsheets',
     },
});