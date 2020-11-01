const btn = document.getElementById("btn")
const inp = document.getElementById("inp")
const todos = document.getElementById("todos")

//WPROWADZA DO INPUT PO ODSWIEZENIU
inp.addEventListener('input', e => localStorage.setItem("inputValue", inp.value))
if (localStorage.getItem("inputValue") !== null) {
    inp.value = localStorage.getItem("inputValue")
}

let tasks = []

if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach((elem) => {
        const div = document.createElement("div")
        todos.append(div)
        div.classList.add("box")
        const btnDel = document.createElement("button")
        div.append(btnDel)
        btnDel.classList.add("box")
        btnDel.innerText = "Usuń"

        const span = document.createElement("span")
        div.append(span)
        span.innerText = elem
        let a = elem
            //USUWANIE ELEMENTU
        btnDel.addEventListener("click", delItem = () => {
            tasks.forEach((elem2, i) => {
                if (elem2 == a) {
                    tasks.splice(i, 1)
                    localStorage.setItem("tasks", JSON.stringify(tasks))
                }
            })
            todos.removeChild(div)
        })
    })
}

btn.addEventListener("click", addTodo = () => {
    if (inp.value !== "") {
        tasks.push(inp.value)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        const div = document.createElement("div")
        todos.append(div)
        div.classList.add("box")
        const btnDel = document.createElement("button")
        div.append(btnDel)
        btnDel.classList.add("box")
        btnDel.innerText = "Usuń"

        const span = document.createElement("span")
        div.append(span)
        span.innerText = inp.value
        let a = inp.value
            //USUWANIE ELEMENTU
        btnDel.addEventListener("click", delItem = () => {
            tasks.forEach((elem, i) => {
                if (elem == a) {
                    tasks.splice(i, 1)
                    localStorage.setItem("tasks", JSON.stringify(tasks))
                }
            })
            todos.removeChild(div)
        })
        inp.value = ""
        localStorage.setItem("inputValue", "")
    }
})