const removeBtn = document.querySelector(".remove-all-btn");
const formControl = document.querySelector(".form-control");

let outputList = document.getElementById("output");

function showValues() {
  let input = document.getElementById("myInput");
  let inputVal = document.getElementById("myInput").value;
  let values = inputVal.split(",");

  for (let index = 0; index < values.length; index++) {
    // Validation
    if (inputVal === "") {
      formControl.classList.add("error");
      input.focus();
      return;
    } else {
      formControl.classList.remove("error");
    }

    // create element
    let listItem = document.createElement("li");
    listItem.innerHTML =
      '<i class="fa-solid fa-trash"></i>' + `<span>${values[index]}</span>`;
    let uniqueId = "item-" + Math.floor(Math.random() * 1000000);

    listItem.id = uniqueId;
    outputList.appendChild(listItem);

    input.value = "";
    input.focus();

    // hover remove btn
    let trashIcon = listItem.querySelector(".fa-trash");
    trashIcon.addEventListener("click", function () {
      listItem.remove();
      localStorage.removeItem(uniqueId);
    });
    localStorage.setItem(uniqueId, values[index]);
  }
}

// remove All btn
removeBtn.addEventListener("click", function () {
  let outputList = document.getElementById("output");
  outputList.innerHTML = "";
  localStorage.clear();
});

// load page
window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);

    let listItem = document.createElement("li");
    listItem.innerHTML =
      '<i class="fa-solid fa-trash"></i>' + `<span>${value}</span>`;
    listItem.id = key;
    outputList.appendChild(listItem);

    let trashIcon = listItem.querySelector(".fa-trash");
    trashIcon.addEventListener("click", function () {
      listItem.remove();
      localStorage.removeItem(key);
    });
  }
};

function refreshPage() {
  window.location.reload();
}
