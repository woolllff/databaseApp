function DBCreator()
    {
    var Command =new String();
    Command += "CREATE DATABASE ";
    Command += Windows.DBName;
    Command += ";";
    return Command;
    }

function tableCreator(ObjList,tableName)
    {
    var Command =new String();
    Command += "Create "; 
    Command += tableName;
    Command += " (";
    var i,temp;
    for(i=0;i<ObjList.length;i++)
        {
        ColObj = ObjList[i]
        for(var key in ColObj)
            {
            Command += ColObj[key];
            Command += " ";
            }
        Command +=",";
        }

    Command += " );";
    return Command;
    }

function FkeyAdder(FKeyList)
    {
    var table1 = FkeyList[0];
    var table2 = FkeyList[1];
    var Command = String();
    Command +="ALTER TABLE ";
    Command += table0[0];
    Command += " ADD FORIEGN KEY (";
    Command += table0[1];
    Command += ") REFERENCES ";
    Command += table1[0];
    Command += "(";
    Command += table1[1];
    Command += ");" 
    return Command;
    }
