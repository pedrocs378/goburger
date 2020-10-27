import React, { useState } from 'react'
import { GoDiffAdded } from 'react-icons/go'
import { AiOutlineEdit } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'
import { Switch } from '@material-ui/core'

import AddBurger from '../../components/AddBurger'

import bbq from '../../assets/burgers/bbq.jpg'

import './styles.css'

function Menu() {
    const [available, setAvailable] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    return (
        <div id="page-menu">
            <AddBurger isOpen={openModal} onClose={() => setOpenModal(false)} />
            <header className="header">
                <div className="title-container">
                    <h1>GoBurger</h1>
                    <h2>Uma mordida irá fazer seu sorriso.</h2>
                </div>
                <button className="add-burger" onClick={() => setOpenModal(true)}>
                    <span className="button-text">
                        Novo Burger
                    </span>
                    <span className="button-icon">
                        <GoDiffAdded size={24} color="white" />
                    </span>
                </button>
            </header>
            <main className="content">
                <div className='burger-item'>
                    <img className="burger-img" src={bbq} alt="BBQ" />
                    <div className="burger-desc">
                        <h1>BBQ Burger</h1>
                        <p>Hamburger, Alface, Tomate, Queijo</p>
                        <span>R$ <strong>16,90</strong></span>
                    </div> 
                    <div className="burger-btns-container">
                        <div className="buttons">
                            <button>
                                <AiOutlineEdit size={20} color="#3D3D4D" />
                            </button>
                            <button>
                                <FiTrash size={20} color="#3D3D4D" />
                            </button>
                        </div>
                        <div className="switch">
                            <span className="switch-text">Disponivel</span>
                            <Switch
                                color='primary' 
                                value={available}
                                onChange={(event) => setAvailable(event.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className='burger-item'>
                    <img className="burger-img" src={bbq} alt="BBQ" />
                    <div className="burger-desc">
                        <h1>BBQ Burger</h1>
                        <p>Hamburger, Alface, Tomate, Queijo</p>
                        <span>R$ <strong>16,90</strong></span>
                    </div> 
                    <div className="burger-btns-container">
                        <div className="buttons">
                            <button>
                                <AiOutlineEdit size={20} color="#3D3D4D" />
                            </button>
                            <button>
                                <FiTrash size={20} color="#3D3D4D" />
                            </button>
                        </div>
                        <div className="switch">
                            <span className="switch-text">Disponivel</span>
                            <Switch
                                color='primary' 
                                value={available}
                                onChange={(event) => setAvailable(event.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className='burger-item'>
                    <img className="burger-img" src={bbq} alt="BBQ" />
                    <div className="burger-desc">
                        <h1>BBQ Burger</h1>
                        <p>Hamburger, Alface, Tomate, Queijo</p>
                        <span>R$ <strong>16,90</strong></span>
                    </div> 
                    <div className="burger-btns-container">
                        <div className="buttons">
                            <button>
                                <AiOutlineEdit size={20} color="#3D3D4D" />
                            </button>
                            <button>
                                <FiTrash size={20} color="#3D3D4D" />
                            </button>
                        </div>
                        <div className="switch">
                            <span className="switch-text">Disponivel</span>
                            <Switch
                                color='primary' 
                                value={available}
                                onChange={(event) => setAvailable(event.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className='burger-item'>
                    <img className="burger-img" src={bbq} alt="BBQ" />
                    <div className="burger-desc">
                        <h1>BBQ Burger</h1>
                        <p>Hamburger, Alface, Tomate, Queijo</p>
                        <span>R$ <strong>16,90</strong></span>
                    </div> 
                    <div className="burger-btns-container">
                        <div className="buttons">
                            <button>
                                <AiOutlineEdit size={20} color="#3D3D4D" />
                            </button>
                            <button>
                                <FiTrash size={20} color="#3D3D4D" />
                            </button>
                        </div>
                        <div className="switch">
                            <span className="switch-text">Disponivel</span>
                            <Switch
                                color='primary' 
                                value={available}
                                onChange={(event) => setAvailable(event.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className='burger-item'>
                    <img className="burger-img" src={bbq} alt="BBQ" />
                    <div className="burger-desc">
                        <h1>BBQ Burger</h1>
                        <p>Hamburger, Alface, Tomate, Queijo</p>
                        <span>R$ <strong>16,90</strong></span>
                    </div> 
                    <div className="burger-btns-container">
                        <div className="buttons">
                            <button>
                                <AiOutlineEdit size={20} color="#3D3D4D" />
                            </button>
                            <button>
                                <FiTrash size={20} color="#3D3D4D" />
                            </button>
                        </div>
                        <div className="switch">
                            <span className="switch-text">Disponivel</span>
                            <Switch
                                color='primary' 
                                value={available}
                                onChange={(event) => setAvailable(event.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Menu