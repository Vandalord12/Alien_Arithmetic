function logOut() {
  location.replace("http://localhost:3000/login/logout");
}

//   Calls the /admin/all-info endpoint with the GET method
//   in order to get all basic user info
fetch("http://localhost:3000/admin/all-info")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const userData = data.data;
    for (let user in userData) {
      //Each user is added to the DOM here
      addRecord(user);
      addData(userData[user], user);
    }
  });

function showMore(type, event) {
  //Makes the overflow list visible
  const dropDown = document.getElementById("overflow" + type);
  const element = event.target;
  if (dropDown.style.display == "none") {
    dropDown.style.display = "block";
    element.innerText = "Show more ▾";
  } else {
    dropDown.style.display = "none";
    element.innerText = "Show more ▸";
  }
}

function addRecord(id) {
  //Adds the template for a user record into the user records box/section
  const userRecords = document.querySelector(".user-records");
  const record = `
  <div class="record" id="${id}">
      <div class="del-button">
        <button onclick="deleteUser(${id})">Delete</button>
      </div>
      <div class="id" style="width: 10%">
        <p class="id-number">${id}</p>
      </div>
      <div class="details" style="width: 40%">
        <h5>Firstname:</h5>
        <p class="detail" id="firstname${id}"></p>
        <h5>Lastname:</h5>
        <p class="detail" id="lastname${id}"></p>
        <h5>Email:</h5>
        <p class="detail" id="email${id}"></p>
        <h5>Personal Blog:</h5>
        <p class="detail" id="blog${id}"></p>
      </div>
      <div class="scores" style="width: 40%">

          <h5>Both: <span class="both" id="typeBoth${id}"></span></h5>
          <p class="show-more" onclick="showMore('typeBoth${id}', event)">Show more ▸</p>
          <ol class="drop" id="overflowtypeBoth${id}" style="display: none"></ol>
          <br />

          <h5>
              Multiplication and Division: <span class="md" id="typeMD${id}"></span>
          </h5>
          <p class="show-more" onclick="showMore('typeMD${id}', event)">Show more ▸</p>
          <ol class="drop" id="overflowtypeMD${id}" style="display: none"></ol>
          <br />

          <h5>Addition and Subtraction: <span class="as" id="typeAS${id}"></span></h5>
          <p class="show-more" onclick="showMore('typeAS${id}', event)">Show more ▸</p>
          <ol class="drop" id="overflowtypeAS${id}" style="display: none"></ol>
          <br />

      </div>
      <div class="high-scores" style="width: 10%">
        <p class="high-both" id="highBoth${id}"></p>
        <br />
        <p class="high-as" id="highAS${id}"></p>
        <br />
        <p class="high-md" id="highMD${id}"></p>
      </div>
  </div>`;
  userRecords.innerHTML += record;
}

function sortScores(array) {
  //Returns the sorted array and the overflow scores
  //that are not displayed on the screen
  const sorted = array.sort(function (a, b) {
    return b - a;
  });
  let topFive = [];
  for (let i in sorted) {
    if (i > 4) {
      break;
    }
    topFive.push(sorted[i]);
  }
  const overFlow = sorted.slice(5);
  return { topFive, overFlow };
}

function addOverflow(detail, id, overflow) {
  //Adds the overflow scores onto the overflow list
  const ele = document.getElementById("overflow" + detail + id);
  for (let i in overflow) {
    ele.innerHTML += `<li>${overflow[i]}</li>`;
  }
}

function addData(data, id) {
  //Adds the data to the user records on screen
  for (let detail in data) {
    const ele = document.getElementById(detail + id);
    if (detail.slice(0, 4) === "type") {
      //If the user detail is a score, then do the below
      const { topFive, overFlow } = sortScores(data[detail]);
      ele.innerText = topFive;
      addOverflow(detail, id, overFlow);
    } else {
      ele.innerText = data[detail];
    }
  }
}

function deleteUser(id) {
  //Deletes the specified user from the database
  const email = document.getElementById("email" + id).textContent;
  fetch(`http://localhost:3000/admin/${email}`, {
    method: "DELETE",
  }).then(() => {
    const record = document.getElementById(id);
    record.remove();
  });
}