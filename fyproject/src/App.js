import logo from './logo.svg';
import './App.css';

import Register from './components/screens/Register'
import Login from './components/screens/Login'
import LoginAdmin from './components/screens/LoginAdmin'
import Mainpage from './components/screens/Mainpage'
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import RetailerRoute from "./RetailerRoute";
import Error from './components/screens/Error'
import {
  BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom";
import HomeUser from './components/screens/HomeUser';
import HomeRetail from './components/screens/HomeRetail';
import AddCenter from "./components/screens/AddCenter"
import ListSpecificService from './components/screens/ListSpecificService';
import UserDetails from './components/screens/UserDetails';
import RetailerDetails from './components/screens/RetailerDetails';
import UnAuthorized from './components/screens/UnAuthorized';
import HomeAdmin from './components/screens/HomeAdmin';
import EditCenter from './components/screens/EditCenter';

import ViewUserBookings from './components/screens/ViewUserBookings';
import AllBookings from './components/screens/AllBookings';
import ViewSCReview from './components/screens/ViewSCReview';
import Appoinments from './components/screens/Appointments';
import ViewSCBooking from './components/screens/ViewSCBooking';
import Payment from './components/screens/Payment';
import CreditCardForm from './components/screens/CreditCardForm';
import Welcome from './components/screens/Welcome';
import MainpageRetailer from './components/screens/MainpageRetailer';


function App() {

  
  return (
    <div>
      <Router>
     <Switch>
     <Route path="/" exact component={Welcome}></Route>
     <Route path="/user" exact component={Mainpage}></Route>
     <Route path="/retailer" exact component={MainpageRetailer}></Route>
     <Route path="/user/login" component={Login}></Route>
     <Route path="/admin/login" component={LoginAdmin}></Route>
     <Route path="/retailer/login" component={Login}></Route>
     <Route path="/retailer/register" exact component={Register}></Route>
     <UserRoute path="/user/payment" component={CreditCardForm}></UserRoute>
        <Route path="/user/register" exact component={Register}></Route>
        <AdminRoute path="/admin/home" exact component={HomeAdmin}></AdminRoute>
        <UserRoute path="/user/home" exact component={HomeUser}></UserRoute>
        <UserRoute path="/user/service" exact component={ListSpecificService}></UserRoute>
        <AdminRoute path="/admin/usermanagement" exact component={UserDetails}></AdminRoute>
        <AdminRoute path="/admin/retailermanagement" exact component={RetailerDetails}></AdminRoute>
        <AdminRoute path="/admin/service" exact component={ListSpecificService}></AdminRoute>
        <RetailerRoute path="/retail/home" exact component={HomeRetail}></RetailerRoute>
        <AdminRoute path="/admin/AddServiceCenter" exact component={AddCenter}></AdminRoute>
        <RetailerRoute path="/retail/AddServiceCenter" exact component={AddCenter}></RetailerRoute>
        <AdminRoute path="/admin/allBooking" exact component={AllBookings}></AdminRoute>
        <UserRoute path="/user/mybooking" exact component={ViewUserBookings}></UserRoute>
        <RetailerRoute path="/retail/booking" exact component={ViewSCBooking}></RetailerRoute>
        <UserRoute path="/user/viewscreview" exact component={ViewSCReview}></UserRoute>
        <UserRoute path="/user/Appointment" exact component={Appoinments}></UserRoute>
        <AdminRoute path="/admin/edit" exact component={EditCenter}></AdminRoute>
        <RetailerRoute path="/retail/edit" exact component={EditCenter}></RetailerRoute>
        <Route path="/unauthorized" exact component={UnAuthorized}></Route>
        <Route path="/**" exact component={Error}></Route>
     </Switch>
     </Router>
     
    </div>
   
  );
}

export default App;
