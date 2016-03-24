$(document).ready(function () {

    inicialitzarLlistaVideos();

    inicialitzarSoundPool('a_sobra', 'assets/audio/a-sobra.mp3')

    $('.sonor').on('mouseenter', function () {
        reproduirSo('a_sobra');
    });


    inicialitzarSoundPool('selecciona', 'assets/audio/selecciona.mp3')

    $('.sonor').on('click', function () {
        reproduirSo('selecciona');
    });

    $('#anterior').click(anteriorVideo);
    $('#reproduir').click(reproduirVideo);
    $('#aturar').click(aturarVideo);
    $('#seguent').click(seguentVideo);

    $(document).keypress(function(evt) {
        if (evt.charCode==32) {
            aturarVideo();
        }
    });

});

var soundPool = {},
    MAX_SOUNDS = 10,
    videos = [
        {
            titol: 'El primer video',
            descripcio: 'Aquesta es la descripció del primer video',
            url: 'assets/video/video-1.mov'
        },
        {
            titol: 'El segon video',
            descripcio: 'Aquesta es la descripció del segon video',
            url: 'assets/video/video-2.mov'
        },
        {
            titol: 'El tercer video',
            descripcio: 'Aquesta es la descripció del tercer video',
            url: 'assets/video/video-3.mov'
        }
    ],
    seleccionat = 0;

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

function inicialitzarLlistaVideos() {
    $.each(videos, function (index, value) {
        // Creem un nou node de tipus LI fent servir jQuery
        var $node = $('<li></li>');

        // Afegim la classe sonor
        $node.addClass('sonor');

        // Afegim un identificador únic basat en el seu index
        $node.attr('id', 'video-' + index);

        // Afegim el contingut del element
        $node.text(value.titol);

        // Afegim la descripció per mostrar quan deixem el cursor a sobre uns egons
        $node.attr('title', value.descripcio);

        // Afegim el node a la llista de vídeos
        $('#videos').append($node);

        // Afegim la detecció del esdeveniment click per establir aquest vídeo com el seleccionat i iniciar la reproducció
        $node.on('click', function () {
            seleccionat = index;
            reproduirVideo();
        })
    });
}

function reproduirVideo() {
    var video = videos[seleccionat];
    $('video').attr('src', video.url);
    $('video').get(0).play();
}

function aturarVideo() {
    var video = $('video').get(0);

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function anteriorVideo() {
    seleccionat--;
    if (seleccionat < 0) {
        seleccionat = videos.length - 1;
    }
    reproduirVideo();
}

function seguentVideo() {
    seleccionat++;
    if (seleccionat === videos.length) {
        seleccionat = 0;
    }
    reproduirVideo();
}