import React, {useEffect} from 'react';
import EditServiceForm from './EditServiceForm';
import NavBar from './Navbar';
import NavBarRetail from './NavbarRetail';

function EditCenter(){
    let center =JSON.parse( localStorage.getItem('SelectedCenter'));
    const isAdmin = localStorage.getItem("isAdmin");
    useEffect(() => {
        document.title = "WatchService || EditCenter";
      },[]);
    return(
        <>
        {isAdmin ?<NavBar/>:<NavBarRetail/>
        }
        <div className='edit-temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
                <div className="col-md-4" style={{justifyContent:"center",alignItems:"center"}}>
                    <img src={center.imageurl} alt="" style={{height:300,width:300,borderRadius:"50%",marginTop:"20%"}}/>
                    <h1 className='mt-3'>{center.name}</h1>
                    {/* <div className='edit-details'>
                        <h3 className='text-center'>Watch id:{center.id}</h3>
                        <h3 className='text-center'>Name:{center.name}</h3>
                        <h3 className='text-center'>Address:{center.address} </h3>
                        <h3 className='text-center'>Email:{center.email} </h3>
                        <h3 className='text-center'>Phone Number:{center.mobile} </h3>
                        <h3 className='text-center'>Details:{center.details}</h3>
                    </div> */}
               <EditServiceForm/>

                </div>
                <div className="col-md-4 text-center">
                </div>

            </div>
        </div>
        </div>
        </>
    );
}
export default EditCenter;