/*jshint esversion: 8 */

import imageCard from './modules/imageCard.js';
customElements.define('image-card', imageCard);
const sha1 = require('js-sha1');
const EXIF = require('exif-js');

const PORT = 3000;
const contentWrapper = document.getElementsByClassName('content_wrapper')[0];
const placeholder = document.getElementsByClassName('placeholder')[0];
const btnRegister = document.getElementById('btn_register');
const btnLogin = document.getElementById('btn_login');
const email = document.getElementById('email'); //TODO: inputs verification
const key = document.getElementById('password');


function addElement(tagName, container) {
    return (container ? container : document.body).appendChild(document.createElement(tagName));
}

function getCurrentDate() {
    return new Date().toLocaleString();
}

function testFile(file) {
    // debugger;
    //TODO: new func
    //TODO: resolve + reject //TODO: IF?

    return new Promise(() => {
        return /jpeg|png|gif/gi.test(file.type) ?
            addElement('image-card', contentWrapper).setAttribute('src', URL.createObjectURL(file)) //TODO: separete function to insert image into the DOM
            :
            alert('Выбранный файл не является изображением'); //TODO: add img into web-component
    });
}

//TODO: JSDOC /** */

var selector = document.getElementById('image_selector');
selector.onchange = function (event) {
    // debugger
    for (var file of event.target.files) {
        testFile(file).then(sendFile(file)); //TODO: get from coockies
        // let metadata = getExif(file) //TODO: variable obj
    }
};
//TODO: rename funcs (function naming)
async function sendFile(file) {
    // debugger;
    fetch(`http://localhost:${PORT}/Images/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uploaded: getCurrentDate(),
                ovner: getUserName(email.value), //TODO://TODO://TODO://TODO://TODO:
                // metadata: getExif(file),
                content: await encodeFile(file)
            })
        })
        .then((response) => response.json())
        .then((response) => console.log(response));
}

function encodeFile(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => resolve(window.btoa(event.target.result));
    });
}

function getData(endpoint) {
    return fetch(`http://localhost:${PORT}/${endpoint}/`).then((response) => response.json());
}

function showImg(img) {
    placeholder.hidden = true;
    return img.content ?
        addElement('image-card', contentWrapper).setAttribute('src', `data:image/jpg;base64,${img.content}`) :
        null;
}

function getUserName(loginMail) {
    return (function () {
        return loginMail.split('@')[0];
    })();
}

function addNewUser(loginMail, key) {
    fetch(`http://localhost:${PORT}/Users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [getUserName(loginMail)]: {
                    loginMail,
                    name: getUserName(loginMail),
                    key,
                    registered: getCurrentDate()
                }
            })
        })
        .then((response) => response.json())
        .then((response) => alert('registered'));
}
//TODO: async/await like here
async function testUser(userName, key) {
    let response = await getData('Users');
    // debugger
    let user = await response.find((user) => user[userName]); //TODO: get data with username-endpoints//TODO://TODO://TODO://TODO://TODO://TODO://TODO://TODO://TODO://TODO://TODO://TODO:
    // return await response[userName] ? true : false
    //TODO: email verification: mail domains
    // debugger
    if (!user) {
        alert('user does not exist');
        location.reload(); //TODO:
    } else
        user[userName].name === userName && user[userName].key === key ?
        beginSession(key) /*.bind(null, await user[userName], key)*/ :
        console.log('lol');
}

function deleteCoockie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function beginSession(key) {
    console.log('hi');
    let logOut = addElement('button', document.getElementsByClassName('topbar_wrapper')[0]); //TODO: make it const
    logOut.innerText = 'Logout';
    logOut.onclick = function (event) {
        alert('logout');
        deleteCoockie('key');
        location.reload();
    };
    // debugger
    // document.getElementById('image_selector').style.display = 'inline-block'
    document.cookie = `key=${key};max-age=3600`; //TODO://TODO://TODO://TODO://TODO:
    getData('Images').then((response) =>
        response.forEach((responseEntity) => {
            // debugger
            // placeholder.hidden = true;
            responseEntity.ovner === getUserName(email.value) ? showImg(responseEntity) : placeholder.hidden = false; //null; TODO:
        })
    ); //TODO: mb create custom response iterator

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

window.onload = function (event) {};

btnRegister.onclick = (event) => addNewUser(email.value, sha1(key.value)); //TODO: inputs verification

btnLogin.onclick = function (event) {
    // debugger
    testUser(getUserName(email.value), sha1(key.value));
    document.getElementById('label').style.display = 'block';
    document.getElementById('auth').style.display = 'none';
};

//TODO:

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function getExif(img) {


    EXIF.getData(img, function () {
        var allMetaData = EXIF.getAllTags(this);
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
    });
}

// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////