import React from 'react'
import Studio from './widgets/studio'

import { FocusStyleManager  } from '@blueprintjs/core'

FocusStyleManager.onlyShowFocusOnTabs()

const App = () => {
  return <div className="w-screen h-screen flex flex-col">
    <Studio />
  </div>
}

export default App
