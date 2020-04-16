const mysql= require('mysql');
const { database,host,user,password }=require('./keys');
const { promisify }=require('util');
const pool=mysql.createPool({host,user,password,database});
pool.getConnection((err,connection)=>{
    if (err) {
        if (err.code==='PROTOCOL_CONNECTION_LOST') {
            console.err('coneccion con la base de datos cerrada');
            
        }
        if (err.code==='ER_CON_COUNT_ERROR') {
            console.err('Base de daots tiene demasiadas conecciones');
        }
        if (err.code==='ECONNREFUSED') {
            console.err('coneccion a base de datos a sido rechazada ');
        }
        else{
            console.log(err);
        }
    }
    else if (connection) {
        connection.release();
        console.log('DB esta conectado');
    }        
    
    return;
    
});
//promisify pool query
pool.query=promisify(pool.query);
module.exports= pool;