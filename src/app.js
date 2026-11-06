import todo from "./todo.js"
import project from "./project.js"

export const defaultStructure = {
    name: "Default",
    todos: [],
    add(todo) {
        this.todos.push(todo)
    }
}

const makeTodo = (title, description, dueDate, priority, notes, checklist) => {
    return new todo(title, description, dueDate, priority, notes, checklist)
}

const addTodo = (currentProject) => {
    currentProject.add(makeTodo(title, description, dueDate, priority, notes, checklist))
}

const makeProject = (name) => {
    return new project(name) 
}