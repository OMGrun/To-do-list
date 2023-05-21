const express = require("express");
const bodyparser = require("body-parser");
const app = express();
var items = [];

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
        newListItem : items
    });

});

app.post('/', (req,res) => 
{
    var item = req.body.newItem;
    items.push(item);

    res.redirect("/");
});



app.listen(3000, () =>
{
    console.log("app listening on port 3000");
});