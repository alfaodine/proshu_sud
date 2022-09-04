import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from "./auth.js";

let picker = new AppointmentPicker(document.getElementById("time-form"), {
  interval: 30,
  mode: "24h",
  startTime: 16,
  endTime: 16,
  minTime: 11,
  maxTime: 16,
  allowReset: false,
  large: true,
});

async function getWorkingHours() {
  let workHours = [];
  const myCollection = await getDocs(collection(db, "workHours"));
  myCollection.forEach((doc) => {
    let docData = doc.data();
    workHours.push(docData);
  });
  return workHours
}
let workHours = getWorkingHours();
let fromTo = [];
let disabledHours = [];
let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



let timeForm = document.querySelector("#time-form");
timeForm.addEventListener("click", setDateListener);

function setDateListener() {
  let dateForm = document.querySelector("#date-picker");
  dateForm.addEventListener("change", function setNewPicker(e) {
    timeForm.value = "";
    let dayFromInput = e.target.valueAsDate.getUTCDay();
    workHours.then(res => {
        picker.destroy();
        fromTo = res[0];
        disabledHours = res[1];
        picker = new AppointmentPicker(document.getElementById("time-form"), {
            interval: 30,
            mode: "24h",
            startTime: fromTo[`${week[dayFromInput]}From`],
            endTime: fromTo[`${week[dayFromInput]}To`],
            minTime: fromTo[`${week[dayFromInput]}From`],
            maxTime: fromTo[`${week[dayFromInput]}To`],
            disabled: disabledHours[week[dayFromInput]],
            allowReset: false,
            large: true,
            title: `<input type="date" id="date-picker" value = "${e.target.value}" placeholder="15.05.2022">`,
          });
          picker.open();
          timeForm.setAttribute('data-day', week[dayFromInput]);
          setDateListener();
    });
  });
}
