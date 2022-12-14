import { NextApiRequest, NextApiResponse } from 'next';
import authorization from '../../../../middlewares/authorization';
import db from '../../../../libs/db'
import { ResponseData } from '../../../../types/responseData';

export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if (req.method !== "POST") return res.status(405).end();

    const auth = await authorization(req, res) 

    const { asma, meaning } = req.body
    const data = await db('asmaulhusnas').where({ asma }).first()
    if (data) return res.status(400).json({ message: "already created, try again!" })

    const create = await db('asmaulhusnas').insert({
        asma,
        meaning
    })

    const createdData = await db('asmaulhusnas').where('id', create).first()

    res.status(200).json({
        message: "Post created successfully",
        data: createdData
    })
}
