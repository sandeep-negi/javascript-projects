const users = []
function register() {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const registerBtn = document.querySelector('#register');

  const userLocation = ['Delhi', 'Bengalore', 'Hyderabad', 'Goa', 'Kolkata', 'Mysore', 'Mumbai', 'Gujrat', 'Haryana', 'Uttarakhand'];

  const user = {
    name: name.value,
    email: email.value,
    location: userLocation[Math.floor(Math.random() * userLocation.length)],
  }
  userRegistration(user);
}

function userRegistration(user) {
  if (user.name.length == 0 && user.email.length == 0) {
    console.log("inside 1");

    const name = document.querySelector('.name-container');
    const email = document.querySelector('.email-container');
    const registerBtn = document.querySelector('#register')
    const mainContainer = document.querySelector('.main-container')

    let spanName = document.createElement('span');
    name.appendChild(spanName);
    console.log(name.firstElementChild);
    console.log("1 = ", name.firstChild);
    name.firstElementChild.classList.add('input-border-error');
    spanName.classList.add('error');
    spanName.innerText = "Can't be blank";


    let spanEmail = document.createElement('span');
    email.appendChild(spanEmail);
    console.log(email.firstElementChild);
    console.log("2 = ", email.firstChild);
    email.firstElementChild.classList.add('input-border-error');
    spanEmail.classList.add('error');
    spanEmail.innerText = "Can't be blank";

    registerBtn.classList.add('btn-disabled');
    mainContainer.classList.add('main-container-error');


    setTimeout(() => {
      name.removeChild(spanName);
      email.removeChild(spanEmail);
      name.firstElementChild.classList.remove('input-border-error');
      email.firstElementChild.classList.remove('input-border-error');
      mainContainer.classList.remove('main-container-error');
      registerBtn.classList.remove('btn-disabled');
    }, 1000);
  }
  else if (user.name.length != 0 && user.email.length == 0) {
    const name = document.querySelector('.name-container');
    const email = document.querySelector('.email-container');
    const registerBtn = document.querySelector('#register')
    const mainContainer = document.querySelector('.main-container');

    let spanName = document.createElement('span');
    name.appendChild(spanName);
    name.firstElementChild.classList.add('input-border-correct');
    spanName.classList.add('correct-input-value');

    let spanEmail = document.createElement('span');
    email.appendChild(spanEmail);
    email.firstElementChild.classList.add('input-border-error');
    spanEmail.classList.add('error');
    spanEmail.innerText = "Can't be blank";

    registerBtn.classList.add('btn-disabled');
    mainContainer.classList.add('main-container-error');

    setTimeout(() => {
      email.removeChild(spanEmail);
      name.removeChild(spanName);
      name.firstElementChild.classList.remove('input-border-correct');
      email.firstElementChild.classList.remove('input-border-error');
      spanName.classList.remove('correct-input-value');
      mainContainer.classList.remove('main-container-error');
      registerBtn.classList.remove('btn-disabled');
    }, 1000);
  }
  else if (user.name.length == 0 && user.email.length != 0) {
    const name = document.querySelector('.name-container');
    const email = document.querySelector('.email-container');
    const registerBtn = document.querySelector('#register')
    const mainContainer = document.querySelector('.main-container');

    let spanName = document.createElement('span');
    name.appendChild(spanName);
    name.firstElementChild.classList.add('input-border-error');
    spanName.classList.add('error');
    spanName.innerText = "Can't be blank";


    let spanEmail = document.createElement('span');
    email.appendChild(spanEmail);

    if (validateUserEmail(user.email).length == 0) {
      spanEmail.classList.add('correct-input-value');
      email.firstElementChild.classList.add('input-border-correct');
    }

    registerBtn.classList.add('btn-disabled');
    mainContainer.classList.add('main-container-error');

    setTimeout(() => {
      email.removeChild(spanEmail);
      name.removeChild(spanName);
      spanEmail.classList.remove('correct-input-value');

      name.firstElementChild.classList.remove('input-border-error');

      spanEmail.classList.remove('error');
      spanName.classList.remove('error');

      email.firstElementChild.classList.remove('input-border-correct');
      email.firstElementChild.classList.remove('input-border-error');
      spanName.classList.remove('correct-input-value');
      mainContainer.classList.remove('main-container-error');
      registerBtn.classList.remove('btn-disabled');
    }, 1000);
  }

  else {
    const name = document.querySelector('.name-container');
    const email = document.querySelector('.email-container');
    const registerBtn = document.querySelector('#register')
    const mainContainer = document.querySelector('.main-container');


    let spanName = document.createElement('span');
    name.appendChild(spanName);

    let spanEmail = document.createElement('span');
    email.appendChild(spanEmail);

    registerBtn.classList.add('btn-disabled');

    const alertMsg = document.querySelector('.d-none');

    if (validateUserEmail(user.email).length == 0) {
      spanEmail.classList.add('correct-input-value');
      email.firstElementChild.classList.add('input-border-correct');
      name.firstElementChild.classList.add('input-border-correct');
      spanName.classList.add('correct-input-value');

      alertMsg.classList.remove('d-none');
      alertMsg.classList.add('info');
      alertMsg.innerText = "User Registration Successful!!";
      users.push(user);
      showUserInfo(user);

    }
    else {
      spanName.classList.add('correct-input-value');
      spanEmail.classList.add('error');
      spanEmail.innerText = "Email Already Taken";
    }

    setTimeout(() => {
      name.removeChild(spanName);
      email.removeChild(spanEmail);

      name.firstElementChild.classList.remove('input-border-correct');
      spanEmail.classList.remove('correct-input-value');
      email.firstElementChild.classList.remove('input-border-correct');
      spanName.classList.remove('correct-input-value');
      spanName.classList.remove('correct-input-value');
      mainContainer.classList.remove('main-container-error');
      registerBtn.classList.remove('btn-disabled');

      alertMsg.classList.remove('info');
      alertMsg.classList.add('d-none');
    }, 1000);
  }
}
function validateUserEmail(userEmail) {
  console.log("userEmail = ", userEmail);
  let p = users.filter((user) => {
    console.log("user email = ", user.email.value)
    return user.email === userEmail;
  });
  console.log("p", p);
  return p;
}

function showUserInfo(user) {
  const infoSection = document.querySelector('.register-user-info');
  const infoContainer = document.createElement('div');
  const userName = document.createElement('h1');
  const userEmail = document.createElement('h1');
  const userLocation = document.createElement('h1');

  infoSection.appendChild(infoContainer);
  infoContainer.appendChild(userName);
  infoContainer.appendChild(userEmail);
  infoContainer.appendChild(userLocation);

  infoContainer.classList.add('user-info');
  userName.innerText = user.name;
  userEmail.innerText = user.email;
  userLocation.innerText = user.location;

}