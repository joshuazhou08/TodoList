import './style.css'
import {Todo, Project} from './classes.js'

const body = document.querySelector('body')

let history = [];

const addBtn = document.createElement('button');
addBtn.textContent = 'Add Project';

addBtn.addEventListener('click', () => {
    const title = prompt("Enter Project Title");
    const project = new Project(title);
    body.appendChild(project.createDOM())
})

body.appendChild(addBtn);

if (localStorage['history'] != null) {
    history = JSON.parse(localStorage['history']);
    for (const obj of history) {
        Todo.fromJSON(obj);
    }
}



const testBtn = document.createElement('button');
testBtn.textContent = 'save';
testBtn.addEventListener('click', () => {
    history = [];

    for (const task of Todo.Tasks) {
        history.push(task);
    }

    localStorage['history'] = JSON.stringify(history);
    }   
)

body.appendChild(testBtn);