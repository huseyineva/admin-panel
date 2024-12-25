import React from 'react'
import './header.css'
import notification from '../../assets/img/icons/notification.svg'

function Header({props}) {
return (
    <header>
        <span>{props?.props}</span>
        <img src={notification} alt="Bildirimler" />
    </header>
)
}

export default Header