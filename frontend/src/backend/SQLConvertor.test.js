const SQLConvertorFunc = require("./SQLConvertor");
// Test suite containting test cases
var testSet1 = {
  dbName: "mydb",
  tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "PK"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" }] }],
}

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

var testSet4 = {
  dbName: "",
  tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}

var testSet5 = {
  dbName: "mydb",
  tables: [{ tableName: "", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}

var testSet6= {
  dbName: "mydb",
  tables: [{ tableName: "table1", columns: [{ columnName: "", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}

var testSet7 = {
  dbName: "mydb",
  tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}

var testSet8 = {
  dbName: "mydb",
  tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "NOT NULL" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}

var testSet9 = {
  dbName: "mydb",
  tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "", table1NameIndex: -1, column1Name: ["column12"], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}
var testSet10 = {
  dbName: "mydb",
  tables: [{ tableName: "table1", columns: [{ columnName: "column11", dataType: "int", constraints: "PK" },{columnName: "column12", dataType: "int", constraints: "Unique"}] }, 
         { tableName: "table2", columns: [{ columnName: "column21", dataType: "int", constraints: "PK" },{ columnName: "column22", dataType: "int", constraints: "NOT NULL" }] }],
  Fkeys: [{ table1Name: "table1", table1NameIndex: -1, column1Name: [], table2Name: "table2", table2NameIndex: -1, column2Name: ["column21"], FKName: "FKNAME1" },{ table1Name: "table2", table1NameIndex: -1, column1Name: ["column22"], table2Name: "table1", table2NameIndex: -1, column2Name: ["column11"], FKName: "" }]
}

// Expected Ouput to the testcases
var Ans1 = [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table1 ( column11 int ,column12 int , PRIMARY KEY(column11,column12) );',
  'CREATE TABLE table2 ( column21 int , PRIMARY KEY(column21) );'
]

var Ans2 =[
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table1 ( column11 int ,column12 int , PRIMARY KEY(column11,column12) );',
  'CREATE TABLE table2 ( column21 int , PRIMARY KEY(column21) );',
  'ALTER TABLE table2 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column21) REFERENCES table1(column11,column12);'
]

var Ans3 = 
[
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table1 ( column11 int ,column12 int Unique, PRIMARY KEY(column11) );',
  'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
  'ALTER TABLE table1 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column12) REFERENCES table2(column21);',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]

var Ans4 = []
var Ans5 = [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
  'ALTER TABLE table1 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column12) REFERENCES table2(column21);',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]
var Ans6 = [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
  'ALTER TABLE table1 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column12) REFERENCES table2(column21);',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]
var Ans7 = [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
  'ALTER TABLE table1 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column12) REFERENCES table2(column21);',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]
var Ans8= [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table1 ( column11 int ,column12 int Unique, PRIMARY KEY(column11) );',
  'ALTER TABLE table1 ADD CONSTRAINT FKNAME1 FOREIGN KEY (column12) REFERENCES table2(column21);',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]
var Ans9 = [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table1 ( column11 int ,column12 int Unique, PRIMARY KEY(column11) );',
  'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]
var Ans10 = [
  'CREATE DATABASE mydb;',
  'USE mydb;',
  'CREATE TABLE table1 ( column11 int ,column12 int Unique, PRIMARY KEY(column11) );',
  'CREATE TABLE table2 ( column21 int ,column22 int NOT NULL, PRIMARY KEY(column21) );',
  'ALTER TABLE table2 ADD FOREIGN KEY (column22) REFERENCES table1(column11);'
]

test('testSet1 gives the expected Output', () => {
  expect(JSON.stringify(SQLConvertorFunc(testSet1))).toBe(JSON.stringify(Ans1));
});

test('testSet2 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet2))).toBe(JSON.stringify(Ans2));
  });

test('testSet3 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet3)) ).toBe(JSON.stringify(Ans3));
  }); 
  
test('testSet4 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet4)) ).toBe(JSON.stringify(Ans4));
  });  

test('testSet5 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet5))).toBe(JSON.stringify(Ans5));
  });

test('testSet6 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet6)) ).toBe(JSON.stringify(Ans6));
  }); 
  
test('testSet7 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet7)) ).toBe(JSON.stringify(Ans7));
  });  

  test('testSet8 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet8))).toBe(JSON.stringify(Ans8));
  });

test('testSet9 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet9)) ).toBe(JSON.stringify(Ans9));
  }); 
  
test('testSet10 gives the expected Output', () => {
    expect(JSON.stringify(SQLConvertorFunc(testSet10)) ).toBe(JSON.stringify(Ans10));
  });
  
