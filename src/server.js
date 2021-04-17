const express = require("express");
const routes = require("./routes");
const app = express();

// setando a template engine ejs
app.set('view engine', 'ejs');

// habilitar arquivos statics
app.use(express.static('public'));

// usando req.body
app.use(express.urlencoded({ extended: true }))

// usando rotas do routes.js
app.use(routes)

// ouve a rota e liga o servidor na rota pedida
app.listen(8080, () => console.log('8080 is a magic port ❤️'));

