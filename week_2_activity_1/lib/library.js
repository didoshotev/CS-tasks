function $(selector) {

    const self = { 
        element: document.querySelector(selector),
        html: () => self.element,
        
        log: () => {
            console.log(self.element);
            return self;
        },

        addEventListener: (event, callback) => { 
            document.addEventListener(event, callback);
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
            return self;
        },
        addClass: (className) => {
            self.element.classList.add(className);
            return self;
        },
        text: (text) => {
            if(text) {
                self.element.innerText = text;
                return self;
            }
            return self.element.innerText;
        },
        appendNode: (child) => {
            self.element.appendChild(child);
            return self;
        },
        deleteNode: () => {
            self.element.remove();
        },
        css: (styles) => {
            for (const key in styles) {
                self.element.style[key] = styles[key];
            }
            return self;
        },
        parentNode: () => {
            return self.element.parentElement;
        },
        childNodes: () => {
            return self.element.childNodes;
        },

        upperSibling: () => {
            const parent = self.element.parentElement;
            const nodes = [...parent.childNodes];
            for (let i = 0; i < nodes.length; i++) {
                if(nodes[i] == self.element) {
                    return nodes[i - 1];
                }
            }
            return null;
        },
        lowerSibling: () => {
            const parent = self.element.parentElement;
            const nodes = [...parent.childNodes];
            for (let i = 0; i < nodes.length; i++) {
                if(nodes[i] == self.element) {
                    return nodes[i + 1];
                }
            }
            return null;
        },
    }

    return self;
}
