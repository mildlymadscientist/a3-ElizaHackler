// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  // get the value of the input fields for Task and Date
  const input = document.querySelector("#username"),
    json = { username: input.value },
    UBody = JSON.stringify(json)

  const passwordInput = document.querySelector("#password"),
    json2 = { password: passwordInput.value },
    PBody = JSON.stringify(json2)

  //comebine into one object
  body = "{" + UBody.slice(1, -1) + "," + PBody.slice(1)

  // send the data to the server using fetch()
  const response = await fetch("/login", {
    method: "POST",
    body
  })

  // read response
  const text = await response.text()

  const data = JSON.parse(text)
  console.log("data:", data)

  //add each task to todolist
  const list = document.getElementById("todolist");
  list.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const item = document.createElement("li");
    item.textContent = data[i]["Task"];
    if (data[i]["Overdue"]) {
      item.style.color = "red";
    }
    else {
      item.style.color = "green";
    }
    list.appendChild(item);
  }

  console.log("text:", text)

}