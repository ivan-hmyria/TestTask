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
import Checkbox from "@material-ui/core/Checkbox";
import {useStyles} from "../styles/ExpenseDetailStyle";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function ExpenseTypeDetail(props){
    const is_edit = props.type === "edit";
    const {expenseId} = useParams();
    const [expenseTypes, setExpenseTypes] = useState([])
    const navigate = useNavigate()

    const [form, set_form] = useState({
        title: "",
        active: true
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
                url: `http://127.0.0.1:8000/expense_type/${expenseId}/`
            })
                .then(function (response) {
                    console.log(response.data)
                    set_form({
                        title: response.data.title,
                        active: response.data.active
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
            url: `http://127.0.0.1:8000/expense_type/`,
            data:{
                title: form.title,
                active: form.active
            }
        })
            .then(function (response) {
                navigate('/expense_type')
            });
    }

    function updateExpense(){
        axios({
            method: 'put',
            url: `http://127.0.0.1:8000/expense_type/${expenseId}/`,
            data:{
                title: form.title,
                active: form.active
            }
        })
            .then(function (response) {
                navigate('/expense_type')
            });
    }

    const classes = useStyles()

    const editForm = (<Container>
        <NavigationBar/>
        <div className={classes.container_horizontal}>
            <div></div>
            <div className={classes.container_vertical}>
                <TextField
                    onChange={(event)=>handleForm("title", event.target.value)}
                    helperText="Expense title"
                    id="expense_title"
                    label="Title"
                    value={form.title}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                    checked={form.active}
                    color="primary"
                    onChange={(event)=>{handleForm('active', !form.active)}}
                    inputProps={{ 'aria-label': 'controlled' }}
                />}
                    label="Is Active"
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
        <TextField
            onChange={(event)=>handleForm("title", event.target.value)}
            helperText="Enter expense title"
            id="expense_type_title"
            label="Title"
        />
        <FormControlLabel
                    control={
        <Checkbox
            checked={form.active}
            onChange={(event)=>{handleForm('active', !form.active)}}
            inputProps={{ 'aria-label': 'controlled' }}
        />}
                    label="Is Active"
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