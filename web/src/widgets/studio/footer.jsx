import React, { useState } from 'react'

import {
    Button, Divider,
    Dialog, Tabs, Tab, Classes,
    Icon, Intent,
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
                    <Tab id="mb" title="其他" panel={ null } panelClassName="ember-panel" />
                    <Tab id="bb" disabled={true} panel={ null } />
                </Tabs>
            </div>
        </Dialog>
    </div>
}

const _status = {
    success: Intent.SUCCESS,
    error: Intent.DANGER,
    warn: Intent.WARNING,
}

const Status = ({ status = 'success' }) => {
    let intent = _status[status] || Intent.NONE
    return <>
        <Icon icon="dot" intent={ intent } />
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