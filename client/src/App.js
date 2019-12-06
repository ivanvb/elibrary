import React from 'react';
import UserRegister from './UserRegister/UserRegister.screen';
import UserLogin from './UserLogin/UserLogin.screen';
import BookForm from './Shared/forms/Book.form';
import CreateBook from './CreateBook/CreateBook.screen';
import EditBook from './EditBook/EditBook.screen';

function App() {
  return (
    <div className="App">
      <UserRegister/>
      <UserLogin/>
      <CreateBook/>
      <EditBook _id="5de99ce3fbbd2367fc3dbc5f"/>
    </div>
  );
}

export default App;
