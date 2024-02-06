import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-48ff7-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const inputEl = document.getElementById("input-field")
const btnEl = document.getElementById("add-button")
const inputRes = document.getElementById("input-res")

btnEl.addEventListener("click", function () {
    let newItem = inputEl.value
    push(shoppingListInDB, newItem)
    clearInputEl()
})

onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let shoppingArray = Object.entries(snapshot.val())
        clearInputRes()
        for (let i = 0; i < shoppingArray.length; i++) {
            let currentItem = shoppingArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appendInputRes(currentItem)
        }
    } else {
        inputRes.innerHTML = "No items here yet"
    }
})

function clearInputRes() {
    inputRes.innerHTML = ""
}

function clearInputEl() {
    inputEl.value = ""
}

function appendInputRes(newItem) {
    let itemID = newItem[0]
    let itemValue = newItem[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })
    inputRes.append(newEl)
}
