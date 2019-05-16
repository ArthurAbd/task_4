window.addEventListener('DOMContentLoaded', function() { //проверяем загрузку страницы
    'use strict';

    const field = document.querySelector('.board');
    const dy = [0, 1, 2, 3, 4, 5, 6, 7];
    const dx = [0, 1, 2, 3, 4, 5, 6, 7];
    const dxSumbol = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const yStep = [1, 2, -1, -2];
    const xStep = [-2, 2, 1, -1];
    let fields = [];
    let yResult = [];
    let xResult = [];
    let result = [];
    let yId;
    let xId;

    {for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            fields.push(`<div id="${dxSumbol[j]}${i + 1}" class="field"></div>`);
            // создаем массив клеточек с уникальными id перебирая буквы и цифры
        }
    }};

    field.innerHTML = fields.join(' '); // и отправляем его на страницу

    {let fieldItem = document.querySelectorAll('.field'); 
    // а здесь мы считываем их обратно, перебираем
    // и присваеваем белый цвет через одну клетку со сдвигом каждого ряда
    for(let i = 0; i < 64; i++) {
        if(i % 2 != 0 && (i < 8 || (i > 15 && i < 24) || (i > 31 && i < 40) || (i > 47 && i < 56))) {
            fieldItem[i].classList.add("white");
        } else if(i % 2 == 0 && ((i > 7 && i < 16) || (i > 23 && i < 32) || (i > 39 && i < 48) || i > 55)) {
            fieldItem[i].classList.add("white");
        }
    }};

    document.addEventListener('click', function(e) {

        result = []; // при каждом клике очищаем массив с результатом

        // и очищаем окраску клеточек 
        {let cleanBoard = document.querySelectorAll('.blue');
        for(let i = 0; i < cleanBoard.length; i++) {
            cleanBoard[i].classList.remove('blue');
        }
        cleanBoard = document.querySelectorAll('.green');
        for(let i = 0; i < cleanBoard.length; i++) {
            cleanBoard[i].classList.remove('green');
        }};

        {let xy = e.target.id; // записываем id кликнутой клетки
        let blue = document.getElementById(xy); 
        blue.classList.add('blue'); // окрашиваем в синий цвет
        
        // а дальше идет код из 2 задания
        for(let i = 0; i < dxSumbol.length; i++) { 
            if(xy[0] == dxSumbol[i]) {
                // находим порядковый номер символа в массиве dxSumbol 
                xId = i; // и присваеваем его в xId
                yId = +xy[1] - 1; // так же поступаем с осью y, но здесь достаточно вычесть единицу
            }
        }};
        
        {for(let i = 0, j = 0; i < yStep.length; i++) { // создаем массив всевозможных ходов по оси y
            yResult[j++] = dy[yId] + yStep[i] + 1;
            yResult[j++] = dy[yId] + yStep[i] + 1;
        }};
    
        {for(let i = 0, j = 0; i < 8; i++, j++) { // создаем массив всевозможных ходов по оси x
            if(j > 3) {
                j = 0;
            }
            xResult[i] = dxSumbol[dx[xId] + xStep[j]]; // результат записываем сразу буквой
        }};

    
        {for(let i = 0, j = 0, n = NaN; i < yResult.length && i < xResult.length; i++) {
            if(!Number.isNaN(xResult[i] + yResult[i]) && yResult[i] <= 8 && yResult[i] > 0) {
                // проверяем на выход результата за границу доски
                result[j++] = xResult[i] + yResult[i];
            };
        }};
        
        {for(let i = 0; i < result.length; i++) {
            let green = document.getElementById(result[i]);
            green.classList.add('green');
            // окрашиваем соответствующие результату id в зеленый 
        }};
    });
});