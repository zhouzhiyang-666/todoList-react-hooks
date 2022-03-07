import React from 'react'

export default function Test(props) {

  const { title, onChange } = props

  return (
    <>
      <h1>{title}</h1>
      <button onClick={()=>onChange('这是回标题三')}>修改标题</button>
    </>
  )
}
