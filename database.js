module.exports = function database(pool){
    async function getDataFromTableOne(color){
        var data = await pool.query("select * from invalid_color where  color_name = $1", [color]);
        return data.rows;
    }
  

    async function getDataFromTableTwo(color){
        var data = await pool.query("select * from valid_color where  color_name = $1", [color]);
        return data.rows;
    }
    async function deletefromInvalid(color){

    }
    async function setDataToTableOne(color, status){
        if(status){
          await pool.query("update invalid_color set count =+ count where color_name = $1", [color])
        }else{
             await pool.query("insert into invalid_color (color_name, count)", [color, 1])  
        }
    }
    async function setDataToTableTwo(color){
        await pool.query("update valid_color set count =+ count where color = $1", [color])
    }
    return{
        getDataFromTableOne,
        getDataFromTableTwo
    }
}