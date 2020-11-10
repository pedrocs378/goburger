import { Request, Response } from 'express'

import db from '../database/connection'

export default {
    async create(req: Request, res: Response) {
        const { id } = req.params
        const { burger_id } = req.body

        try {
            await db('favorites').insert({
                user_id: id,
                burger_id
            })

            return res.status(201).send()
        } catch(err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },

    async index(req: Request, res: Response) {
        const { id } = req.params

        try {
            const burgers = await db('favorites')
                .where('favorites.user_id', '=', id)
                .join('burgers', 'favorites.burger_id', '=', 'burgers.id')
                .select('burgers.*')

            return res.json(burgers)
        } catch (err) {

            return res.status(500).send(err)
        }
        
    },

    async show(req: Request, res: Response) {
        const { userId, burgerId } = req.params

        try {
            const favorite = await db('favorites')
                .where('favorites.user_id', '=', userId)
                .where('favorites.burger_id', '=', burgerId)

            if (favorite.length > 0) {
                return res.json({ favorite: true })
            } else {
                return res.json({ favorite: false })
            }

        } catch (err) {

            return res.status(500).send(err)
        }
        
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const { burger_id } = req.body

        try {
            await db('favorites')
                .where('favorites.user_id', '=', id)
                .where('favorites.burger_id', '=', burger_id)
                .delete()

            return res.status(200).send()
        } catch (err) {

            return res.status(500).send(err)
        }
    }
}