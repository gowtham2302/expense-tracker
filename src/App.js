import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import Budgetcard from "./components/Budgetcard";
import { UNCATEGOIZED_BUDGET, useBudgets } from "./context/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncatagorizedCard from "./components/UncatagorizedCard";
import TotalCard from "./components/TotalCard";
import ViewExpenses from "./components/ViewExpenses";

function App() {
  const [showModal, setshowModal] = useState(false);
  const [showexModal, setshowexModal] = useState(false);
  const [showexModalId, setshowexModalId] = useState();
  const [viewExpense , setviewExpense] = useState()
  
  const { budgets, getBudgetExpenses} = useBudgets();
  // console.log(viewExpense)
  // console.log(expenses)

  function openExpenseModal( budgetId ){
     setshowexModal(true)
     setshowexModalId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setshowModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={openExpenseModal}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill , minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <Budgetcard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExClick = {() => openExpenseModal(budget.id)}
                onViewClick = {() => setviewExpense(budget.id)}
              />
            );
          })}
          <UncatagorizedCard  onAddExClick = {openExpenseModal}   onViewClick = {() => setviewExpense(UNCATEGOIZED_BUDGET)}/>
          <TotalCard/>
        </div>
      </Container>
      <AddBudgetModal
        show={showModal}
        handleClose={() => setshowModal(false)}
      />
      <AddExpenseModal
        show={showexModal}
        defaultBudgetId={showexModalId}
        handleClose={() => setshowexModal(false)}
      />
      <ViewExpenses 
        budgetId={viewExpense}
        handleClose={() => setviewExpense()}
      />
    </>
  );
}

export default App;
