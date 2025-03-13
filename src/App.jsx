import { useState,useEffect } from 'react'
import Navbar from './components/navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let savedTodos = JSON.parse(todoString);
      settodos(savedTodos);
    }
  }, []);


  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem("todos"); 
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
    
  }

  const handleDelete = (e,id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
  
  }

  const toggleFinished=()=>{
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("")
    
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map((item) => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    settodos(newTodos);
  };


  return (
    <>
      <Navbar />
      <div className='max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg mt-20'>
        <h1 className='text-center font-bold text-2xl'>Add Todo</h1>
        <div className="bg-violet-100 mt-5 rounded-md p-3 flex gap-2 ">
          <input value={todo} onChange={handleChange} className='flex-1  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 p-2 max-[380px]:flex-[0.7]' type="text" placeholder='Enter Your Task...' />
          <button className='bg-blue-500 text-white rounded-md border-none py-2 px-4 hover:bg-blue-600 hover:scale-105 active:scale-95 cursor-pointer font-semibold  max-[400px]:py-0 max-[400px]:text-sm' onClick={handleAdd}>Add Task</button>
        </div>
        <div className="display mt-6">
          <input className='mr-1' onChange={toggleFinished} type="checkbox" checked={showFinished}/>Show Finished
          <h2 className='text-gray-400 font-semibold mb-5'>Your Todos</h2>
          {todos.length === 0 ? (
            <p className="text-gray-500">No tasks added yet.</p>
          ) : (
            todos.filter(item => showFinished || !item.isCompleted).map(item => (
              <div key={item.id} className="bg-gray-50 flex justify-between p-5 rounded-lg mb-3">
                <div className='flex gap-3'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <span className={`tracking-tighter max-w-90 text-sm ${item.isCompleted ? "line-through text-gray-400 opacity-60" : ""}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="buttons flex gap-2">
                  <button className="hover:scale-110 active:scale-95 cursor-pointer" onClick={(e)=>{handleEdit(e,item.id)}}>✏️</button>
                  <button className="hover:scale-110 active:scale-95 cursor-pointer" onClick={(e)=>{handleDelete(e,item.id)}}>❌</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </>
  )
}

export default App
