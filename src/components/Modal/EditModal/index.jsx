import React, { useRef } from 'react'
import Modal from '../'
import './index.scss'

import { dateFormat } from '../../../libs/utils'

export default function EditModal(props) {

  const { isShowEditModal, modalTitle, data, closeModal, changeStatus } = props,
    contentRef = useRef(),
    checkboxRef = useRef()

  const getStatus = (id)=> {

    const val = contentRef.current.value.trim(),
      valLen = val.length

    if (valLen === 0) {
      contentRef.current.value = data.content
      return
    }
    
    const newData = {
      id: new Date().getTime(),
      content: val,
      completed: checkboxRef.current.checked
    }

    changeStatus(id, newData)
  }
  
  return (
    <Modal
      isShowModal={isShowEditModal}
      modalTitle='编辑'
    >
      <p className="topic">时间：{dateFormat( 'YYYY-mm-dd HH:MM:SS', data.id)}</p>

      <p className="topic">内容：
          <textarea 
            ref={contentRef}
            cols="8" 
            rows="5"
            className="textarea"
            defaultValue={data.content} 
          />
      </p>

      <p className="topic">状态：
        <input 
          ref={checkboxRef}
          type="checkbox" 
          className='check-box'
          defaultChecked={ data.completed ? true : false} 
      />
      </p>
      <button 
        className='btn btn-primary confim-btn'
        onClick={ ()=>getStatus(data.id)}
      >确定</button>
    </Modal>
  )
}
