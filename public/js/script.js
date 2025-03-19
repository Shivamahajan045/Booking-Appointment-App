let form = document.querySelector("form");
let ul = document.querySelector("ul");

const fetchUser = () => {
  ul.innerHTML = "";
  axios
    .get("http://localhost:3000/users")
    .then((result) => {
      let listOfUsers = result.data;
      // console.log(listOfUsers);
      listOfUsers.forEach((user) => {
        // console.log(user.username, user.email, user.phone);
        let li = document.createElement("li");
        li.innerHTML = `${user.username} --- ${user.email} --- ${user.phone}`;
        li.classList =
          "list-group-item d-flex justify-content-between align-items-center shadow-sm p-3 rounded bg-white my-2 border-0";

        //delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList = "btn btn-danger btn-sm px-3 fw-bold";
        deleteBtn.addEventListener("click", () => deleteUser(user.id, li));
        li.appendChild(deleteBtn);
        ul.appendChild(li);

        //Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList = "btn btn-warning btn-sm px-3 fw-bold";
        editBtn.addEventListener("click", () => editUser(user.id, user));
        li.appendChild(editBtn);
        ul.appendChild(li);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
document.addEventListener("DOMContentLoaded", fetchUser);

//delete
const deleteUser = (id, li) => {
  axios
    .delete(`http://localhost:3000/users/${id}`)
    .then((result) => {
      console.log("USER DELETED SUCCESSFULLY!");
      li.remove();
      fetchUser();
    })
    .catch((err) => {
      console.log(err);
    });
};

// editUser
const editUser = (id, user) => {
  form.setAttribute("edit-id", id);
  form.username.value = user.username;
  form.email.value = user.email;
  form.phone.value = user.phone;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = form.getAttribute("edit-id");
  let username = e.target.username.value;
  let email = e.target.email.value;
  let phone = e.target.phone.value;

  let obj = {
    username: username,
    email: email,
    phone: phone,
  };

  if (id) {
    // perform put request
    axios
      .put(`http://localhost:3000/users/${id}`, obj)
      .then((result) => {
        console.log("USER UPDATED SUCCESSFULLY!");
        form.removeAttribute("edit-id");
        form.reset();
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Send the object to backend post -request using the axios
  //axios post request take a url and data in the form of object
  else {
    axios
      .post("http://localhost:3000/users", obj)
      .then((res) => {
        console.log("User Added successfully");
        form.reset();
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
