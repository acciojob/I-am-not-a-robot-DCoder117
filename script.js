const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Make sure buttons are hidden initially
const reset = document.getElementById('reset');
const verify = document.getElementById('verify');

reset.style.display = 'none';
verify.style.display = 'none';


// Play or pause video
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Change button text
function updateButton() {
    if (video.paused) {
        toggle.textContent = '►';
    } else {
        toggle.textContent = '❚ ❚';
    }
}

// Update progress bar
function handleProgress() {
    if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percent + '%';
    }
}

// Skip video
function skip() {
    video.currentTime += Number(this.dataset.skip);
}

// Volume and playback speed
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Move video using progress bar
function scrub(event) {
    const scrubTime =
        (event.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}


// Play/Pause button
toggle.addEventListener('click', togglePlay);

// Update button
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update progress
video.addEventListener('timeupdate', handleProgress);

// Skip buttons
skipButtons.forEach(function(button) {
    button.addEventListener('click', skip);
});

// Volume and speed controls
ranges.forEach(function(range) {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
});

// Progress bar click
progress.addEventListener('click', scrub);

// Video error
video.addEventListener('error', function() {
    alert('Unable to load the video.');
});