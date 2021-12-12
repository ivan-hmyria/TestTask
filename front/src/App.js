import logo from './logo.svg';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import Main from "./components/Main";
import React from "react";
import Expenses from "./components/Expenses";
import ExpenseDetail from "./components/ExpenseDetail";
import ExpenseTypes from "./components/ExpenseTypes";
import ExpenseTypeDetail from "./components/ExpenseTypeDetail"
import Analytics from "./components/Analytics"

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/expense" element={<Expenses/>}/>
            <Route path="/expense/create" element={<ExpenseDetail type="create"/>}/>
            <Route path="/expense/edit/:expenseId" element={<ExpenseDetail type="edit"/>} />
            <Route path="/expense_type" element={<ExpenseTypes/>} />
            <Route path="/expense_type/create" element={<ExpenseTypeDetail type="create"/>}/>
            <Route path="/expense_type/edit/:expenseId" element={<ExpenseTypeDetail type="edit"/>} />
            <Route path="/analytics" element={<Analytics/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
