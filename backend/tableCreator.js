module.exports = tableCreator;
function tableCreator(table)
    {
    var PrimaryKey="";
    var Command =new String();
    Command += "CREATE TABLE "; 
    // console.log("line 40"+tableName);
    // Command += tableName;
    // Command += " (";
    var i,temp,j,tableName,key,Columns,Column;
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
