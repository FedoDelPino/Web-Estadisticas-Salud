import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryContainer } from 'victory';

// Tipo Datos de llegada
interface Props {
    data: string;
}

const DailyChart: React.FC<Props> = ({ data }) => {
    // En caso de no traer datos
    if (!data) {
        console.log('Data no esta disponible')
        return <div>Cargando...</div>
    }

    // Parsear Datos para tabla
    const chartData = Object.entries(data).map(([key, value]) => ({
        x: key,
        y: value
    }))

    return (
        <div className="container-chart-daily" style={{ width: '100%', height: '400px' }}>
            <h2>Consultas totales del día</h2>
            <div className="victory-chart-daily">
                <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                domain={{ x: [0, chartData.length + 1]}}  // Expansión del dominio en X
                containerComponent={
                    <VictoryContainer
                    style={{ width: '800px', height: '350px' }}  // Tamaño dado etiquetas de X muy largas
                    />
                }
                >
                <VictoryAxis
                    tickValues={chartData.map(data => data.x)}
                    tickFormat={(tick) => `${tick.substring(0, 13)}...`}
                    style={{ tickLabels: { angle: -15, textAnchor: 'end' } }} // Ángulo etiquetas
                />
                <VictoryAxis dependentAxis />
                <VictoryBar
                    data={chartData}
                    x="x"
                    y="y"
                    barWidth={30}
                    style={{ data: { fill: '#ed1238' } }}
                    labels={({ datum }) => `X: ${datum.x}\n${datum.y}`} // Muestra valores exactos al pasar el cursor
                    labelComponent={<VictoryTooltip 
                        flyoutStyle={{ stroke: "2ecc71", strokeWidth: 2 }}// Etiqueta flotante
                    />} 
                />
                </VictoryChart>
            </div>
        </div>
    );
};


export default DailyChart;