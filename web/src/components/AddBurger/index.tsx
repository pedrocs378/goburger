import React, { FormEvent, useState } from 'react'
import { Modal, Switch } from '@material-ui/core'
import { BiTask } from 'react-icons/bi'

import './styles.css'

interface Props {
    isOpen: boolean
    modalType: string
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
}

function AddBurger(props: Props) {
    const [offer, setOffer] = useState(false)

    function handleAddBurger(event: FormEvent) {
        event.preventDefault()

    }

    return (
        <Modal className="modal" open={props.isOpen} onClose={props.onClose} >
            <form className="new-burger" onSubmit={handleAddBurger} >
                <fieldset>
                    <legend>{props.modalType} Burger</legend>
                    <label>URL da imagem</label>
                    <input type="text" placeholder="Cole o link aqui" />
                    <div className="input-row">
                        <div className="input-column">
                            <label>Nome do burger</label>
                            <input className="burger-name" name="burger" type="text" placeholder="Ex: Cheese Burger" />
                        </div>
                        <div className="input-column">
                            <label>Preço</label>
                            <input type="text" name="price" placeholder="R$" />
                        </div>                          
                    </div>
                    <label>Oferta especial?</label>
                    <Switch
                        color='primary'
                        value={offer}
                        onChange={() => setOffer(!offer)}
                    />
                    <label>Ingredientes do burger</label>
                    <input type="text" name="description" />
                </fieldset>
                <button 
                    type="submit" 
                    style={{ backgroundColor: props.modalType === "Novo" ? '#39B100' : '#FFBA00' }} 
                >
                    {props.modalType === "Novo" ? "Adicionar" : "Atualizar"} burger
                    <span>
                        <BiTask size={20} color="white" />
                    </span>
                </button>
            </form>
        </Modal>
    )
}

export default AddBurger