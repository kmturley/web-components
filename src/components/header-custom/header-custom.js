////
/// @group header-custom
/// @author kmturley
////

/*globals HTMLElement*/

(function () {
    'use strict';

    var document_alt =  (document._currentScript || document.currentScript).ownerDocument,
        template = document_alt.querySelector('template').content,
        el = Object.create(HTMLElement.prototype);

    el.createdCallback = function () {
        var shadowRoot = this.createShadowRoot(),
            clone = document.importNode(template, true);
        shadowRoot.appendChild(clone);
        this.strong = shadowRoot.querySelector('strong');
        if (this.hasAttribute('who')) {
            this.strong.textContent = this.getAttribute('who');
        } else {
            this.strong.textContent = 'World';
        }
    };

    el.attributeChangedCallback = function (attr, oldVal, newVal) {
        if (attr === 'who') {
            this.strong.textContent = newVal;
        }
    };

    window.MyElement = document.registerElement('header-custom', {
        prototype: el
    });
}(window, document));