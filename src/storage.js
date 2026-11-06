// store, retrieve and delete from the local storage
// local storage uses strings not json

// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.removeItem(key)

// JSON.stringify() converts a JavaScript value into a JSON string.
// JSON.parse() reads a JSON string and converts it into the corresponding JavaScript value.

import { defaultStructure } from "./app.js"
import project from "./project.js"

const convertToStr = (obj) => {
    return JSON.stringify(obj)
}

const convertToObj = (str) => {
    return JSON.parse(str)
}

export const saveDefault = () => {
    if (localStorage.getItem("Default") === null) {
        localStorage.setItem("Default", JSON.stringify(defaultStructure))
    }
}

export const saveTodo = (projectName, obj) => {
    const storedData = JSON.parse(localStorage.getItem(projectName))
    const data = Object.assign(new project(storedData.name), storedData)
    data.add(obj)
    localStorage.setItem(data.name, JSON.stringify(data))
}

export const retrieveArrayToDisplay = (projectName) => {
    const arr = []
    const value = JSON.parse(localStorage.getItem(projectName))
    for (let i = 0; i < value.todos.length; i++) {
        arr.push(value.todos[i])
    }
    return arr
}

export const replaceTodo = (projectName, index, obj) => {
    const storedData = JSON.parse(localStorage.getItem(projectName))
    const data = Object.assign(new project(storedData.name), storedData)
    data.todos[index] = obj
    localStorage.setItem(data.name, JSON.stringify(data))
}

export const deleteTodo = (projectName, index) => {
    const storedData = JSON.parse(localStorage.getItem(projectName))
    const data = Object.assign(new project(projectName), storedData)
    data.todos.splice(index, 1)
    localStorage.setItem(data.name, JSON.stringify(data))
}

export const saveProject = (projectName) => {
    localStorage.setItem(projectName, JSON.stringify(new project(projectName)))
}

export const retrieveProjectsToDisplay = () => {
    const arr = []
    for (let i = 0; i < localStorage.length; i++) {
        arr.push(localStorage.key(i))
    }
    return arr
}

export const deleteProject = (sectionName) => {
    localStorage.removeItem(sectionName)
}