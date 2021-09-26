window.notes = window.notes || {};
window.notes.Item = window.notes.Item || {};
window.notes.manager = window.notes.manager || {};

window.notes.Item = function (dom) {
    'use strict';
    this.dom = dom;
    this.anchor = document.querySelector('a[href="#' + dom.id + '"]');
};

window.notes.Item.prototype.replace = function (isFixed) {
    'use strict';
    if (isFixed) {
        this.dom.classList.add('is-fixed');
        this.updateVisibility();
    } else {
        this.dom.classList.remove('is-fixed');
        this.updatePosition();
    }
};

window.notes.Item.prototype.updateVisibility = function () {
    'use strict';
    var anchorTop = this.anchor.getBoundingClientRect().top,
        offset = window.innerHeight * 0.5,
        action = anchorTop > 0 && anchorTop < offset ? 'add' : 'remove';
    this.dom.classList[action]('is-visible');
};

window.notes.Item.prototype.updatePosition = function () {
    'use strict';
    this.anchor.parentNode.insertAdjacentElement('afterend', this.dom);
};

window.notes.manager = {
    breakpoint: 768,
    notes: [],
    isFixed: false,
    init: function () {
        'use strict';
        var i,
            elements = document.querySelectorAll('.js-note');

        if (elements.length === 0) {
            return;
        }

        for (i = 0; i < elements.length; i += 1) {
            this.notes.push(new window.notes.Item(elements[i]));
        }
        this.resize();
        this.listen();
    },

    listen: function () {
        'use strict';
        window.addEventListener('scroll', this.scroll.bind(this));
        window.addEventListener('resize', this.resize.bind(this));
    },

    resize: function () {
        'use strict';
        var isFixed = window.innerWidth < this.breakpoint;
        this.isFixed = isFixed;
        this.update();
    },

    scroll: function () {
        'use strict';
        if (this.isFixed) {
            this.update();
        }
    },

    update: function () {
        'use strict';
        var i;
        for (i = 0; i < this.notes.length; i += 1) {
            this.notes[i].replace(this.isFixed);
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    window.notes.manager.init();
});
