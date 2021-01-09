import express, { json } from 'express';
import http from 'http';
import '@babel/polyfill';
import data from './db.json';

const app = express();
const server = http.createServer(app);
const port = 4000;
const prefix = '/api';

app.use(json());

app.get('/', (req, res) => {
    res.send('Página de inicio')
})

app.get(`${prefix}/tasks`, (req, res) => {
    if (data.length > 0) {
        res.status(200).json({
            'method': 'GET',
            'data': data
        })
    } else {
        res.status(404).json({
            'error': "Not found"
        })
    }
});

app.get(`${prefix}/task/:id`, (req, res) => {
    const { params } = req;
    const taskFound = data.filter(item => item.id === parseInt(params.id))
    if (taskFound.length > 0) {
        res.status(200).json({
            'method': 'GET',
            'data': taskFound[0]
        })
    } else {
        res.status(404).json({
            'error': "Not found"
        })
    }
});

app.post(`${prefix}/task`, (req, res) => {
    const { body } = req;
    const idCheck = data.some(item => item.id === body.id)
    if (idCheck) {
        res.status(500).json({
            'error': 'Id is already crated'
        })
    } else {
        data.push(body)
        res.status(201).json({
            'method': 'POST',
            'success': 'Task created successfully'
        })
    }
});

app.patch(`${prefix}/task/:id`, (req, res) => {
    const { body, params } = req
    const index = data.findIndex(item => item.id === parseInt(params.id))
    if (index < 0) {
        res.status(404).json({
            'error': 'Not found'
        })
    } else {
        data[index].description = body.description
        data[index].responsable = body.responsable
        res.status(201).json({
            'method': 'PATCH',
            'success': 'Task updated successfully'
        })
    }
});

app.delete(`${prefix}/task/:id`, (req, res) => {
    const { params } = req;
    const index = data.findIndex(item => item.id === parseInt(params.id))
    if (index < 0) {
        res.status(404).json({
            'error': 'Not found'
        })
    } else {
        data.splice(index, 1)
        res.status(200).json({
            'method': 'DELETE',
            'success': 'Task deleted successfully'
        })
    }
});

server.listen(port, () => {
    console.log(`Server on port ${port}`)
});