export default function App() {
  return (
    <div
      id="app"
      className="min-h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 p-8"
    >
      <div id="calculator" className="grid grid-cols-4 max-w-5xl mx-auto">
        <div
          id="display"
          className="col-span-4 bg-neutral-900/75 h-28 flex flex-col justify-around items-end p-3 break-words break-all"
        >
          <div className="prev-operand text-neutral-100/75 text-2xl "></div>
          <div className="curr-operand text-neutral-50 text-4xl "></div>
        </div>
        <button id="clear" className="col-span-2">
          AC
        </button>
        <button id="delete" className="material-icons-outlined">
          backspace
        </button>
        <button id="divide">÷</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="multiply">*</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="add">+</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="subtract">-</button>
        <button id="decimal">.</button>
        <button id="zero">0</button>
        <button id="equals" className="col-span-2">
          =
        </button>
      </div>
    </div>
  );
}
