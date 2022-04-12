import logo from './logo.svg';
import './App.css';

import Register from './components/screens/Register'
import Login from './components/screens/Login'
import Mainpage from './components/screens/Mainpage'
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import RetailerRoute from "./RetailerRoute";
import Error from './components/screens/Error'
import {
  BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomeUser from './components/screens/HomeUser';
import HomeRetail from './components/screens/HomeRetail';
import AddCenter from "./components/screens/AddCenter"
import ListSpecificService from './components/screens/ListSpecificService';
import UserDetails from './components/screens/UserDetails';
import RetailerDetails from './components/screens/RetailerDetails';
import UnAuthorized from './components/screens/UnAuthorized';
import HomeAdmin from './components/screens/HomeAdmin';
import EditCenter from './components/screens/EditCenter';
function App() {
  return (
    <div>
      <Router>
     <Switch>
     <Route path="/" exact component={Mainpage}></Route>
     <Route path="/Login" component={Login}></Route>
        <Route path="/Register" exact component={Register}></Route>
        <AdminRoute path="/admin/home" exact component={HomeAdmin}></AdminRoute>
        <UserRoute path="/user/home" exact component={HomeUser}></UserRoute>
        <UserRoute path="/user/service" exact component={ListSpecificService}></UserRoute>
        <AdminRoute path="/admin/usermanagement" exact component={UserDetails}></AdminRoute>
        <AdminRoute path="/admin/retailermanagement" exact component={RetailerDetails}></AdminRoute>
        <AdminRoute path="/admin/service" exact component={ListSpecificService}></AdminRoute>
        <RetailerRoute path="/retail/home" exact component={HomeRetail}></RetailerRoute>
        <AdminRoute path="/admin/AddServiceCenter" exact component={AddCenter}></AdminRoute>
        <RetailerRoute path="/retail/AddServiceCenter" exact component={AddCenter}></RetailerRoute>
        <AdminRoute path="/admin/edit" exact component={EditCenter}></AdminRoute>
        <Route path="/unauthorized" exact component={UnAuthorized}></Route>
        <Route path="/**" exact component={Error}></Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
