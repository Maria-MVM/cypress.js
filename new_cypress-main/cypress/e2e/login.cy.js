import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           })
      afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

   it('Верный пароль и верный логин', function () {
       cy.get(main_page.email).type(data.login); // Ввели верный логин
       cy.get(main_page.password).type(data.password); // Ввели верный пароль
       cy.get(main_page.login_button).click(); // Нажала ввойти
       cy.wait(5000)
       cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что авторизация прошла успешна
       cy.get(result_page.title).should('be.visible'); // Текст виден пользователю

 })
      it('Восстановление пароля', function () {
       cy.get(main_page.fogot_pass_btn).click(); // Нажала кнопку восстановить пароль
       cy.get(recovery_password_page.email).type(data.login); // Ввела почту для востановления
       cy.get(recovery_password_page.send_button).click(); // нашла кнопку отправить код и нажала на нее
       cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совпад.текст
       cy.get(result_page.title).should('be.visible'); // Текст виден пользователю

 })
    it('Верный логин и неверный пароль', function () {
       cy.get(main_page.email).type(data.login); // Ввели верный логин
       cy.get(main_page.password).type('iLoveqastudio'); // Ввели неверный пароль
       cy.get(main_page.login_button).click(); // Нажала ввойти
       cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после автор. вижу текст
       cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

       it('Неверный логин и верный пароль', function () {
       cy.get(main_page.email).type('german@dolniko.ru'); // Ввели неверный логин
       cy.get(main_page.password).type(data.password); // Ввели верный пароль
       cy.get(main_page.login_button).click(); // Нажала ввойти
       cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после автор. виден текст 
       cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
 })
    it('Проверка что в логине есть @', function () {
       cy.get(main_page.email).type('germandolnikov.ru'); // Ввели  логин ,без @
       cy.get(main_page.password).type(data.password); // Ввели верный пароль
       cy.get(main_page.login_button).click(); // Нажала ввойти
       cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что автор. вижу текст
       cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
})
       it('Проверка на приведение к строчным буквам в логине', function () {
       cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели  логин строчными и заглавными буквами
       cy.get(main_page.password).type(data.password); // Ввели верный пароль
       cy.get(main_page.login_button).click(); // Нажали ввойти
       cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что авторизация прошла успешна
       cy.get(result_page.title).should('be.visible'); // Текст виден пользователю

 })

})


// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome