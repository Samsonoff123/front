import React from 'react'
import styles from './Button.module.css' 

export default function Button({white, children, ...props}) {
  return (
    <button className={ white ? styles.button__white : styles.button} {...props}>{children}</button>
  )
}
