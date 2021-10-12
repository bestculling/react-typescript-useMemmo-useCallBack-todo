import { useState, useEffect, useMemo, useCallback } from 'react'
import List, { Todo } from './components/List'

const initialTodos = [
  { id: 1, task: 'Go shopping' },
  { id: 2, task: 'Pay the electricity bill' }
]

function App() {

  const [todoList, setTodoList] = useState(initialTodos)
  const [task, setTask] = useState('')
  const [term, setTerm] = useState('')

  const printTodoList = useCallback(() => {
    // console.log('Changing todoList', todoList)
  }, [todoList])

  useEffect(() => {
    printTodoList()
  }, [todoList, printTodoList])

  const handleCreate = () => {
    const newTodo = {
      id: Date.now(),
      task
    }
    // ผลักสิ่งที่ต้องทำใหม่ไปที่รายการ
    //[ { id: 1, task: 'Go shopping' },
    // { id: 2, task: 'Pay the electricity bill' } 
    //  + newTodo คือ { id: Date.now(), task }  ]
    setTodoList([...todoList, newTodo])
    // Resetting input value
    setTask('')
  }

  const handleSearch = () => {
    setTerm(task)
  }

  const handleDelete = useCallback((taskId: number) => {
    const newTodoList = todoList.filter((todo: Todo) => todo.id !== taskId)
    setTodoList(newTodoList)
  }, [todoList])

  // เรียกใช้เองอัตโนมัติ
  // function นี้จะช่วยทำให้ render todoList.filter() เเค่เพียงครั้งเดียวหลังจาก component ถูก render มาเท่านั้น
  const filteredTodoList = useMemo(() => todoList.filter((todo: Todo) => {
    // console.log('Filtering...')
    // ตรวจสอบว่า todo.task ตรงกับ term ไหม ถ้าตรง return true ไม่ใช่ false
    // todolist.filter return ฉะเพราะค่าที่เป็น true
    return todo.task.toLowerCase().includes(term.toLowerCase())
  }), [term, todoList])

  return (
    <>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleSearch}>Search</button>


      <List todoList={filteredTodoList} handleDelete={handleDelete} />
    </>
  )
}

export default App
