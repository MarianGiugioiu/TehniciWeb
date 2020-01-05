const list = document.getElementById('list');
const formType = document.getElementById('formType');
const formName = document.getElementById('formName');
const formPass = document.getElementById('formPass');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');
const searchName = document.getElementById('searchName');
const searchName1 = document.getElementById('searchName1');
const searchButton = document.getElementById('searchButton');
const searchType = document.getElementById('searchType');
const searchButton1 = document.getElementById('searchButton1');
const xButton = document.getElementById('xButton');
let xmsg = document.createElement('span');
let xverif=document.getElementById('verif');
xmsg.hidden = true;
let u=0;
const types = ["mandelbrot", "julia"];

function postFractal() {
    const postObject = {
        name: formName.value,
        pass: formPass.value,
        img: formUrl.value
    }
    console.log(postObject);
    fetch(`http://localhost:3000/${formType.value}`, {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        resetForm();
    });
}

function clearList(){
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function findName() {
    u=0;
    console.log(searchName.value);

    for(let i = 0; i < types.length && u==0; i++){
        console.log(types[i]);
        fetch(`http://localhost:3000/${types[i]}`)
            .then(function (response) {
                response.json().then(function (fract) {
                    findInType(fract);
                });
            });
    }
};

function findInType(fract){
    console.log(fract.length);
    for(let i = 0; i < fract.length; i++){
        console.log(fract[i].name);
        if(fract[i].name==searchName.value){
            addButton.hidden=true;
            xverif.hidden=false;
        }
    }
}

function searchByType(){
    fetch(`http://localhost:3000/${searchType.value}`)
            .then(function (response) {
                response.json().then(function (fract) {
                    displayType(fract);
                });
            });
}

function searchByName(btn,ok,spn) {
    u=0;
    console.log(searchName.value);

    for(let i = 0; i < types.length && u==0; i++){
        console.log(types[i]);
        fetch(`http://localhost:3000/${types[i]}`)
            .then(function (response) {
                response.json().then(function (fract) {
                    searchInType(fract,i,btn,ok,spn);
                });
            });
    }
};

function displayType(fract){
    clearList();
    for(let i = 0; i < fract.length; i++){
            //alert("nume deja folosit");
            //console.log("nume deja folosit");
            let img = document.createElement('img');
            img.src = fract[i].img;
            img.width=100;
            img.height=100;
            let name = document.createElement('span');
            let msg = document.createElement('span');
            msg.innerText = "nume deja folosit";
            msg.hidden = true;
            name.innerText = fract[i].name;
            let pass = document.createElement('INPUT');
            let newName = document.createElement('INPUT');
            let newURL = document.createElement('INPUT');
            let newPass = document.createElement('INPUT');
            let changeButton = document.createElement('button');
            changeButton.innerText = 'Change';
            newName.hidden=true;
            newURL.hidden=true;
            newPass.hidden=true;
            changeButton.hidden=true;
            let editButton = document.createElement('button')
            editButton.innerText = 'Edit';
            let container = document.createElement('div');
            container.style.display='flex';
            editButton.addEventListener('click', function () {
                if(pass.value == fract[i].pass){
                    newName.hidden=false;
                    newURL.hidden=false;
                    newPass.hidden=false;
                    changeButton.hidden=false;
                    newName.value=fract[i].name;
                    newURL.value=fract[i].img;
                    newPass.value=fract[i].pass;
                    newName.onblur = function () {
                        searchName.value = newName.value;
                        searchByName(changeButton,false,msg);
                    }
                    newName.onfocus = function() {
                        changeButton.hidden=false;
                        msg.hidden=true;
                    }
                    changeButton.addEventListener('click', function () {
                        const putObject = {
                            name: newName.value,
                            pass: newPass.value,
                            img: newURL.value
                        }
                        fetch(`http://localhost:3000/${searchType.value}/${fract[i].id}`, {
                            method: 'PUT',
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(putObject)
                        });
                        img.src = newURL.value;
                        name.innerText = newName.value;
                    });
                   
                }
                else
                    alert("parola gresita");
            });
            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', function () {
                if(pass.value == fract[i].pass){
                    fetch(`http://localhost:3000/${searchType.value}/${fract[i].id}`, {
                        method: 'DELETE',
                    });
                    container.style.visibility='hidden';
                }
                else
                    alert("Parola gresita");
            });

            container.appendChild(img);

            let container1 = document.createElement('div');
            container1.style.display='flex';
            container1.style.flexDirection='column';
            container1.appendChild(name);
            container1.appendChild(pass);
            container1.appendChild(editButton);
            container1.appendChild(deleteButton);
            container.appendChild(container1);

            let container2 = document.createElement('div');
            container2.style.display='flex';
            container2.style.flexDirection='column';
            container2.appendChild(newName);
            container2.appendChild(newURL);
            container2.appendChild(newPass);
            container2.appendChild(changeButton);
            container2.appendChild(msg);
            container.appendChild(container2);

            list.appendChild(container);
        }
}

function searchInType(fract,pos,btn,ok,spn){
    console.log(fract.length);
    for(let i = 0; i < fract.length; i++){
        console.log(fract[i].name);
        if(fract[i].name==searchName.value){

            //alert("nume deja folosit");
            //console.log("Nume deja folosit");
            btn.hidden=true;
            if(ok){
            let img = document.createElement('img');
            img.src = fract[i].img;
            img.width=100;
            img.height=100;
            let name = document.createElement('span');
            let msg = document.createElement('span');
            msg.innerText = "nume deja folosit";
            msg.hidden = true;
            name.innerText = fract[i].name;
            let pass = document.createElement('INPUT');
            let newName = document.createElement('INPUT');
            let newURL = document.createElement('INPUT');
            let newPass = document.createElement('INPUT');
            let changeButton = document.createElement('button');
            changeButton.innerText = 'Change';
            newName.hidden=true;
            newURL.hidden=true;
            newPass.hidden=true;
            changeButton.hidden=true;
            let editButton = document.createElement('button')
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', function () {
                if(pass.value == fract[i].pass){
                    newName.hidden=false;
                    newURL.hidden=false;
                    newPass.hidden=false;
                    changeButton.hidden=false;
                    newName.value=fract[i].name;
                    newURL.value=fract[i].img;
                    newPass.value=fract[i].pass;
                    newName.onblur = function () {
                        searchName.value = newName.value;
                        searchByName(changeButton,false,msg);
                    }
                    newName.onfocus = function() {
                        changeButton.hidden=false;
                        msg.hidden = true;
                    }
                    changeButton.addEventListener('click', function () {
                        const putObject = {
                            name: newName.value,
                            pass: newPass.value,
                            img: newURL.value
                        }
                        fetch(`http://localhost:3000/${types[pos]}/${fract[i].id}`, {
                            method: 'PUT',
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(putObject)
                        });
                        img.src = newURL.value;
                        name.innerText = newName.value;
                    });
                    
                }
                else 
                    alert("parola gresita");
            });
            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', function () {
                if(pass.value == fract[i].pass){
                    fetch(`http://localhost:3000/${types[pos]}/${fract[i].id}`, {
                        method: 'DELETE',
                    });
                    clearList();
                }
                else
                    alert("Parola gresita");
            });
            let container = document.createElement('div');
            container.style.display='flex';
            container.appendChild(img);

            let container1 = document.createElement('div');
            container1.style.display='flex';
            container1.style.flexDirection='column';
            container1.appendChild(name);
            container1.appendChild(pass);
            container1.appendChild(editButton);
            container1.appendChild(deleteButton);
            container.appendChild(container1);

            let container2 = document.createElement('div');
            container2.style.display='flex';
            container2.style.flexDirection='column';
            container2.appendChild(newName);
            container2.appendChild(newURL);
            container2.appendChild(newPass);
            container2.appendChild(changeButton);
            container2.appendChild(msg);
            container.appendChild(container2);
            list.appendChild(container);
            resetForm();
            }
            else
                spn.hidden=false;
        }
    }
}

function resetForm() {
    formName.value = '';
    formPass.value = '';
    formUrl.value = '';
    searchName1.value = '';
}
//addButton.addEventListener('click', postFractal);
formName.onblur = function(){
    searchName.value = formName.value;
    findName();
}
formName.onfocus = function() {
    addButton.hidden=false;
    xverif.hidden = true;
}
addButton.addEventListener('click', postFractal);
searchButton.addEventListener('click', function() {
    clearList();
    searchName.value = searchName1.value;
    searchByName(xButton,1,xmsg); 
});
searchButton1.addEventListener('click', searchByType);