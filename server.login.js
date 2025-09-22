const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you"re testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000

//make new array to hold data
const appdata = [
  { "Task": "Dishes", "Duedate": 19991212, "Overdue": false },
  { "Task": "Homework", "Duedate": 20261210, "Overdue": true },
  { "Task": "Fix car", "Duedate": 20250916, "Overdue": false }
]

//make server
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response)
  } else if (request.method === "POST") {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === "/") {
    sendFile(response, "public/index.html")
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  request.on("end", function () {

    // ... do something with the data here!!!

    // send a response with appdata for client to use
    response.writeHead(200, "OK", { "Content-Type": "application/json" })
    response.end(JSON.stringify(appdata))
  })
}

// function for sending a file
const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we"ve loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end("404 Error: File Not Found")

    }
  })
}

// tell server which port to run on
server.listen(process.env.PORT || port)
