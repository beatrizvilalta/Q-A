const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {
    res.render('index');
});

app.get("/questions", (req, res) =>{
    res.render('questions');
})

app.post("/save-questions", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    res.send("Formulario recebido! Título " + title + "; Descricao "+ description + ";");
});

app.listen(8080,() =>{
    console.log("App rodando!");
});