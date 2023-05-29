const express = require("express");
const bodyparser = require("body-parser");
const app = express();
let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res) => 
{
    
    let today = new Date();
    let options = 
    {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        listTitle : day,
        newListItems : items
    });

});

app.post('/', (req,res) => 
{
    let item = req.body.newItem;
    items.push(item);

    res.redirect("/");
});

// work route


app.get('/work', (req,res) => 
{
    res.render("list", 
    {
        listTitle : "Work List",
        newListItems : workItems
    })
})

app.post('/work', (req,res) => 
{
    let item = req.body.newItem
    workItems.push(item)
})


app.listen(3000, () =>
{
    console.log("app listening on port 3000");
});
