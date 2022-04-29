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
    // Fkeys: [{ table1Name: "", table1NameIndex: -1, column1aName: "", table2Name: "", table2NameIndex: -1, column2Name: "", FKName: "" }]
// }

function DBCreator(DBName)
    {
    var Command =new String();
    Command += "CREATE DATABASE ";
    Command += DBName;
    Command += ";";
    return Command;
    }

function tableCreator(table)
    {
    var PrimaryKey="";
    var Command =new String();
    Command += "CREATE TABLE "; 
    // console.log("line 40"+tableName);
    // Command += tableName;
    // Command += " (";
    var i,temp,j,tableName;
    // console.log("line 44" +ObjList);
    for(key in table)
        {
        if(key=="tableName")
            {
            tableName = table[key];
            Command += tableName;
            Command += " ( ";
            }
        else if (key="columns")
            {
            Columns = table[key];
            for(var i=0;i<Columns.length;i++)
                {
                Column = Columns[i];
                Command += Columns[i]["columnName"];
                Command += " ";
                Command  += Columns[i]["dataType"];
                Command +=" ";
                if(Columns[i]["constraints"]!="" && Columns[i]["constraints"]!="PK")
                    {
                Command += Columns[i]["constraints"]; 
                    }
                else if(Columns[i]["constraints"]=="PK")
                    {
                    PrimaryKey = Columns[i]["columnName"]
                    }
                if(i!=Columns.length-1)
                    {
                    Command += ",";
                    }
                }
            }
        }

    // for(i=0;i<ObjList.length;i++)
    //     {
    //     ColObj = ObjList[i];
    //     // console.log("line 48"+ObjList[i]);
    //     for(var key in ObjList[i])
    //         {
    //         if(String(key)=="PRIMARY KEY")
    //             {
    //             Command += String(key);
    //             Command += "(";
    //             Command += String(ObjList[i][key]);
    //             Command += ")";
    //             continue;
    //             }
    //         Command += String(key);
    //         Command += " ";
    //         Command += String(ObjList[i][key]);
    //         }
    //     // for(j=0;j<ColObj.length;j++)
    //     //     {
    //     //     Command += String(ColObj[j][0]);
    //     //     Command += " ";
    //     //     Command += String(ColObj[j][1]);
    //     //     }
    //     if(i!=ObjList.length-1)
    //         {
    //         Command +=",";
    //         }
    //     }
    if(PrimaryKey!="")
        {
        Command += ", PRIMARY KEY(";
        Command += PrimaryKey;
        Command += ")";
        }
    Command += " );";
    return Command;
    }

function FkeyAdder(FKeyList)
    {
    var table1 = FKeyList["table1Name"];
    var table2 = FKeyList["table2Name"];
    var Command = String();
    var FKeyName = "";
    Command +="ALTER TABLE ";
    var column1 = FKeyList["column1Name"];
    var column2 = FKeyList["column2Name"];
    // ALTER TABLE Orders
    // ADD CONSTRAINT FK_PersonOrder
    // FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);
    FKeyName = FKeyList["FKName"];
    Command += table1;
    Command += " ADD";
    if(FKeyName!="")
        {
        Command +=" CONSTRAINT ";
        Command += FKeyName;
        }
 
    var key1,val1,key2,val2;
    // for (var key in table1)
    //     {
    //     key1 = String(key);
    //     val1 = String(table1[key]);
    //     }    
    // for (var key in table2)
    //     {
    //     key2 = String(key);
    //     val2 = String(table2[key]);
    //     }    
    // Command += key1;
    Command += " FOREIGN KEY (";
    Command += column1;
    Command += ") REFERENCES ";
    Command += table2;
    Command += "(";
    Command += column2;
    Command += ");" 
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
    // for(var key in Data)
    //     {
    //     DBName =String(key);
    //     }
    // SQLCommands.push(DBCreator());
    // console.log(Data[DBName].length);
    for(var key in Data)
        {
        if(key=="dbName")
            {
            DBName =Data[key];
            SQLCommands.push(DBCreator(DBName));
            }
        else if(key=="tables")
            {
            // console.log(typeof(Data));
            // console.log(Data[DBName][i]);
            Tables = Data[key];
            // console.log("Table variable is "+Data[DBName][i]);
            // console.log("line 101"+Table.length);
            for(var i=0;i<Tables.length;i++)
                {
                Result = tableCreator(Tables[i])
                SQLCommands.push(Result)
                // var TableKey; 
                // for(key1 in Table[j])
                //     {
                //     TableKey = key1;
                //     // console.log(String(TableKey));
                //     // console.log(Table[j][TableKey])
                //     // console.log("line 110 "+String(TableKey));
                //     DBTableNames.push(String(TableKey));
                //     }
                // // console.log("line 113 "+Table[j][TableKey]);
                // var Result = tableCreator(Table[j][TableKey],String(TableKey));
                // SQLCommands.push(Result);
                // // for(var i=0;i<List.length;i++)
                // //     {
                // //     SQLCommads.push(List[i]);
                // //     }
                // }
            // console.log(SQLCommands);
                }
            }
        else if(key=="Fkeys")
            {
            var FkeysData;
            FkeysData = Data[key];
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

var testSet2 = {
    dbName: "mydb",
    tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "NOT NULL"}] }, 
           { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" }] }],
    Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: "column12", table2Name: "table2", table2NameIndex: -1, column2Name: "column21", FKName: "FKNAME" }]
}
var testSet3 = {
    dbName: "mydb",
    tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "NOT NULL"}] }, 
           { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
    Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: "column12", table2Name: "table2", table2NameIndex: -1, column2Name: "column21", FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: "column22", table2Name: "table1", table2NameIndex: -1, column2Name: "column11", FKName: "" }]
}
var Result = SQLConvertorFunc(testSet3 );
console.log(Result);