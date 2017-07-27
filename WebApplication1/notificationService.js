var module = (function () {
    var validPriceRegex  = /^(?:\d+[,.])?\d+$/;
    var uri = 'api/product';

    var sendForm = function () {
            var method = $('#select-method').val();
            switch (method) {
                case 'POST':
                    postProduct();
                    break;
                case 'PUT':
                    putProduct();
                    break;
                case 'GET':
                    findProduct();
                    break;
                default:
                    throw (method + ' not supported');
                    break;
            }
    }

    var sendAjax = function (product, method, uri) {
        disableEnableSubmitButtons(false);
        $.ajax({
            url: uri ? uri : 'api/product',
            type: method,
            data: product,
            success: function (response) {
                productsTable.parent().fadeIn('fast', function () {
                    productsTable.fadeOut('fast', function () {
                        data = JSON.parse(response);
                        if (data instanceof Array) {
                            productsTable.empty();
                            for (var i = 0; i < data.length; i++) {
                                productsTable.append(createTR(data[i]));
                            }
                            productsTable.fadeIn();
                        }
                        else {
                            productsTable.empty().append(createTR(data)).fadeIn();
                        }
                    });
                });
                disableEnableSubmitButtons(true);
                return response;
            },
            error: function (jqXHR, textStatus, thrownError) {
                showToast('error', $.i18n('Error') + '. ' + thrownError);
                disableEnableSubmitButtons(true);
                return thrownError;
            }
        })
    }

    var findProduct = function() {
        var id = $('#get-form input.Id').val();
        if (id !== '') {
            sendAjax('', 'GET', (uri + '/' + id));
        }
        else {
            sendAjax('', 'GET');
        }
    }

    function createTR(product) {
        var tr = $('<tr></tr>');
        tr.append($('<td></td>').text(product.ID));
        tr.append($('<td></td>').text(product.Name));
        if (product.Category == null)
            tr.append($('<td></td>').text(''));
        else
            tr.append($('<td></td>').text(product.Category));
        tr.append($('<td></td>').text(product.Price));
        return tr;
    }

    var putProduct = function () {
        var isValid = true;
        var putForm = document.getElementById('put-form');   
        var product = {
            Name: findInForm(putForm, 'Name').value,
            Category: findInForm(putForm, 'Category').value
        };
        var price = findInForm(putForm, 'Price').value;
        if (price != '') {
            if (!price.match(validPriceRegex)) {
                addRemoveWarning({ element: findInForm(putForm, 'Price'), text: 'invalid_price'}, true );
                isValid = false;
            }
            else {
                product.Price = price;
                addRemoveWarning({ element: findInForm(putForm, 'Price') }, false);
            }
        }
        else {
            addRemoveWarning({ element: findInForm(putForm, 'Price') }, false);
        }
        product.Id = findInForm(putForm, 'Id').value;
        if (product.Id) {
            addRemoveWarning({ element: findInForm(putForm, 'Id') }, false);         
        }
        else {
            addRemoveWarning({ element: findInForm(putForm, 'Id'), text: 'empty_field' } ,true);
            isValid = false;
        }
        if (isValid) {
            sendAjax(product, 'PUT');
        }
    }

    var postProduct = function () {
        var isValid = true;
        var postForm = document.getElementById('post-form');
        var product = {
            Name: findInForm(postForm, 'Name').value,
            Category: findInForm(postForm, 'Category').value
        };
        var price = findInForm(postForm, 'Price').value;
        if (price != '') {
            if (!price.match(validPriceRegex)) {
                addRemoveWarning({ element: findInForm(postForm, 'Price'), text: 'invalid_price' }, true );
                isValid = false;
            }
            else {
                product.Price = price;
                addRemoveWarning({ element: findInForm(postForm, 'Price') }, false);
            }
        }
        else {
            addRemoveWarning({ element: findInForm(postForm, 'Price') }, false);
        }
        if (product.Name) {
            addRemoveWarning({ element: findInForm(postForm, 'Name') }, false);
        }
        else {
            addRemoveWarning({ element: findInForm(postForm, 'Name'), text: 'empty_field' }, true);
            isValid = false;
        }
        if (isValid) {
            sendAjax(product, 'POST');
        }
    }

    function findInForm(form, elementClass) {
        return form.getElementsByClassName('form-control ' + elementClass)[0];
    }
    function find(elementClass) {
        return this.getElementsByClassName(elementClass);
    }
    return {
        sendForm: sendForm,
        findInForm: findInForm,
        validPriceRegex: validPriceRegex
    }
})();