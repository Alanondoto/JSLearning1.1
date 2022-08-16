/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "анальный червяк",
            "залупа по-оджарски",
            "ебанутая хуйня",
            "скоростные шахматы",
            "скотт Пилигрим против пидарасов"
        ]
    };
    
    const adds = document.querySelectorAll('.promo__adv  img'),
          bg = document.querySelector('.promo__bg'),
          comedy = bg.querySelector('.promo__genre'),
          films = document.querySelector('.promo__interactive-list'),
          btn = document.querySelector('button'),
          checkbox = document.querySelector('[type="checkbox"]');
    
          
    
    adds.forEach(item => {                                          // Задание №1: 
        item.remove();
    });                                            
    
    comedy.textContent = 'драма';     // Задание №2:
    
    bg.style.backgroundImage = 'url("img/bg.jpg")';  // Задание №3:
    
    // for (let i = 0; i < 5; i++) {                                                       // Задания №4 и №5:
    //     movieDB.movies.sort();                               
    //     films[i].textContent = `${i + 1} ${movieDB.movies[i]}`;
    //     films[i].insertAdjacentHTML('afterbegin', '<div class="delete"></div>');
    // }
    
    films.innerHTML = "";
    
    movieDB.movies.sort();
    
    movieDB.movies.forEach((film, i) => {
        films.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
        `;
    });
    
    btn.addEventListener('click', (event) => {                          // Задание №1: Урок 33
        event.preventDefault();
        let newFilm = document.querySelector('.adding__input').value;
        let favourite = checkbox.checked;
        if (newFilm.length > 21) {                                      // Задание №2: Урок 33
            newFilm = `${newFilm.substr(0, 21)}...`;
        }    
        if (favourite) {
            console.log('Добавляем любимый фильм');
        }
        films.innerHTML = "";
        movieDB.movies.push(newFilm);
        movieDB.movies.sort();                                          // Задание №5: Урок 33
        movieDB.movies.forEach((film, i) => {
            films.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
            });
        });
    });
});






