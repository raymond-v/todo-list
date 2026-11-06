export default class project {
    constructor(name) {
        this.name = name
        this.todos = []
    }

    add(todo) {
        this.todos.push(todo)
    }
}