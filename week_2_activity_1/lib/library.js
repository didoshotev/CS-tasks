function $(selector) {

    const self = { 
        element: document.querySelector(selector),
        html: () => self.element,
        
        addEventListener: (event, callback) => { 
            document.addEventListener(event, callback)
        },
        removeEventListener: (event, callback) => {
            document.removeEventListener(event, callback);
        },
        attr: (name, value) => {
            if(value == null) {
                self.element.getAttribute(name);
            } else {
                self.element.setAttribute(name, value);
            }
            return self.element;
        },
        addClass: (className) => {
            self.element.classList.add(className);
            return self.element;
        },
        text: (text) => {
            if(text) {
                self.element.innerText = text;
                return self.element;
            }
            return self.element.innerText;
        },
        appendNode: (child) => {
            self.element.appendChild(child);
            return self.element;
        },
        deleteNode: () => {
            self.element.remove();
        },
        css: (styles) => {
            for (const key in styles) {
                self.element.style[key] = styles[key];
            }
        }
    }

    return self;
}

let el3 = $('h3');

// el3.attr('class', 'hello');

let container = $('#demo');
let newEl = document.createElement('div');
newEl.textContent = '2030'
newEl.classList.add('el123')
container.appendNode(newEl);

console.log(container.html());

// const newElement = document.querySelector('.el123');
const newElement = $('.el123');
newElement.attr('id', 'ID09');
newElement.css({
    color: 'red',
    fontSize: '30px'
})
console.log(newElement.html());
