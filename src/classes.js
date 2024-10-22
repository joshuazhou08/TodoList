class Todo {

    static Tasks = [];
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        Todo.Tasks.push(this);
    }

    createDOM() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('todo');

        const title = document.createElement('strong');
        title.textContent = this.title;

        const description = document.createElement('p');
        description.textContent = this.description;

        const dueDate = document.createElement('p');
        dueDate.textContent = this.dueDate;

        const priority = document.createElement('p');
        priority.textContent = this.priority;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';

        deleteBtn.addEventListener('click', () => {
            Project.Projects[this.project].removeTask(this);
            Todo.Tasks = Todo.Tasks.filter((todo) => todo != this);
            console.log(Todo.Tasks);

        })

        wrapper.appendChild(title);
        wrapper.appendChild(description);
        wrapper.appendChild(dueDate);
        wrapper.appendChild(priority);
        wrapper.appendChild(deleteBtn);

        return wrapper
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            project: JSON.stringify(this.project)
        };
    }

    static fromJSON(json) {
   
        let project = Project.Projects[json.project];
        const newTask = new Todo(json.title, json.description, json.dueDate, json.priority, json.project)
        if (project != null) {
            project.addExistingTask(newTask);
        }

        else {
            const projectInfo = JSON.parse(json.project);
            project = new Project(projectInfo[1]);
            Project.Projects[projectInfo[0]] = project;
            document.querySelector('body').appendChild(project.createDOM());
            project.addExistingTask(newTask);
            
        }
    }
}

class Project {
    static Projects = {};
    static ID = 0;
    constructor(title) {
        this.title = title;
        this.todoList = [];
        this.ID = Project.ID;
        Project.Projects[this.ID] = this;
        Project.ID += 1
    }

    removeTask(unwanted) {
        this.todoList = this.todoList.filter((todo) => todo != unwanted);
        console.log(this.todoList);
        this.#refreshList();
    }
    createDOM() {
        const wrapper = document.createElement('div');
        const todoList = document.createElement('section');
        todoList.classList.add('hidden');
        const header = document.createElement('h1');

        header.textContent = this.title;

        wrapper.appendChild(header);
        for (const todo of this.todoList) {
            todoList.appendChild(todo.createDOM());
        }
        wrapper.appendChild(todoList);

        const showButton = document.createElement('button');
        showButton.textContent = 'show';
        showButton.showing = false;

        showButton.addEventListener('click', () => {
            if (showButton.showing) {
                showButton.textContent = 'show';
                showButton.showing = false;
            }
            else {
                showButton.textContent = 'hide';
                showButton.showing = true;
            }
            this.toggleList();
        })

        const addButton = document.createElement('button');
        addButton.textContent = 'add task';
        addButton.addEventListener('click', () => this.addTask());

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete project';
        deleteButton.addEventListener('click', () => this.#delete());

        wrapper.appendChild(showButton);
        wrapper.appendChild(addButton);
        wrapper.appendChild(deleteButton);
        this.container = todoList;
        this.wrapper = wrapper;
        return wrapper;
    }

    #refreshList() {
        this.container.textContent ='';
        for (const todo of this.todoList) {
            this.container.appendChild(todo.createDOM());
        }
    }
    addTask() {
        const title = prompt("Enter task title: ");
        const description = prompt("Enter description: ");
        const dueDate = prompt("Enter due date: ");
        const priority = prompt("Enter priority: ");

        if (title === null || description == null || dueDate === null || priority === null) {
            alert('one or more fields was empty!');
            return
        }
        const newTask = new Todo(title, description, dueDate, priority, [this.ID, this.title]);
        this.todoList.push(newTask);
        this.#refreshList();
    }

    addExistingTask(task) {
        this.todoList.push(task);
        this.#refreshList();
    }



    toggleList() {
        this.container.classList.toggle('hidden');
    }

    #delete() {
        this.wrapper.remove();
        for (const task of this.todoList) {
            Todo.Tasks = Todo.Tasks.filter((todo) => todo != task);
        }
        delete Project.Projects[this.ID];
        this.todoList = [];
    }


}

export {Todo, Project};