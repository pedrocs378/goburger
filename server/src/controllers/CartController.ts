import { Request, Response } from 'express'
import db from '../database/connection'

export default {
    async index(req: Request, res: Response) {
        const { id } = req.params

        const cart = await db('cart_user')
            .where('user_id', '=', id)
            .join('burgers', 'cart_user.burger_id', '=', 'burgers.id')
            .select(['burgers.*', 'cart_user.*'])

        const order = await db('order_user')
            .where('user_id', '=', id)
            .select('*')

        return res.json({
            cart,
            order
        })
    },

    async create(req: Request, res: Response) {
        const { id } = req.params
        const {
            burger_id,
            amount,
            price,
            discount,
            delivery_fee
        } = req.body

        if (amount < 1) {
            return res.status(400).send("Quantidade minima precisa ser 1")
        }
  
        const trx = await db.transaction()

        await trx('cart_user').insert({
            user_id: id,
            burger_id,
            amount
        })

        const order = await trx('order_user')
            .select('order_user.*')
            .where('user_id', '=', id)


        if (order.length > 0) {
            const subtotal = order[0].subtotal + (price * amount)
            const total = subtotal + order[0].delivery_fee - order[0].discount

            await trx('order_user')
                .where("order_user.user_id", "=", id)
                .update({
                    discount,
                    subtotal,
                    total
                })

            await trx.commit()

            return res.status(201).send()
        } else {
            const subtotal = price * amount
            const total = (price * amount) + delivery_fee - discount

            await trx('order_user')
                .insert({
                    user_id: id,
                    discount,
                    delivery_fee,
                    subtotal,
                    total
                })

            await trx.commit()

            return res.status(201).send()
        }

        
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const { cart_id } = req.body

        try {
            const trx = await db.transaction()

            await trx('cart_user')
                .where('cart_user.user_id', '=', id)
                .where('cart_user.id', '=', cart_id)
                .delete()

            const itensCart = await trx('cart_user')
                .where('cart_user.user_id', '=', id)
                .select('cart_user.*')

            if (itensCart.length === 0) {
                await trx('order_user')
                    .where('order_user.user_id', '=', id)
                    .delete()
            } else {
                let subtotal = 0

                const order = await trx('order_user')
                    .where('order_user.user_id', '=', id)
                    .select('*')

                for(let i = 0; i < itensCart.length; i++) {
                    const burgers = await trx('burgers')
                        .where('burgers.id', '=', itensCart[i].burger_id)
                        .select('*')

                    subtotal += Number(burgers[0].price.replace(',','.')) * itensCart[i].amount
                }

                const total = subtotal + order[0].delivery_fee - order[0].discount

                await trx('order_user')
                    .where('order_user.user_id', '=', id)
                    .update({
                        subtotal,
                        total
                    })
            }

            await trx.commit()

            return res.status(200).send()
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

}