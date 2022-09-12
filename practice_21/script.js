'use strict';

class User {
    constructor(name, age) {
        this.name = name;
        this.userAge = age;
    }
    say() {
        console.log(`Имя пользователя: ${this.name},  возраст: ${this.userAge}`);
    }
    getAge() {
        return this.userAge; 
    }
    setAge(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this.userAge = age;
        } else {
            console.log('Недопустимое значение!');
        }
    }
}

const alex = new User('Alex', 21);
console.log(alex.name);
alex.userAge = 99;
console.log(alex.getAge());

alex.setAge(30);
alex.setAge(300);
console.log(alex.getAge());

alex.say();

