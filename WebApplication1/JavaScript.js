var product;
var submitButtons, productsTable;

$(document).ready(function () {
    submitButtons = $(":button").click(function (e) {
        e.preventDefault();
        module.sendForm();
    });
    productsTable = $('#result-table tbody');
    $('a[data-locale=' + localStorage.getItem('locale') + ']').addClass('disabled');
    renderForm($('#select-method').val());
    $('body div form').keypress(function (event) {       
        var key = event.which || event.keyCode;
        if (key == 13) {
            event.preventDefault();
            module.sendForm();
        }
    });
    $('.lang-switch').click(function (e) {
        e.preventDefault();
        $.i18n({ locale: $(this).data('locale') });
        console.log('locale: ' + $(this).data('locale'));
        localStorage.setItem('locale', $(this).data('locale'));
        updateText();
        updateWarnings();
        $('.lang-switch').removeClass('disabled');
        $(this).addClass('disabled');
    });
    window.onerror = function (msg, url, line, col, error) {
        showToast('error', $.i18n(msg), $.i18n(error));
    }
});

function renderForm(value) {
        clearAll();
        switch (value) {
            case 'GET':
                $('#get-form').show();
                setFocus('get-form');
                break;
            case 'POST':
                $('#post-form').show();
                setFocus('post-form');
                break;
            case 'PUT':
                $('#put-form').show();
                setFocus('put-form');
                break;
            default:              
                throw (value + ' not supported');
                break;
        }
}

function addRemoveWarning(data, add) {
    if (add) {
        if (!data.element.classList.contains('required-input')) {
            data.element.classList.add('required-input');
            if (data.text) {
                $('<p class="warning-message"></p>').text($.i18n(data.text)).insertAfter(data.element);
            }
        }
        else {
            addRemoveWarning(data, false);
            addRemoveWarning(data, true);
        }
    }
    else {
        if (data.element.classList.contains('required-input')) {
            data.element.classList.remove('required-input');
            var message = data.element.parentElement.getElementsByClassName('warning-message')[0];
            if (message) {
                message.remove();
            }
        }
    }
}

function disableEnableSubmitButtons(enable) {
    if (enable) {
        for (var i = 0; i < submitButtons.length; i++) {
            submitButtons[i].removeAttribute('disabled');
        }
    }
    else {
        for (var i = 0; i < submitButtons.length; i++) {
            submitButtons[i].setAttribute('disabled', 'disabled');
        }
    }
}

function clearAll() {
    hide(['get-form', 'post-form', 'put-form']);
    inputs = $('input[type!="button"]').val('');

    for (var i = 0; i < inputs.length; i++) {
        addRemoveWarning({ element: inputs[i] }, false);
    }
}

function hide(ids) {
    if (ids instanceof Array) {
        for (var i = 0; i < ids.length; i++) {
            $('#' + ids[i]).hide();
        }
    }
    else {
        $('#' + ids).hide();
    }
}

function buttonVale() {
    return $.i18n('submit');
}

function setFocus(id) {
    var form = $('#' + id + ' input[type != "button"]:first').focus();
}

function updateWarnings() {
        switch ($('#select-method').val()) {
            case 'POST':
                checkForm('post-form');
                break;
            case 'PUT':
                checkForm('put-form');
                break;
            case 'GET':
                break;
            default:
                throw ($('#select-method').val() + ' not supported');
                break;
        }
}

function checkForm(formId) {
    var chekingForm = document.getElementById(formId);
    var product = {
        Id: module.findInForm(chekingForm, 'Id') ? module.findInForm(chekingForm, 'Id').value : '',
        Name: module.findInForm(chekingForm, 'Name') ? module.findInForm(chekingForm, 'Name').value : '',
        Category: module.findInForm(chekingForm, 'Category') ? module.findInForm(chekingForm, 'Category').value : '',
        Price: module.findInForm(chekingForm, 'Price') ? module.findInForm(chekingForm, 'Price').value : ''
    };
    if (module.findInForm(chekingForm, 'Price').classList.contains('required-input')) {
        addRemoveWarning({ element: module.findInForm(chekingForm, 'Price'), text: 'invalid_price' }, true);
        isValid = false;
    }
    else {
        addRemoveWarning({ element: module.findInForm(chekingForm, 'Price') }, false);
    }
    if (formId == 'post-form') {
        if (module.findInForm(chekingForm, 'Name').classList.contains('required-input')) {
            addRemoveWarning({ element: module.findInForm(chekingForm, 'Name'), text: 'empty_field' }, true);
            isValid = false;
        }
    }
    if (formId == 'put-form') {
        if (module.findInForm(chekingForm, 'Id').classList.contains('required-input')) {
            addRemoveWarning({ element: module.findInForm(chekingForm, 'Id'), text: 'empty_field' }, true);
            isValid = false;
        }
        if (isValid) {
            return product;
        }
        else {
            return false;
        }
    }
}

function showToast(type, text, title) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](text, title);
}
