from unittest import result
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import pandas as pd
import json
import os
from dotenv import load_dotenv

app = Flask(__name__)

# Cargar variables de entorno
dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

api_route = os.environ.get('API_ROUTE')
api_files = os.environ.get('API_FILES')
front_url = os.environ.get('FRONT_URL')
# Agregar la aplicacion a politicas de Cors
CORS(app, resources={r"/api/*": {"origins": front_url}})

@app.route(api_route+'<string:fecha_seleccionada>', methods=['GET'])
def get_data(fecha_seleccionada):
    try:
        fecha_Escogida = datetime.fromisoformat(fecha_seleccionada).date()
    except ValueError:
        return jsonify({"error": "Formato de fecha incorrecto. Debe ser ISO8601"}), 400
    
    #  Leer archivo XLSX
    data_bruta_xlsx = pd.read_excel(api_files+'consultas_febrero_2024.xlsx')
    datos_xlsx = filtrar_xlsx(data_bruta_xlsx, fecha_Escogida.day, fecha_seleccionada)

    # Leer el archivo JSON
    with open(api_files+'consultas_historicas_febrero.json', 'r') as file:
        data_bruta_json = json.load(file)
        datos_json = filtrar_json(data_bruta_json, fecha_Escogida.day)

    # Combinar los datos XLSX y JSON en un solo diccionario
    data_combinada = {
        'xlsx_data': datos_xlsx,
        'json_data': datos_json
    }

    # Enviar datos combinados como JSON
    return jsonify(data_combinada)

@app.route(api_route+'general/<string:fecha_seleccionada>', methods=['GET'])
def get_data_general(fecha_seleccionada):
    try:
        fecha_Escogida = datetime.fromisoformat(fecha_seleccionada).date()
    except ValueError:
        return jsonify({"error": "Formato de fecha incorrecto. Debe ser ISO8601"}), 400
    
    #  Leer archivo XLSX
    data_bruta_xlsx = pd.read_excel(api_files+'consultas_febrero_2024.xlsx')
    data_filas_xlsx = pd.read_excel(api_files+'consultas_febrero_2024.xlsx', usecols=[0], header=None)
 
    datos_xlsx = filtrar_dia(data_bruta_xlsx, data_filas_xlsx, fecha_Escogida.day)
    return jsonify(datos_xlsx)


def filtrar_dia(xlsx_data, xlsx_filas, fecha_dia):
    total_filtrado = xlsx_data.iloc[:, fecha_dia].tolist()
    filas = xlsx_filas.iloc[:, 0].tolist()
    filas_filtradas = filas[1:-1]
    datos_completos = {}

    for nombre_fila, valor in zip(filas_filtradas, total_filtrado):
        datos_completos[nombre_fila] = valor
        
    return datos_completos


def filtrar_xlsx(xlsx_data, fecha_dia, fecha_seleccionada):
    total_filtrado = xlsx_data.iloc[:, fecha_dia].tolist()[5]
    resultado = {"Fecha": fecha_seleccionada, "Total consultas": total_filtrado}
    resultado_json = json.dumps(resultado)

    return resultado_json


def filtrar_json(json_data, fecha):
    # Aplicar el filtro y convertir el resultado en JSON
    resultado = json.dumps(list(filter(lambda x: filtro_fecha(x, fecha), json_data)))
    return resultado


# Función para filtrar las fechas asociadas al día escogido de febrero
def filtro_fecha(fila, fecha_dia):
    # Dividir la fecha en año, mes y día
    año, mes, dia = map(int, fila['Fecha'].split('-'))
    # Devolver True si es el día de febrero, de lo contrario False
    return mes == 2 and dia == fecha_dia

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
