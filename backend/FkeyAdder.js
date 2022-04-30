// module.export = FkeyAdder;
export default function FkeyAdder(FKeyList)
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
