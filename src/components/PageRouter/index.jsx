import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../page/Cart'
import Like from '../page/Like'
import Main from '../page/Main'
import Profile from '../page/Profile'

export default function PageRouter() {

  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/like" element={<Like />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}
