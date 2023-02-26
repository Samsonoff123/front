import React, { useEffect, useState } from 'react'
import { ReactComponent as Menu } from '../../assets/menu.svg'
import { ReactComponent as Cart } from '../../assets/cart.svg'
import { ReactComponent as Like } from '../../assets/like.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Logout } from '../../assets/logout.svg'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({pageName, back = true, isAdmin}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        document.location.reload()
    }

  return (
    <>
    {
        pageName &&

        <div className="header_top" >
            { back && <Back onClick={()=>navigate(-1)} /> }
            <span>
                {pageName}
            </span>
            <div></div>
        </div>
    }

    <div className='header'>
        <Link to={"/"} className="header__element">
            <Menu />
        </Link>
        <Link to="/cart" className="header__element">
            <Cart />
        </Link>
        <Link to="/like" className="header__element">
            <Like />
        </Link>
        {
            !!isAdmin ?
            <Link to="/profile" className="header__element">
                <Profile />
            </Link>
            : <div className="header__element">
                <Logout onClick={handleLogout} />
            </div>
        }
    </div>
    </>
  )
}
