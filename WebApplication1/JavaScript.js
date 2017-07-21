var product;
var submitButtons, productsTable;

$(document).ready(function () {
    submitButtons = $(":button").click(module.sendForm);
    productsTable = $('#result-table tbody');
    $('#post-form').hide();
    $('#put-form').hide();
});

function renderForm(value) {
    clearAll();
    switch (value) {
        case 'GET':
            $('#get-form').show();
            break;
        case 'POST':
            $('#post-form').show();
            break;
        case 'PUT':
            $('#put-form').show();
            break;
    }
}

function addDangerBorder(element) {
    element.classList.add('required-input');
}

function removeDangerBorder(element) {
    element.classList.remove('required-input');
}

function hasDangerBorder(element) {
    return element.classList.contains('required-input');
}

function disableEnableSubmitButtons(enable) {
    if (enable)
        for (var i = 0; i < submitButtons.length; i++)
            submitButtons[i].removeAttribute('disabled');
    else
        for (var i = 0; i < submitButtons.length; i++)
            submitButtons[i].setAttribute('disabled', 'disabled');
}

function clearAll() {
    hide('post-form');
    hide('put-form');
    hide('get-form');
    inputs = $('input[type!="button"]').val('');
    for (var i = 0; i < inputs.length; i++)
        removeDangerBorder(inputs[i]);
}

function hide(id) {
    $('#' + id).hide();
}
