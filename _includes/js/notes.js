window.notes = window.notes || {};
window.notes.Item = window.notes.Item || {};
window.notes.manager = window.notes.manager || {};

window.notes.Item = function (dom, previous) {
    'use strict';
    this.dom = dom;
    this.parent = dom.parentNode;
    this.y = 0;
    this.previous = previous || null;
    this.anchor = document.querySelector('a[href="#' + dom.id + '"]');
    this.isVisible = false;
    setTimeout(function () {
        this.dom.classList.add('is-handled');
    }.bind(this), 1);
    this.replace();
};
window.notes.Item.prototype.ready = function () {
    'use strict';
    this.replace();
};

window.notes.Item.prototype.replace = function () {
    'use strict';

    if (window.notes.manager.isFixed) {
        this.dom.classList.add('is-fixed');
        this.dom.style.top = '';
        this.updateVisibility();
    } else {
        this.dom.classList.remove('is-fixed');
        this.updatePosition();
    }
};

window.notes.Item.prototype.updateVisibility = function () {
    'use strict';
    var anchorTop = this.anchor.getBoundingClientRect().top,
        offset = window.innerHeight * 0.5;

    this.isVisible = anchorTop > 0 && anchorTop < offset;
};

window.notes.Item.prototype.updatePosition = function () {
    'use strict';
    this.y = this.getTop(this.anchor) - this.getTop(this.parent);

    if (this.previous) {
        this.preventOverlap();
    }

    this.dom.style.top = this.y + 'px';
};

window.notes.Item.prototype.preventOverlap = function () {
    'use strict';
    var distance = this.previous.bottom() - this.y;
    this.y = Math.max(this.y, this.y + distance);
};

window.notes.Item.prototype.preventTitleOverlap = function () {
    'use strict';
    // TODO
};

window.notes.Item.prototype.getTop = function (element) {
    'use strict';
    return element.getBoundingClientRect().top + window.scrollY;
};

window.notes.Item.prototype.bottom = function () {
    'use strict';
    return this.y + this.dom.offsetHeight;
};

window.notes.manager = {
    breakpoint: 768,
    isFixed: false,
    pool: [],
    nearest: null,
    init: function () {
        'use strict';
        var i,
            elements = document.querySelectorAll('.js-note');

        if (elements.length === 0) {
            return;
        }

        this.setMode();

        for (i = 0; i < elements.length; i += 1) {
            this.generate(elements[i], i);
        }

        this.resize();
        this.listen();
    },

    generate: function (element, i) {
        'use strict';
        var previous = this.pool[i - 1] || null;
        this.pool.push(new window.notes.Item(element, previous));
    },

    listen: function () {
        'use strict';
        window.addEventListener('scroll', this.scroll.bind(this));
        window.addEventListener('resize', this.resize.bind(this));
        window.addEventListener('load', this.resize.bind(this));
    },

    resize: function () {
        'use strict';
        this.setMode();
        this.update();
    },

    setMode: function () {
        'use strict';
        var isFixed = window.innerWidth < this.breakpoint;
        this.isFixed = isFixed;
    },

    scroll: function () {
        'use strict';
        var nearest = null,
            i;

        if (this.isFixed) {
            this.update();
        }
        for (i = this.pool.length - 1; i >= 0; i -= 1) {
            if (this.pool[i].isVisible && !nearest) {
                nearest = this.pool[i];
                nearest.dom.classList.add('is-visible');
            } else {
                this.pool[i].dom.classList.remove('is-visible');
            }
        }
    },

    update: function () {
        'use strict';
        var i;
        for (i = 0; i < this.pool.length; i += 1) {
            this.pool[i].replace();
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    window.notes.manager.init();
});
