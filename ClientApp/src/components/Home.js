import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Стартовая страница</h1>
        <p>Добро пожаловать на стартовую страницу</p>
		<p>Чтобы использовать библиотеку, необходимо войти или зарегистрироваться. После регистрации нужно обязательно подтвердить учетную запись, нажав на соответсвующую ссылку</p>
      </div>
    );
  }
}
