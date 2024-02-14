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

    let content = '<h2 class="text-center">Списки дел</h2><article class="row">'

    todoList.forEach((list, index) => {
        content += `
        <section class="mb-3 col-xl-4 col-md-6 col-sm-12 text-center p-3">
            <hr/>
                <h4 class="text-center">${list.name}</h4>
                <button type="button" class="btn btn-success btn-lg" onclick="showTodoListByIndex(${index})">Открыть</button>
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

function showTodoListByIndex(index) {
    let list = getTodoList()[index]

    let content = `
        <button type="button" class="btn btn-success btn-lg" onclick="showTodoList()"><= Списки дел</button>
        <h2 class="text-center">Список дел "${list.name}"</h2>
        <article class="row">
    `

    list.tasks.forEach((task, index) => {
        content += `
        <section class="mb-3 col-xl-4 col-md-6 col-sm-12 text-center p-3">
            <hr/>
                <h4 class="text-center">${task.name}</h4>
                <button type="button" class="btn btn-success btn-lg">Тест</button>
            <hr/>
        </section>
        `
    })

    content += `
        <section class="mb-3 col-xl-4 col-md-6 col-sm-12 text-center">
            <button type="button" class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#createTaskModal">+</button>
        </section>
        </article>
    `

    document.getElementById('content').innerHTML = content
    document.getElementById('btn-create-task').onclick = () => createTask(index)
}

function validateCreateTask(task) {
    if(task.name) return true
    else {
        alert('Напишите название задачи!')
        return false
    }
}

function createTask(indexTodoList) {
    let task = {
        name: document.getElementById('name-task').value
    }

    if(validateCreateTask(task)) {
        let todoList = getTodoList()

        todoList[indexTodoList].tasks.push(task)

        setTodoList(todoList)

        document.getElementById('name-task').value = ''

        document.getElementById('notification-task').innerHTML = `
            <h3 class="text-center text-success">Задача "${task.name}" создана</h3>
        `

        setTimeout(() => document.getElementById('notification-task').innerHTML = '', 2000)

        showTodoListByIndex(indexTodoList)
    }
}

function loadApp() {
    if(!localStorage.getItem('to-do-list')) setTodoList([])
}

loadApp()

showTodoList()
