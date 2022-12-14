import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'
import { ResponseData } from '../../../../types/responseData'

export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if (req.method !== "DELETE") return res.status(405).end()

    const auth = await authorization(req, res)

    const { id } = req.query
    const data = await db('asmaulhusnas').where({ id }).del()
    if (!data) res.status(404).json({ message: "data not found" })

    res.status(200).json({ message: "delete successfully" })
}
