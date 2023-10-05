let tbody = document.getElementById("tbody");

fetch("https://tour-booking.glitch.me/user")
  .then((res) => res.json())
  .then((json) => {
    json.map((data) => {
      tbody.append(td_fun(data));
    });
  });
var modal = document.getElementById("id01");
var modalUpdate = document.getElementById("id02");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
  modalUpdate.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalUpdate.style.display = "none";
  }
};

function td_fun({ id, name, email, phone, status, role }) {
  let td = document.createElement("tr");
  td.setAttribute("id", `child-${id}`);
  td.innerHTML = `
  <th scope="row">${id}</th>
  <td>${name}</td>
  <td>${email}</td>
  <td>${phone}</td>
  <td>${role}</td>
  <td class="color-primary">${status}</td>
  <td>
    <span class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleUpdate(${id})"></span>
    <span class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleDelete(${id})"></span>
  </td>
    `;
  return td;
}

async function handleDelete(id) {
  event.preventDefault();

  await axios
    .delete(`https://tour-booking.glitch.me/user/${id}`)
    .then((response) => {
      document.getElementById(`child-${id}`).remove();
    });
}

async function handleUpdate(id) {
  event.preventDefault();

  await axios
    .get(`https://tour-booking.glitch.me/user/${id}`)
    .then((response) => {
      var modal = document.getElementById("id02");
      modal.style.display = "block";
    });
}

async function handleSubmit(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var role = document.querySelector('input[name="role"]').value;
  await axios
    .post("https://tour-booking.glitch.me/user", {
      name: name,
      email: email,
      phone: phone,
      status: "Active",
      role: role,
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      tbody.append(td_fun(response.data));
    });
  event.target.reset();
}
