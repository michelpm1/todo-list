'use strict';
describe('Protractor Demo App', function() {
    beforeEach(function() {
        browser.get('http://localhost:3000/#/todolist');
    });
    it('Testing adding new Reminder', function() {
        element.all(by.repeater('item in list')).then(function(list){
            let newReminder = element(by.id('newReminder'));
            let addBtn = element(by.id('addBtn'));
            newReminder.click();
            let text = element(by.model('itemCreate.text'));
            text.sendKeys('test');
            addBtn.click();
            let lastArray = list[list.length - 1];
            let testAux = lastArray.element(by.id('itemText'));
            expect(testAux.getText() == 'test');
        });



    });
    it('Testing editing new Reminder', function() {
        let btnShow = element(by.id('btnShow'));
        btnShow.click();
        element.all(by.repeater('item in list')).then(function(list){

            let lastArray = list[list.length - 1];
            let testAux = lastArray.element(by.id('editItem'));
            testAux.click();
            let text = element(by.id('text'));
            text.sendKeys('edited');
            let btnEdit = element(by.id('btn-edit'));
            btnEdit.click();
        });

        element.all(by.repeater('item in list')).then(function(list){
            let lastArray = list[list.length - 1];
            let testAux = lastArray.element(by.id('itemText'));
            expect(testAux.getText() == 'edited');
        });

    });

    it('Testing deleting new Reminder', function() {
        let btnShow = element(by.id('btnShow'));
        btnShow.click();
        element.all(by.repeater('item in list')).then(function(list) {
            let lastArray = list[list.length - 1];
            let testAux = lastArray.element(by.id('deleteItem'));
            testAux.click();
            element.all(by.repeater('item in list')).then(function(list) {
                lastArray = list[list.length - 1];
                let testAux = lastArray.element(by.id('itemText'));
                expect(testAux.getText() != 'edited' && 'test');
            });

        });

    });
});
