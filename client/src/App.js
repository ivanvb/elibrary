import React from 'react';
import UserRegister from './UserRegister/UserRegister.screen';
import UserLogin from './UserLogin/UserLogin.screen';
import BookForm from './Shared/forms/Book.form';
import CreateBook from './CreateBook/CreateBook.screen';

function App() {
  return (
    <div className="App">
      <UserRegister/>
      <UserLogin/>
      <CreateBook/>
    </div>
  );
}

export default App;
