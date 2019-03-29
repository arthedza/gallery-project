class imageCard extends HTMLElement {
    constructor() {
        super();
        let wrapper = document.createElement('div');
        wrapper.className = "wrapper";
        this.picture = document.createElement('img');
        this.picture.className = "image";
        wrapper.appendChild(this.picture);
        this.date = document.createElement('span');
        this.date.className = "date";
        wrapper.appendChild(this.date);

        let style = document.createElement('style');
        style.textContent = `
            .wrapper {
                display: inline-block;
                margin: 20px;
            }
            .wrapper:hover {
                // z-index: 3;
                background-color: red;
            }
            .image {
                max-width: 400px;
                max-height: 400px;
                border: dotted 1px #555;
                transition: all 1s;
            }
        `;
        this.shadow = this.attachShadow({
            mode: 'open'
        });
        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);
    }
    static get observedAttributes() {
        return ["src"];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.picture.src = this.getAttribute('src');
    }
}
export default imageCard;