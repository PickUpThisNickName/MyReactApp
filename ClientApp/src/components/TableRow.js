import React, { Component } from 'react';

class TableRow extends React.Component {

    constructor(props) {
        super(props);      
        this.deleteClick = this.deleteClick.bind(this);
        this.state = { 
            book: props.book, 
            prevBook: props.book, 
            editing: props.edit 
        };
    }
  
    setChange(){
        this.setState(prevState=>({
            book:  Object.assign({}, prevState.book),
            prevBook: Object.assign({}, prevState.book),
            editing: true
        }));        
    }
    
    changeHandler(){
        if( window.confirm("сохранить изменения?") )
        {
            fetch('books/change',
                {
                    method: 'POST',
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                    body: JSON.stringify(this.state.book)
                }).then(()=>{
                    this.setState(prevState=>({
                        book: prevState.book,
                        prevBook: prevState.prevBook,    
                        editing: false
                    }));
            });
        }    
    }
    
    canselHandler(){
        this.setState(prevState=>({
            book: Object.assign({}, prevState.prevBook),
            prevBook: prevState.prevBook,
            editing: false
        }));
    }

    setProp(name, target){
        this.setState(prevState=> {
            prevState.book[name] = target.value;
            this.deleteClick = this.deleteClick.bind(this);
            return {
                book: prevState.book,
                prevBook: prevState.prevBook,
                editing: prevState.editing
            }  
        })
    }

    deleteClick(e){   
        this.props.deleteClick(this.state.book.id, e);
    }
    
    render(){
        return (          
            <>
            {
            this.state.editing
            ? (
                <tr key={this.state.book.id}>
                    <td>{this.state.book.id}</td>
                    <td><input type="text" value={this.state.book.name} 
                        onChange={({ target }) => this.setProp("name", target)} 
                        /></td>
                    <td><input type="text" value={this.state.book.year} 
                        onChange={({ target }) => this.setProp("year", target)}
                        /></td>
                    <td><input type="text" value={this.state.book.genre} 
                        onChange={({ target }) => this.setProp("genre", target)} 
                         /></td>
                    <td><input type="text" value={this.state.book.autor} 
                        onChange={({ target }) => this.setProp("autor", target) } 
                        /></td>
                    <td>
                        <button
                            style={{ border:0, background:0, paddingLeft: "30px" }}
                            onClick={e => this.changeHandler()}
                        >
                            ✓
                        </button>
                        <button
                            style={{ border:0, background:0, paddingLeft: "30px", transform: "scale(-1, 1)" }}
                            onClick={()=>this.canselHandler()}
                        >
                            ✖
                        </button>
                    </td>
                </tr>
            )
            : (
            <tr key={this.state.book.id}>
                <td>{this.state.book.id}</td>
                <td>{this.state.book.name}</td>
                <td>{this.state.book.year}</td>
                <td>{this.state.book.genre}</td>
                <td>{this.state.book.autor}</td>
                <td>
                    <button
                        style={{ border:0, background:0, paddingRight: "30px", transform: "scale(-1, 1)" }}
                        onClick={()=>this.setChange()}
                    >
                        ✎
                    </button>
                    <button
                        style={{ border:0, background:0, paddingLeft: "30px" }}
                        onClick={(e)=>this.deleteClick(e)}
                    >
                        🗑️
                    </button>
                </td>
            </tr>
            )
            }
            </>
        )
    }
}

export default (TableRow);