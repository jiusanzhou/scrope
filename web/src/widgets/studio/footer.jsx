import React, { useState } from 'react'

import {
    Button, Divider,
    Dialog, Tabs, Tab, Classes,
    Icon, Intent, Tooltip, Spinner,
} from '@blueprintjs/core'

const Settings = () => {
    let [opened, setOpened] = useState(false)
    return <div>
        <Button small minimal icon='cog' onClick={ () => { setOpened(true) } } />
        <Dialog
        isOpen={ opened }
        onClose={ () => { setOpened(false) } }
        icon="cog" title="设置">
            <div className={Classes.DIALOG_BODY}>
                <Tabs
                renderActiveTabPanelOnly={ true }
                vertical="vertical">
                    <Tab id="rx" title="通用" panel={ null } />
                    <Tab id="ng" title="高级" panel={ null } />
                    <Tab id="mb" title="其他" panel={ null } />
                    <Tab id="xb" title="关于" panel={ null } />
                </Tabs>
            </div>
        </Dialog>
    </div>
}

const _status = {
    recording: <Spinner size={ 0 } intent={ Intent.SUCCESS } />,
    success: Intent.SUCCESS,
    error: Intent.DANGER,
    warn: Intent.WARNING,
}

const Status = ({ status = 'recording', msg = '正在录制' }) => {
    let intent = _status[status] || Intent.NONE
    return <>
        <Tooltip content={ msg }>
            { typeof intent === 'string' ? <Icon icon="dot" intent={ intent } /> : intent }
        </Tooltip>
    </>
}

const Footer = () => {
    return <div className="border-t flex w-full items-center h-10 px-5 text-sm">
        <Settings />
        <Divider />
        <Status />
    </div>
}

export default Footer