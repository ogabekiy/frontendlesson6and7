// localStorage.setItem("theme","dark")  //localstoragega saqlash


// console.log(localStorage.getItem("theme"))

// document.cookie="username=John Doe" cooki saqlash



// const date = new Date()
// console.log(date)
const $ = (e) => document.querySelector(e);
const $$ = (es) => document.querySelectorAll(es);


let editable = false


let todos = []
const ls = localStorage.getItem('todos')
if(ls){
     todos = JSON.parse(ls)
}

const temp = document.querySelector('#temp').content;

// function changeChecked(e){
//     console.log(e.target.dataset.id)
// }

const todosWrap  = document.getElementById('todos')
console.log(todosWrap)

const printTodos = () =>{
    todosWrap.innerHTML = ""

    todos.forEach( t => {
        const tempClone = temp.cloneNode(true)
        
        tempClone.querySelector('h3').textContent = t.title
        tempClone.querySelector('input').checked = t.checked
        tempClone.querySelector('input').dataset.id = t.id
        tempClone.querySelector('.todo ').dataset.id = t.id


        if(t.checked){
            tempClone.querySelector('.todo').classList.add('done')
        }
        tempClone.querySelector('.del-todo ').addEventListener('click',(e) => {
            todos = todos.filter(todo => todo.id != t.id) 
            localStorage.setItem('todos',JSON.stringify(todos))
            printTodos()
        })
        tempClone.querySelector('.edit-todo').addEventListener('click',()=>{
            $('#title-input').value = t.title
            $('#title-input').value = t.body
            editable = t.id
        })
        tempClone.querySelector('input').addEventListener('change',(e) => {
            // if(e.target.checked){
                $$('.todo').forEach(todo => {
                    if(todo.dataset.id == e.target.dataset.id){
                        if(e.target.checked){
                        todo.classList.add('done')}else{
                            todo.classList.remove('done')
                        }
                    }
                })
            // }
            // console.log(e.target.checked)
            console.log(e.target.dataset.id)
            let todo = todos.find(t =>t.id == e.target.dataset.id)
            todos = todos.filter(t => t.id != e.target.dataset.id)
            todos  = [...todos,{...todo,checked:e.target.checked }]
            localStorage.setItem('todos',JSON.stringify(todos))
        })

        tempClone.querySelector('p').textContent = t.body
        todosWrap.appendChild(tempClone)

    })
}
// 132
printTodos()

const todoForm = document.getElementById('todo-form')

todoForm.addEventListener('submit' ,e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const title = formData.get('title')
    const body =  formData.get('body')

    // console.log(title)
    // formData.forEach()
    if(editable){

        const todoIndex = todos.findIndex(todo => todo.id == editable)
        
        if(todoIndex !== -1){
            todos[todoIndex] = {
                ...todos[todoIndex],
                title: title,
                body: body
            }

            localStorage.setItem("todos", JSON.stringify(todos))

        
            editable = false
        }


    }else{
        const newTodo = {title,body,id: Date.now(),checked:false}
        todos.push(newTodo)
    
        localStorage.setItem("todos",JSON.stringify(todos))
    
        
    }
    printTodos()

    // console.log(todos)
    $("#title-input").value = '';
    $("#title-input").focus()
    $("#body-input").value = '';

})












// tempClone.querySelector('.edit-todo').addEventListener('click', (e) => {
    // const todoId = t.id; // To'g'ri `t.id` ni olayotganimizni tekshiramiz
//     const todo = todos.find((todo) => todo.id == todoId);

//     const newTitle = prompt("Enter new title:", todo.title);
//     const newBody = prompt("Enter new body:", todo.body);

//     if (newTitle !== null && newBody !== null) {
//         todos = todos.map((t) =>
//             t.id == todoId ? { ...t, title: newTitle, body: newBody } : t
//         );
//         localStorage.setItem('todos', JSON.stringify(todos));
//         printTodos(); // O'zgartirishlar saqlanib, qayta chiziladi
//     }
// });









// endi bu narsa bizga kk bomaydi 
// window.addEventListener('click',(e) => {
//     if(e.target.classList.contains('todo')){
//         // console.log(e.target.querySelector('.todo-input'))
//         $$('.todo-checkbox').forEach(c =>{
//             if(c.dataset.id == e.target.dataset.id){
//                 if(c.checked){
//                     let oldTodo = todos.find((m) => m.id == e.target.dataset.id)

//                     let newTodos = todos.filter((m) => {
//                     if(m.id != e.target.dataset.id){
//                         oldTodo.checked = c.checked
//                         return oldTodo
//                     }else{
//                         return m
//                     }})
//                     // console.log('old',oldTodo)

//                     console.log(newTodos)
//                     newTodos.push()
//                 }
//             }
//         })
//     }
// })