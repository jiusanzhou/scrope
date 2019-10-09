import React from 'react'

const Avatar = ({ ...props }) => {
    return <span style={{
        width: 32,
        height: 32,
        lineHeight: 32,
        borderRadius: '50%',
        display: 'inline-flex'
    }} { ...props }>
        <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </span>
}

export default Avatar