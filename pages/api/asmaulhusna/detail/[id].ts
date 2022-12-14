import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../libs/db'
import { ResponseData } from '../../../../types/responseData';

export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if(req.method !== "GET") return res.status(405).end()

    const { id } = req.query
    const data = await db('asmaulhusnas').where({ id }).first()
    if (!data) return res.status(404).json({ message: "data not found", data })

    res.status(200).json({ message: data ? "success" : "data not found", data: data})
}
