console.log('Hello');

const dp = new DayPilot.Calendar("dp");
dp.init();

$(document).ready(function() {
    $("#download-button").click(function(ev) {
        console.log('hellloooo');

        ev.preventDefault();
        dp.exportAs("jpeg").download();
    });
});

function mafunction(){
    console.log('Pasmmmms');
}
