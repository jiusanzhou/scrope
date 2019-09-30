import React from 'react'

import { ProgressBar, Overlay, Card } from "@blueprintjs/core"

const LoadingBar = ({  }) => {
    return <Overlay isOpen={ false }>
        <ProgressBar />
    </Overlay>
}

export default LoadingBar