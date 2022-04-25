module.export ={DBCreator,tableCreator,FkeyAdder};
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
    Command += tableName;
    Command += " (";
    var i,temp,j;
    for(i=0;i<ObjList.length;i++)
        {
        ColObj = ObjList[i];

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
