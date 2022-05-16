import {
  doc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import {
  db
} from './auth.js';

let submitBtn = document.querySelector('#regForm');

submitBtn.addEventListener('click', getFormData);

let pageName = window.location.href.split('/');
pageName = pageName[pageName.length - 1].replace('.html', '')


let prices = {
  'service-alimony-order': {
    price: 600,
    name: 'Приказ на взыскание алиментов'
  },
  'communication-with-the-child': {
    price: 2000,
    name: 'Установление режима общения с ребенком'
  },
  'deprivation-of-parental-rights':{
    price: 2200,
    name: 'Лишение родительских прав'
  },
  'divorce':{
    price: 1500,
    name: 'Расторжение брака'
  },
  'travel-permit-for-a-child':{
    price: 1500,
    name: 'Разрешение на временный выезд ребенка'
  },
  'service-child-support-costs':{
    price: 1900,
    name: 'Дополнительные расходы на содержание ребенка'
  },
  'service-disputing-paternity':{
    price: 1800,
    name: 'Исковое заявление об оспаривании отцовства'
  },
  'service-division-of-property':{
    price: 2500,
    name: 'Раздел имущества супругов'
  },
  'service-recovery-of-alimony-for-adult-children':{
    price: 1200,
    name: 'Взыскание алиментов на совершеннолетних детей'
  },
  'service-recovery-of-alimony-for-minor-children':{
    price: 900,
    name: 'Взыскание алиментов на несовершеннолетних детей'
  },
}

console.log(prices[pageName].price);


function getFormData() {
  let x = document.getElementsByClassName("tab");
  let textFromForm = ``;
  if (currentTab >= x.length) {
    let allFields = document.querySelectorAll('input[type="text"], input[type="date"], input[type="radio"]:checked, input[type="checkbox"]:checked, textarea');
    let allLabels = document.querySelectorAll('.tab > label, .register-form > label, .personal-info-form > label, .radio-btn > label, .checkbox > label');
    for (let i = 0; i < allFields.length; i++) {
      textFromForm += `${allLabels[i].innerText}: ${allFields[i].value} \n`;
    }

    //-------------------set order in db
    const date = new Date;
    const dateStr = `${date.getDate()}.${(date.getMonth() > 10) ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    let emailField = document.querySelector('#personal_email');
    let nameField = document.querySelector('#personal_name');
    let midField = document.querySelector('#personal_midname');
    let lastNameField = document.querySelector('#personal_lastname');
    let phoneField = document.querySelector('#personal_phone');
    const formData = {
      email: emailField.value,
      name: `${lastNameField.value} ${nameField.value} ${midField.value}`,
      phone: phoneField.value,
      text: textFromForm,
      field: 'new',
      service: prices[pageName].name,
      date: dateStr,
      amount: prices[pageName].price,
    }
  
    //--------------------------------------
    setOrderData(formData);

    sendEmail(textFromForm);
    getInvoice(prices[pageName], emailField.value);
  }

}

function sendEmail(text) {


  fetch('https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail', {
    mode: "no-cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderName: "ustroistva1@gmail.com",
      senderEmail: `ustroistva@gmail.com`,
      message: `${text}`,
      base64Data: '',
      date: new Date(),
      fileName: 'no_file',
      subject: `Новая заявка`
    })
  })
}


const getInvoice = async (service, email) => {

  let response = '';
  const reqBody = {
    amount: (service.price*100),
    ccy: 980,
    merchantPaymInfo: {
      reference: email,
      destination: "Покупка иска на Proshu Sud",
      basketOrder: [{
        name: service.name,
        qty: 1,
        sum: (service.price*100),
        icon: "string",
        unit: "шт.",
      }, ],
    },
    redirectUrl: "https://proshusud.com.ua/payment.html/",
    validity: 3600,
    webHookUrl: "https://xu5va381hj.execute-api.us-east-1.amazonaws.com/updatePaymentStatus",
    paymentType: "debit",
  }

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

  setPaymentData(invoiceId, email);

  window.open(pageUrl, "_self").focus();
};


//--------------------Set New order in DB----------------------
async function setOrderData(formData) {
  const documentOrders = doc(db, `orders/${formData.email}`);
  try{
    let resp = await setDoc(documentOrders, formData, { merge: true });
   } catch(error) {
    console.log(error)
   }
}


//-------------------------------------------------------------

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