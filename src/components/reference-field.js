import React, {useState, useEffect, useRef} from "react" 
import axios from 'axios'
import {DebounceInput} from 'react-debounce-input';
import {Popover, Button,Menu, MenuItem} from '@blueprintjs/core'
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

//Wrapper function renders an infinite list of items
function Wrapper ({ hasNextPage, isNextPageLoading, items, loadNextPage, sortOrder, minimumBatchSize, width, setSelectedRecord, primaryField, secondaryField}) {
  const listRef = useRef(null);
  const hasMountedRef = useRef(false);  
  useEffect(() => {
    if (listRef.current && hasMountedRef.current) {
      listRef.current.resetloadMoreItemsCache();
    }
    hasMountedRef.current = true;
  }, [sortOrder]);

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = index => !hasNextPage || index < items.length;

  const Item = ({ index, style }) => {
    let content;
    let label;
    if (!isItemLoaded(index)) {
      content = <span className="bp3-text-muted">Loading...</span>;
    } else {
      content = items[index][primaryField].display_value;
      label = (<span className="bp3-text-small">{items[index][secondaryField].display_value}</span>)
    }
    if (content=='$ph1.2$') return <MenuItem style={style} text={<span className="bp3-text-muted">no records found</span>} />;
    if (content=='$ph2.2$' || content=='$ph1.1$') return null
    else return <MenuItem style={style} text={content} label={label} onClick={()=>setSelectedRecord(items[index])}/>;
  }
  
  return (
    <Menu style={{width:width}}>
    <InfiniteLoader
      ref={listRef}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      minimumBatchSize={minimumBatchSize}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={300}
          itemCount={itemCount}
          itemSize={30}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
    </Menu>
  );
}

const ReferenceField = ({table,primaryField, secondaryField, placeholder, icon, onChange},props) => {
  const PAGE = 50
  const [selectedRecord,setSelectedRecord] = useState({})
  const [state, setState] = useState({
    hasNextPage:true,
    isNextPageLoading: false,
    items:[],
    searchTerm: "",
  })
  
  useEffect(()=>{
    if (onChange!=undefined) onChange(selectedRecord)
  },[selectedRecord])

  function loadNextPage(...args) {
      setState(state, {isNextPageLoading: true})
      axios.get(`/api/now/table/${table}?sysparm_offset=${state.items.length}&sysparm_limit=${PAGE}&sysparm_query=ORDERBY${primaryField}^${primaryField}LIKE${state.searchTerm}&sysparm_display_value=all`)
          .then(response=>{
            // we need to make sure items array has at lease 2 items, that's required for react-window lists
            let itemsData = []
            if ([...state.items].concat(response.data.result).length>1) itemsData = [...state.items].concat(response.data.result)
            else if ([...state.items].concat(response.data.result).length==1) itemsData=[...state.items].concat(response.data.result,[{[primaryField]:{display_value:'$ph1.1$'},[secondaryField]:{display_value:'$ph1.1$'}}])
            else itemsData=[...[{[primaryField]:{display_value:'$ph1.2$'},[secondaryField]:{display_value:'$ph1.2$'}},{[primaryField]:{display_value:'$ph2.2$'},[secondaryField]:{display_value:'$ph2.2$'}}]]
            setState({
              hasNextPage: (response.data.result.length<PAGE)?false:true,
              isNextPageLoading: false,
              items: itemsData,
              searchTerm: state.searchTerm,
            })
          })
  }

function handlesearchTermChange(e){
      setState({
        searchTerm: e.target.value?e.target.value:'',
        items: [],
        hasNextPage: true,
        isNextPageLoading: false,
      });
  }

const { hasNextPage, isNextPageLoading, items, searchTerm } = state;
  return (
  <Popover onClose={handlesearchTermChange} content={
      <div style={{width:"300px", padding:"4px"}}>
      <div className="bp3-input-group">
         <span className="bp3-icon bp3-icon-search"></span>
         <DebounceInput
           className="bp3-input"
           autoFocus
           minLength={1}
           debounceTimeout={500}
           placeholder={placeholder}
           onChange={handlesearchTermChange}
           value={state.searchTerm} />
           <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-cross" onClick={handlesearchTermChange}></button>
       </div>
       <Wrapper
         hasNextPage={hasNextPage}
         isNextPageLoading={isNextPageLoading}
         items={items}
         searchTerm={searchTerm}
         loadNextPage={loadNextPage}
         minimumBatchSize={PAGE}
         width={294}
         setSelectedRecord={setSelectedRecord}
         primaryField={primaryField}
         secondaryField={secondaryField}
       />
   </div>
  }>
    <Button icon={icon} text={selectedRecord[primaryField]?selectedRecord[primaryField].display_value:placeholder} rightIcon="caret-down"/>
</Popover>
)}

export default ReferenceField