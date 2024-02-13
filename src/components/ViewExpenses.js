import { useBudgets , UNCATEGOIZED_BUDGET } from "../context/BudgetContext";
import { Button, Modal, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utilities/format";

export default function ViewExpenses({ budgetId , handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense , expenses} = useBudgets();

  const budget = 
    UNCATEGOIZED_BUDGET === budgetId 
    ? { name : "Uncatagorized" , id : UNCATEGOIZED_BUDGET } 
    : budgets.find(b => b.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div>Expenses - {budget?.name}</div>
              {budgetId !== UNCATEGOIZED_BUDGET && 
                <Button onClick={() => {
                  deleteBudget(budgetId)
                  handleClose()
                }} variant="outline-danger">
                    Delete
                </Button>
              }
            </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Stack direction="vertical" gap="3">
                  {expenses.map(expense => (
                    <Stack direction="horizontal" gap="2" key={expense.id}>
                      <div className="fs-4 me-auto">{expense.description}</div>
                      <div className="fs-5">
                        {currencyFormatter.format(expense.amount)}
                      </div>
                      <Button size="sm" variant="outline-danger" onClick={() => deleteExpense(expense.id)}>
                        &times;
                      </Button>
                    </Stack>
                  )) }
              </Stack>
      </Modal.Body>
    </Modal>
  );
}
