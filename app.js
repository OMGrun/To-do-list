const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");





app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


// Mongoose
mongoose.connect("	mongodb://localhost:27017/todolistDB");


 const itemsSchema = new mongoose.Schema(
    {
        name : String
    }
 );

 const Item = mongoose.model('Item', itemsSchema);

 const item1 = new Item(
    {
        name: "Welcome to your todo list!"
    }
)

 const item2 = new Item(
    {
        name : "Hit the + button to add a new item."
    }
 )

 const item3 = new Item(
    {
        name : "<-- Hit this to delete an item."
    }
 )
 


// Home route

app.get("/", (req,res) => 
{

    let day = date.getDate(); 
    
    res.render("list", {
        listTitle : "Today",
        newListItems : items
    });

});

app.post('/', (req,res) => 
{
    let item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item);
        res.redirect('/');
    }


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


// about route
app.get('/about', (req,res) =>
{
    res.render("about")
})



app.listen(3000, () =>
{
    console.log("app listening on port 3000");
});
