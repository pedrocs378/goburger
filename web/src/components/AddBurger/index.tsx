import React from 'react'
import { Modal } from '@material-ui/core'

import './styles.css'

interface Props {
    isOpen: boolean
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
}

function AddBurger(props: Props) {
    return (
        <Modal className="modal" open={props.isOpen} onClose={props.onClose} >
            <form className="new-burger">
                <h1>Novo Burger</h1>
                <label>URL da imagem</label>
                <input type="text" placeholder="Cole o link aqui" />
                <label>Nome do burger</label>
                <input type="text" placeholder="Ex: Cheese Burger" />
                <label>Preço</label>
                <input type="text" placeholder="R$" />
                <label>Ingredientes do burger</label>
                <input type="text" />

                <button>
                    <span>Adicionar burger</span>
                </button>
            </form>
        </Modal>
    )
}

export default AddBurger