import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../page/Cart'
import Like from '../page/Like'
import Main from '../page/Main'
import Profile from '../page/Profile'

export default function PageRouter({isAdmin}) {

  return (
    <Routes>
        <Route path="/" element={<Main isAdmin={isAdmin} />} />
        <Route path="/cart" element={<Cart isAdmin={isAdmin} />} />
        <Route path="/like" element={<Like isAdmin={isAdmin} />} />
        <Route path="/profile" element={<Profile isAdmin={isAdmin} />} />
        <Route path="*" element={<Main isAdmin={isAdmin} />} />
    </Routes>
  )
}
