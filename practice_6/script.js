const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block');

// console.log(btns[0].classList.length);   получает количество классов btns
// console.log(btns[0].classList.item(0));  получает первый класс btns
// console.log(btns[0].classList.add('red'));  добавляет класс red к btns
// console.log(btns[0].classList.remove('blue')); удаляет класс blue у btns
// console.log(btns[0].classList.toggle('blue'));  если класс blue удален, добавляет его;
                                                // если класс blue существует, удаляет его
// if (btns[1].classList.contains('red')) {  проверяет наличие класса red и возвращает true или false
//     console.log('red');
// }

// btns[0].addEventListener('click', () => {        при нажатии на первую кнопку проверяет,
//     if (!btns[1].classList.contains('red')) {    если у второй кнопки нет класса red - добавляет, 
//         btns[1].classList.add('red');            если есть - удаляет
//     } else {
//         btns[1].classList.remove('red');
//     }
// });

// wrapper.addEventListener('click', (event) => {               ДЕЛИГИРОВАНИЕ СОБЫТИЙ: при клике на содержимое wrapper, 
//     if (event.target && event.target.tagName == "BUTTON") {  проверяется, если цель клику существует и это цель с тегом button,
//         console.log('Hello');                                то в консоль выводится сообщение Hello
//     }
// });

