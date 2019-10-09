import React, { useState } from 'react'

import {
    ButtonGroup, Button,
    Position, Tooltip,
} from '@blueprintjs/core'

const _listModes = [
    {
        type: 'list',
        icon: 'th-list',
        label: '列表'
    },
    {
        type: 'tree',
        icon: 'folder-open',
        label: '树型'
    }
]

const ListTitleBar = ({ mode = 'list', setMode = () => {} }) => {
    return <div className="absolute right-0 p-2">
        <ButtonGroup>
            { _listModes.map( i => <Tooltip content={ i.label } position={Position.BOTTOM}>
                <Button small icon={ i.icon } onClick={ () => setMode(i.type) } active={ mode === i.type } />
            </Tooltip> ) }
        </ButtonGroup>
    </div>
}

const RequestsList = () => {

    const [ mode, setMode ] = useState('list')

    return <>
        <ListTitleBar mode={ mode } setMode={ setMode } />
        <div></div>
    </>
}

export default RequestsList