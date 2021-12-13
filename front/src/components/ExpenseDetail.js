import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import NavigationBar from "./NavigationBar";
import TextField from "@material-ui/core/TextField";
import {Button, Container} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useState} from "react";
import {func} from "prop-types";
import axios from "axios";
import {useStyles} from "../styles/ExpenseDetailStyle";

export default function ExpenseDetail(props){
    const is_edit = props.type === "edit";
    const {expenseId} = useParams();
    const [expenseTypes, setExpenseTypes] = useState([])
    const navigate = useNavigate()

    const [form, set_form] = useState({
        type: 0,
        sum: 0,
        notes: ""
    })

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/expense_type'
        })
            .then(function (response) {
                console.log(response.data)
                setExpenseTypes(response.data)
            });

        if(is_edit){
            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/expense/${expenseId}/`
            })
                .then(function (response) {
                    console.log(response.data)
                    set_form({
                        type: response.data.type,
                        sum: response.data.sum,
                        notes: response.data.notes
                    })
                });
        }
    },[])

    const handleForm = (key, value) => {
        set_form({ ...form, [key]: value});
    }

    function  createNewExpense(){
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/expense/',
            data:{
                type: form.type,
                sum: form.sum,
                notes: form.notes
            }
        })
            .then(function (response) {
                navigate('/expense')
            });
    }

    function updateExpense(){
        axios({
            method: 'put',
            url: `http://127.0.0.1:8000/expense/${expenseId}/`,
            data:{
                type: form.type,
                sum: form.sum,
                notes: form.notes
            }
        })
            .then(function (response) {
                navigate('/expense')
            });
    }

    const classes = useStyles();

    const editForm = (<Container>
        <NavigationBar/>
        <div className={classes.container_horizontal}>
            <div></div>
            <div className={classes.container_vertical}>
                <div className={classes.select_menu}>
                    <InputLabel style={{'margin-top': '10px'}} id="expense-type-label">Expense Type</InputLabel>
                    <Select
                        id="expense-type-select"
                        value={form.type}
                        label="Expense Type"
                        onChange={event => {handleForm("type", event.target.value)}}
                    >
                        {expenseTypes.map((expenseType) => (
                            <MenuItem value={expenseType.id}>{expenseType.title}</MenuItem>
                        ))}

                    </Select>
                    </div>
            <TextField
                onChange={(event)=>handleForm("sum", event.target.value)}
                helperText="Please enter sum"
                id="expense_sum"
                label="Sum"
                value={form.sum}
            />
            <TextField
                onChange={(event)=>handleForm("notes", event.target.value)}
                helperText="You can leave here your notes"
                id="expense_notes"
                label="Notes"
                multiline
                outlinded
                value={form.notes}
            />
            <Button variant="contained" className={classes.updateButton} onClick={()=> updateExpense()}>Update</Button>
            </div>
            <div></div>
        </div>
    </Container>)

    const createForm = (<Container>
        <NavigationBar/>
        <div className={classes.container_horizontal}>
            <div></div>
            <div className={classes.container_vertical}>
                <div className={classes.select_menu}>
                    <InputLabel id="expense-type-label">Expense Type</InputLabel>
                    <Select
                        id="expense-type-select"

                        label="Expense Type"
                        onChange={event => {handleForm("type", event.target.value)}}
                    >
                        {expenseTypes.map((expenseType) => (
                            <MenuItem value={expenseType.id}>{expenseType.title}</MenuItem>
                        ))}

                    </Select>
                </div>
                <TextField
                    onChange={(event)=>handleForm("sum", event.target.value)}
                    helperText="Please enter sum"
                    id="expense_sum"
                    label="Sum"
                />
                <TextField
                    onChange={(event)=>handleForm("notes", event.target.value)}
                    helperText="You can leave here your notes"
                    id="expense_notes"
                    multiline
                    label="Notes"
                />
                <Button variant="contained" className={classes.updateButton} onClick={()=> createNewExpense()}>Create</Button>
            </div>
            <div></div>
        </div>
    </Container>)

    return (<div>
        {is_edit ? editForm : createForm}
    </div>)
}