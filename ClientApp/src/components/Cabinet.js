import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import TableRow from './TableRow';


export class Cabinet extends React.Component {
    static displayName = Cabinet.name;

    constructor(props) {
        super(props);
        this.deleteClick = this.deleteClick.bind(this);
        this.state = { books: [], loading: true };
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    async loadDataFromServer() {
        const token = await authService.getAccessToken();
        const response = await fetch('books/get', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }
    async addClick() {
        const token = await authService.getAccessToken();
        const response = await fetch('books/add', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        this.setState(prevState => ({
            books: [...prevState.books, data],
            loading: false
        }));
    }
        
    deleteClick(id, e) {
        if( window.confirm("вы действительно хотите удалить книгу?") ) {
            const row = e.target.parentNode.parentNode;
            row.parentNode.removeChild(row);

            fetch('books/delete',
                {
                    method: 'POST',
                    headers: new Headers({'Content-Type': 'application/json'}),
                    body: JSON.stringify({"id": id})
                });
        }
    }
        
    static renderTable(books, _deleteClick) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead style={{textAlign: "center"}}>
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Год</th>
                    <th>Жанр</th>
                    <th>Автор</th>
                    <th>Управление</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book =>
                    <TableRow book={book} edit={false} deleteClick={_deleteClick} /> 
                )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                <h1 id="tabelLabel">Список книг</h1>
        <p>Это таблица с книгами, здесь можно добавить или удалить книги, а также переименовать существующие</p>
                {
                    this.state.loading
                        ? <p><em>Loading...</em></p>
                        : Cabinet.renderTable(this.state.books, this.deleteClick)
                }
                <button
                    style={{
                        width:"100px",
                        height:"30px",
                        borderRadius: "5px",
                        borderColor: "#EEE",
                        outline: 0,
                        marginLeft: "5px"
                    }}
                    onClick={()=>{this.addClick()}}
                >
                    Добавить
                </button>
            </div>
            
        );
    }
}


