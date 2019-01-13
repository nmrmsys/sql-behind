sql-behind
====
program CODE and SQL are stored in separate files

## Installation
```
$ npm install sql-behind
```

## Usage
```javascript
// test.js
var sqlBehind = require('sql-behind');

var retSB = sqlBehind('query1', {FLD1:'1', FLD2:'a'});

if(retSB){
    console.log('sqlString: ' + retSB.sqlString);
    console.log('paramArray: ' + retSB.paramArray);
} else {
    console.log('sql not found');
}
```

## sql-behind file example
```sql
-- test.sql
/**
 * @name query1
 * @desc Get data from TBL1
 * @param :FLD1 - Search condition of FLD1
 * @param :FLD2 - Search condition of FLD2
 * @return TBL1 result set
 */
SELECT
  FLD1
 ,FLD2
 ,FLD2
FROM TBL1
WHERE FLD1 = :FLD1
  AND FLD2 = :FLD2
```

## Licence

[MIT](http://opensource.org/licenses/mit-license.php)

## Author

[nmrmsys](https://github.com/nmrmsys)