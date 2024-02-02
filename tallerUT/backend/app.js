const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cors()); 

app.get('/api/datos', (req, res) => {
  const datos = {
    mensaje: 'Estos son tus datos desde el servidor.',
  };
  res.json(datos);
});

app.listen(port, () => {
    console.log('Servidor Express corriendo en https://localhost:3000');
  });
  
