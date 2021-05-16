    const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput= toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

    //상수
    const TODOS_LS = 'toDos';

    let toDos = [];

    function deleteToDo(event){
        //1.어떤 버튼이 눌렸는지 확인하기위해 "event.target" 사용 
        //2.console.dir (event.target) 으로 정보를 받아 부모 노트의 id값을 받아올수있게한다
        //3.
        // console.log(event.target.parentNode);

        const btn = event.target;
        // console.log('btn:',btn);
        const li  = btn.parentNode;
        // console.log('li:',li);
        toDoList.removeChild(li);
        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
        saveToDos();

    }

    
    //toDos 가져와 로컬에 저장 하는 함수 
    function saveToDos(){
        // localStorage.setItem(TODOS_LS, toDos);
         localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    }

    function paintToDo(text){
        const li = document.createElement("li")
        const delBtn = document.createElement("button");
        const span = document.createElement("span");
        const newId = toDos.length + 1;
        delBtn.innerHTML ="🗑";
        delBtn.addEventListener("click",deleteToDo)
        span.innerText = text; 
        li.appendChild(span);
        li.appendChild(delBtn);
        toDoList.appendChild(li);
        const toDoObj = { 
            text: text, 
            id: newId,
        }
        toDos.push(toDoObj);
        //push 한후에 toDos배열 저장정보 출력 
        saveToDos()
    }

    function handleSubmit(event){
        event.preventDefault();
        const currentValue = toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value = "";
    }

    function loadToDos(){
        const loadedToDos = localStorage.getItem(TODOS_LS);
          if(loadedToDos !== null){
               const parsedToDos = JSON.parse(loadedToDos);
            //    console.log('parsedToDos:',parsedToDos);
                parsedToDos.forEach(toDo => {
                paintToDo(toDo.text);
                
            });


            }else {

            }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();