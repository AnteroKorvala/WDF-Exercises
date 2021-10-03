import React from 'react'
import Logo from './logo'
import Button from './button'
import './../buttons.css'

export default function TopBar() {
    return (
        <div className="topBar">
                <Logo/>
                <Button className="normalButton" title="Uutiset" />
                <Button className="normalButton" title="Lehdet"/>
                <div className="divider"/>
                <Button className="borderedButton" title="Tilaa"/>
                <Button className="signInButton" title="Kirjaudu"/>
                <Button className="searchButton" title="Hae"/>
                <Button className="menuButton" title="Valikko"/>
        </div>
    )
}


