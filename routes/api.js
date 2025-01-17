'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
let bodyParser = require('body-parser');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.use("/", bodyParser.urlencoded({extended: false}));

  app.get('/api/convert', (req, res) => {
    console.log(req.query.input)
    var initNum = convertHandler.getNum(req.query.input);
    var initUnit = convertHandler.getUnit(req.query.input);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    if (returnUnit == 'error'){
      if (initNum == 'error'){
        res.send('invalid number and unit');
      }else {
        res.send('invalid unit');
      };
    }else if (initNum == 'error'){
      res.send('invalid number')
    }else {
      var returnNum = Number(convertHandler.convert(initNum, initUnit));
      var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      console.log(string)
  
      res.json({
          initNum, 
          initUnit,
          returnNum,
          returnUnit,
          string
      })
    }
  })

};
