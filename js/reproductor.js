$(document).ready(function () {

    inicialitzarSoundPool('a_sobra', 'assets/audio/a-sobra.mp3')

    $('.sonor').on('mouseenter', function () {
        reproduirSo('a_sobra');
    });


    inicialitzarSoundPool('selecciona', 'assets/audio/selecciona.mp3')

    $('.sonor').on('click', function () {
        reproduirSo('selecciona');
    });

});

var soundPool = {},
    MAX_SOUNDS = 10;

function inicialitzarSoundPool(nom, url) {
    soundPool[nom] = {
        sons: [],
        actual: 0
    };

    for (var i = 0; i < MAX_SOUNDS; i++) {
        soundPool[nom].sons.push(new Audio(url));
    }
}

function reproduirSo(nom) {
    var index = soundPool[nom].actual;
    soundPool[nom].sons[index % MAX_SOUNDS].play();
    soundPool[nom].actual++;
}