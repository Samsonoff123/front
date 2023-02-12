import React, { useEffect } from 'react'
import Header from '../../Header'
import { ReactComponent as Logout } from '../../../assets/logout.svg'

export default function Profile() {
  const handleLogout = () => {
    localStorage.removeItem('token')
    document.location.reload()
  }
  return (
    <div>
        <Header />
        <div className="profile">
            profile
            <Logout onClick={handleLogout} style={{cursor: 'pointer', width: 50, height: 50, fill: 'black'}} />
        </div>
    </div>
  )
}
