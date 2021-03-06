
let username = ""

const HobManager = new hobManager()
const Renderer = new renderer()
let dailyQuote
const tasks = ["Say good morning to: ", "give a nice compliment to: ", "ask about the day of: ", "what do you think about launch with: ", "did you already speak to: "]



$('#updateButton').one('click', function () {
    let water = $(this).siblings('#insertWater').val()
    let vegetables = $(this).siblings('#insertVeg').val()
    let floors = $(this).siblings('#insertFood').val()
    let smiles = $(this).siblings('#insertSmiles').val()
    let newData = {
        water: water,
        vegetables: vegetables,
        floors: floors,
        smiles: smiles
    }
    HobManager.saveData(newData, username)
    Renderer.renderData(HobManager.user)
    HobManager.compare(Renderer.randetBest ,username)

})

function greet(user) {
    $("#welcomeUser").append(`<p id ="well">Welcome back ${user}, we missed you!</p>`)
}
  async function peaceandlove(){
    let bringUser = await $.get('/users')
    bringUser = bringUser.map(u=>u.userName)
    let indexU = Math.floor((Math.random() * bringUser.length))
    let indexT = Math.floor((Math.random() * 5))
      if(bringUser[indexU] == username)
      {
          indexU =0;
      }
$("#nicethingsSection").append(`<p>${tasks[indexT]}${bringUser[indexU]}</p>`)
}



$.get('/quote', function(res){
    const quote = JSON.parse(res.body).contents.quotes[0].quote
    dailyQuote = quote
    $("#quotes").append(`<p>"${dailyQuote}"</p>`)
})

async function loadPage(){
    HobManager.compare(Renderer.randetBest ,username)
let today = new Date().getTime()/86400000
const users = await $.get('/users')
let statuses = users.filter(u=> u.userName == username)
statuses = statuses[0].status.filter(s=>s.date/86400000+0.5 > today)
console.log(statuses[0])
if(statuses[0]) {
    Renderer.renderData(statuses[0])
    $('#info').hide()
}}

$("body").on("click", "#showChart", function(){
    HobManager.getCharts(username)
})
$("#update").on("click" ,function () {
    const newUserName = $("#newUser").val()
    const newpassWord = $("#newPass").val()
    const newcompany= $("#newComp").val()
    HobManager.createUser(newUserName,newpassWord,newcompany)
    alert("sign up succeeded")
})

$("#signInButton").on("click" ,function () {
    const newUserName = $("#exsistUser").val()
    const newpassWord = $("#exsistPass").val()
    HobManager.exsistUsers(newUserName,newpassWord)
})

$("body").on("click" ,"#allCharts" ,function () {
    HobManager.showAll()
})
