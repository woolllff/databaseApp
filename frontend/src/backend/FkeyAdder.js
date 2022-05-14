// const { Logger } = require("./logger");

function FkeyAdder(FKeyList)
    {
    var table1 = FKeyList["table1Name"];
    var table2 = FKeyList["table2Name"];
    var Command = String();
    var FKeyName = "";
    Command +="ALTER TABLE ";
    var column1List = FKeyList["column1Name"];
    var column2List = FKeyList["column2Name"];
    if(table1.length==0 || table2.length==0 || column1List.length==0 || column2List.length==0)
        {
        // Logger.warn("Foriegn Key input not correct");
        return "";
        }
    FKeyName = FKeyList["FKName"];
    Command += table1;
    Command += " ADD";
    if(FKeyName!="")
        {
        Command +=" CONSTRAINT ";
        Command += FKeyName;
        }
 
    var key1,val1,key2,val2;
    Command += " FOREIGN KEY (";
    
    for(var i=0;i<column1List.length;i++)
        {
        Command += column1List[i]
        if(i!=column1List.length-1)
            {
            Command += ",";
            }
        }
    Command += ") REFERENCES ";
    Command += table2;
    Command += "(";
    for(var i=0;i<column2List.length;i++)
    {
    Command += column2List[i]
    if(i!=column2List.length-1)
        {
        Command += ",";
        }
    }
    Command += ");" 
    return Command;
    }

module.exports = FkeyAdder;