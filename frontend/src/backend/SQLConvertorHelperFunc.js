module.export ={DBCreator,tableCreator,FkeyAdder};
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
    Command += " FOREIGN KEY (";
    Command += column1;
    Command += ") REFERENCES ";
    Command += table2;
    Command += "(";
    Command += column2;
    Command += ");" 
    return Command;
    }