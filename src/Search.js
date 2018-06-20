import * as BooksAPI from "./BooksAPI";
import React, { Component } from "react";
class Search extends Component{
    render(){
        (BooksAPI.search('Android',10)).then(json=>{console.log(json)})
        return (<div>Hello</div>);
    }
}

export default Search;