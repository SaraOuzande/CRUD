const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:nombre', (req, res) => {
    let usuario = usuarios.find(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.post('/usuarios', (req, res) => {
    let nuevoUsuario = req.body;
    nuevoUsuario.id = usuarios.length + 1;
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:nombre', (req, res) => {
    let usuario = usuarios.find(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuario) {
        Object.assign(usuario, req.body);
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.delete('/usuarios/:nombre', (req, res) => {
    let index = usuarios.findIndex(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (index !== -1) {
        usuarios.splice(index, 1);
        res.json({ mensaje: 'Usuario eliminado' });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
