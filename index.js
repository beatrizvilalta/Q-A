const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/",(req, res) => {

    res.render('index');
});

app.get("/questions", (req, res) =>{
    res.render('questions');
})

app.listen(8080,() =>{
    console.log("App rodando!");
});