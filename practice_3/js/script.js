/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Анальный червяк",
        "Залупа по-оджарски",
        "Ебанутая хуйня",
        "Скоростные шахматы",
        "Скотт Пилигрим против пидарасов"
    ]
};

const promoAdv = document.querySelector('.promo__adv'),
      adds = promoAdv.querySelectorAll('img');
      

let comedy = document.getElementsByClassName('promo__genre'),
    films = document.getElementsByClassName('promo__interactive-item'),
    bg = document.getElementsByClassName('promo__bg');

function removeAdds() {                         // Задание №1: По рофлу если что ебанул в функцию для теста
    for (let i = 0; i < 3; i++) {
        promoAdv.removeChild(adds[i]); 
    }
}

removeAdds();

comedy[0].innerHTML = '<div class="promo__genre">ДРАМА</div>';     // Задание №2:

bg[0].style.background = 'url("../img/bg.jpg") center center/cover no-repeat';  // Задание №3:


// function replaceFilms() {                                   //  Задание №4: не правильно и не доделано пока не ебу как
//     for (let i = 0; i < 5; i++) {
//         films[i].replaceWith(movieDB.movies[i]);
//     }
// }

// console.log(movieDB);
// console.log(films);



