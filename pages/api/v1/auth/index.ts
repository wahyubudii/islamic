import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../libs/db'
import { ResponseData } from '../../../../types/responseData'

export default async function index(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if (req.method !== "GET") return res.status(405).end()

    const data = await db('users')

    res.status(200).json({ message: "success", data })
}
