const express = require("express");
const bodyparser = require("body-parser");

const app = express();

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
        KindOfDay : day
    });

});

app.post('/', (req,res) => 
{
    var item = req.body.newItem;
    console.log(item);
})



app.listen(3000, () =>
{
    console.log("app listening on port 3000");
});