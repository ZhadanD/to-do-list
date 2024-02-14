function getTodoList() {
    return JSON.parse(localStorage.getItem('to-do-list'))
}

function setTodoList(todoList) {
    localStorage.setItem('to-do-list', JSON.stringify(todoList))
}

function validateCreateTodoList(nameList) {
    if(nameList) return true
    else {
        alert('Заполните название списка!')
        return false
    }
}

function createTodoList() {
    let nameList = document.getElementById('name-list').value

    if(validateCreateTodoList(nameList)) {
        let todoList = getTodoList()

        todoList.push({
            name: nameList,
            tasks: []
        })

        setTodoList(todoList)

        document.getElementById('name-list').value = ''

        document.getElementById('notification').innerHTML = `
            <h3 class="text-center text-success">Список дел "${nameList}" создан</h3>
        `

        setTimeout(() => document.getElementById('notification').innerHTML = ``, 2000)

        showTodoList()
    }
}

function showTodoList() {
    let todoList = getTodoList()

    let content = '<article class="row">'

    todoList.forEach(list => {
        content += `
        <section class="mb-3 col-xl-4 col-md-6 col-sm-12 text-center p-3">
            <hr/>
                <h4 class="text-center">${list.name}</h4>
                <button type="button" class="btn btn-success btn-lg">Открыть</button>
            <hr/>
        </section>
        `
    })

    content += `
        <section class="mb-3 col-xl-4 col-md-6 col-sm-12 text-center">
            <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#createTodoListModal">+</button>
        </section>
        </article>
    `

    document.getElementById('content').innerHTML = content
}

function loadApp() {
    if(!localStorage.getItem('to-do-list')) setTodoList([])
}

loadApp()

showTodoList()
