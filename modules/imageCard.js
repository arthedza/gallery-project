/*jshint esversion: 8 */
const EXIF = require('exif-js');
class imageCard extends HTMLElement {
    constructor() {
        super();

        let wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        this.picture = document.createElement('img');
        this.picture.className = 'image';
        wrapper.appendChild(this.picture);
        this.text = document.createElement('span');

        let style = document.createElement('style');
        style.textContent = `
            .wrapper {
                display: inline-block;
                flex-direction: row-reverse;
                flex-wrap: wrap;
                align-items: flex-end;
                align-content: space-between;
                margin: 20px;
            }
            .wrapper:hover {
                background-color: #1B1B1E;
            }
            
            .image {
                max-width: 400px;
                max-height: 400px;
                border: solid 1px #555;
                transition: 0.4s;
                // float: left;
            }
            span {
                // position: fixed;
                // width: 100%;
                display: none;
                // top: 50%;
                // left: 50%;
                // bottom: 50%;
                font-size: 14px;
                font-family: sans-serif;
                color: white;
                // transform: translate(-50%,-50%);
                transition: 0.4s;
            }
        `;
        this.shadow = this.attachShadow({
            mode: 'open'
        });
        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);
        this.onmouseenter = function (event) {
            this.picture.style.maxWidth = '500px';
            this.text.style.display = 'block';
            wrapper.appendChild(this.text);
            this.text.innerHTML = this.getExif(this.picture);
        };

        this.onmouseout = function (event) {
            this.text.style.display = 'none';
            this.picture.style.maxWidth = '400px';
        };

        this.onclick = function (event) {};

        this.getExif = function (img) {
            let allMetaDataSpan = this.text;
            EXIF.getData(img, function () {
                let Make = EXIF.getTag(this, 'Make');
                let Model = EXIF.getTag(this, 'Model');
                let PixelXDimension = EXIF.getTag(this, 'PixelXDimension');
                let PixelYDimension = EXIF.getTag(this, 'PixelYDimension');
                allMetaDataSpan.innerHTML = `Vendor: ${Make}; Model: ${Model}; Resolution: ${PixelXDimension}x${PixelYDimension}`; //JSON.stringify(allMetaData, null, '\t');
            });
            return allMetaDataSpan.innerText;
        };
    }
    static get observedAttributes() {
        return ['src'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this.picture.src = this.getAttribute('src');
    }
}
export default imageCard;