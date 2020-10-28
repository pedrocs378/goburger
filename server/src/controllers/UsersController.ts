import { Request, Response } from 'express'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jwt-simple'

import db from '../database/connection'

const { authSecret } = require('../../.env')

export default {

    async signup(req: Request, res: Response) {

        const getHash = (password: string, callback: Function) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
            })
        }

        const {
            name,
            email,
            password,
            phone,
            uf,
            city,
            street,
            number,
            neighborhood
        } = req.body

        getHash(password, (hash: string) => {
            const newPassword = hash

            const user = {
                name,
                email,
                password: newPassword,
                phone,
                uf,
                city,
                street,
                number,
                neighborhood 
            }

            db('users')
                .insert(user)
                .then(_ => res.status(201).send())
                .catch(err => res.status(500).send(err))
        })

    },

    async signin(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send("Email or password is missing.")
        }

        const user = await db('users')
            .where('email', '=', email)
            .first()

        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(400).send("Invalid password!")
                }

                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    uf: user.uf,
                    city: user.city,
                    street: user.street,
                    number: user.number,
                    neighborhood: user.neighborhood
                }

                return res.json({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    uf: user.uf,
                    city: user.city,
                    street: user.street,
                    number: user.number,
                    neighborhood: user.neighborhood,
                    token: jwt.encode(payload, authSecret)
                })
            })
        } else {
            return res.status(400).send("User not found!")
        }

    },

    async update(req: Request, res: Response) {
        return res.json({ msg: 'Atualizando usuario' })
    }
}