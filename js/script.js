const btn = document.getElementById("btn")
const inp = document.getElementById("inp")
const todos = document.getElementById("todos")

//WPROWADZA DO INPUT PO ODSWIEZENIU
inp.addEventListener('input', e => localStorage.setItem("inputValue", inp.value))
if (localStorage.getItem("inputValue") !== null) {
    inp.value = localStorage.getItem("inputValue")
}

class Task {
    constructor(text, throughLine) {
        this.text = text
        this.throughLine = throughLine
    }
}

let tasks = []

if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach((item, i) => {
        const div = document.createElement("div")
        todos.append(div)
        div.classList.add("box")
        const btnDel = document.createElement("button")
        div.append(btnDel)
        btnDel.classList.add("box")
        btnDel.innerText = "Remove"

        const p = document.createElement("p")
        div.append(p)
        p.innerText = item.text
        if (item.throughLine % 2 == 1) {
            p.classList.toggle("line-through")
        }
        p.addEventListener('click', e = () => {
            p.classList.toggle("line-through")
            item.throughLine += 1
            localStorage.setItem("tasks", JSON.stringify(tasks))
        })

        //USUWANIE ELEMENTU
        btnDel.addEventListener("click", delItem = () => {
            tasks.splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            todos.removeChild(div)
        })
    })
}


const addTodo = () => {
    if (inp.value !== "") {
        const item = new Task(inp.value, 0)
        tasks.push(item)
        localStorage.setItem("tasks", JSON.stringify(tasks))

        const div = document.createElement("div")
        todos.append(div)
        div.classList.add("box")
        const btnDel = document.createElement("button")
        div.append(btnDel)
        btnDel.classList.add("box")
        btnDel.innerText = "Remove"

        const p = document.createElement("p")
        div.append(p)
        p.innerText = inp.value
        let a = inp.value

        p.addEventListener('click', e = () => {
                p.classList.toggle("line-through")
                item.throughLine += 1
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
            //USUWANIE ELEMENTU
            //Problem z usuwaniem gdy 2 taski mają ten sam tekst
        btnDel.addEventListener("click", delItem = () => {
            tasks.forEach((item, i) => {
                if (item.text === a)
                    tasks.splice(i, 1)
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
            todos.removeChild(div)
        })
        inp.value = ""
        localStorage.setItem("inputValue", "")
    }
}

btn.addEventListener("click", addTodo)
inp.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addTodo()
    }
})