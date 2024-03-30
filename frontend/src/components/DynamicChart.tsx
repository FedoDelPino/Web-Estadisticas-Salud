import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

interface Data {
  Fecha: string;
  'Total consultas'?: number;
}

interface Props {
  data: {
    json_data: string;
    xlsx_data: string;
  };
}

const DynamicChart: React.FC<Props> = ({ data }) => {
  if (!data) {
    console.log('Data no esta disponible')
    return <div>Cargando...</div>
  }
  // Parsear los datos JSON
  const { json_data, xlsx_data } = data;
  const jsonData: Data[] = JSON.parse(json_data);
  const xlsxData: Data = JSON.parse(xlsx_data);

  // Organizar los datos para la gráfica
  const chartData: Data[] = [
    { Fecha: xlsxData.Fecha, 'Total consultas': xlsxData['Total consultas'] },
    ...jsonData
  ];

  return (
    <div className="container-chart"style={{ width: '100%', height: '400px' }}>
      <h2>Gráfico consultas realizadas</h2>
      <div className='victory-chart'>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={30}
          width={600}
        >
          <VictoryAxis
            tickValues={chartData.map(data => data.Fecha)}
            tickFormat={chartData.map(data => data.Fecha)}
            style={{ tickLabels: { angle: -25, textAnchor: 'end' } }}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={chartData}
            x="Fecha"
            y="Total consultas"
            barWidth={50}
            style={{ data: { fill: '#2ecc71' } }}
            labels={({ datum }) => datum['Total consultas']} // Muestra valores exactos al pasar el cursor
            labelComponent={<VictoryTooltip />} // Etiqueta flotante
          />
        </VictoryChart>
      </div>
    </div>
  );
};


export default DynamicChart;
