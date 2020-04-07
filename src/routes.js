import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from './Components/Auth/Auth'
import Create from './Components/Create/Create'
import Graveyard from './Components/Graveyard/Graveyard'
import Playground from './Components/Playground/Playground'

export default (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/create" component={Create} />
        <Route path="/playground/:blorp" component={Playground} />
        <Route path="/graveyard" component={Graveyard} />
    </Switch>
)
