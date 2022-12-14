import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../libs/db'
import bycript from 'bcryptjs'
import { ResponseData } from "../../../types/responseData";

export default async function handler(req:NextApiRequest, res:NextApiResponse<ResponseData>) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, password } = req.body
    const data = await db('users').where({ email }).first()
    if (data) return res.status(400).json({ message: "accounts has been used!" })

    const salt = bycript.genSaltSync(10)
    const passwordHash = bycript.hashSync(password, salt)

    const register = await db('users').insert({
        email,
        password: passwordHash
    })

    const registerdUser = await db('users').where({ id: register }).first()

    res.status(200).json({ message: "succesfully created user", data: registerdUser })
}
