module.exports = tableCreator;
function tableCreator(table)
    {
    var PrimaryKeyList=[];
    var PrimaryKey;
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
                    PrimaryKeyList.push(Columns[i]["columnName"]);
                    }
                if(i!= (Columns.length-1) )
                    {
                    Command += ",";
                    }
                }
            }
        }


    if(PrimaryKeyList.length!=0)
        {
        Command += ", PRIMARY KEY(";
        for(var i=0;i<PrimaryKeyList.length;i++)
            {
            Command += PrimaryKeyList[i];
            if(i< (PrimaryKeyList.length-1))
                {
                Command +=",";    
                }
            }
        // Command += PrimaryKey;
        Command += ")";
        }
    Command += " );";
    return Command;
    }
