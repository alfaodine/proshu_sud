const button = document.querySelector("#invoice"),
      userName = document.querySelector('#your_name'),
      userEmail = document.querySelector('#your_email'),
      userText = document.querySelector('#your_text');

function sendEmail (e) {
    e.preventDefault();
    console.log('email');

    fetch('https://xu5va381hj.execute-api.us-east-1.amazonaws.com/sendEmail',      {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: "ustroistva1@gmail.com",
          senderEmail: `${userEmail.value}`,
          message: `${userText.value}`,
        //   base64Data: base64,
          // date: new Date(),
        //   fileName: "TEST_FILE_NAME",
        })
    })
}

function getFieldsValue (e){
  e.preventDefault();
userName.value, userEmail.value, userText.value
}

button.addEventListener('click', sendEmail)