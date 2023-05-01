import React from 'react'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header({pageName, back = true, isAdmin}) {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const handleLogout = () => {
        localStorage.removeItem('token')
        document.location.reload()
    }

  return (
    <>
    {
        pageName &&

        <div className="header_top" >
            { back && <UndoOutlinedIcon onClick={()=>navigate(-1)} /> }
            <span>
                {pageName}
            </span>
            <div></div>
        </div>
    }

    <div className='header'>
        <Link to={"/"} className={(pathname === "/") ? "header__element active" : "header__element"}>
            <WidgetsOutlinedIcon />
        </Link>
        {
            !isAdmin && (
                <Link to="/cart" className={(pathname === "/cart") ? "header__element active" : "header__element"}>
                    <ShoppingCartOutlinedIcon />
                </Link>
            )
        }
        {
            !isAdmin && (
                <Link to="/like" className={(pathname === "/like") ? "header__element active" : "header__element"}>
                    <FavoriteBorderOutlinedIcon />
                </Link>
            )
        }

        {
            !!isAdmin ?
            <Link to="/profile" className={(pathname === "/profile") ? "header__element active" : "header__element"}>
                <AccountBoxOutlinedIcon />
            </Link>
            : <div className="header__element">
                <LogoutOutlinedIcon onClick={handleLogout} />
            </div>
        }
    </div>
    </>
  )
}
