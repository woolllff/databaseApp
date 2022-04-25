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

function DBCreator()
    {
    var Command =new String();
    Command += "CREATE DATABASE ";
    Command += DBName;
    Command += ";";
    return Command;
    }

function tableCreator(ObjList,tableName)
    {
    var Command =new String();
    Command += "CREATE TABLE "; 
    // console.log("line 40"+tableName);
    Command += tableName;
    Command += " (";
    var i,temp,j;
    // console.log("line 44" +ObjList);
    for(i=0;i<ObjList.length;i++)
        {
        ColObj = ObjList[i];
        // console.log("line 48"+ObjList[i]);
        for(var key in ObjList[i])
            {
            if(String(key)=="PRIMARY KEY")
                {
                Command += String(key);
                Command += "(";
                Command += String(ObjList[i][key]);
                Command += ")";
                continue;
                }
            Command += String(key);
            Command += " ";
            Command += String(ObjList[i][key]);
            }
        // for(j=0;j<ColObj.length;j++)
        //     {
        //     Command += String(ColObj[j][0]);
        //     Command += " ";
        //     Command += String(ColObj[j][1]);
        //     }
        if(i!=ObjList.length-1)
            {
            Command +=",";
            }
        }

    Command += " );";
    return Command;
    }

function FkeyAdder(FKeyList)
    {
    var table1 = FKeyList[0];
    var table2 = FKeyList[1];
    var Command = String();
    Command +="ALTER TABLE ";
    var key1,val1,key2,val2;
    for (var key in table1)
        {
        key1 = String(key);
        val1 = String(table1[key]);
        }    
    for (var key in table2)
        {
        key2 = String(key);
        val2 = String(table2[key]);
        }    
    Command += key1;
    Command += " ADD FOREIGN  KEY ('";
    Command += val2;
    Command += "') REFERENCES ";
    Command += key2;
    Command += "('";
    Command += val1;
    Command += "');" 
    return Command;
    }

// var lib = require('./SQLConvertorHelperFunc');
var DBName ; 
var DBTableNames =new Array(); 
// import {DBCreator,tableCreator,FkeyAdder  } from "./SQLConvertorHelperFunc";
function SQLConvertorFunc(Data)
    {
    SQLCommands = new Array();
    
    DBTableNames = new Array(); 
    for(var key in Data)
        {
        DBName =String(key);
        }
    SQLCommands.push(DBCreator());
    // console.log(Data[DBName].length);
    for(var i=0;i<Data[DBName].length;i++)
        {
        if(i==0)
            {
            // console.log(typeof(Data));
            // console.log(Data[DBName][i]);
            Table = Data[DBName][i]["table"];
            // console.log("Table variable is "+Data[DBName][i]);
            // console.log("line 101"+Table.length);
            for(var j=0;j<Table.length;j++)
                {
                var TableKey; 
                for(key1 in Table[j])
                    {
                    TableKey = key1;
                    // console.log(String(TableKey));
                    // console.log(Table[j][TableKey])
                    // console.log("line 110 "+String(TableKey));
                    DBTableNames.push(String(TableKey));
                    }
                // console.log("line 113 "+Table[j][TableKey]);
                var Result = tableCreator(Table[j][TableKey],String(TableKey));
                SQLCommands.push(Result);
                // for(var i=0;i<List.length;i++)
                //     {
                //     SQLCommads.push(List[i]);
                //     }
                }
            // console.log(SQLCommands);
            }
        else if(i==1)
            {
            var FkeysData;
            FkeysData = Data[DBName][i]["FKeys"];
            console.log(FkeysData);
            for(var i=0;i<FkeysData.length;i++)
                {
                SQLCommands.push(FkeyAdder(FkeysData[i]));
                }
            }
        }
    return SQLCommands;
    }

    var testSet1 = {"DBName1": [
    {"table": [ 
        {"Student":[{"Name":"VARCHAR(255)"},{"RollNO":"INT(255)"},{"passFail":"BOOL"},{"PRIMARY KEY":"RollNO"} ]},
        {"Course":[{"Name":"VARCHAR(255)"},{"CourseID":"INT(255)"},{"PRIMARY KEY":"CourseID"}]
         }]},
    {"FKeys" :[ [{"Student":"RollNO"},{"Course":"CourseID"}] ] }


     
]};

var Result = SQLConvertorFunc(testSet1);
console.log(Result);