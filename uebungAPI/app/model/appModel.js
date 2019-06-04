'user strict';
var sql = require('./db.js');

//Task object constructor
var Uebung = function(uebung){
    this.Name = uebung.Name;
    this.Beschreibung = uebung.Beschreibung;
    this.Muskelgruppe = uebung.Muskelgruppe;
    this.UserID = uebung.UserID;
    this.Schwierigkeitsgrad = uebung.Schwierigkeitsgrad;
};

Uebung.createUebung = function createUebung(newUebung, result) {    
        sql.query("INSERT INTO uebungen set ?", newUebung, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res);
                    result(null, res);
                }
            });           
};
Uebung.getUebungenByUserId = function getUebungenByUserId(UserId, result) {
        sql.query("Select uebung from uebungen where id = ? ", UserId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Uebung.getAllUebungen = function getAllUebungen(result) {
        sql.query("Select * from uebungen where UserID IS NULL", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Uebungen : ', res);  
                 result(null, res);
                }
            });   
};
Uebung.remove = function(id, result){
     sql.query("DELETE FROM uebungen WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Uebung;