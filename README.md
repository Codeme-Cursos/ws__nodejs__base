# Inicialización y creación de package.json.
```bash
npm init -y
``` 

# Dependencias Principales
1. Instalación de Express, framework de NodeJS.
```bash
npm i express
``` 
2. Instalación de Babel, permite usar código moderno de JS en nodeJS. 
```bash
npm i @babel/polyfill @babel/runtime
``` 
3. Todas las dependencias principales.
```bash
npm i express @babel/polyfill @babel/runtime
``` 

# Dependencias de Desarrollo
1. Instalación de Babel, permite usar código moderno de JS en nodeJS
[https://babeljs.io/docs/en/usage]
```bash
npm i @babel/core @babel/cli @babel/preset-env @babel/node @babel/plugin-transform-runtime -D 
```
2. Instalación de Nodemon, para que el servidor se reinicie automáticamente cada vez que modifiquemos el código
```bash
npm i nodemon -D
```
3. Todos las dependencias de desarrollo
```bash
npm i @babel/core @babel/cli @babel/preset-env @babel/node  @babel/plugin-transform-runtime nodemon -D
```