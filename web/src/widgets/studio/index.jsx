import React from 'react'

import Header from './header'
import Footer from './footer'

const Studio = ({ settings, loading, children }) => {
    return <div className="w-full h-full bp3-dark bg-gray-7">
        <Header />
        <div className="flex flex-1"></div>
        <Footer />
    </div>
}

export default Studio