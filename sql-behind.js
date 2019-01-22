'use strict'

module.exports = sqlBehind;

let path = require('path');
let fs = require('fs');

function sqlBehind(sqlName, params){
    if(params === undefined) { params = []; }
    let retSql = sqlName;
    if(! retSql.match(/^(SELECT|INSERT|UPDATE|DELETE)\s/i)){
        let caller = require('caller');
        let callFileName = caller();
        let sqlFileName = path.join(path.dirname(callFileName), path.basename(callFileName, path.extname(callFileName)) + '.sql');
        retSql = getSql(sqlFileName, sqlName);
    }
    let retSB = null;
    if(retSql != ''){
        let paramNames = [];
        if(retSql.indexOf(':') > -1){
            paramNames = retSql.match(/:\w+/g).map(function (val) { return val.replace(':','') });
            retSql = retSql.replace(/:\w+/g, '?');
        }
        if(!Array.isArray(params)){
            let paramValues = new Array(paramNames.length).fill('');
            let keys = Object.keys(params);
            for (let i = 0; i < keys.length; i++) {
                let paramName = keys[i];
                let paramValue = params[paramName];
                for (let j = 0; j < paramNames.length; j++) {
                    if(paramNames[j] == paramName){
                        paramValues[j] = paramValue;
                    }
                }
            }
            params = paramValues;
        }
        retSB = {};
        retSB.sqlString = retSql;
        retSB.paramArray = params;
    }
    return retSB;
}

function getSql(sqlFileName, sqlName){
    let lines = fs.readFileSync(sqlFileName, 'utf8').toString().split(/\r\n|\r|\n/);
    let retSql = '';
    let isComment;
    let isSql;
    let curName = '';
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if(line == '/**'){
            isComment = true;
            isSql = false;
            curName = '';
        }
        if(isComment){
            let tokens = line.split(/\s+/);
            let namePos = tokens.indexOf('@name');
            if(namePos > -1){
                curName = tokens[namePos + 1];
            }
        }
        if(isSql && curName == sqlName){
            if(retSql != '') retSql += '\n';
            retSql += line;
        }
        if(line == ' */'){
            isComment = false;
            isSql = true;
        }
    }
    return retSql;
}
