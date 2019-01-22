var sqlBehind = require('./sql-behind.js');
module.exports = class test2 {

    run() {
        return sqlBehind('query1', {FLD1:'1', FLD2:'a'}, 2);
    }

}
