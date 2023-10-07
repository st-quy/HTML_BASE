var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

if (isLogin === null || isLogin === false) {
  location.href = `${location.origin}/login.html`;
} else {
  if (role !== "Admin") {
    location.href = `${location.origin}/huyen.html`;
  }
}
let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/products")
  .then((res) => res.json())
  .then((json) => {
    json.map((data) => {
      tbody.append(td_fun(data));
    });
  });
var modal = document.getElementById("id01");
var modalUpdate = document.getElementById("id02");
var modalDelete = document.getElementById("id03");

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
  modalUpdate.style.display = "none";
  modalDelete.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
    modalDelete.style.display = "none";
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
    modalDelete.style.display = "none";
  }
};

function td_fun({ id, name, description, stock, status, sold }) {
  let td = document.createElement("tr");
  td.setAttribute("id", `child-${id}`);
  td.innerHTML = `
  <th scope="row">${id}</th>
  <td>${name}</td>
  <td>${description}</td>
  <td>${stock}</td>
  <td>${sold}</td>
  <td class="color-primary">${status}</td>
  <td>
    <span class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"></span>
    <span class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleOpenModalDelete(${id})"></span>
  </td>
    `;
  return td;
}
var idProductDelete = "";
async function handleOpenModalDelete(id) {
  idProductDelete = id;
  modalDelete.style.display = "block";
}

async function handleDelete() {
  event.preventDefault();
  await axios
    .delete(`https://touring.glitch.me/products/${idProductDelete}`)
    .then((response) => {
      document.getElementById(`child-${idProductDelete}`).remove();
      modalDelete.style.display = "none";
      idProductDelete = "";
      toastr.success("Delete user successfully", "Message", {
        timeOut: 5000,
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: false,
      });
    });
}
var idProductUpdate = "";

async function handleGetDetail(id) {
  event.preventDefault();
  await axios
    .get(`https://touring.glitch.me/products/${id}`)
    .then((response) => {
      idProductUpdate = response.data.id;
      document.getElementById("name-update").value = response.data.name;
      document.getElementById("description-update").value =
        response.data.description;
      document.getElementById("stock-update").value = response.data.stock;
      document.getElementById("status").value = response.data.status;
      var modal = document.getElementById("id02");
      modal.style.display = "block";
    });
}

async function handleSubmit(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var description = document.querySelector('input[name="description"]').value;
  var stock = document.querySelector('input[name="stock"]').value;
  await axios
    .post("https://touring.glitch.me/products", {
      name: name,
      description: description,
      stock: stock,
      status: "Active",
      sold: 0,
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      tbody.append(td_fun(response.data));
      toastr.success("Add product successfully", "Message", {
        timeOut: 5000,
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: false,
      });
    });
  event.target.reset();
}

async function handleUpdate(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name-update"]').value;
  var description = document.querySelector(
    'input[name="description-update"]'
  ).value;
  var stock = document.querySelector('input[name="stock-update"]').value;
  var status = document.querySelector('select[name="status"]').value;

  await axios
    .put(`https://touring.glitch.me/products/${idProductUpdate}`, {
      name: name,
      description: description,
      stock: stock,
      status: status,
      sold: 0,
    })
    .then((response) => {
      idProductUpdate = "";
      toastr.success("Update product successfully", "Message", {
        timeOut: 2000,
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: false,
      });
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
}
