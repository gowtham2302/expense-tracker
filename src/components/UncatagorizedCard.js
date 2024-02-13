import { useBudgets , UNCATEGOIZED_BUDGET } from "../context/BudgetContext";
import Budgetcard from "./Budgetcard";

export default function UncatagorizedCard(props) {
  
    const { getBudgetExpenses } = useBudgets()

    const amount = getBudgetExpenses(UNCATEGOIZED_BUDGET).reduce(
        (total, expense) => total + expense.amount,
        0
      );

    if (amount === 0) return null

  return (
    <Budgetcard name="Uncatagorized" amount={amount} gray {...props}/>
  )
}
