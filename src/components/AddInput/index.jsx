import React, { useRef } from 'react'
import './index.scss'

export default function AddInput(props) {

  const { isInputShow, addItem } = props,
    inputRef = useRef()

  function submitValue() {
    const inputValue = inputRef.current.value.trim()

    if (inputValue.length ===0) {
      alert('请输入内容')
      return;
    }

    addItem(inputRef.current.value);

    inputRef.current.value = '';
    
  }

  return (
    <>
      {
        isInputShow ?
          (
            <div className='input-wrapper'>
              <input
                ref={inputRef}
                type="text"
                placeholder='请输代办事件'
              />
              <button
                className='btn btn-primary'
                onClick={submitValue}
              >添加</button>
            </div>
          )
          :
          ''
      }
    </>
  )
}
