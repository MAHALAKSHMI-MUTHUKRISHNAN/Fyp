import React, {useEffect} from 'react';
import '../styles/AddCenter.css';

import AddServiceAdmin from './AddServiceAdmin';
import AddServiceForm from './AddService';
import NavBar from './Navbar';
import NavBarRetail from './NavbarRetail';
function AddCenter(){
    useEffect(() => {
        document.title = "WatchService || AddCenter";
      },[]);
     
      const isAdmin = localStorage.getItem("isAdmin");
    return(
        <>
        {isAdmin ?<NavBar/>:<NavBarRetail/>
        }
        
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
               
                <div className="col-md-5 text-center">
                {isAdmin ?
        
                    <AddServiceAdmin/>:
                    <AddServiceForm/>
                    }
                </div>

            </div>
        </div>
        </div>
        </>
    );
}
export default AddCenter;