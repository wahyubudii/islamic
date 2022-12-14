import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../libs/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ResponseData } from '../../../../types/responseData'

export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, password } = req.body

    const data = await db('users').where({ email }).first()
    if (!data) return res.status(404).end()

    const checkPassword = await bcrypt.compareSync(password, data.password)
    if (!checkPassword) return res.status(401).end()

    const token = jwt.sign({
        id: data.id,
        email: data.email,
    }, `${process.env.JWT_PRIVATE_KEY}`, {
        expiresIn: '7d'
    })

    res.status(200).json({ message: "login successfully", token })
}
