import { Request, Response } from 'express'

import db from '../database/connection'

export default {
    async index(req: Request, res: Response) {
        const burgers = await db('burgers').select('burgers.*')

        return res.json(burgers)
    },
    
    async show(req: Request, res: Response) {
        const { id } = req.params

        const burger = await db('burgers')
            .select('burgers.*')
            .where('burgers.id', '=', id)

        return res.json(burger)
    },

    async create(req: Request, res: Response) {
        const {
            name,
            url_image,
            price,
            offer,
            ingredients,
            available
        } = req.body

        try {      
            await db('burgers').insert({
                name,
                url_image,
                price,
                offer,
                ingredients,
                available
            })

            return res.status(201).send()

        } catch (err) {

            return res.status(400).json({
                error: 'Unexpected error while creating new burger'
            })
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const {
            name,
            url_image,
            price,
            offer,
            ingredients,
            available
        } = req.body

        try {
            await db('burgers')
                .where('burgers.id', '=', id)
                .update({
                    name,
                    url_image,
                    price,
                    offer,
                    ingredients,
                    available
                })

            return res.status(200).send()
        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while updating a burger'
            })
        }
        
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            await db('burgers')
                .where('burgers.id', '=', id)
                .delete()

            return res.status(200).send('Deleted')
        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while deleting a burger'
            })
        }

    }
}