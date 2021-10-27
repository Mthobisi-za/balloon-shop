const express = require('express')
const app = express()
const handlebars = require("express-handlebars");
const body = require("body-parser");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
const {Pool} = require("pg");
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars({defaultLayout: "main", layoutsDir: "views/layouts"}));

var connectionString = process.env.DATABASE_URL;
var pool;
if(connectionString){
   pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
} else{
 pool = new Pool({
   user: "postgres",
   password: "mthobisi",
   database: "users",
   port: 5432,
   host: "localhost"
})
}
const useRoutes = routes(pool);


app.get('/' , useRoutes.home);
app.post("/buy", useRoutes.buy);



app.listen(PORT , ()=> console.log('> Server is up and running on port : ' + PORT))