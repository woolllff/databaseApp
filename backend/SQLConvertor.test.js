// import { SQLConvertorFunc } from "./SQLConvertor";

// var test = require('unit.js');
// var assert = test.assert;
// var Assert = require('unit.js').assert;
// or if you use only assert

// var SQLConvertor = require("./SQLConvertorFunc")
// import SQLConvertorFunc from "../SQLConvertor.js"
const SQLConvertorFunc = require("./SQLConvertor");
var testSet1 = {"DBName1": [
    {"table": [ 
        {"Student":[["Name","VARCHAR(255)"],["RollNO","INT(255"],["passFail","BOOL"] ]},
        {"Course":[["Name","VARCHAR(255)"],["CourseID","INT(255"]]}
        ]},
    {"Fkey" :[ [["Student","RollNO"],["Course","CourseID"]] ] }   
]};

var testSet2 = {
    dbName: "mydb",
    tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "NOT NULL"}] }, 
           { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" }] }],
    Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: "column12", table2Name: "table2", table2NameIndex: -1, column2Name: "column21", FKName: "FKNAME" }]
}
var testSet3 = {
    dbName: "mydb",
    tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
           { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
    Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: "column12", table2Name: "table2", table2NameIndex: -1, column2Name: "column21", FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: "column22", table2Name: "table1", table2NameIndex: -1, column2Name: "column11", FKName: "" }]
}
// console.log(SQLConvertorFunc(testSet1));
var Ans2 = [
    'CREATE DATABASE mydb;',
    'CREATE TABLE table1 ( column11 int ,column12 int NOT NULL, PRIMARY KEY(column11) );',
    'CREATE TABLE table2 ( column21 int , PRIMARY KEY(column21) );',
    'ALTER TABLE table1 ADD CONSTRAINT FKNAME FOREIGN KEY (column12) REFERENCES table2(column21);'
  ]

var Ans3 = [
    'CREATE DATABASE mydb;',
    'CREATE TABLE table1 ( column11 int ,column12 int Unique, PRIMARY KEY(column11) );',
    'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
    'ALTER TABLE table1 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column12) REFERENCES table2(column21);',
    'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
  ]

test('testSet2 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet2))).toBe(JSON.stringify(Ans2));
  });

test('testSet3 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet3)) ).toBe(JSON.stringify(Ans3));
  });  

test('testSet3 didnot match with wrong output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet3)) ).not.toBe(JSON.stringify(Ans2));
  });  