const taskStore = []



const colors = [
    '#A8E05F',
    '#FF6B6B',
    '#4DA6FF',
    '#ffab36ff',
    '#a46beeff',
    '#4DD6B3',
    '#f7cb19ff',
    '#ff6db8ff',
    '#64c9fcff',
    '#c8c8c8ff'
]


function hexToRgba(hex, alpha = 0.35) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

document.querySelector('#colorButton').addEventListener('click', () => {
    const randomColor = colors[~~(Math.random() * colors.length)]
    document.documentElement.style.setProperty('--primary', randomColor)
    document.documentElement.style.setProperty('--primary-50', hexToRgba(randomColor, 0.5))
})

document.querySelector('#btn-new-task').addEventListener('click', () => {
    const input = document.querySelector('#new-task-input')

    const task = {
        content: input.value,
        done: false,
        id: taskStore.length
    }

    taskStore.push(task)
    input.value = ''
    renderTaskList()
})

function renderTaskList() {
    const taskList = document.querySelector('.task-list-item-container')

    taskList.innerHTML = '';


    for (const task of taskStore) {
        const element = document.createElement('li')
        element.classList.add('task-list-item')
        element.dataset['id'] = task.id

        const taskCheckbox = document.createElement('input')
        taskCheckbox.type = 'checkbox'
        taskCheckbox.checked = task.done

        const taskContent = document.createElement('span')
        taskContent.textContent = task.content

        taskCheckbox.addEventListener('change', (event) => {
            task.done = event.target.value
        })

        element.appendChild(taskCheckbox)
        element.appendChild(taskContent)

        taskList.appendChild(element)
    }
}