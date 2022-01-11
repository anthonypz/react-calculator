import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./index.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      //Do not allow multiple zeros
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      //Replace the starting "0" with any of the other digits, except when pressing '.'
      if (payload.digit !== "." && state.currentOperand === "0") {
        return {
          currentOperand: payload.digit,
        };
      }
      //Do not allow multiple decimals
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null,
        };
      }
      if (
        state.currentOperand == null &&
        payload.operation === "-" &&
        state.operation.includes("-")
      ) {
        return state;
      }
      if (payload.operation === "-" && state.operation.includes("+")) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.currentOperand == null && payload.operation == "-") {
        return {
          ...state,
          operation: `${state.operation} ${payload.operation}`,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "0",
        previousOperand: null,
        operation: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: "0",
        };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: "0",
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return "";
  let calculate = "";
  switch (operation) {
    case "÷":
      calculate = previous / current;
      break;
    case "*":
      calculate = previous * current;
      break;
    case "+":
      calculate = previous + current;
      break;
    case "-":
      calculate = previous - current;
      break;
    case "÷ -":
      calculate = previous / -current;
      break;
    case "* -":
      calculate = previous * -current;
      break;
    case "+ -":
      calculate = previous + -current;
      break;
  }
  return calculate.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

export default function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "0" }
  );

  return (
    <div
      id="app"
      className="min-h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 p-8"
    >
      <div id="calculator" className="max-w-5xl mx-auto">
        <div
          id="display"
          className="col-span-4 bg-neutral-900/75 flex flex-col justify-around items-end p-3 break-words break-all"
        >
          <div className="prev-operand text-neutral-100/75 text-2xl">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="curr-operand text-neutral-50 text-4xl">
            {formatOperand(currentOperand)}
          </div>
        </div>
        <button
          id="clear"
          className="col-span-2"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          id="delete"
          className="material-icons-outlined"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          backspace
        </button>
        <OperationButton id="divide" operation="÷" dispatch={dispatch} />
        <DigitButton id="seven" digit="7" dispatch={dispatch} />
        <DigitButton id="eight" digit="8" dispatch={dispatch} />
        <DigitButton id="nine" digit="9" dispatch={dispatch} />
        <OperationButton id="multiply" operation="*" dispatch={dispatch} />
        <DigitButton id="four" digit="4" dispatch={dispatch} />
        <DigitButton id="five" digit="5" dispatch={dispatch} />
        <DigitButton id="six" digit="6" dispatch={dispatch} />
        <OperationButton id="add" operation="+" dispatch={dispatch} />
        <DigitButton id="one" digit="1" dispatch={dispatch} />
        <DigitButton id="two" digit="2" dispatch={dispatch} />
        <DigitButton id="three" digit="3" dispatch={dispatch} />
        <OperationButton id="subtract" operation="-" dispatch={dispatch} />
        <DigitButton id="decimal" digit="." dispatch={dispatch} />
        <DigitButton id="zero" digit="0" dispatch={dispatch} />
        <button
          id="equals"
          className="col-span-2"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}
