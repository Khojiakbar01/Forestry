const acceptedBtn = document.querySelector(".accepted-btn");
const replayBtn = document.querySelector(".replay-btn");
const rejectedBtn = document.querySelector(".rejected-btn");
const replayBox = document.querySelector(".appeal-replay");
const appealAnswerInput = document.querySelector(".appeal-answer");
const appealAnswerBtn = document.querySelector(".appeal-answer-btn");
const appealAnswerCancelBtn = document.querySelector(
  ".appeal-answer-cancel-btn"
);
const answerFileInput = document.querySelector("#answer-file");
const answerFileIdInput = document.querySelector(".answer-file-id");
const err = document.querySelector(".err-answer");
const answerBox = document.querySelector(".appeal-answer-box");
const fileCancelButton = document.querySelector(".file-btn");
const answerLabel = document.querySelector(".answer-file-label");
const answerFileHref = document.querySelector(".answer-file-success");
const answerTextArea = document.querySelector(".textarea-appeal-answer");

acceptedBtn.addEventListener("click", (e) => {
  console.log(e.target.name);
  fetch("/admin/virtual-appeals/change-status", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      appealStatus: "INPROGRESS",
      id: e.target.name,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        acceptedBtn.classList.add("disable-btn");
        rejectedBtn.classList.add("disable-btn");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

rejectedBtn.addEventListener("click", (e) => {
  fetch("/admin/virtual-appeals/change-status", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      appealStatus: "REJECTED",
      id: e.target.name,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        acceptedBtn.classList.add("disable-btn");
        rejectedBtn.classList.add("disable-btn");
        replayBtn.classList.add("disable-btn");
        replayBox.classList.add("hide");
      }
    })
    .catch((error) => {
      return;
    });
});

replayBtn.addEventListener("click", (e) => {
  replayBox.classList.remove("hide");
  acceptedBtn.classList.add("disable-btn");
  rejectedBtn.classList.add("disable-btn");
  appealAnswerCancelBtn.classList.remove("hide");
});

appealAnswerBtn.addEventListener("click", (e) => {
  const appealAnswer = appealAnswerInput.value;
  if (!appealAnswer.trim()) {
    err.classList.remove("hide");
  } else {
    fetch("/admin/virtual-appeals/change-status", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        appealStatus: "DONE",
        id: e.target.name,
        appealAnswer,
        appealAnswerFileId: answerFileIdInput.value
          ? answerFileIdInput.value
          : null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          answerLabel.classList.add("hide");
          if (data.fileName) {
            answerFileHref.classList.remove("hide");
            answerFileHref.href = `/uploads/${data.fileName}`;
          } else {
            answerLabel.parentElement.children[0].classList.add("hide");
          }
          answerTextArea.readOnly = "true";
          appealAnswerBtn.classList.add("hide");
          acceptedBtn.classList.add("disable-btn");
          rejectedBtn.classList.add("disable-btn");
          replayBtn.classList.add("disable-btn");
        }
      })
      .catch((error) => {
        return;
      });
  }
});

answerFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const data = new FormData();
  data.append("files", file);
  fetch("/uz/attachments", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        e.target.previousElementSibling.children[0].classList.remove("hide");
        e.target.previousElementSibling.children[1].classList.add("hide");
        e.target.previousElementSibling.children[2].classList.remove("hide");
        e.target.labels[0].classList.add("answer-file-label-success");
        e.target.value = "";
        answerFileIdInput.value = JSON.stringify(data.data.attachments[0].id);
      }
    })
    .catch((error) => {
      return;
    });
});

fileCancelButton.addEventListener("click", (e) => {
  e.target.nextElementSibling.classList.remove("hide");
  e.target.classList.add("hide");
  e.target.parentElement.children[2].classList.add("hide");
  e.target.parentElement.classList.remove("answer-file-label-success");
  answerFileInput.value = "";
});
