const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
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
let isRepeating = false;
let isShuffling = false;

// تحميل الأغنية
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    albumCover.src = song.cover;
    audio.src = song.file;
}

// تشغيل الأغنية
function playSong() {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// إيقاف الأغنية
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// الأغنية السابقة
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// الأغنية التالية
function nextSong() {
    if (isShuffling) {
        shuffleSong();
    } else {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    }
}

// شريط التقدم
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// تعيين التقدم
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// تبديل تشغيل متكرر
function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle('active', isRepeating);
    if (isRepeating) {
        isShuffling = false;
        shuffleBtn.classList.remove('active');
    }
}

// تبديل التبديل التلقائي
function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
    if (isShuffling) {
        isRepeating = false;
        repeatBtn.classList.remove('active');
    }
}

// تشغيل أغنية عشوائية
function shuffleSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === songIndex);
    songIndex = randomIndex;
    loadSong(songs[songIndex]);
    playSong();
}

// التعامل مع انتهاء الأغنية
audio.addEventListener('ended', () => {
    if (isRepeating) {
        playSong();
    } else {
        nextSong();
    }
});

// التعامل مع أحداث الأزرار
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
repeatBtn.addEventListener('click', toggleRepeat);
shuffleBtn.addEventListener('click', toggleShuffle);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// تحميل الأغنية الأولى عند تشغيل الصفحة
loadSong(songs[songIndex]);