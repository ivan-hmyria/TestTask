import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, {useEffect, useState} from "react";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CustomIconButton from "./CustomIconButton";
import Container from "@material-ui/core/Container";
import {useStyles} from "../styles/ExpensesStyle";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function getTypeById(id, types){
    const type = types.find(({id: typeId}) => id === typeId);
    return type || ''
}

function delete_expense(id, expenses, set_expenses){
    // eslint-disable-next-line no-restricted-globals
    let result = confirm("You really want to delete this expense?");
    if(result) {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/expense_type/${id}`
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    expenses = expenses.filter(expense => expense.id !== id)
                    set_expenses(expenses)
                }
            });
    }
}

export default function ExpenseTypes() {
    const [data, set_data] = useState([])

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/expense_type'
        })
            .then(function (response) {
                console.log(response.data)
                set_data(response.data)
            });
    },[])

    const classes = useStyles()

    return (
        <Container>
            <NavigationBar/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Is Active</TableCell>
                            <TableCell align="right"><CustomIconButton className={classes.addButton} to={'expense_type/create/'}>Add</CustomIconButton></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right"> {row.active ? 'Active' : "Inactive"}</TableCell>

                                <TableCell align="right">
                                    <CustomIconButton className={classes.button} to={`expense_type/edit/${row.id}`}>Edit</CustomIconButton>
                                    <Button variant="contained" className={classes.button} onClick={()=>{delete_expense(row.id, data, set_data)}}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}