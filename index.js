function addElement(tagName, container) {
    return (container ? container : document.body).appendChild(document.createElement(tagName));
}

function testFile(file) {
    //TODO: new func
    return new Promise(() => {
        //TODO: resolve + reject //TODO: IF?
        return /jpeg|png|gif/gi.test(file.type) ?
            (addElement('img').src = URL.createObjectURL(file)) : //TODO: separete function to insert image into the DOM
            (addElement('p').innerText = 'Выбранный файл не является изображением'); //TODO: add img into web-component
    });
}

//TODO: JSDOC /** */
// const formData = new FormData();

var selector = document.getElementById('image_selector');
selector.onchange = function (event) {
    for (var file of event.target.files) {
        testFile(file).then(transport(file));
    }
};
//TODO: rename funcs (function naming)
async function transport(file) {
    fetch('http://localhost:3000/Images/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: await encode(file)
            })
        })
        .then((response) => response.json())
        .then((response) => console.log(response));
}
//TODO: reject
function encode(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => resolve(window.btoa(event.target.result));
    });
}
//TODO: headers and src (add to params) in a separate variables;
//TODO: define quantity of loaded src
function getImg(params) {
    // let loadedData = {}
    return fetch('http://localhost:3000/Images/').then(response => response.json()); //.then(response => console.log(response));
    // return loadedData
    // console.log()
}

function showImg(img) {
    return img.content ? addElement('img').src = `data:image/png;base64,${img.content}` : null; //TODO: file types
}

window.onload = function (event) {
    getImg().then(response => response.forEach(responseEntity => showImg(responseEntity))); //TODO: mb create custom response iterator
};