/*jshint esversion: 8 */

import imageCard from './modules/imageCard.js';
customElements.define('image-card', imageCard);

const sha1 = require('js-sha1');

const PORT = 3000;
const contentWrapper = document.getElementsByClassName('content_wrapper')[0];
const placeholder = document.getElementsByClassName('placeholder')[0];
const btnRegister = document.getElementById('btn_register');
const btnLogin = document.getElementById('btn_login');
const email = document.getElementById('email');
const key = document.getElementById('password');

function addElement(tagName, container) {
    return (container ? container : document.body).appendChild(document.createElement(tagName));
}

function getCurrentDate() {
    return new Date().toLocaleString();
}

function testFile(file) {
    return new Promise(() => {
        return /jpeg|png|gif/gi.test(file.type) ?
            addElement('image-card', contentWrapper).setAttribute('src', URL.createObjectURL(file)) :
            alert('Выбранный файл не является изображением');
    });
}

var selector = document.getElementById('image_selector');
selector.onchange = function (event) {
    for (var file of event.target.files) {
        testFile(file).then(sendFile(file));
    }
};

async function sendFile(file) {
    fetch(`http://localhost:${PORT}/Images/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uploaded: getCurrentDate(),
                ovner: getUserName(email.value),
                content: await encodeFile(file)
            })
        })
        .then((response) => response.json())
        .catch(error => console.log(error));
}

function encodeFile(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => resolve(window.btoa(event.target.result));
    });
}

function getData(endpoint) {
    return fetch(`http://localhost:${PORT}/${endpoint}/`).then((response) => response.json())
        .catch(error => console.log(error));
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

async function testUser(userName, key) {
    let response = await getData('Users');
    let user = await response.find((user) => user[userName]);
    if (!user) {
        alert('user does not exist');
        location.reload();
    } else
        user[userName].name === userName && user[userName].key === key ?
        beginSession(key) :
        alert('error!');
}

function deleteCoockie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function beginSession(key) {
    console.log('hi');
    let logOut = addElement('button', document.getElementsByClassName('topbar_wrapper')[0]);
    logOut.innerText = 'Logout';
    logOut.onclick = function (event) {
        alert('logout');
        deleteCoockie('key');
        location.reload();
    };
    document.cookie = `key=${key};max-age=3600`;
    getData('Images').then((response) =>
        response.forEach((responseEntity) => {
            responseEntity.ovner === getUserName(email.value) ? showImg(responseEntity) : placeholder.hidden = false;
        })
    );
}

btnRegister.onclick = (event) => addNewUser(email.value, sha1(key.value));

btnLogin.onclick = function (event) {
    testUser(getUserName(email.value), sha1(key.value));
    document.getElementById('label').style.display = 'block';
    document.getElementById('auth').style.display = 'none';
};