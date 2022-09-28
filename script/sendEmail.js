import {
  doc,
  setDoc,
  getDocs,
  collection
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import {
  db
} from './auth.js';


let buttonEmail = document.querySelector("#invoice"),
      userName = document.querySelector('#your_name'),
      userNumber = document.querySelector('#your_number'),
      userEmail = document.querySelector('#your_email'),
      userText = document.querySelector('#your_text'),
      timeForm = document.querySelector("#time-form");

//--------------File field
      let fileField = document.querySelector('#upload'),
          fileFieldModal = document.querySelector('#upload_modal'),
          bs64 = '';


//-------- Modal window fields---------
const buttonModal = document.querySelector("#button_modal");

function getModalFields(e) {
      e.preventDefault();
      userName = document.querySelector('#your_name_modal'),
      userNumber = document.querySelector('#your_number_modal'),
      userEmail = document.querySelector('#your_email_modal'),
      userText = document.querySelector('#your_text_modal');
}

//----------------------------------------

function sendEmail (e) {
    e.preventDefault();
    const date = new Date;
    let dateStr = `${date.getDate()}.${(date.getMonth() > 10) ? (date.getMonth()+1) : '0'+(date.getMonth()+1)}.${date.getFullYear()} ${(date.getHours() > 9) ? date.getHours() : '0'+date.getHours()}:${(date.getMinutes() > 10) ? date.getMinutes() : '0'+date.getMinutes()}`;
    const formData = {
      email: userEmail.value,
      name: userName.value,
      phone: userNumber.value,
      text: userText.value,
      field: 'new',
      service: 'Консультация',
      date: dateStr,
      amount: '300',
      bookingDay: timeForm.getAttribute('data-day'),
      bookingTime: timeForm.value,
    }
    console.log('email', formData);
    addBookedTIme(formData.bookingDay, formData.bookingTime);

    setOrderData(formData);
    

    fetch('https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail',      {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: "yatskevych.andrii@gmail.com",
          // senderEmail: `pravovodese@gmail.com`, // where to send email
          senderEmail: `ustroistva1@gmail.com`, // where to send email
          message: `email: ${userEmail.value}, name: ${userName.value}, tel:${userNumber.value}, msg: ${userText.value}`,
          base64Data: bs64,
          date: new Date(),
          fileName: `${fileNameForEmail+format}`,
          subject: `Заявка от ${userName.value}`
        })
    })
console.log(JSON.stringify({
  senderName: "yatskevych.andrii@gmail.com",
  // senderEmail: `pravovodese@gmail.com`, // where to send email
  senderEmail: `ustroistva1@gmail.com`, // where to send email
  message: `email: ${userEmail.value}, name: ${userName.value}, tel:${userNumber.value}, msg: ${userText.value}`,
  base64Data: bs64,
  date: new Date(),
  fileName: `${fileNameForEmail+format}`,
  subject: `Заявка от ${userName.value}`
}));
buttonEmail.disabled = true;
buttonModal.disabled = true;
}

function getFieldsValue (e){
  e.preventDefault();
userName.value, userEmail.value, userText.value
}


//--------------------Get base64 data--------------
const toBase64 = file => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}


async function getBase64() {
  let file = fileField.files[0];
  bs64 = await toBase64(file);
}
async function getBase64Modal() {
  let file = fileFieldModal.files[0];
  bs64 = await toBase64(file);
}
//-------------------------------------------------------------

//--------------------Set New order in DB----------------------
async function setOrderData(formData) {
  const documentOrders = doc(db, `orders/${formData.email}`);
  try{
    let resp = await setDoc(documentOrders, formData, { merge: true });
    console.log(resp)
   } catch(error) {
    console.log(error)
   }
}

//-------------------------------------------------------------
//------------------Set booked time---------------
async function addBookedTIme (day, time){
  let bookedArray = []
  const myCollection = await getDocs(collection(db, "workHours"));
  myCollection.forEach((doc) => {
      let docData = doc.data();
      bookedArray.push(docData);
    });
    let workHours = bookedArray[1][day];
    let timeToPush = time.split(' ');
    let timeStr = timeToPush[0];
    if (timeStr.length === 4 ) {
      timeStr = '0'+timeStr;
    }
    workHours.push(timeStr);
    console.log(workHours);

    //set booked time to db
    const documentBooked = doc(db, `workHours/tTEKXzSsYSIp3NMUP1v6`);
    let bookedDay = {};
    bookedDay[day] = workHours;
    try{
      let resp = await setDoc(documentBooked, bookedDay, { merge: true });
      console.log(resp)
     } catch(error) {
      console.log(error)
     }

}
//-------------------------------


buttonEmail.addEventListener('click', sendEmail);

buttonModal.addEventListener('click', getModalFields);
buttonModal.addEventListener('click', sendEmail);

//-----------Listener on file loading
fileField.addEventListener('change', getBase64, false );
fileFieldModal.addEventListener('change', getBase64Modal, false );