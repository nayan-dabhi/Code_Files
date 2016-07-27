var bCrypt = require("bcrypt-nodejs");
var TwinBcrypt = require('twin-bcrypt');

// Bcrypt Password Hash Generating & Compare
utilsModel.getBcryptPass = function(callback){
  var passStr = 123456;
  var salt = bCrypt.genSaltSync(10);

  //passStr += 1;
  console.log(salt);

  var hashPass = bCrypt.hashSync(passStr, salt);
  var finalHash = hashPass.replace('$2a$', '$2y$');

  var result = {
    "status": "success",
    "password": passStr,
    "salt": salt,
    "originalHash": hashPass,
    "modifiedHash": finalHash
  };

  console.log(result);
  callback(null, result);
};

utilsModel.compBcryptPass = function(callback){
  var hashCallBack = function(error, result){
    var res = {};
    if(error){
      res = {
        "status":"error",
        "error":error
      }
      callback(null, res);
    } else {
      res = {
        "status":"success",
        "result":result
      }
      callback(null, res);
    }
  }

  var passStr = "123456";
  var hash = '$2a$10$WvWJlge/F9S8VyoA3vTd3u3C9KQXQn3VCGuNBTLizRmzrIrmkh9pq';
  //var hash = '$2y$10$T4rXmcDO4I8v.MH43GFhW.4/LTuhDKRTPXegOM/cA0aOiJ91a0iSu';

  bCrypt.compare(passStr, hash, hashCallBack);
};


// Twin-Bcrypt Password Hash Generating & Compare
utilsModel.getTwinBcryptPass = function(callback){
  var passStr = "123456";
  var hash = TwinBcrypt.hashSync(passStr);

  var result = {
    "status": "success",
    "password": passStr,
    "code": hash
  };

  console.log(result);
  callback(null, result);
};

utilsModel.compTwinBcryptPass = function(callback){
  var hashCallBack = function(result){
    var res = {
      "status":"success",
      "password":passStr,
      "result":result
    }
    callback(null, res);
  }

  var passStr = "123456";
  var hash = '$2y$10$WvWJlge/F9S8VyoA3vTd3u3C9KQXQn3VCGuNBTLizRmzrIrmkh9pq';
  TwinBcrypt.compare(passStr, hash, hashCallBack);
};