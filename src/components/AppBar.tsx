import React, { useState } from 'react'
import { VscChromeMaximize, VscChromeMinimize, VscClose, VscChromeRestore } from 'react-icons/vsc'

function AppBar({ title }: { title: string }) {
  const [isMaximize, setMaximize] = useState(false)

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false)
    } else {
      setMaximize(true)
    }
    window.Main.Maximize()
  }

  return (
    <div className="flex justify-between draggable pl-2 pt-1">
      <div className="inline-flex gap-2">
        <p className="text-xs">{title}</p>
      </div>
      <div className="inline-flex -mt-1 gap-2 mr-2">
        <button onClick={window.Main.Minimize} className="undraggable hover:bg-gray-300">
          <VscChromeMinimize className="text-lg" />
        </button>
        <button onClick={handleToggle} className="undraggable hover:bg-gray-300">
          {isMaximize ? <VscChromeRestore className="text-lg" /> : <VscChromeMaximize className="text-lg" />}
        </button>
        <button onClick={window.Main.Close} className="undraggable hover:bg-red-500 hover:text-white">
          <VscClose className="text-lg" />
        </button>
      </div>
    </div>
  )
}

export default AppBar
