import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Menu from './pages/Menu'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Menu} />
        </BrowserRouter>
    )
}

export default Routes