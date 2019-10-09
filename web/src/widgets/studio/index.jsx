import React from 'react'

import Resizer from '../../components/resizer'

import Header from './header'
import Footer from './footer'

import RequestsView from './requests-list'
import RequestDetail from './request-detail'

const resizerConfig = {
    minWidth: 320,
    maxWidth: '50vw',
    enable: ["right"],
}

const Studio = ({ settings, loading, children }) => {
    return <div className="flex flex-col w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="flex flex-1">
            <Resizer { ...resizerConfig } className="flex flex-col border-r">
                <RequestsView />
            </Resizer>
            <div className="flex-1 flex flex-col">
                <RequestDetail />
            </div>
        </div>
        <Footer />
    </div>
}

export default Studio