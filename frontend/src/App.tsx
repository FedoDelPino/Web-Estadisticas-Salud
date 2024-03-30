import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import YearsChart from './components/YearsChart.tsx'
import DailyChart from './components/DailyChart.tsx'
import Calendar from './components/Calendar.tsx'
import imgCorazon from './assets/latido-del-corazon.png'

// Ruta de Api
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Tipo de Dato datos combinados
interface Data {
    json_data: string;
    xlsx_data: string;
}

const App: React.FC = () => {
  
  // Definicion Variables
  const [datos, setDatos] = useState<Data | null>(null)
  const [datosDiarios, setDatosDiarios] = useState<string | null>(null)
  const [fecha, setFecha] = useState<Date | null>(null)
  
  // Mostrar Tablas
  const [showCharts, setShowCharts] = useState<boolean>(false);

  // Actualizar Fecha seleccionada
  const actualizarFecha = (fechas: string) => {
    const fechaEscogida = new Date(fechas)
    setFecha(fechaEscogida)
  }

  // Traer datos de Api (Combinados y específicos del día)
  const traerDatos = async () => {
    try {
      if (fecha) {
        const fechaISOS = fecha.toISOString().slice(0, 10)
        const response = await axios.get(`${apiUrl}${fechaISOS}`)
        const responseDaily = await axios.get(`${apiUrl}general/${fechaISOS}`)
        setDatos(response.data)
        setDatosDiarios(responseDaily.data)
      }
    } catch(error) {
      // En caso de error al traer información
      console.log('Error fetching data', error)
    }
  }

  useEffect(() => {
    // Traer Datos solo si Fecha fue seleccionada
    if (fecha) {
      traerDatos()
    }
    // Mostrar gráficos solo si hay datos
    if (datos){
      setShowCharts(true)
    }

  }, [fecha, datos])


  return (
    <div className='app-container'>
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
          <div>
            <h3>Seleccione día a comparar con años anteriores</h3>
            <div className='separador-titulos'></div>
          </div>
          <Calendar onDateChange={actualizarFecha} />
        </div>
        {datos &&
          <div className={`transition-container ${showCharts ? 'show': ''}`}>
            <div className='card-chart-years'>
              <YearsChart data={datos} />
            </div>
          </div>
        }
        {datosDiarios &&
          <div className={`transition-container ${showCharts ? 'show': ''}`}>
            <div className='card-chart-daily'>
              <DailyChart data={datosDiarios} />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default App
