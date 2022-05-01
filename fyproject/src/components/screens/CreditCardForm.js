import React,{useState} from "react";
import NavbarUser from './NavbarUser';
import { Button,Form , Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosObject from '../../api/bootapi';
import '../styles/CreditCardForm.css';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";

const CreditCardForm = () => {
  const [values, setValues] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiration: '',
    cardSecurityCode:''
})

const finalPay = localStorage.getItem('finalPay');
const isFinalPay = localStorage.getItem('isFinalPay');
const custEmail = localStorage.getItem('custEmail');
const centerEmail = localStorage.getItem('centerEmail');
const handleChange = e => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
   
}

const handleFocus = (e) => {
  setValues({ 
      ...values,
      focus: (e.target.name === 'cardSecurityCode') ? 'cvc' : e.target.name
  });
}

const editPayment=()=>{
  let id = localStorage.getItem('appId');
  
  axiosObject.put(`/payment/${id}`).then(
    (response)=>{
      localStorage.removeItem("appId");
      toast.success('payment successful',{autoClose: 2000});
      setTimeout(() => { window.location.replace('/user/mybooking'); }, 2000);
    },(error)=>{
      console.log(error);
    }
  )
  
      
  var templateParams = {

    centermail : centerEmail,
    email : custEmail,
    decision : 'Initial Payment is done '
};
emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
.then(function(response) {
   alert('SUCCESS!', response.status, response.text);
   localStorage.removeItem("custEmail");
   localStorage.removeItem("centerEmail");
}, function(error) {
   alert('FAILED...', error);
});
}

const editFinalPay=()=>{
  let id = localStorage.getItem('appId');
  axiosObject.put(`/finalpay/${id}`).then(
    (response)=>{
      localStorage.removeItem("appId");
      localStorage.removeItem("finalPay");
      localStorage.removeItem("isFinalPay");
      toast.success('payment successful',{autoClose: 2000});
      setTimeout(() => { window.location.replace('/user/mybooking'); }, 2000);
    },(error)=>{
      console.log(error);
    }
  )
  var templateParams = {
    email : custEmail,
    decision : 'Final Payment done'
};
emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
.then(function(response) {
   alert('SUCCESS!', response.status, response.text);
}, function(error) {
   alert('FAILED...', error);
});
}

const handleSubmit =e => {
    e.preventDefault();
    {
isFinalPay ? editFinalPay():editPayment();
    }
  
    
};
  return (
    <>
    <ToastContainer/>
    <div className="App-temp">
       <NavbarUser/>
      <div className="container-credit">
        <div className="box justify-content-center align-items-center">
          <div className="formDiv">
          <div className="creditCard">
          <Cards
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
            cvc={values.cardSecurityCode}
          />
          
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              Card Name:
              <Form.Control
                type="text"
                id="cardName"
                name="cardName"
                placeholder="Cardholder Name"
                value={values.cardName}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              />
          
            </Form.Group>
            <Form.Group>
              Card Number:
              <Form.Control
                type="text"
                id="cardNumber"
               required
                name="cardNumber"
                placeholder="Card Number"
                value={values.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                minLength="16"
                maxLength="16"
              />
            </Form.Group>
            <Row>
            <Col>
                <Form.Group>
                  Expiration Date:
                  <Form.Control
                    type="text"
                    id="cardExpiration"
                    required
                    name="cardExpiration"
                    placeholder="Expiration Date"
                    value={values.cardExpiration}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    minLength="4"
                    maxLength="4"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col>
                <Form.Group>
                  CVV number:
                  <Form.Control
                    type="tel"
                    id="charge"
                    required
                    name="cardSecurityCode"
                    placeholder="Please Enter your cvv"
                    value={values.cardSecurityCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    minLength="3"
                    maxLength="3"
                  />
                </Form.Group>
              </Col>
            </Row>
            {
              isFinalPay ? <Row>
              <Col>
                  <Form.Group>
                    Charges:
                    <Form.Control
                      type="text"
                      id="charge"
                      required
                      name="charge"value={finalPay}
                     
                    />
                  </Form.Group>
                </Col>
              </Row> :
              <Row>
              <Col>
                  <Form.Group>
                    Charges:
                    <Form.Control
                      type="text"
                      id="charge"
                      required
                      name="charge"value="100"
                     
                    />
                  </Form.Group>
                </Col>
              </Row>
            }
            
            
         <br/>
            <Button
              size={"block"}
              id="validateButton"
              type="submit"
            >
              Pay
            </Button>
            
          </Form>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default CreditCardForm;