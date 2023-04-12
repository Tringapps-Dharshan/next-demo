// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { QuotesType } from '../quotes';

type Data = {
  data: [QuotesType]
}

export default async function Quotes(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await (await fetch('http://localhost:4000/quotes')).json();
  res.status(200).json({ data: data })
}
