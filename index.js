const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

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
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/singlequestion/:id", (req, res) => {
    var id =req.params.id;

    Question.findOne({
    where: { id: id }
    }).then(singleQuestion => {
        if(singleQuestion != undefined) {
            Answer.findAll({
                where: {questionId: singleQuestion.id},
                order: [['id', 'DESC']]
            }).then(answers => {
                res.render("singleQuestion", {
                singleQuestion: singleQuestion,
                answers: answers
            });
        });
        } else {
            res.redirect("/");
        }
    });
});

app.post("/saveanswer", (req, res) => {
    var body = req.body.body;
    var questionId = req.body.questionId;

    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        console.log("created");
        res.redirect("/singlequestion/" + questionId);
    })
});

app.listen(8080,() =>{
    console.log("App rodando!");
});