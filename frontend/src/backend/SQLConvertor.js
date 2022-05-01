/// The format of the data is ///
// { "db_name" : [
//     {"table1_name" : [col, col]}, 
//     {"table2_name" : [col, col]}
// ]
// }
//  this is list of columns present in that table. Look at line 5, for how col should be declared.

// const e = require("express");

// col = {"col_name" : value, "data_type" : value, "constraints": value}
// import {ParseData} from './JSONParser.js'



//New Updated JSON format 
// { "db_name" : [
//         "table":[
//              {"table1_name" : [col, col]}, 
//              {"table2_name" : [col, col]}],
//         "FKeys":[[ [table1,col],[table2.col]  ],
//                  [ [table1,col],[table2.col]  ],
//                  [ [table1,col],[table2.col]  ]]                  
// ]
// }

// {
    // dbName: "mydb",
    // tables: [{ tableName: "asdad", columns: [{ columnName: "id", dataType: "text", constraints: "pk" }] }],
    // Fkeys: [{ table1Name: "", table1NameIndex: -1, column1Name: [], table2Name: "", table2NameIndex: -1, column2Name: [], FKName: "" }]
// }

// import FkeyAdder from "./FkeyAdder.js";
// import tableCreator from "./tableCreator.js";
// import DBCreator from "./DBCreator.js";
var FkeyAdder = require("./FkeyAdder");
var DBCreator = require("./DBCreator");
var tableCreator = require("./tableCreator");
const { Logger } = require("./logger");

module.exports = SQLConvertorFunc;
function SQLConvertorFunc(Data)
    {
    var SQLCommands = new Array();
    var DBTableNames = new Array(); 
        
    for(var key in Data)
        {
        if(key=="dbName")
            {
            var DBName =Data[key];
            SQLCommands.push(DBCreator(DBName));
            Logger.info('computed SQL code to create DB using DBCreator funtion');
            var Command = "USE ";
            Command += DBName;
            Command +=";";
            SQLCommands.push(Command);
            }
        else if(key=="tables")
            {
            var Tables = Data[key];
            for(var i=0;i<Tables.length;i++)
                {
                Result = tableCreator(Tables[i]);
                SQLCommands.push(Result);
                }
            Logger.info('computed SQL code to create tables using tableCreator funtion');
            }
        else if(key=="Fkeys")
            {
            var FkeysData;
            FkeysData = Data[key];
            // console.log(FkeysData);
            for(var i=0;i<FkeysData.length;i++)
                {
                SQLCommands.push(FkeyAdder(FkeysData[i]));
                }
            Logger.info('computed SQL code to create Foriegn Keys using FkeyAdder funtion');
            Logger.error("Just to test");
            }
        }
    return SQLCommands;
    }

// var testSet1 = {"DBName1": [
//     {"table": [ 
//         {"Student":[{"Name":"VARCHAR(255)"},{"RollNO":"INT(255)"},{"passFail":"BOOL"},{"PRIMARY KEY":"RollNO"} ]},
//         {"Course":[{"Name":"VARCHAR(255)"},{"CourseID":"INT(255)"},{"PRIMARY KEY":"CourseID"}]
//          }]},
//     {"FKeys" :[ [{"Student":"RollNO"},{"Course":"CourseID"}] ] }   
// ]};

var testSet2 = {
    dbName: "mydb",
    tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "PK"}] }, 
           { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" }] }],
    Fkeys: [{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column21"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11","column12"], FKName: "FKNAME1" }]
}
var testSet3 = {
    dbName: "mydb",
    tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
           { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
    Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}
var Result = SQLConvertorFunc(testSet3);
console.log(Result);