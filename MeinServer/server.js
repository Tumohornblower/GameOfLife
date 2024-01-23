const express = require("express")
const app = express()

app.use(express.static("../Game"))

app.get("/", function (req, res) {
    res.redirect("index.html")
})

app.get("/namen/:name", function(req, res){
    let name = req.params.name
    res.send("<h3>Hallo " + name + "</h3>")
})

app.get("/Weiterleitung/:searchValue", function(req, res){
    let searchValue = req.params.searchValue
    let domain = "https://www.google.com/search?q=" + searchValue
    res.redirect(domain)
})

app.use(function(req, res, next) {
    res.status(404).send("<h3>Error 404 </h3> <p> Bitter kontaktieren sie den ServerHost Theodor </p>")
  })

app.listen(3000, function () {
    console.log("Example is running on port 3000")
})
