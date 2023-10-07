async function handleSubmit() {
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  await axios.get("https://touring.glitch.me/user").then((response) => {
    var userExist = response.data.find((usr) => usr.email === email);
    if (userExist && userExist.password === password) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("role", userExist.role);
      setTimeout(() => {
        if (userExist.role === "Admin") {
        location.href = `${location.origin}/index.html`;
        } else {
        location.href = `${location.origin}/huyen.html`;
        }
      }, 1000);
    }
  });
}
async function handleSignup() {
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  await axios
    .post("https://touring.glitch.me/user", {
      email: email,
      password: password,
      phone: "",
      role: "",
      name: "",
      status: "Active",
    })
    .then((response) => {
      toastr.success("Signup successfully", "Message", {
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
      setTimeout(() => {
        location.href = `${location.origin}/login.html`;
      }, 1000);
    });
}

handleSignup;

async function handleLogout() {
  localStorage.clear()
}
