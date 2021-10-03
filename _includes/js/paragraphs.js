(function () {
    'use strict';
    var paragraphs = document.querySelectorAll('.js-p-index > p'),
        i,
        index;

    for (i = 0; i < paragraphs.length; i += 1) {
        index = document.createElement('small');
        index.innerText = '§' + (i + 1);
        paragraphs[i].prepend(index);
    }
}());
