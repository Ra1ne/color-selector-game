const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const Math = require('mathjs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));



const data = {
    difficulty: 6,
    color: [],

}


function rand_color(dat) {
    dat.color = [];

    for (var i = 0; i < dat.difficulty; ++i) {
        dat.color.push(`rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`);
    }
}

app.get("/", (req, res) => {

    rand_color(data);
    res.render('index.ejs', { data });
});
app.post("/", (req, res) => {

    if (req.body.reset_btn == "Reset") {

        rand_color(data);
        res.render("index.ejs", { data });
    }
    if (req.body.difficulty_btn == "difficulty") {
        if (data.difficulty == 3) {
            data.difficulty = 6;
        } else {
            data.difficulty = 3;
        }
        req.body.difficulty_btn = undefined;
        rand_color(data);
        res.render("index.ejs", { data });
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000");
})