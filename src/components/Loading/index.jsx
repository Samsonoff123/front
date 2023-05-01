import { CircularProgress } from '@mui/material'
import React from 'react'

export const Loading = () => {
  return (
    <div className='no_data'>
        <CircularProgress sx={{mb: 1}} color='inherit' />
        <span>LOADING</span>
    </div>
  )
}
