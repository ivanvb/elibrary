import React, {useContext} from 'react';
import UserRegister from './UserRegister/UserRegister.screen';
import UserLogin from './UserLogin/UserLogin.screen';
import BookForm from './Shared/forms/Book.form';
import CreateBook from './CreateBook/CreateBook.screen';
import EditBook from './EditBook/EditBook.screen';
import HomeScreen from './HomeScreen/HomeScreen.screen';
import ReadBook from './ReadBook/ReadBook.screen';
import Audio from './AudioComponent/Audio';
import BookDetails from './BookDetails/BookDeatils.screen';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile.screen';
import {UserContext} from './Shared/context/User.context';
import AppNavbar from './Shared/Navbar/AppNavbar';
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import DeleteBook from './DeleteBook/DeleteBook';

function App() {
    let [user] = useContext(UserContext);
    return (
    <div className="App">
        <Router>
            <AppNavbar/>
            <div className="container">
                <Switch>
                    <ProtectedRoute 
                        path="/createBook" 
                        pathToRedir="/"
                        condition={user.isAuthenticated && user.admin}
                        component={CreateBook}/>
                    <ProtectedRoute 
                        path="/editBook" 
                        pathToRedir="/"
                        condition={user.isAuthenticated && user.admin}
                        component={EditBook}/>
                    <ProtectedRoute
                        path="/login"
                        pathToRedir="/"
                        condition={!user.isAuthenticated}
                        component={UserLogin}/>
                    <ProtectedRoute
                        path="/signup"
                        pathToRedir="/"
                        condition={!user.isAuthenticated}
                        component={UserRegister}/>
                    <ProtectedRoute
                        path="/"
                        pathToRedir="/login"
                        condition={user.isAuthenticated}
                        component={HomeScreen}
                        exact/>
                    <ProtectedRoute
                        path="/myprofile"
                        pathToRedir="/login"
                        condition={user.isAuthenticated}
                        component={UserProfile}/>
                    <ProtectedRoute
                        path="/details"
                        pathToRedir="/login"
                        condition={user.isAuthenticated}
                        component={BookDetails}/>
                    <ProtectedRoute
                        path="/delete"
                        pathToRedir="/login"
                        condition={user.isAuthenticated}
                        component={DeleteBook}/>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
