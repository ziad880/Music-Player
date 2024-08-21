const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const albumCover = document.getElementById('album-cover');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const songs = [
    {
        title: 'هيجيلي موجوع',
        artist: 'تامر عاشور',
        cover: '1.jpeg',  
        file: '1.mp3',
    },
    {
        title: 'كان موضوع',
        artist: 'تامر عاشور',
        cover: '2.jpg',
        file: '2.mp3',
    },
    {
        title: 'خليني في حضنك',
        artist: 'تامر عاشور',
        cover: '3.jpg',
        file: '3.mp3',
    }
];
let songIndex = 0;
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    albumCover.src = song.cover;
    audio.src = song.file;
}
function playSong() {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.innerHTML.includes('pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
loadSong(songs[songIndex]);
