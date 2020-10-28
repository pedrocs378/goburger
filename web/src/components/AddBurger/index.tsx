import React, { FormEvent, useState } from 'react'
import { Modal, Switch } from '@material-ui/core'
import { BiTask } from 'react-icons/bi'

import { Burger } from '../../pages/Menu'
import api from '../../services/api'

import './styles.css'

interface Props {
    isOpen: boolean
    modalType?: string
    isUpdate: boolean
    burger?: Burger
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
}

function AddBurger(props: Props) {
    const [url_image, setUrlImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [offer, setOffer] = useState(false)
    const [ingredients, setIngredients] = useState("")
    
    function handleAddOrUpdateBurger(event: FormEvent) {
        event.preventDefault()

        if (props.isUpdate) {
            api.put(`burgers/${props.burger?.id}`, {
                url_image: url_image ? url_image : props.burger?.url_image,
                name: name ? name : props.burger?.name,
                price: price ? price : props.burger?.price,
                offer: offer,
                ingredients: ingredients ? ingredients : props.burger?.ingredients,
                available: props.burger?.available
            }).then(() => {
                alert('Burger atualizado!')

                window.location.reload(false)

            }).catch((err) => {
                alert(`Erro:\n${err}`)
            })
        } else {
            api.post('burgers', {
                url_image,
                name,
                price,
                offer,
                ingredients,
                available: true
            }).then(() => {
                alert('Novo burger inserido!')
    
                window.location.reload(false)
    
            }).catch((err) => {
                alert(`Erro:\n${err}`)
            })
        }


    }

    function returnText(type: boolean) {
        
        return type ? 'Atualizar' : 'Novo'
    }

    return (
        <Modal className="modal" open={props.isOpen} onClose={props.onClose} >
            <form className="new-burger" onSubmit={handleAddOrUpdateBurger} >
                <fieldset>
                    <legend>{returnText(props.isUpdate)} Burger</legend>
                    <label>URL da imagem</label>
                    <input 
                        type="text" 
                        placeholder="Cole o link aqui" 
                        defaultValue={props.burger ? props.burger.url_image : url_image}
                        onChange={(event) => setUrlImage(event.target.value)}
                    />
                    <div className="input-row">
                        <div className="input-column">
                            <label>Nome do burger</label>
                            <input 
                                className="burger-name" 
                                name="burger" 
                                type="text" 
                                placeholder="Ex: Cheese Burger" 
                                defaultValue={props.burger ? props.burger.name : name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="input-column">
                            <label>Preço</label>
                            <input 
                                type="text" 
                                name="price" 
                                placeholder="R$" 
                                defaultValue={props.burger ? props.burger.price : price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>                          
                    </div>
                    <label>Oferta especial?</label>
                    <Switch
                        color='primary'
                        defaultChecked={props.burger ? props.burger.offer === 1 ? true : false : offer}
                        onChange={(_, checked) => setOffer(checked)}
                    />
                    <label>Ingredientes do burger</label>
                    <input 
                        type="text" 
                        name="description" 
                        defaultValue={props.burger ? props.burger.ingredients : ingredients}
                        onChange={(event) => setIngredients(event.target.value)}
                    />
                </fieldset>
                <button 
                    type="submit" 
                    style={{ backgroundColor: props.isUpdate ? '#FFBA00' : '#39B100' }} 
                >
                    {props.isUpdate ? "Atualizar" : "Adicionar"} burger
                    <span>
                        <BiTask size={20} color="white" />
                    </span>
                </button>
            </form>
        </Modal>
    )
}

export default AddBurger