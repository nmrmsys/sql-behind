var sqlBehind = require('./sql-behind.js');

var retSB = sqlBehind('query1', {FLD1:'1', FLD2:'a'});
// var retSB = sqlBehind('select * from TBL1 FLD1 = :FLD1', {FLD1:'1', FLD2:'a'});

if(retSB){
    console.log('sqlString: ' + retSB.sqlString);
    console.log('paramArray: ' + JSON.stringify(retSB.paramArray));
} else {
    console.log('sql not found');
}
