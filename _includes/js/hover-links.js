window.hoverLinks = {
    timeout: null,
    init: function () {
        'use strict';
        var i = 0,
            links = document.querySelectorAll('[data-link-delay]');

        for (i = 0; i < links.length; i += 1) {
            this.bind(links[i]);
        }
    },
    bind: function (link) {
        'use strict';
        var a = link.querySelector('a'),
            delay = link.getAttribute('data-link-delay');

        link.addEventListener('mouseenter', function () {
            this.timeout = setTimeout(this.click.bind(this, a), delay * 1000);
        }.bind(this));

        link.addEventListener('mouseleave', function () {
            clearTimeout(this.timeout);
        }.bind(this));
    },
    click: function (element) {
        'use strict';
        var event = new MouseEvent('click');
        element.dispatchEvent(event);
    }
};

window.hoverLinks.init();
