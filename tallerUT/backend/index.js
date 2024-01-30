const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'))


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('<h1>Base de Datos Funcionando</h1>')
});

const mecanicoRoutes = require('./routes/mecanicoRoutes');
app.use('/mecanico', mecanicoRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo por el puerto 3____')
});