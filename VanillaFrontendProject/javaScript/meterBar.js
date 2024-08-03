
function updateMeters() {
    var percentage = document.getElementById('percentage').value;
    var meters = document.querySelectorAll('.meter-bar');

    meters.forEach(function(meter) {
        meter.style.width = percentage + '%';
    });

    // Add fill class to meters with width greater than 0
    meters.forEach(function(meter) {
        if (meter.style.width !== '0%') {
            meter.classList.add('fill');
        } else {
            meter.classList.remove('fill');
        }
    });
}