import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'


export default class DatabaseMaker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dbName: "mydb",
            tables: [{ tableName: "asdad", columns: [{ columnName: "asdad", dataType: "", constraints: "" }] }]
        };
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
        event.preventDefault();
        alert(JSON.stringify(this.state));
    }



    render() {

        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                <FormControl onSubmit={this.handleSubmit}>
                    <div className='DB_name'>
                        <FormLabel >Database Name</FormLabel >
                        <Input type="text" name="dbName" value={this.state.dbName || ""} onChange={e => this.updateDatabaseName(e)} />
                    </div>
                    {this.state.tables.map((table, t_index) => (

                        <div className='table_name'>
                            <FormLabel>Table name</FormLabel>
                            <Input type="text" name="tableName" value={table.tableName || ""} onChange={e => this.updateTableName(t_index, e)} />

                            {
                                t_index ?
                                    <button type="button" className="button remove" onClick={() => this.removeTable(t_index)}>Remove</button>
                                    : null
                            }
                            {table.columns.map((column, c_index) => (

                                <div className="form-inline" key={c_index}>

                                    <FormLabel>Column name</FormLabel>
                                    <Input type="text" name="columnName" value={column.columnName || ""} onChange={e => this.updateColumnValues(t_index, c_index, e)} />
                                    <FormLabel>Data Type</FormLabel>
                                    <Input type="text" name="dataType" value={column.dataType || ""} onChange={e => this.updateColumnValues(t_index, c_index, e)} />
                                    <FormLabel>Constraints</FormLabel>
                                    <Input type="text" name="constraints" value={column.constraints || ""} onChange={e => this.updateColumnValues(t_index, c_index, e)} />
                                    {
                                        c_index ?
                                            <Button colorScheme='blue' type="button" className="button remove" onClick={() => this.removeColumn(t_index, c_index)}>Remove</Button>
                                            : null
                                    }
                                </div>

                            ))}

                            <Button colorScheme='blue' className="buttonAddColumn" type="button" onClick={() => this.addColumn(t_index)}>Add Column</Button>

                        </div>
                    ))}
                    <Button colorScheme='blue' className="buttonAddTable" type="button" onClick={() => this.addTable()}>Add Table</Button>

                    <div className="button-section">
                        <Button colorScheme='blue' className="buttonSubmit" type="submit" onClick={() => this.handleSubmit()}>Submit</Button>
                    </div>
                </FormControl>
            </div>
        );
    }
}

