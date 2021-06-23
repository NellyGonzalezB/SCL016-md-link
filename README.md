# Markdown Links 
![Logo](https://i.ibb.co/n3jFFLW/Group-99.png)
## Índice

* [1. Preámbulo](#1-Preámbulo)
* [2. Diagrama de flujo](#2-Diagrama-de-flujo)
* [3. Instalación](#3-Instalación)
* [4. Modo de uso](#4-Modo-de-uso)
***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Diagrama de flujo
![diagrama](https://i.ibb.co/4pSfKxP/MD-Links-Diagram.png)

## 3. Instalación
Para iniciar Markdown Links debes instalar:
1. instalar [Node.js](https://nodejs.org/) usando el comando
```
npm install
````
2. instalar la librería con el siguiente comando en la terminal
```
npm install -g https://nellygonzalezb.github.io/SCL016-md-link/
````
3. También debes instalar las siguientes librerías anexas:
```
$ npm install node-fetch
````
```
$ npm install --save-dev jest
````

## 4. Modo de uso
Para hacer uso de la librería ejecuta el siguiente comando en la terminal:
```
$ node tuarchivo.js
````
En caso de ser un archivo .md
```
$ node tuarchivo.js ejemplo.md
````
En caso de ser una carpeta
```
$ node tuarchivo.js ./carpeta
````

| Opciones           | Comando                |
| ----------------- | ----------------------- |
| Estatus           | --stats                 |
| Validar           | --validate              |
| Estatus y validar | --validate--stats       |

Ejemplo:
![--validate](https://i.ibb.co/b7BVQpG/Captura-de-Pantalla-2021-06-22-a-la-s-20-59-39.png)