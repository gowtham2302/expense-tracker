import { useBudgets } from "../context/BudgetContext";
import Budgetcard from "./Budgetcard";

export default function TotalCard() {

    const { expenses , budgets } = useBudgets()

    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );

    const max = budgets.reduce(
        (total, budget) => total + budget.max,
        0
      );

    if (max === 0) return null

  return (
    <Budgetcard name="Total" amount={amount} max={max} hideStack />
  )
}
