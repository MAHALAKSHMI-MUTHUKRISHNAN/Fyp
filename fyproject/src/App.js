import logo from './logo.svg';
import './App.css';

import Register from './components/screens/Register'
import Login from './components/screens/Login'
import Mainpage from './components/screens/Mainpage'
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import RetailerRoute from "./RetailerRoute";
import {
  BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Search from './components/screens/Home';
import HomeUser from './components/screens/HomeUser';
import HomeRetail from './components/screens/HomeRetail';
import AddCenter from "./components/screens/AddCenter"
import ListSpecificService from './components/screens/ListSpecificService';
function App() {
  return (
    <div>
      <Router>
     <Switch>
     <Route path="/" exact component={Mainpage}></Route>
     <Route path="/Login" component={Login}></Route>
        <Route path="/Register" exact component={Register}></Route>
        <AdminRoute path="/admin/home" exact component={Search}></AdminRoute>
        <UserRoute path="/user/home" exact component={HomeUser}></UserRoute>
        <UserRoute path="/user/service" exact component={ListSpecificService}></UserRoute>
        <RetailerRoute path="/retail/home" exact component={HomeRetail}></RetailerRoute>
        <AdminRoute path="/admin/AddServiceCenter" exact component={AddCenter}></AdminRoute>
        <RetailerRoute path="/retail/AddServiceCenter" exact component={AddCenter}></RetailerRoute>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
