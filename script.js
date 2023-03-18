var input = document.querySelector('.input')
var button = document.querySelector('button')

/**
 * có chức năng them mới, xóa, đánh dấu đã đọc
 * khi bấm nút add hoặc enter thì check xem input có value ko
 * nếu ko thì cảnh báo
 * còn có rồi thì thực hiện lưu vào localStorage
 */

button.addEventListener('click', function () {
    if (!input.value.trim()) {
        alert('khong co noi dung')
        return false
    }
    let tasks = getTaskFromLocalStorage()
    tasks.push({ name: input.value })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)
    input.value = ''
})


input.addEventListener('keyup', function (e) {
    if (!input.value.trim()) {
        alert('khong co noi dung')
        return false
    }
    if (e.key == 'Enter') {
        let tasks = getTaskFromLocalStorage()
        tasks.push({ name: input.value })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(tasks)
        input.value = ''
    }
})

/**
 * render ra html theo định dạng ban đầu
 */

function renderTasks(tasks = []) {
    let content = '<ul>'
    tasks.forEach((task) => {
        content += `        
        <li>
            <a class = "check"><i class="fa-sharp fa-solid fa-check"></i></a>
            <p>${task.name}</p>
            <a><i class="fa-solid fa-trash"></i></a>
        </li>
        `
    })
    content += '</ul>'
    document.querySelector('.todos').innerHTML = content

    /**
     * add class khi check
     */
    const lis = document.querySelectorAll('li')
    lis.forEach(function (li) {
        li.addEventListener('click', function () {
            li.classList.toggle('completed')
        })
    })

    /**
     * mục đích là lấy được nút xóa sau 
     * lấy được nút xóa của thẻ li cần xóa
     */
    lis.forEach(function (li, index) {
        li.querySelectorAll('a')[1].addEventListener('click', function () {
            //console.log(index)
            deleteTask(index)
        })
    })
}

// lấy được phần tử của local
function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}


/**
 * khi lấy được index thì ta duyệt toàn bộ tasks và lấy được 
 * index_1 của task duyện
 * nếu nó trùng với index của thẻ cần xóa thì thực hiện xóa 
 */
function deleteTask(index) {
    let tasks = getTaskFromLocalStorage();
    tasks.forEach(function (task, index_1) {
        if (index === index_1) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}


