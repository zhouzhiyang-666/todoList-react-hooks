import React, { useRef } from 'react'
import './index.scss'

export default function TodoItem(props) {

  const {data, changeCompleted, openCheckModal, delItem, openEditModal} = props,
    checkRef = useRef()


  return (
    <li className='todo-item'>
      <div className='chech-box'>
        <input 
          ref={checkRef}
          type="checkbox" 
          defaultChecked={data.completed}
          onChange={()=>changeCompleted(data.id,checkRef.current.checked)}
        />
      </div>
      <span 
        className='content'
        style={{'textDecoration': data.completed ? 'line-through': 'none'}}
      >
        { data.content }
      </span>
      <div className='btn-group'>
        <button 
          className='btn btn-primary' 
          onClick={ () => openCheckModal(data.id) }
        >查看</button>
        <button 
          className='btn btn-warnning'
          onClick={ () => openEditModal(data.id)}
        >编辑</button>
        <button 
          className='btn btn-error'
          onClick={ () => { delItem(data.id) }}  
        >删除</button>
      </div>
    </li>
  )
}
