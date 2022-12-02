const appeal = document.querySelector(".virtual-appeal__fill");
const appealBtn = document.querySelector(".virtual-appeal__appeal");
const statistic = document.querySelector(".virtual-appeal__statics");
const statisticBtn = document.querySelector(".virtual-appeal-statistic");
const btns = document.querySelector(".btns");

function getSelectedUrl() {
  let selectedRegionId = document.getElementById("regionsList").value;
  return `virtual-appeals/regions/${selectedRegionId}`;
}
document.getElementById("regionsList").addEventListener("change", getDistricts);
const districtsList = document.getElementById("districtsList");
function getDistricts() {
  districtsList.length = 0;
  const defaultOption = document.createElement("option");
  defaultOption.text = "Tumanni tanlang:";

  districtsList.add(defaultOption);
  districtsList.selectedIndex = 0;

  const url = getSelectedUrl();
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          "Tumanlarni olib kelishda xatolik yuz berdi: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        let option;
        for (let i = 0; i < data.data.districts.length; i++) {
          option = document.createElement("option");
          option.text = data.data.districts[i].name_uz;
          option.value = data.data.districts[i].id;
          districtsList.add(option);
        }
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}

const fileBox = document.querySelector(".file-box__container");
const attachmentsInput = document.getElementById("attachments");
const fileUploadError = document.getElementById("file-upload-error-message");
const attachments = ["", "", "", ""];

fileBox.addEventListener("change", (e) => {
  const attachmentsIndex = e.target.name.slice(-1) - 1;
  const file = e.target.files[0];
  const data = new FormData();
  data.append("files", file);
  fetch("/uz/attachments", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "fail") {
        console.log(fileUploadError);
        fileUploadError.classList.remove("hide");
        fileUploadError.textContent = data.message;
        console.log(fileUploadError);
      } else {
        if (data.data.attachments[0]) {
          attachments[attachmentsIndex] = data.data.attachments[0].id;
          attachmentsInput.value = JSON.stringify(attachments);
        }
        e.target.previousElementSibling.children[2].classList.remove("hide");
        e.target.previousElementSibling.children[1].classList.add("hide");
        e.target.previousElementSibling.children[0].classList.remove("hide");
        e.target.value = null;
        fileUploadError.classList.add("hide");
      }
    })
    .catch((error) => {
      return;
    });
});

fileBox.addEventListener("click", (e) => {
  if (!e.target.name?.startsWith("btn-file")) return;
  if (e.target.name?.startsWith("btn-file")) {
    e.target.classList.add("hide");
    e.target.nextElementSibling.classList.remove("hide");
    e.target.nextElementSibling.nextElementSibling.classList.add("hide");
    const selectedInNum = e.target.parentElement.control.name;
    document.getElementById(selectedInNum).value = "";
    attachments[+selectedInNum?.slice(-1) - 1] = "";
    attachmentsInput.value = JSON.stringify(attachments);
  }
});

if (attachmentsInput.value) {
  const attachmentsArr = JSON.parse(attachmentsInput.value);
  for (let i = 0; i < attachmentsArr.length; i++) {
    if (attachmentsArr[i] !== "") {
      const inp = document.getElementById(`file${i + 1}`);
      inp.previousElementSibling.children[2].classList.remove("hide");
      inp.previousElementSibling.children[1].classList.add("hide");
      inp.previousElementSibling.children[0].classList.remove("hide");
    }
  }
}

const modalClose = document.querySelector(".virtual-appeal__modal__close");
const modal = document.querySelector(".virtual-appeal__modal");
modalClose.addEventListener("click", function () {
  modal.style.display = "none";
});
