import React from "react";

const SearchFilter = (props) =>{

    return(
        <div className="search-box">
            <input type="text" placeholder="Search Post, First Name, Last Name"
             value={props.val} name="searchFilter" onChange={props.changed} />
        </div>
    )
}

export default  SearchFilter;