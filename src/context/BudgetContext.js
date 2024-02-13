import React, { useContext , useState} from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../utilities/useLocalStorage";

const BudgetContext = React.createContext();

export const UNCATEGOIZED_BUDGET = "Uncatagorized" 

export function useBudgets() {
  return useContext(BudgetContext);
}

// budget{
//     id:
//     name:
//     max:
// }
// expense{
//     id:
//     budget id :
//     amount:
//     description:
// }


export function BudgetProvider({ children }) {

    const [budgets, setbudgets] = useLocalStorage(" budgets ", [])
    const [expenses, setexpenses] = useLocalStorage(" expenses " , [])

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description , budgetId , amount}){
        setexpenses(prevexpenses => {
            return [...prevexpenses , { id:uuidv4() , description , amount , budgetId }]
        })
    }

    function addBudget({name , max}){
        setbudgets(prevbudgets =>{
            if (prevbudgets.find(budget => budget.name === name)){
                return prevbudgets
            }
            return [...prevbudgets , { id : uuidv4() , name , max }]
        })
    }

    function deleteBudget (id) {
        setexpenses(prevexpenses => {
            return prevexpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return {...expense , budgetId : UNCATEGOIZED_BUDGET}
            })
        })
        setbudgets(prevbudgets => {
            return prevbudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense(id){
        setexpenses(prevexpenses => {
            return prevexpenses.filter(expense => expense.id !== id)
        })
    }


  return (
    <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
    }}>{children}</BudgetContext.Provider> 
  )
}
