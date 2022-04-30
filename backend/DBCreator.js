// module.exports = DBCreator;
export default function DBCreator(DBName)
    {
    var Command =new String();
    Command += "CREATE DATABASE ";
    Command += DBName;
    Command += ";";
    return Command;
    }
