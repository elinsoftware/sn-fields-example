import React, {useState, useEffect} from "react" 
import axios from 'axios'
import {Popover, Button, Menu, MenuItem} from '@blueprintjs/core'

const DropDownField = ({table,field, placeholder, icon, onChange, style},props) => {
  const [selectedChoice,setSelectedChoice] = useState({})
  const [choices, setChoices] = useState([])
  useEffect(()=>{
    if (onChange!=undefined) onChange(selectedChoice)
    if (choices.length===0) {
        axios.get(`/api/now/table/sys_choice?sysparm_query=name=${table}^element=${field}^inactive=false^language=en`)
        .then(response=>{
          setChoices(response.data.result)
        })
      }
  },[selectedChoice])

  return (
  <Popover content={
    <div style={{padding:"4px"}}>
       <Menu>
         {choices.length>0 && choices.map(item=>{
           return (<MenuItem text={item.label} key={item.sys_id} 
                      active={item.sys_id===selectedChoice.sys_id?true:false}
                      onClick={()=>setSelectedChoice(item)}/>)
         })}
       </Menu>
   </div>
  }>
    <Button icon={icon} text={selectedChoice.sys_id?selectedChoice.label:placeholder} style={style} rightIcon="caret-down"/>
  </Popover>
)}

export default DropDownField