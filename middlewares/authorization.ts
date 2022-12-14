import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import db from '../libs/db'

export default async function authorization(req:NextApiRequest, res:NextApiResponse) {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).end()

        const authSplit = authorization.split(' ')
        const [ authType, authToken ] = authSplit
        if (authType !== "Bearer") return res.status(401).end()

        return jwt.verify(authToken, `${process.env.JWT_PRIVATE_KEY}`, async (err:any, decode:any) => {
            if (err) return res.status(401).end()

            const data = await db('users').where({ email: decode.email }).first()
            if (!data) return res.status(401).end()

            return resolve(decode)
        })
    })
}
