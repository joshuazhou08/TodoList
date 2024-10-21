class Todo {

    static Tasks = []
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
            this.project.removeTask(this);
            Todo.Tasks = Todo.Tasks.filter((todo) => todo != this);

        })

        wrapper.appendChild(title);
        wrapper.appendChild(description);
        wrapper.appendChild(dueDate);
        wrapper.appendChild(priority);
        wrapper.appendChild(deleteBtn);

        return wrapper
    }
}

class Project {
    static Projects = [];
    constructor(title) {
        this.title = title;
        this.todoList = [];
        Project.Projects.push(this);
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
        const newTask = new Todo(title, description, dueDate, priority, this);
        this.todoList.push(newTask);
        this.#refreshList();
    }

    addTask(task) {
        this.todoList.push(task);
        this.#refreshList();
    }

    toggleList() {
        this.container.classList.toggle('hidden');
    }

    #delete() {
        this.todoList = [];
        this.wrapper.remove();
        Project.Projects = Project.Projects.filter((project) => project != this);
        console.log(Project.Projects);
    }


}

export {Todo, Project};