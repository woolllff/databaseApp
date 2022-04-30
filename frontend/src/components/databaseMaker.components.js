import React, { Component } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Box,
    Center,
    Select
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'


export default class DatabaseMaker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dbName: "mydb",
            tables: [{ tableName: "asdad", columns: [{ columnName: "id", dataType: "text", constraints: "pk" }] }],
            Fkeys: [{ table1Name: "", table1NameIndex: -1, column1aName: "", table2Name: "", table2NameIndex: -1, column2Name: "", FKName: "" }]
        };
        this.dataTypes = []
        this.constraints = ["NOT NULL", " Check  ", "Default", "Unique", "Primary Key", "FOREIGN KEY"];
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateTableName(t_index, e) {
        let prevState = this.state;
        prevState.tables[t_index].tableName = e.target.value;
        this.setState(prevState);
    }

    updateColumnValues(t_index, c_index, e) {
        let prevState = this.state;
        prevState.tables[t_index].columns[c_index][e.target.name] = e.target.value;
        this.setState(prevState);
    }

    addTable() {
        var prevState = this.state;
        prevState.tables = [...this.state.tables, { tableName: "", columns: [{ columnName: "", dataType: "", constraints: "" }] }];

        this.setState(prevState);
    }

    addColumn(tableIndex) {
        var prevState = this.state;
        prevState.tables[tableIndex].columns = [...this.state.tables[tableIndex].columns, { columnName: "", dataType: "", constraints: "" }];

        this.setState(prevState);
    }

    removeColumn(t_index, c_index) {
        let prevState = this.state;
        prevState.tables[t_index].columns.splice(c_index, 1);
        this.setState(prevState);
    }

    removeTable(t_index) {
        let prevState = this.state;
        prevState.tables.splice(t_index, 1);
        this.setState(prevState);
    }

    handleSubmit(event) {
        console.log("submit called")
        event.preventDefault();
        alert(JSON.stringify(this.state));
        console.log(JSON.stringify(this.state))
    }

    UpdateFKvalue(event, fKey_index) {
        var prevState = this.state;
        console.log(event.target.value)
        prevState.Fkeys[fKey_index][event.target.name] = event.target.value;
        // prevState.Fkeys[fKey_index][event.target.name + "Index"] = event.target.value[1];
        this.setState(prevState)
    }

    UpdateFKTableValue(event, fKey_index) {
        var prevState = this.state;
        console.log(event.target.value)
        var a = event.target.value.split(",")
        console.log(a)
        prevState.Fkeys[fKey_index][event.target.name] = a[0];
        prevState.Fkeys[fKey_index][event.target.name + "Index"] = parseInt(a[1]);
        // prevState.Fkeys[fKey_index][event.target.name + "Index"] = event.target.value[1];
        this.setState(prevState)
    }

    addNewFK() {
        var prevState = this.state;
        prevState.Fkeys = [...this.state.Fkeys, { table1Name: "", table1NameIndex: 0, column1aName: "", table2Name: "", table2NameIndex: 0, column2Name: "", FKName: "" }]
        this.setState(prevState);
    }
    removeFK(event, fKey_index) {
        var prevState = this.state;
        prevState.Fkeys.splice(fKey_index, 1);
        this.setState(prevState);
    }



    render() {

        return (
            // <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Center>
                <FormControl onSubmit={this.handleSubmit} >

                    <Box>
                        <FormLabel >Database Name</FormLabel >
                        <Input type="text" name="dbName" value={this.state.dbName || ""} onChange={e => this.updateDatabaseName(e)} />
                    </Box>

                    {this.state.tables.map((table, t_index) => (

                        <Stack paddingLeft='20'>
                            <Box>
                                <FormLabel>Table name</FormLabel>
                                <Input type="text" name="tableName" value={table.tableName || ""} onChange={e => this.updateTableName(t_index, e)} />
                            </Box>

                            {table.columns.map((column, c_index) => (

                                <Stack paddingLeft='20' direction={['column', 'row']} spacing='24px' key={c_index}>
                                    <Box>
                                        <FormLabel>Column name</FormLabel>
                                        <Input type="text" name="columnName" value={column.columnName || ""} onChange={e => this.updateColumnValues(t_index, c_index, e)} />
                                    </Box>
                                    <Box>
                                        {/* <FormLabel>Data Type</FormLabel> */}
                                        <Select placeholder='Data Type' name="dataType" onChange={e => this.updateColumnValues(t_index, c_index, e)}>
                                            {this.dataTypes.map((dt) => (
                                                <option value={dt} >{dt}</option>
                                            ))}
                                        </Select>
                                        {/* <Input type="text" name="dataType" value={column.dataType || ""} onChange={e => this.updateColumnValues(t_index, c_index, e)} /> */}
                                    </Box>
                                    <Box>

                                        <Select placeholder='Constraint' name="constraints" onChange={e => this.updateColumnValues(t_index, c_index, e)}>
                                            {this.constraints.map((dt) => (
                                                <option value={dt} >{dt}</option>
                                            ))}
                                        </Select>
                                        {/* <FormLabel>Constraints</FormLabel> */}
                                        {/* <Input type="text" name="constraints" value={column.constraints || ""} onChange={e => this.updateColumnValues(t_index, c_index, e)} /> */}
                                    </Box>
                                    <Box>
                                        <Button style={{ display: "flex", justifyContent: "center", alignItems: "center" }} colorScheme='blue' type="button" className="button remove" onClick={() => this.removeColumn(t_index, c_index)}>Remove Column</Button>
                                    </Box>
                                </Stack>

                            ))}
                            <Box>
                                <Button colorScheme='blue' className="buttonAddColumn" type="button" onClick={() => this.addColumn(t_index)}>Add Column</Button>
                            </Box>
                            <Box>
                                <Button colorScheme='blue' type="button" className="button remove" onClick={() => this.removeTable(t_index)}> Remove Table </Button>
                            </Box>

                        </Stack>
                    ))}

                    <Box>
                        <Button colorScheme='blue' className="buttonAddTable" type="button" onClick={() => this.addTable()}>Add Table</Button>
                    </Box>

                    <Box>
                        <FormLabel>Foregin keys</FormLabel>
                    </Box>
                    <Box>
                        <Button colorScheme='blue' className="buttonAddFK" type="button" onClick={() => this.addNewFK()}>Add FK</Button>
                    </Box>



                    {this.state.Fkeys.map((fKey, fKey_index) => (

                        <Stack paddingLeft='20' direction={['column', 'row']} spacing='24px' key={fKey_index}>
                            <Box>
                                <Select placeholder='Table 1 Name' name="table1Name" onChange={e => this.UpdateFKTableValue(e, fKey_index)}>
                                    {this.state.tables.map((table, t_i) => (
                                        <option value={[table.tableName, t_i]} >{table.tableName}</option>
                                    ))}
                                </Select>
                                {/* <Select placeholder='Col 1 Name' name="column1Name" onChange={e =>  this.UpdateFKvalue(e,fKey_index)}>
                                        {this.tables[this.Fkeys[fKey_index].table1NameIndex].columns.map((column,c_i) => (
                                            <option value={column.name}>{column.name}</option>
                                        )) }
                                </Select> */}

                            </Box>
                            <Box>
                                <Select placeholder='Table 2 Name' name="table2Name" onChange={e => this.UpdateFKTableValue(e, fKey_index)}>
                                    {this.state.tables.map((table, t_i) => (
                                        <option value={[table.tableName, t_i]}>{table.tableName}</option>
                                    ))}
                                </Select>
                                {/* {this.state.Fkeys[fKey_index].table2NameIndex !== -1 ?
                                    <Select placeholder='Col 2 Name' name="column2Name" onChange={(e) => this.UpdateFKvalue(e, fKey_index)}>
                                        {
                                            this.tables[this.Fkeys[fKey_index].table2NameIndex].columns.map((column, c_i) => (
                                                <option value={column.name}>{column.name}</option>

                                            ))}
                                    </Select> : <Box />
                                } */}
                            </Box>

                            <Box>
                                <FormLabel>Foregin key name</FormLabel>
                                <Input type="text" name="FKName" value={fKey.FKName || ""} onChange={e => this.UpdateFKvalue(e, fKey_index)} />
                            </Box>
                            <Box>
                                <Button colorScheme='blue' className="buttonRemoveFK" type="button" onClick={(e) => this.removeFK(e, fKey_index)}>Remove FK</Button>
                            </Box>

                        </Stack>
                    ))}

                    <Box>
                        <Button colorScheme='blue' className="buttonSubmit" type="button" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
                    </Box>
                </FormControl>

            </Center>
        );
    }
}

