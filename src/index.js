const express = require('express');
const app = express();

//middlewares (procesador de datos que llegaran)
app.use(express.json());
app.use(express.urlencoded({ extended: false}));



//routes
app.use(require('./routes/index'))

app.listen(5000);
console.log( "server on port 5000"); 