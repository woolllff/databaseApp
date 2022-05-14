// const { Logger } = require("./logger");

function tableCreator(table)
    {
    var PrimaryKeyList=[];
    // var PrimaryKey;s
    var Command =new String();
    Command += "CREATE TABLE "; 
    var i,temp,j,tableName,key,Columns,Column;
    for(key in table)
        {
        if(key=="tableName")
            {
            tableName = table[key];
            if(tableName.length==0)
                {
                // Logger.warn("tableName not provided");
                // continue; 
                return "";
            }
            Command += tableName;
            Command += " ( ";
            }
        else if (key="columns")
            {
            Columns = table[key];
            for(i=0;i<Columns.length;i++)
                {
                Column = Columns[i];
                if(Columns[i]["columnName"].length==0  )
                    {
                    // Logger.warn("tableName not provided");
                    continue; 
                    }
                if(Columns[i]["dataType"].length==0  )
                    {
                    // Logger.warn("datatype not provided");
                    continue; 
                    }
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

    if(PrimaryKeyList.length==0)
        {
        // Logger.error("No Primary Key Specified");
        return "";
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
        Command += ")";
        }
    Command += " );";
    return Command;
    }
module.exports = tableCreator;