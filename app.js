const express = require("express");
const bodyparser = require("body-parser");
const app = express();
var item = "";

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", (req,res) => 
{
    
    var today = new Date();
    var options = 
    {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        KindOfDay : day,
        newListItem : item
    });

});

app.post('/', (req,res) => 
{
    item = req.body.newItem;

    res.redirect("/");
});



app.listen(3000, () =>
{
    console.log("app listening on port 3000");
});