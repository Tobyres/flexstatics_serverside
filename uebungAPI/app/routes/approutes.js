'use strict';
module.exports = function(app) {
  var uebungen = require('../app/controllers/uebungenController');

  // Uebungen Routes
  app.route('/uebungen')
    .get(uebungen.list_all_uebungen)
    .post(uebungen.create_a_uebung);
   
   app.route('/uebungen/:UserID')
    .get(uebungen.getUebungenByUserId)
    .put(uebungen.update_a_task)
    .delete(uebungen.delete_a_uebung);
    };