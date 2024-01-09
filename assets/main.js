(function () {
  // Creating an instance in the client and resizing it
  var client = ZAFClient.init();
  client.invoke("resize", { width: "100%", height: "600px" });
})();

// Variables we're going to need
const API_KEY = "nPlBkkllcCfkvf6wvwM45zv8tOrnyX6btSAPn1KC";
const NASA_API = "https://api.nasa.gov/planetary/apod";
const modalContainer = document.getElementById("modal-container");
const modalImage = document.getElementById("modal-image");
let modalTrigger;

// Setting our datepicker
let datePicker = document.getElementById("datepicker");
// Get today's date and formatting it for the datepicker to display it correctly
// (toISOString function ignores the time zone offset)
const tzoffset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - tzoffset).toISOString().split("T")[0];
datePicker.setAttribute("max", today);
datePicker.value = today;

// Fetching the img from NASA's API
const fetchImage = async () => {
  let date = datePicker.value;
  try {
    let res = await fetch(`${NASA_API}?api_key=${API_KEY}&date=${date}`);
    res = await res.json();

    const content = document.getElementById("content");
    content.innerHTML = `
      <p><b>Explanation: </b>${res.explanation}</p>
      <p><b>Image: </b></p>
      <img id="modal-trigger" width="100px" src="${res.url}" />
    `;
    
    modalTrigger = document.getElementById("modal-trigger");
    modalTrigger.addEventListener("click", function () {
      modalImage.src = this.src;
      modalContainer.style.display = "flex";
    });
  } catch (error) {
    console.log(error);
  }
};
fetchImage();

// Adding a listener so we can fetch selected date's img
datePicker.addEventListener("change", function () {
  fetchImage();
});

// Function to close the modal
function closeModal() {
  modalContainer.style.display = "none";
}
