import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import DynamicChart from './components/DynamicChart.tsx'
import Calendar from './components/Calendar.tsx'

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
console.log(apiUrl)

interface Data {
  data: {
    json_data: string;
    xlsx_data: string;
  };
}

function App() {
  
  const [data, setData] = useState<Data | null>(null)
  const [fecha, setFecha] = useState<Date | null>(null)
  
  
  
  const actualizarFecha = (fechas: string) => {
    const fechaEscogida = new Date(fechas)
    setFecha(fechaEscogida)
  }

  const traerDatos = async () => {
    try {
      const fechaISOS = fecha.toISOString().slice(0, 10)
      const response = await axios.get(`${apiUrl}${fechaISOS}`)
      setData(response.data)
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
    <div>
      <h1>Registros de Salud Febrero[2024]</h1>
      <h3>Escoja el día de febrero a comparar con años anteriores</h3>
      <Calendar onDateChange={actualizarFecha} />
      {data && <DynamicChart data={data} />}
    </div>
  )
}

export default App
