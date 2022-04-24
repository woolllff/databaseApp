export function DBCreator()
    {
    var Command =new String();
    Command += "CREATE DATABASE ";
    Command += Windows.DBName;
    Command += ";";
    return Command;
    }

export function tableCreator(ObjList,tableName)
    {
    var Command =new String();
    Command += "Create "; 
    Command += tableName;
    Command += " (";
    var i,temp,j;
    for(i=0;i<ObjList.length;i++)
        {
        ColObj = ObjList[i]
        for(j=0;j<ColObj.length;j++)
            {
            Command += ColObj[j][0];
            Command += " ";
            Command += ColObj[j][1];
            }
        Command +=",";
        }

    Command += " );";
    return Command;
    }

export function FkeyAdder(FKeyList)
    {
    var table1 = FkeyList[0];
    var table2 = FkeyList[1];
    var Command = String();
    Command +="ALTER TABLE ";
    Command += table1[0];
    Command += " ADD FORIEGN KEY (";
    Command += table1[1];
    Command += ") REFERENCES ";
    Command += table2[0];
    Command += "(";
    Command += table2[1];
    Command += ");" 
    return Command;
    }
