updateText = new Object();

jQuery(document).ready(function () {
    $.i18n({ locale: localStorage.getItem('locale') })
    update_texts = function () {
        document.title = $.i18n('title');
        $('body').i18n();
        $('#messages').text($.i18n('message_from', 'Peter', 5, 'male'));
        };
        updateText = update_texts;
    $.i18n().load({
        'en': {
            titles: {
                application: 'App Name'
            },
            'welcome': 'Welcome!',
            'id': 'ID',
            'name': 'Name',
            'category': 'Category',
            'price': 'Price',
            'method': 'Method',
            'get_product': 'Get Product',
            'post_product': 'New Product',
            'put_product': 'Edit Product',
            'submit': 'Submit',
            'enter_id': 'Enter ID',
            'enter_name': 'Enter Name',
            'enter_price': 'Enter Price',
            'enter_category': 'Enter Category',
            'empty_field': 'Required field is empty',
            'invalid_price': 'Value must be of type number',
            'title': 'Product App',
            'not supported': 'not supported',
            'not yet ready': 'Not yet ready',
            'error': 'error',
            'Error':'Error',
            'message_from': '$1 has send you $2 {{plural:$2|message|messages}}. {{gender:$3|He|She}} is waiting for your response!'
        },
        'ru': {
            'welcome': 'Добро пожаловать!',
            'id': 'ID',
            'name': 'Имя',
            'category': 'Категория',
            'price': 'Цена',
            'method': 'Метод',
            'get_product': 'Найти Продукт',
            'post_product': 'Новый Продукт',
            'put_product': 'Изменить Товар',
            'submit': 'Подтвердить',
            'enter_id': 'Введите ID',
            'enter_name': 'Введите Имя',
            'enter_price': 'Введите Цену',
            'enter_category': 'Введите Категорию',
            'empty_field': 'Поле обязательно к заполнению',
            'invalid_price': 'Значение должно быть числом',
            'title': 'Продуктовая компания :)',
            'not supported': 'не поддерживается',
            'not yet ready': 'Еще не готово',
            'error': 'ошибка',
            'Error': 'Ошибка',
            'message_from': '$1 {{gender:$3|отправил|отправила}} вам $2 {{plural:$2|сообщение|сообщения|сообщений}}. {{gender:$3|Он|Она}} ждет ответа!'
        }
    });
    console.log('Done');
    update_texts();
});