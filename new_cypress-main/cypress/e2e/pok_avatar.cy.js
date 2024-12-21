describe('Покупка аватара', function () {
  it('e2e тест на покупку нового аватара для тренера и возвращение на свою страницу ', function () {
    // Открываем страницу
    cy.visit('https://pokemonbattle.ru/login');
    // Ищем элемент по CSS-селекторам и проверяем текст
    cy.get('#root > div > main:nth-child(1) > section > div.login__content > form > a.auth__restore')
      .should('contain.text', 'Восстановить');
    //Вводим логин
    cy.get(':nth-child(1) > .auth__input').type('Malykhinamas@yandex.ru');
    //Вводим пароль
    cy.get('#password').type('12345Malma');
    //Нажимаем кнопку воити и ждем 3сек
    cy.get('.auth__button').click();
    cy.wait(3000)
    //Клик на аватар тренера
    cy.get('.header__container > .header__id').click();
    //Клик на "Сменить аватар"
    cy.get('[href="/shop"] > .history-info').click();
    // Кликаем на первого доступного аватара
     cy.get('.available > button').first().click();
    // Вводим номер карты
    cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');
    // Вводим CVV карты
    cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');
    // Вводим срок действия карты
    cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');
    // Вводим имя владельца действия 
    cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('MASHA MALIH');
    // Нажимаем кнопку Оплатить
    cy.get('.pay-btn').click();
    // Вводим код подтверждения СМС
    cy.get('#cardnumber').type('56456');
    // Нажимаем кнопку Отправить
    cy.get('.payment__submit-button').click();
    // Проверяем наличие "Покупка прошла успешно" и ее видимость 
    cy.get('.payment__font-for-success').should('be.visible');
    // Проверяем наличие кнопки "Вернуться в магазин" , ее видемость и нажимаем на нее
    cy.get('.payment__adv').should('be.visible');
    cy.get('.payment__adv').click();
    // Клик на автар тренера
    cy.get('.header__container > .header__id').click();
    });
});