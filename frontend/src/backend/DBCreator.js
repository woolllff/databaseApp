module.exports = DBCreator;
function DBCreator(DBName)
    {
    var Command =new String();
    Command += "CREATE DATABASE ";
    Command += DBName;
    Command += ";";
    return Command;
    }
