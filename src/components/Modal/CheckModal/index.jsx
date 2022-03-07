import React from 'react'
import './index.scss'

import Modal from '../'

import { dateFormat } from '../../../libs/utils'

export default function CheckModal(props) {

  const { isShowCheckModal, data, closeModal } = props

  return (
    <Modal
      isShowModal={isShowCheckModal}
      modalTitle="查看事件"
    >
      <p className="topic">时间：{ dateFormat('YYYY-mm-dd HH:MM:SS', data.id) }</p>
      <p className="topic">内容：{ data.content }</p>
      <p className="topic">状态： { data.completed ? '已完成': '未完成' }</p>
      <button 
        className='btn btn-primary confim-btn'
        onClick={closeModal}
      >确定</button>
    </Modal>
  )
}
