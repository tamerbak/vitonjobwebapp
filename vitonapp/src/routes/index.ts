'use strict';

import * as express from 'express';
const router = express.Router();
var client = require('node-rest-client').client;
var client = new client();
/* GET home page. */
router.get('/',(req,res,next) => {
  res.render('index');
});

export default router;