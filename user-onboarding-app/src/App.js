import logo from './logo.svg';
import './App.css';
import Form from './Form';
import * as yup from 'yup';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import schema from './formSchema';

const initialFormValue = {
  username: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormError = {
  username: "",
  email: "",
  password: "",
};

const initialUser = [];
const initialDisabled = true;

function App() {

  const [user, setUser] = useState(initialUser);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [formError, setFormError] = useState(initialFormError);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [users, setUsers] = useState([]);

  const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then((res) => {
      setUser([res.data, ...user]);
      setFormValue(initialFormValue);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const inputChange = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormError({
        ...formError,
        [name]: '',
      });
    })
    .catch((err) => {
      setFormError({
        ...formError,
        [name]: err.errors[0],
      });
    });
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      username: formValue.username.trim(),
      email: formValue.email.trim(),
      password: formValue.password.trim(),
      
    };
    postNewUser(newUser);
  }

  useEffect(() => {
    postNewUser();
  }, []);

  useEffect(() => {
    schema.isValid(formValue).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValue]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User App</h1>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <Form 
        values={formValue}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formError}
      />

      {/* {user.map(())} */}

    </div>
  );
}

export default App;
