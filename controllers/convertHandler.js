function ConvertHandler() {

  this.getNum = function(input) {
    regex = /[^a-zA-Z]+[\.|\/]?/gi;
    let result = input.match(regex);
    if (result == null){
      return 1;
    }
    result = result.join('');
    var fraction = false;
    for (let i = 0; i < result.length - 1; i++){
      if (result[i] == '/' && !fraction){
        fraction = true;
      }else if (result[i] == '/' && fraction){
        return 'error'
      };
    };
    if (result == null){
      return 'error'
    }else if (!eval(result)){
      return 'error';
    }else {
      return eval(result);
    }
  };

  this.getUnit = function(input) {
    regex = /([a-zA-Z]+)/gi;
    let result = input.match(regex)[0];
    if (result == 'l' || result == 'L'){
      return 'L';
    }else {
      return result.toLowerCase();
    }
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit){
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'error';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit){
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit){
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };

}

module.exports = ConvertHandler;
