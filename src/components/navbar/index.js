import React from 'react'
import './navbar.css'

class NavBar extends React.Component {
    render(){
        return(
            <div className="topnav">
                <a className="active" href="#home">Pokedex App</a>
            </div>
        )
    }
}

export default NavBar