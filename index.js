const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
//Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco foi!")
    })
    .catch((errorMsg) => {
    console.log(errorMsg);
    })


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get("/",(req, res) => {
    Question.findAll({ raw: true, order:[
    ['id', 'DESC']
    ]}).then(questions => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get("/questions", (req, res) => {
    res.render('questions');
});

app.post("/save-questions", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    Question.create({
        title: title,
        description: description
    }). then(() => {
        res.redirect("/");
    })
});

app.get("/singlequestion/:id", (req, res) => {
    var id =req.params.id;
    Question.findOne({
    where: { id: id }
    }).then(singleQuestion => {
        if(singleQuestion != undefined) {
            res.render("singleQuestion");
        } else {
            res.redirect("/");
        }
    });
});

app.listen(8080,() =>{
    console.log("App rodando!");
});