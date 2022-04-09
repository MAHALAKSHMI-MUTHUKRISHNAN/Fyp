import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import '../styles/UserDetails.css'
import NavBar from './Navbar';
import Modal from 'react-modal';
import EditUser from "./EditUser";


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius:10,
    },
  };

Modal.setAppElement('#root');

const remove=(value)=>{
   axiosObject.delete(`/deleteUser/${value}`).then(
        (response)=>{
            console.log("User Deleted");
            console.log(response);
            refreshPage();
        },(error)=>{
            console.log(error);
        }
    )
}
const refreshPage=()=>{
    window.location.reload(false);
}
function UserDetails() {

    const getAllUser=()=>{
        axiosObject.get(`/getOnlyUser`).then(
            (response)=>{
                console.log("user fetched");
                setData(response.data);
            },(error)=>{
                console.log(error);
            }
        );
    };
    useEffect(()=>{
        document.title="watchService || User Management"
        getAllUser();
    },[]);
    const [data,setData]=useState([
        {id:1,name:"user1",username:"testUser",email:"user@gmail.com",mobile:"6934673464",role:"user",password:"kgdakg"},
    ])
    const [modalData,setModalData]=useState([
        {id:1,name:"user1",username:"testUser",email:"user@gmail.com",mobile:"6934673464",role:"user",password:"kgdakg"},
    ])
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    
    function openModal() {
      setIsOpen(true);
    }
    
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
    
    function closeModal() {
      setIsOpen(false);
    }

    return (
    <><NavBar /><div className="App" id ="user-management">
          <table border>
              <tr>
                  <th>Name</th>
                
                  <th>Email</th>
                  <th>Phoneno</th>
                  
              </tr>
              {data.map((val, key) => {
                  return (
                    <>
                      <tr key={key}>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td colSpan={2}>{val.mobile}</td>

                          <td><button id="removeUserButton" onClick={() => remove(val.id)} className='action'>remove</button></td>
                          <td><button id="editUserButton" className='action' onClick={()=>{openModal();setModalData(val)}}>edit</button>
                          <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <EditUser user={modalData}/>
                    </Modal>

                          </td>
                      </tr>

                      </>
                  );
              })}
          </table>
      </div></>
  );
}
  
export default UserDetails;