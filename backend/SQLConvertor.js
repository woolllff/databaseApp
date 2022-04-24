/// The format of the data is ///
// { "db_name" : [
//     {"table1_name" : [col, col]}, 
//     {"table2_name" : [col, col]}
// ]
// }
//  this is list of columns present in that table. Look at line 5, for how col should be declared.

// const e = require("express");

// col = {"col_name" : value, "data_type" : value, "constraints": value}
// import {ParseData} from './JSONParser.js'



//New Updated JSON format 
// { "db_name" : [
//         "table":[
//              {"table1_name" : [col, col]}, 
//              {"table2_name" : [col, col]}],
//         "FKeys":[[ [table1,col],[table2.col]  ],
//                  [ [table1,col],[table2.col]  ],
//                  [ [table1,col],[table2.col]  ]]                  
// ]
// }

import {DBCreator,tableCreator,FkeyAdder  } from "./SQLConvertorHelperFunc";
export function SQLConvertorFunc(Data)
    {
    SQLCommads = [];
    
    Window.DBTableNames = []; 
    for(var key in Data)
        {
        Window.DBName =string(key);
        }
    SQLCommand.push(DBCreator());
    for(var key in Data.jsonData[Window.DBName])
        {
        if(key=='Table')
            {
            for(var key1 in Data.jsonData[Window.DBName][key])
                {
                Window.DBTableNames.push(String(key1));
                SQLcommand.push(tableCreator(Data[Window.DBName][key][key1]),String(key1));
                // for(var i=0;i<List.length;i++)
                //     {
                //     SQLCommads.push(List[i]);
                //     }
                }
            }
        else if(key=='FKeys')
            {
            var FkeysData;
            FkeysData = Data.jsonData[Window.DBName][key];
            for(var i=0;i<FkeysData.length;i++)
                {
                SQLCommands.push(tableCreator(FkeysData[i]));
                }
            }
        }
    return SQLCommands;
    }