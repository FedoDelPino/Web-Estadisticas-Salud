import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import DynamicChart from './components/DynamicChart.tsx'
import Calendar from './components/Calendar.tsx'
import imgCorazon from './assets/latido-del-corazon.png'

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
console.log(apiUrl)

interface Data {
    json_data: string;
    xlsx_data: string;
}

function App() {
  
  const [datos, setDatos] = useState<Data | null>(null)
  const [fecha, setFecha] = useState<Date | null>(null)
  
  
  
  const actualizarFecha = (fechas: string) => {
    const fechaEscogida = new Date(fechas)
    setFecha(fechaEscogida)
  }

  const traerDatos = async () => {
    try {
      if (fecha) {
        const fechaISOS = fecha.toISOString().slice(0, 10)
        const response = await axios.get(`${apiUrl}${fechaISOS}`)
        setDatos(response.data)
      }
    } catch(error) {
      console.log('Error fetching data', error)
    }
  }

  useEffect(() => {
    if (fecha) {
      traerDatos()
    }

  }, [fecha])


  return (
    <div className="card">
      <div className='container-header'>
        <div className='content-header'>
          <div style={{display: 'flex'}}>
            <div className='content-image'>
              <img className='img-header' alt="Latido de corazon - encabezado" src={imgCorazon}/>
            </div>
            <div className='content-header-title'>
              <h1>Histórico Consultas </h1>
            </div>
          </div>
        </div>
        <h3>
          Febrero <strong>[2024] -&gt; [2018]</strong>
        </h3>
      </div>
      <div className='container-calendar'>
        <div className=''>
          <h3>Seleccione día a comparar con años anteriores</h3>
          <div className='separador-titulos'></div>
        </div>
        <Calendar onDateChange={actualizarFecha} />
      </div>
      {datos &&
        <div className='card-chart'>
          <DynamicChart data={datos} />
        </div>
      }
    </div>
  )
}

export default App
