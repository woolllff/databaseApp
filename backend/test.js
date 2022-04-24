import { SQLConvertorFunc } from "./SQLConvertor";

var test = require('unit.js');
// var assert = test.assert;
// var Assert = require('unit.js').assert;
// or if you use only assert
var testSet1 = {"DBName1": [
    {"table": [ 
        {"Student":[["Name","VARCHAR(255)"],["RollNO","INT(255"],["passFail","BOOL"] ]},
        {"Course":[["Name","VARCHAR(255)"],["CourseID","INT(255"]]}
        ]},
    {"Fkey" :[ [["Student","RollNO"],["Course","CourseID"]] ] }


     
]};

console.log(SQLConvertorFunc(testSet1));
