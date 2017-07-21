var module = (function () {
    var uri = 'api/product';

    var sendForm = function () {
        switch ($('#select-method').val()) {
            case 'POST':
                postProduct();
                break;
            case 'PUT':
                putProduct();
                break;
            case 'GET':
                findProduct();
                break;
        }
    }

    var sendAjax = function (product, method) {
        disableEnableSubmitButtons(false);
        $.ajax({
            url: 'api/product',
            type: method,
            data: product,
            success: function (item) {
                productsTable.fadeOut('fast', function () {
                    productsTable.empty().append(createTR(JSON.parse(item))).fadeIn();
                });
                $('#result').text('');
                disableEnableSubmitButtons(true);
                return item;
            },
            error: function (jqXHR, textStatus, thrownError) {
                $('#result').text('Error. ' + thrownError);
                disableEnableSubmitButtons(true);
                return err;
            }
        })
    }

    var findProduct = function() {
        disableEnableSubmitButtons(false);
        var id = $('#get-form input:first').val();
        if (id !== '') {
            $.getJSON(uri + '/' + id)
                .done(function (data) {
                    productsTable.fadeOut('fast', function () {
                        productsTable.empty().append(createTR(JSON.parse(data))).fadeIn();
                    });
                    $('#result').text('');
                    disableEnableSubmitButtons(true);
                })
                .fail(function (jqXHR, textStatus, err) {
                    $('#result').text('Error: ' + err);
                    disableEnableSubmitButtons(true);
                });
        }
        else {
            $.getJSON(uri)
                .done(function (data) {
                    var items = JSON.parse(data);
                    var table = $('#result-table tbody');
                    var t2 = productsTable;
                    productsTable.fadeOut('fast', function () {
                        productsTable.empty();
                        for (var i = 0; i < items.length; i++) {
                            productsTable.append(createTR(items[i]));
                        }
                        productsTable.fadeIn();
                    });
                    $('#result').text('');
                    disableEnableSubmitButtons(true);
                });
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
        var form = document.getElementById('put-form');
        var product = new Object();      
        product.Name = findInForm(form, 'Name').value;
        product.Category = findInForm(form, 'Category').value;
        product.Price = findInForm(form, 'Price').value;
        product.Id = findInForm(form, 'Id').value;
        if (product.Id) {
            if (hasDangerBorder(findInForm(form, 'Id'))) {
                removeDangerBorder(findInForm(form, 'Id'));
            }
            sendAjax(product, 'PUT');
        }
        else
            addDangerBorder(findInForm(form, 'Id'));
    }

    var postProduct = function () {
        var form = document.getElementById('post-form');
        var product = new Object();
        product.Name = findInForm(form, 'Name').value;
        product.Category = findInForm(form, 'Category').value;
        product.Price = findInForm(form, 'Price').value;
        if (product.Name) {
            if (hasDangerBorder(findInForm(form, 'Name'))) {
                removeDangerBorder(findInForm(form, 'Name'));
            }
            sendAjax(product, 'POST');
        }
        else
            addDangerBorder(findInForm(form, 'Name'));
    }

    function findInForm(form, elementClass) {
        return form.getElementsByClassName('form-control ' + elementClass)[0];
    }

    return {
        sendForm: sendForm
    }
})();