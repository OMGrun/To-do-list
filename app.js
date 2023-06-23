const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose");





app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


// Mongoose
mongoose.connect("mongodb://localhost:27017/todolistDB");


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

 const defaultItems = [item1, item2, item3];

 const listSchema = {
    name : String, 
    items : [itemsSchema]
 }

 const List = mongoose.model("List", listSchema)

 


// Home route

app.get("/", (req,res) => 
{
    //check if collection is empty.

    Item.find({}).then((items) => {

        if (items.length === 0) {
            Item.insertMany(defaultItems).then(console.log("Inserted!")).catch((err) => 
            {
                console.log(err);
            });
            res.redirect("/")
        } else {
            res.render("list", {
                listTitle : "Today",
                newListItems : items
            });
    
        }

    
    })
    
});

app.post('/', (req,res) => 
{
    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    })
    
    item.save();
    res.redirect("/")

});

app.post('/delete', (req,res) => 
{
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId).then(console.log("Deleted!")).catch(err => {console.log(err);});
    res.redirect("/");
})



// auto route

app.get('/:customListName', (req,res) => 
{
    const customListName = req.params.customListName;

    const list = new List({
        name : customListName,
        items : defaultItems
    });

    list.save();

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
