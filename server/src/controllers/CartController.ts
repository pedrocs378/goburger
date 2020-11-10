import { Request, Response } from 'express'
import db from '../database/connection'

export default {
    async index(req: Request, res: Response) {
        return res.json({ msg: 'Listando carrinho' })
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
            const updatedOrder = await trx('order_user')
                .where("order_user.user_id", "=", id)
                .update({
                    user_id: id,
                    discount: 0,
                    delivery_fee: 0,
                    subtotal: order[0].subtotal + (price * amount),
                    total: (order[0].subtotal + (price * amount) + order[0].delivery_fee) - order[0].dicount
                })

            await trx.commit()

            return res.json(updatedOrder)
        } else {
            const insertedOrder = await trx('order_user')
                .insert({
                    user_id: id,
                    discount,
                    delivery_fee,
                    subtotal: price * amount,
                    total: (price * amount) + delivery_fee - discount
                })

            await trx.commit()

            return res.json(insertedOrder)
        }

        
    },

    async delete(req: Request, res: Response) {
        return res.json({ msg: 'Criando novo carrinho' })
    },

}