'use strict';

var Uebung = require('../model/appModel.js');

exports.list_all_uebungen = function(req, res) {
  Uebung.getAllUebungen(function(err, uebung) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', uebung);
    res.send(uebung);
  });
};

exports.create_a_uebung = function(req, res) {
  var new_uebung = new Uebung(req.body);
  //handles null error 
   if(!new_uebung.Name || !new_uebung.Schwierigkeitsgrad || !new_uebung.Muskelgruppe){

            res.status(400).send({ error:true, message: 'Please provide Name/Schwierigkeitsgrad/Muskelgruppe' });

        }
else{
  Uebung.createUebung(new_uebung, function(err, uebung) {
    if (err)
      res.send(err);
    res.json(uebung);
  });
}
};

exports.getUebungenByUserId = function(req, res) {
  Uebung.getUebungenByUserId(req.params.UserID, function(err, uebung) {
    if (err)
      res.send(err);
    res.json(uebung);
  });
};

exports.delete_a_uebung = function(req, res) {
  Uebung.remove( req.params.UserID, function(err, uebung) {
    if (err)
      res.send(err);
    res.json({ message: 'Uebung successfully deleted' });
  });
};