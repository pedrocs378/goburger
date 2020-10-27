import { Request, Response } from 'express'

export default {
    async show(req: Request, res: Response) {
        return res.json({ msg: 'Listando usuario' })
    },

    async create(req: Request, res: Response) {
        return res.json({ msg: 'Criando novo usuario' })
    },

    async update(req: Request, res: Response) {
        return res.json({ msg: 'Atualizando usuario' })
    }
}