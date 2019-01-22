var sqlBehind = require('./sql-behind.js');

var retSB = sqlBehind('query1', {FLD1:'1', FLD2:'a'});
// var retSB = sqlBehind('select * from TBL1 FLD1 = :FLD1', {FLD1:'1', FLD2:'a'});
// var retSB = sqlBehind('query1', {FLD1:'1', FLD2:'a'}, './test2.sql');
// var test2 = new (require('./test2.js'))();
// var retSB = test2.run(); // sqlBehind('query1', {FLD1:'1', FLD2:'a'}, 2);

if(retSB){
    console.log('sqlString: ' + retSB.sqlString);
    console.log('paramArray: ' + JSON.stringify(retSB.paramArray));
} else {
    console.log('sql not found');
}
