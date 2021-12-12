import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import moment from "moment";
import NavigationBar from "./NavigationBar";
import {Container} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";

import 'date-fns';
import Button from "@material-ui/core/Button";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


function getMaxMinDate(responseData){
    let minDate = "";
    let maxDate = "";

    responseData.forEach((expenseType) => {
        expenseType.expenses.forEach((expense) => {
            if (!minDate && !maxDate){
                minDate = expense.date
                maxDate = expense.date
            }

            maxDate = expense.date > maxDate ? expense.date : maxDate;
            minDate = expense.date < minDate ? expense.date : minDate;
        })
    })

    return [minDate, maxDate]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



export default function Analytics() {
    const [data, setData] = useState({
        labels:[],
        datasets: []
    })
    const [filterDate, setFilterDate] = useState({
        startDate: null,
        endDate: null
    })

    function handleFilterChange(key, value){
        console.log(value);
        setFilterDate({ ...filterDate, [key]: value});
    }

    useEffect(()=>{
        getFilteredData(filterDate);
    },[filterDate])

    function getFilteredData(filterDate){
        const startDate = filterDate.startDate?.format('YYYY-MM-DD')
        const endDate = filterDate.endDate?.format('YYYY-MM-DD')

        console.log(startDate)
        console.log(endDate)

        const filter = (startDate ? 'after_date=' + startDate + "&" : "") + (endDate ? 'before_date=' + endDate : "")
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/expense/get_groped_expenses?${filter}`
        })
            .then(function (response) {
                console.log(response.data)
                convertData(response.data)
            });
    }

    function convertData(responseData){
        console.log(responseData)
        const data = {
            labels: [],
            datasets: []
        };
        const [minDate, maxDate] = getMaxMinDate(responseData.data);

        let date = moment(minDate)
        let endDate = moment(maxDate)

        while(date <= endDate){
            data.labels.push(date.format("YYYY-MM-DD"));
            date = date.add(1, 'days')
        }

        console.log(responseData)

        responseData.data.forEach((expenseType) => {
            let datesObject = {}

            data.labels.forEach((labelDate) => {

                datesObject[labelDate] = 0
            })
            console.log(datesObject)
            expenseType.expenses.forEach((expense) =>{
                datesObject[expense.date] += expense.sum
            })

            const r = getRandomInt(255);
            const g = getRandomInt(255);
            const b = getRandomInt(255);

            data.datasets.push({
                label: expenseType.title,
                data: Object.values(datesObject),
                borderColor: 'rgb(' +r+',' +g+ ',' +b+')',
                backgroundColor: 'rgba(' +r+ ',' +g+ ',' +b+ ', 0.5)'
            })
        })
        console.log(data)
        setData(data)
    }

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/expense/get_groped_expenses'
        })
            .then(function (response) {
                console.log(response.data)
                convertData(response.data)
            });
    },[])

    return (
        <Container>
            <NavigationBar/>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/DD/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={filterDate.startDate}
                    onChange={(date) => {handleFilterChange('startDate', date)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/DD/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={filterDate.endDate}
                    onChange={(date) => {handleFilterChange('endDate', date)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <Button onClick={()=>{setFilterDate({
                    startDate: null,
                    endDate: null
                })}}>Reset filters</Button>
            </MuiPickersUtilsProvider>
            <Line options={options} data={data} />
        </Container>
        );
}
