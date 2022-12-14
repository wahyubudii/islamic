import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization';
import { ResponseData } from '../../../../types/responseData';

export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if (req.method !== "PUT") return res.status(405).end()
    
    const auth = await authorization(req, res)

    const { id } = req.query
    const { asma, meaning } = req.body
    const data = await db('asmaulhusnas').where({ asma }).first()
    if (data) return res.status(400).json({ message: "already created, try again!" })

    const update = await db('asmaulhusnas').where({ id }).update({ asma, meaning })

    const updatedData = await db('asmaulhusnas').where('id', id).first()
    if (!updatedData) return res.status(404).json({ message: "data not found", data: updatedData })

    res.status(200).json({ message: "successfully updated", data: updatedData })
}
