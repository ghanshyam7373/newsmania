import React, { Component } from 'react';
import News from './News';

class Search extends Component {
    Search = () =>{
        document.getElementById('searchBtn').addEventListener('click',() =>{
            console.log("search");
        })
    }

    render() {
        return (
            <div>
                <News key="science" pageSize="12" country="in" category="science" title=""/>
            </div>
        );
    }
}

export default Search;