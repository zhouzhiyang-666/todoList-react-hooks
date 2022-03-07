import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './assets/css/resets.css'
import './assets/css/ui.css'

import MyHeader from './components/Header';
import Test from './components/Test'
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';

function App() {

  const [ isInputShow, setInputShow ] = useState(false)
  const [ todoList, setTodoList ] = useState([])
  const [ isShowCheckModal, setShowCheckModal ] = useState(false)
  const [ isShowEditModal, setShowEditModal ] = useState(false)
  const [ currentData, setCurrentData ] = useState({})

  useEffect(()=>{
    const todoData = JSON.parse(localStorage.getItem('todoList') || '[]')
    setTodoList(todoData)
    return ()=>{
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList))
  },[todoList])

  function openInput () {
    setInputShow(!isInputShow)
  }

  const openCheckModal = useCallback((id) => {
    setCurrentData(todoList.filter(item=>item.id===id)[0])
    setShowCheckModal(true)
  },[todoList])

  const openEditModal = useCallback((id) => {
    setCurrentData(todoList.filter(item=>item.id===id)[0])
    setShowEditModal(true)
  },[todoList])

  const addItem = useCallback((value) => {
    const dataItem = {
      id: Date.now(),
      content: value,
      completed: false
    }
    // setTodoList([...todoList,dataItem])
    setTodoList((todoList) => [...todoList,dataItem])
    setInputShow(false);
  }, [todoList]);

  const delItem = useCallback((id) => {
    setTodoList(todoList.filter(item=>item.id!==id))
  }, [todoList]);

  // checkbox改变完成状态
  const changeCompleted = useCallback((id, completed) => {
    const oldList = [...todoList]
    
    setTodoList(
      oldList.map((item)=>{
        if (item.id === id) {
          item.completed = completed
        }
        return item
      })
    )
  },[todoList])

  // 编辑事件内容
  const changeStatus = useCallback((id, newData)=>{
    const oldList = [...todoList]

    setTodoList(
      oldList.map((item)=>{
        if (item.id === id) {
          item = newData
        }
        return item
      })
    )
    setShowEditModal(false)
  },[todoList])

  return (
    <div className="App">
      <CheckModal 
        isShowCheckModal={isShowCheckModal} 
        data={currentData} 
        modalTitle="查看事件"
        closeModal={ ()=>setShowCheckModal(false) }
      />
      <EditModal 
        isShowEditModal={isShowEditModal} 
        data={currentData} 
        modalTitle="编辑事件"
        changeStatus={ (id, newData) => changeStatus(id, newData) }
      />

      {/* <MyHeader openInput={}/> */}
      <MyHeader openInput={openInput}/>

      <AddInput
        isInputShow={isInputShow}
        addItem={ addItem }
      />

      {
        todoList.length === 0
        ?
        (
          <div className='todo-list' style={{textAlign: 'center'}}>暂无数据</div>
        )
        :
        (
          <ul className='todo-list'>
            {
              todoList.map((item,index)=>{
                return (
                  <TodoItem 
                    data={item}
                    key={item.id}
                    changeCompleted={ (id, value) => changeCompleted(id, value)}
                    openCheckModal={ (id) => openCheckModal(id) }
                    openEditModal={ (id)=> openEditModal(id) }
                    delItem={id => delItem(id) }
                  ></TodoItem>
                )
              })
            }
          </ul>
        )
      }
      
      
    </div>
  );
}

export default App;
