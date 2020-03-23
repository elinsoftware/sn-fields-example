import React,{useState} from "react"
import ReferenceField from './reference-field'
import DropDownField from './dropdown-field'


const App = () => {
    const [state, setState] = useState({})
    
    const handleUser= (user) => {
        setState(state,{user})
    }

    return (<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"26px",margin:"46px"}}>
        <div>
            <p className="bp3-text-large">Reference to <code>sys_user</code> table</p>
            <ReferenceField table="sys_user" primaryField="name" secondaryField="email" placeholder="Select a user.." onChange={handleUser}/>
        </div>
        <div>
            <p className="bp3-text-large">Configuration Items</p>
            <ReferenceField table="cmdb_ci" primaryField="name" secondaryField="asset_tag" placeholder="Select CI..." icon="layers" />
        </div>
        <div>
            <p className="bp3-text-large">Dropdown <code>contact_type</code> on a task table</p>
            <DropDownField table="task" field="contact_type" placeholder="Select Contact type" icon="trending-up"/>
        </div>
        <div>
            <p className="bp3-text-large"><code>State</code> field on a task table</p>
            <DropDownField table="task" field="state" placeholder="State" icon="diagram-tree"/>    
        </div>
        </div>
    </>)
}

export default App

/*
Reference field params:
    table - ServiceNow table to pull records from
    primary field - primary field to be used for filtering
    secondary field - secondary field to display in the list
    placeholder - text to display when nothing selected yet
    onChange - function to be triggered when a record selected
    icon - blueprintjs icon name (https://blueprintjs.com/)

Dropdown params:
    table - ServiceNow where the dropdown defined
    field - ServiceNow field name
    placeholder - text to display when nothing selected yet
    icon - blueprintjs icon name (https://blueprintjs.com/)
    
Examples:
        <ReferenceField table="sys_user" primaryField="name" secondaryField="email" placeholder="Select a user.." onChange={handleUser}/>
        <ReferenceField table="incident" primaryField="number" secondaryField="category" placeholder="Select Incident..." icon="geosearch" />
        <ReferenceField table="cmdb_ci" primaryField="name" secondaryField="asset_tag" placeholder="Select CI..." icon="layers" />
        <ReferenceField table="sc_cat_item" primaryField="name" secondaryField="active" placeholder="Request Item" icon="box" />
        <DropDownField table="incident" field="category" placeholder="Select category"/>
        <DropDownField table="task" field="priority" placeholder="Priority" icon="trending-up"/>
        <DropDownField table="task" field="state" placeholder="State" icon="diagram-tree"/>
        <DropDownField table="change_request" field="category" placeholder="Change Category" icon="data-lineage"/>
*/