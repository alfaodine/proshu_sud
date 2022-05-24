import {
  doc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import {
  db
} from './auth.js';

const button = document.querySelector("#invoice");
const buttonModalInvoice = document.querySelector("#button_modal");
const userEmail = document.querySelector('#your_email');

const reqBody = {
    amount: 30000,
    ccy: 980,
    merchantPaymInfo: {
      reference: "test1ustroistva@gmail.com",
      destination: "Оплата юридичних послуг ProshuSud",
      basketOrder: [
        {
          name: "Юридическая консультация",
          qty: 1,
          sum: 30000,
          icon: "string",
          unit: "шт.",
        },
      ],
    },
    redirectUrl: "https://proshusud.com.ua/payment.html",
    webHookUrl: "https://xu5va381hj.execute-api.us-east-1.amazonaws.com/updatePaymentStatus",
    validity: 3600,
    paymentType: "debit",
  }

const call = async (e) => {
    e.preventDefault();
    reqBody.merchantPaymInfo.reference = userEmail.value;
    let response = '';

  try {
    response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "X-Token": "mywjyF3uLxweaEdGkdXL2Ww",
        "X-Token": "uN3ugCfes6OMV_LaY2Wu9WpbMEY1T4xTjNCClxf6wKO4",
      },
      body: JSON.stringify(reqBody)
    });
  } catch (e) {
    console.log(e);
  }
  
  const { pageUrl, invoiceId } = await response.json();

  setPaymentData(invoiceId, userEmail.value);

  window.open(pageUrl, "_self").focus();
};


//--------------------Set Payment info in DB----------------------
async function setPaymentData(invoiceId, email) {
  const documentOrders = doc(db, `orders/${email}`);
  try{
    let resp = await setDoc(documentOrders, {id: invoiceId}, { merge: true });
    console.log(resp)
   } catch(error) {
    console.log(error)
   }
}


//-------------------------------------------------------------

button.addEventListener('click', call)
buttonModalInvoice.addEventListener('click', call)