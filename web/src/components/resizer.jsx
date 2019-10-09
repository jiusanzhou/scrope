import React from 'react'

import { Resizable } from "re-resizable"

const _enableValues = { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }

const Resizer = ({ children, ...props }) => {
    let enable = null
    if ( props.enable ) {
        enable = { ..._enableValues }
        props.enable.map(i => {
            enable[i] = true
        })
    }
    return <Resizable { ...props } enable={ enable }>{ children }</Resizable>
}

export default Resizer