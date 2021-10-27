var factory = require("./factory");
module.exports = function routesFunction(pool){
    var useFactory = factory(pool)
    async function home(req,res){
        res.render("index");
    }
    async function buy(req,res){
        var data = req.body.balloon;
        await useFactory.setDataForString(data)
        res.redirect("/");
    }
    return{
        home,
        buy
    }
}