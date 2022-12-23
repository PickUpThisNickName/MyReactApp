import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import {useState} from 'react'
import TableRow from './TableRow'


export class Cabinet extends Component {
  static displayName = Cabinet.name;

  constructor(props) {
    super(props);
    this.state = { 
		books_array: [], 
		loading: true
	};
  }

  componentDidMount() {
    this.getdata();
  }
  
  myHandler(){
	 const token = authService.getAccessToken();
	 fetch('books/add', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
	this.componentDidMount();
	Cabinet.render();
	
  }


    static renderTable(books_array){
	
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
        <tbody style={{textAlign: "center"}}>
          {
			books_array.map(book => <TableRow book={book} edit={false} /> )
		  }
        </tbody>
      </table>

    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Cabinet.renderTable(this.state.books_array);
	
    return (
	      <div>
        <h1 id="tabelLabel">Список книг</h1>
        <p>Это таблица с книгами, здесь можно добавить или удалить книги, а также переименовать существующие</p>
        {contents}
			  			  <button 
			style={{
				width:"100px",
				height:"30px",
				borderRadius: "5px",
				borderColor: "#EEE",
				outline: 0,
				marginLeft: "5px"
			}}
			onClick={this.myHandler}
		>
			Добавить
		</button>

      </div>
    );
  }

  async getdata() {
    const token = await authService.getAccessToken();
    fetch('books/get', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    }).then(res => res.json()).then(
        (result) => {
          this.setState({
            books_array: result,
			loading: false
          });
        }
      );
  }
}

