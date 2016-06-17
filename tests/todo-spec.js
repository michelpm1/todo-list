'use strict';
describe('Protractor Demo App', function() {
    beforeEach(function() {
        browser.get('http://localhost:3000/#/todolist');
    });
    it('Testing adding new Reminder', function() {
        let newReminder = element(by.id('newReminder'));
        let addBtn = element(by.id('addBtn'));

        newReminder.click();
        let text = element(by.model('item.text'));
        text.sendKeys('test');
        addBtn.click();
        element.all(by.repeater('item in list')).then(function(list){
            let lastArray = list[list.length - 1];
            let testAux = lastArray.element(by.id('itemText'));
            console.log(testAux);
            expect(testAux.getText() == 'test');
        });



    });

    it('Testing deleting new Reminder', function() {

        let arrayReminderDel = element.all(by.repeater('item in list')).then(function(list) {
            let deleteReminder = list[8].element(by.id('deleteItem'));
            deleteReminder.click();
            arrayReminderDel = element.all(by.repeater('item in list'));
            expect(arrayReminderDel.count()).toEqual(8);
        });

    });
});
