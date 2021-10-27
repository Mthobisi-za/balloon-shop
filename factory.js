var dbFile = require("./database");
module.exports = function factory(pool){
    var useDb = dbFile(pool);
    async function setDataForString(str){
        var fullStr = str.toUpperCase();
        var tableone = await useDb.getDataFromTableOne(fullStr);
        if(tableone.length == 0){
            console.log("does not exist in table one");
            //check table two 
            var tabletwo = await useDb.getDataFromTableTwo(fullStr);
            if(tabletwo.length == 0 && tableone[0].count >= 6){
                ///set new data to table two
            }else{
                // update the counter
            }
        }else{
            //check table two first
            var tabletwo = await useDb.getDataFromTableTwo(fullStr);
            if(tabletwo.length == 0 && tableone[0].count >= 6){
                ///set new data to table two
            }else{
                //update table one
            }
        }
    }
    return{
        setDataForString
    }
}