import React, { useEffect, useState } from 'react'
import { GoDiffAdded } from 'react-icons/go'
import { AiOutlineEdit } from 'react-icons/ai'
import { ImFire } from 'react-icons/im'
import { FiTrash } from 'react-icons/fi'
import { Switch } from '@material-ui/core'

import AddBurger from '../../components/AddBurger'

import api from '../../services/api'

import './styles.css'

export interface Burger {
    id: number
    name: string
    offer: number
    available: number
    price: string
    url_image: string
    ingredients: string
}

function Menu() {
    const [openModal, setOpenModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    const [burgers, setBurgers] = useState<Burger[]>([])
    const [burger, setBurger] = useState<Burger>()

    useEffect(() => {
        api
            .get('burgers')
            .then(response => {
                setBurgers(response.data)
            })
    }, [])

    async function handleSetBurgerAvailable(checked: boolean, id: number) {
        const { data } = await api.get(`burgers/${id}`)

        await api.put(`burgers/${id}`, {
            name: data.name,
            url_image: data.url_image,
            price: data.price,
            offer: data.offer,
            ingredients: data.ingredients,
            available: checked
        })
    }

    async function handleExcludeBurger(id: number) {
        try {
            await api.delete(`burgers/${id}`)

            alert('Burger deletado!')
            window.location.reload(false)
        } catch(err) {
            alert(`Erro:\n${err}`)
        }
    }

    return (
        <div id="page-menu">
            <AddBurger 
                isUpdate={isUpdate} 
                isOpen={openModal}
                burger={isUpdate ? burger : undefined}
                onClose={() => setOpenModal(false)} 
            />
            <header className="header">
                <div className="title-container">
                    <h1>GoBurger</h1>
                    <h2>Uma mordida irá fazer seu sorriso.</h2>
                </div>
                <button 
                    className="add-burger" 
                    onClick={() => {
                        setIsUpdate(false)
                        setBurger(undefined)
                        setOpenModal(true)
                    }}
                >
                    <span className="button-text">
                        Novo Burger
                    </span>
                    <span className="button-icon">
                        <GoDiffAdded size={24} color="white" />
                    </span>
                </button>
            </header>
            <main className="content">
                {
                    burgers.map(burger => {
                        return (
                            <div key={burger.id} className='burger-item'>
                                <img className="burger-img" src={burger.url_image} alt={burger.name} />
                                <div className="burger-desc">
                                    <h1>
                                        {burger.name}
                                        {
                                            burger.offer === 1 && (
                                                <div className="offer">
                                                    <ImFire size={15} color="white" />
                                                </div>
                                            )
                                        }
                                    </h1>
                                    <p>{burger.ingredients}</p>
                                    <span>R$ <strong>{burger.price}</strong></span>
                                </div>
                                <div className="burger-btns-container">
                                    <div className="buttons">
                                        <button
                                            onClick={() => {
                                                setBurger(burger)
                                                setIsUpdate(true)
                                                setOpenModal(true)
                                            }}
                                        >
                                            <AiOutlineEdit size={20} color="#3D3D4D" />
                                        </button>
                                        <button
                                            onClick={() => handleExcludeBurger(burger.id)}
                                        >
                                            <FiTrash size={20} color="#3D3D4D" />
                                        </button>
                                    </div>
                                    <div className="switch">
                                        <span className="switch-text">Disponivel</span>
                                        <Switch
                                            color='primary'
                                            defaultChecked={burger.available === 1 ? true : false}
                                            onChange={(_, checked) => handleSetBurgerAvailable(checked, burger.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </main>
        </div>
    )
}

export default Menu