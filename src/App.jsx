import { useEffect, useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('Ejecutando useEffect...')

    const handleMove = (event) => {
      const { clientX, clientY } = event
      // console.log({ clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no.cursor')
    }
  }, [enabled])

  const handleClick = () => {
    setEnabled(!enabled)
  }

  return (
    <main>
      {enabled && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #09f',
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        ></div>
      )}
      <button onClick={handleClick}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
