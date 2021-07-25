'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.header__menu-search'),
        searchPanel = document.querySelector('.header__searchpanel'),
        body = document.querySelectorAll('body'),
        input = document.querySelector('#input'),
        horizontalView = document.querySelector('.view__horizontal'),
        squareView = document.querySelector('.view__square'),
        favorite = document.querySelector('.header__menu-favorite'),
        grid = document.querySelector('.grid');

    //Open Searchpanel
    function openSearch() {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            searchPanel.style.display = 'flex';
            searchPanel.classList.add('fade');
            searchButton.style.display = 'none';
        });
    }
    openSearch();

    input.addEventListener('input', () => {
        localStorage.setItem('value', input.value);
    });

    //Load photo
    function renderPhoto() {
        const myId = '5lwtnKSXXeMMYHdlp7E8wb-MxNKAWKPCirj7vSq7pVU',
            url = `https://api.unsplash.com/search/photos/?query=programming&per_page=52&orientation=landscape&client_id=${myId}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Ошибка запроса');
                }
            })
            .then(data => {
                const photo = [];
                for (let i = 0; i < data.results.length; i++) {
                    photo[i] = document.createElement('div');
                    photo[i].classList.add('wrapper');
                    grid.appendChild(photo[i]);

                    const button = document.createElement('img');
                    button.classList.add('button');
                    button.src = '../../icons/heart.svg';
                    photo[i].appendChild(button);

                    const foto = document.createElement('img');
                    foto.classList.add('img');
                    photo[i].appendChild(foto);
                    foto.src = `${data.results[i].urls.regular}`;

                    photo[i].addEventListener('click', () => {
                        alert('Фото добавленно в избранное!');
                        localStorage.setItem('src', foto.src);
                    }); 
                    const img = document.querySelectorAll('.img');
                    horizontalView.addEventListener('click', () => {
                        img.forEach(i => {
                            i.style.cssText = `
                        width: 100%;
                        height: auto;
                    `;
                        });
                    });
                    squareView.addEventListener('click', () => {
                        squareView.span
                        img.forEach(i => {
                            i.style.width = '300px';
                        });
                    });
                }
            });
    }
    function loadPhoto() {
        window.addEventListener('load', renderPhoto)
    }
    loadPhoto();

    //Search making
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            grid.innerHTML = ``;
            searchPanel.style.display = 'none';
            searchButton.style.display = 'flex';
        }
        searchPhoto();
    });
    input.addEventListener('input', () => {
        if (input.value.length < 1) {
            grid.innerHTML = '';
            renderPhoto();
        }

    });
    function searchPhoto() {
        const myId = '5lwtnKSXXeMMYHdlp7E8wb-MxNKAWKPCirj7vSq7pVU',
            url = `https://api.unsplash.com/search/photos/?query=${input.value}&per_page=50&orientation=landscape&client_id=${myId}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Ошибка запроса');
                }
            })
            .then(data => {
                const photo = [];
                for (let i = 0; i < data.results.length; i++) {
                    photo[i] = document.createElement('img');
                    photo[i].classList.add('img');
                    photo[i].src = `${data.results[i].urls.small}`;
                    grid.appendChild(photo[i]);
                    photo[i].addEventListener('click', () => {
                        alert('Фото добавленно в избранное!');
                        localStorage.setItem('src', foto.src);
                    }); 
                }
            });
        }    
});