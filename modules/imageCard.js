/*jshint esversion: 8 */
const EXIF = require('exif-js');
class imageCard extends HTMLElement {
    constructor() {
        super();
        // let text;

        let wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        this.picture = document.createElement('img');
        this.picture.className = 'image';
        wrapper.appendChild(this.picture);
        // this.date = document.createElement('span');
        // this.date.className = "date";
        // wrapper.appendChild(this.date);
        this.text = document.createElement('span');
        // wrapper.appendChild(this.text);

        let style = document.createElement('style');
        // debugger;
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
            // .wrapper:hover::after {
            //     content: "${this.text.innerText}";//TODO:
            //     position: fixed; 
            //     top: 5px; left: 80%; right: 0; bottom: 5px;
            //     z-index: 1; 
            //     background: rgba(0,42,167,0.6); 
            //     color: #fff; 
            //     text-align: center; 
            //     font-family: Arial, sans-serif; 
            //     font-size: 11px; 
            //     padding: 5px 10px; 
            //     border: 1px solid #333; 
            // }
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
        // debugger;
        this.onmouseenter = function (event) {
            this.picture.style.maxWidth = '500px';
            this.text.style.display = 'block'; //
            wrapper.appendChild(this.text);
            // getComputedStyle(document.getElementsByTagName('style')[0], ':hover', '::after').content = this.getExif(
            // 	this.picture
            // );
            TODO: /*this.text.innerHTML*/ this.text.innerHTML = this.getExif(this.picture); //'placeholder';TODO:
        };

        this.onmouseout = function (event) {
            // wrapper.removeChild(this.text);
            this.text.style.display = 'none';
            this.picture.style.maxWidth = '400px';
        };

        this.onclick = function (event) {
            // wrapper.appendChild(this.date)
            // this.date.innerText = response.uploaded;
            // wrapper.style.width = '600px';
            // wrapper.appendChild(this.text);
        };

        this.getExif = function (img) {
            // debugger
            let allMetaDataSpan = this.text;
            EXIF.getData(img, function () {
                // debugger; //
                // let allMetaData = EXIF.getAllTags(this);
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