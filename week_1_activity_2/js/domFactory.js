export const DomFactory = (function (document) {

    const api = {
        element: function (name, attributes) {
            const el = document.createElement(name);

            if (attributes) {
                for (let key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        el.setAttribute(key, attributes[key]);
                    }
                }
            }

            return el;
        },

        div: function (attributes) {
            return api.element('div', attributes);
        }
    };

    return api;

}(window.document));