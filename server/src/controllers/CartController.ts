import { Request, Response } from 'express'

export default {
    async show(req: Request, res: Response) {
        return res.json({ msg: 'Listando carrinho' })
    },

    async create(req: Request, res: Response) {
        return res.json({ msg: 'Criando novo carrinho' })
    }
}