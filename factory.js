var dbFile = require("./database");
module.exports = function factory(pool){
    var useDb = dbFile(pool);
    async function setDataForString(str){
        var fullStr = str.toUpperCase();
        var tableone = await useDb.getDataFromTableOne(fullStr);
        if(tableone.length == 0){
            //check table two 
            var tabletwo = await useDb.getDataFromTableTwo(fullStr);
            if(tabletwo.length == 0){
                ///set new data to table two
                await useDb.setDataToTableTwo(fullStr, true, tableone[0].count)
            }else{
                await useDb.setDataToTableOne(fullStr);
                // update the counter
            }
        }else{
            //check table two first
            var tabletwo = await useDb.getDataFromTableTwo(fullStr);
            if(tabletwo.length == 0 && tableone[0].count >= 6){
                await useDb.setDataToTableTwo(fullStr, false)
                ///set new data to table two
            }else{
                await useDb.setDataToTableOne(fullStr, "update");
                //update table one
            }
        }
    }
    return{
        setDataForString
    }
}