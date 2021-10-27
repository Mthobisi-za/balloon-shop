var dbFile = require("./database");
module.exports = function factory(pool){
    var useDb = dbFile(pool);
    async function setDataForString(str){
        var fullStr = str.toUpperCase();
        var tableone = await useDb.getDataFromTableOne(fullStr);
        if(tableone.length == 0){
            console.log("does not exist in table one");
            //check table two 
        }else{
            //check table two first
            var tabletwo = await useDb.getDataFromTableTwo(fullStr);
            if(tabletwo.length == 0){
                ///set data to table one
            }else{
                //update the current one
            }
        }
    }
    return{
        setDataForString
    }
}