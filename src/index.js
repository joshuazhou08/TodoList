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

