// creates the dom, handles event listeners and handles user interface

import todo from "./todo.js"
import { saveTodo } from "./storage.js"
import { retrieveArrayToDisplay } from "./storage.js"
import { replaceTodo } from "./storage.js"
import { deleteTodo } from "./storage.js"
import { saveProject } from "./storage.js"
import { retrieveProjectsToDisplay } from "./storage.js"
import { deleteProject } from "./storage.js"
import { format } from "date-fns"

const displaySection = (sectionName) => {
    const container = document.createElement('div')
    const header = document.createElement('div')
    header.textContent = sectionName

    const deleteProjectButton = document.createElement('button')
    deleteProjectButton.textContent = "Delete Project"
    deleteProjectButton.addEventListener('click', () => {
        deleteProject(sectionName)
        document.body.removeChild(container)
    })

    header.appendChild(deleteProjectButton)
    container.appendChild(header)
    document.body.appendChild(container)

    const array = retrieveArrayToDisplay(sectionName)
    for (let i = 0; i < array.length; i++) {
        const todoDiv = document.createElement('div')
        todoDiv.textContent = `Title: ${array[i].title}, Description: ${array[i].description}, Due Date: ${format(array[i].dueDate, "EEEE, MMMM do, yyyy")}, Priority: ${array[i].priority} `

        const todoEdit = document.createElement('button')
        todoEdit.textContent = "Edit"
        todoDiv.appendChild(todoEdit)

        let editForm = null
        todoEdit.addEventListener('click', () => {
            if (editForm) {
                todoDiv.removeChild(editForm)
                editForm = null
                todoEdit.textContent = "Edit"
                return
            }
            todoEdit.textContent = "Close"

            editForm = document.createElement("form")

            const labelTitle = document.createElement("label")
            labelTitle.htmlFor = "title"
            labelTitle.textContent = "Edit Title: "
            const inputTitle = document.createElement("input")
            inputTitle.id = "title"
            inputTitle.type = "text"
            inputTitle.value = array[i].title
            inputTitle.required = true

            const labelDescription = document.createElement("label")
            labelDescription.htmlFor = "description"
            labelDescription.textContent = " Edit Description: "
            const inputDescription = document.createElement("input")
            inputDescription.id = "description"
            inputDescription.type = "text"
            inputDescription.value = array[i].description
            inputDescription.required = true

            const labelDueDate = document.createElement("label")
            labelDueDate.htmlFor = "dueDate"
            labelDueDate.textContent = " Edit Due Date: "
            const inputDueDate = document.createElement("input")
            inputDueDate.id = "dueDate"
            inputDueDate.type = "date"
            inputDueDate.value = array[i].dueDate
            inputDueDate.required = true

            const labelPriority = document.createElement("label")
            labelPriority.textContent = " Edit Priority: "
            const lowLabel = document.createElement("label")
            lowLabel.htmlFor = "low"
            lowLabel.textContent = "Low"
            const low = document.createElement("input")
            low.id = "low"
            low.type = "radio"
            low.name = "priority"
            low.value = "Low"
            low.checked = array[i].priority === "Low"
            low.required = true
            const mediumLabel = document.createElement("label")
            mediumLabel.htmlFor = "medium"
            mediumLabel.textContent = "Medium"
            const medium = document.createElement("input")
            medium.id = "medium"
            medium.type = "radio"
            medium.name = "priority"
            medium.value = "Medium"
            medium.checked = array[i].priority === "Medium"
            const highLabel = document.createElement("label")
            highLabel.htmlFor = "high"
            highLabel.textContent = "High"
            const high = document.createElement("input")
            high.id = "high"
            high.type = "radio"
            high.name = "priority"
            high.value = "High"
            high.checked = array[i].priority === "High"

            const button = document.createElement("button")
            button.type = "submit"
            button.textContent = "Update Todo"

            editForm.append(labelTitle, inputTitle)
            editForm.append(labelDescription, inputDescription)
            editForm.append(labelDueDate, inputDueDate)
            editForm.append(labelPriority, low, lowLabel, medium, mediumLabel, high, highLabel, " ")
            editForm.appendChild(button)
            todoDiv.appendChild(editForm)

            editForm.addEventListener("submit", () => {
                const newDefaultTodo = new todo(
                    inputTitle.value,
                    inputDescription.value,
                    inputDueDate.value,
                    editForm.querySelector('input[name="priority"]:checked').value
                )
                replaceTodo(sectionName, i, newDefaultTodo)
            })
        })
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener('click', () => {
            deleteTodo(sectionName, i)
            todoDiv.remove()
        })
        todoDiv.appendChild(deleteButton)

        container.appendChild(todoDiv)
    }

    const addButton = document.createElement("button")
    addButton.textContent = "Add Todo"
    container.appendChild(addButton)

    let form = null
    addButton.addEventListener("click", () => {
        if (form) {
            container.removeChild(form)
            form = null
            addButton.textContent = "Add Todo"
            return
        }
        addButton.textContent = "Close"

        form = document.createElement("form")

        const labelTitle = document.createElement("label")
        labelTitle.htmlFor = "title"
        labelTitle.textContent = "*Title: "
        const inputTitle = document.createElement("input")
        inputTitle.id = "title"
        inputTitle.type = "text"
        inputTitle.placeholder = "Todo Title"
        inputTitle.required = true

        const labelDescription = document.createElement("label")
        labelDescription.htmlFor = "description"
        labelDescription.textContent = " *Description: "
        const inputDescription = document.createElement("input")
        inputDescription.id = "description"
        inputDescription.type = "text"
        inputDescription.placeholder = "Todo Description"
        inputDescription.required = true

        const labelDueDate = document.createElement("label")
        labelDueDate.htmlFor = "dueDate"
        labelDueDate.textContent = " *Due Date: "
        const inputDueDate = document.createElement("input")
        inputDueDate.id = "dueDate"
        inputDueDate.type = "date"
        inputDueDate.required = true

        const labelPriority = document.createElement("label")
        labelPriority.textContent = " *Priority: "
        const lowLabel = document.createElement("label")
        lowLabel.htmlFor = "low"
        lowLabel.textContent = "Low"
        const low = document.createElement("input")
        low.id = "low"
        low.type = "radio"
        low.name = "priority"
        low.value = "Low"
        low.required = true
        const mediumLabel = document.createElement("label")
        mediumLabel.htmlFor = "medium"
        mediumLabel.textContent = "Medium"
        const medium = document.createElement("input")
        medium.id = "medium"
        medium.type = "radio"
        medium.name = "priority"
        medium.value = "Medium"
        const highLabel = document.createElement("label")
        highLabel.htmlFor = "high"
        highLabel.textContent = "High"
        const high = document.createElement("input")
        high.id = "high"
        high.type = "radio"
        high.name = "priority"
        high.value = "High"

        const button = document.createElement("button")
        button.type = "submit"
        button.textContent = "Add Todo"

        form.append(labelTitle, inputTitle)
        form.append(labelDescription, inputDescription)
        form.append(labelDueDate, inputDueDate)
        form.append(labelPriority, low, lowLabel, medium, mediumLabel, high, highLabel, " ")
        form.appendChild(button)
        container.appendChild(form)

        form.addEventListener("submit", () => {
            const newDefaultTodo = new todo(
                inputTitle.value,
                inputDescription.value,
                inputDueDate.value,
                form.querySelector('input[name="priority"]:checked').value
            )
            saveTodo(sectionName, newDefaultTodo)
        })
    })
}

export const displayProjects = () => {

    const arrayWithProjectNames = retrieveProjectsToDisplay()

    for (let i = 0; i < arrayWithProjectNames.length; i++) {
        displaySection(arrayWithProjectNames[i])
    }

    const space = document.createElement("br")
    document.body.appendChild(space)
    const newProjectButton = document.createElement("button")
    newProjectButton.textContent = "Add Project"
    document.body.appendChild(newProjectButton)

    let form = null
    newProjectButton.addEventListener('click', () => {
        if (form) {
            document.body.removeChild(form)
            form = null
            newProjectButton.textContent = "Add Project"
            return
        }
        newProjectButton.textContent = "Close"
        
        form = document.createElement("form")
        const formTitle = document.createElement("div")
        formTitle.textContent = "Add Project"
        form.appendChild(formTitle)

        const labelProjectName = document.createElement("label")
        labelProjectName.htmlFor = "name"
        labelProjectName.textContent = "*Name: "
        const inputProjectName = document.createElement("input")
        inputProjectName.id = "name"
        inputProjectName.type = "text"
        inputProjectName.placeholder = "Project Name"
        inputProjectName.required = true

        form.append(labelProjectName, inputProjectName)

        const submitFormButton = document.createElement("Button")
        submitFormButton.textContent = "Add Project"
        form.appendChild(submitFormButton)
        form.addEventListener('submit', () => {

            saveProject(inputProjectName.value)
        })

        document.body.appendChild(form)
    })
}