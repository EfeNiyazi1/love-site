const noBtn = document.getElementById('no-btn');
const heartBg = document.getElementById('heart-bg');
const heartSymbols = ['❤️', '💖', '💝', '💕', '💗'];

// 1. Hayır Butonunun Kaçma Mantığı
function moveButton(e) {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Ekran boyutlarını al
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const padding = 30;
    
    // Varsayılan mouse koordinatlarını ekran ortası yap
    let mouseX = viewportWidth / 2;
    let mouseY = viewportHeight / 2;
    
    // Mouse veya dokunma koordinatlarını al
    if (e) {
        if (e.clientX !== undefined && e.clientX !== 0) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        } else if (e.touches && e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        } else {
            // Klavye ile tıklandıysa mevcut buton konumunu al
            const rect = noBtn.getBoundingClientRect();
            mouseX = rect.left + btnWidth / 2;
            mouseY = rect.top + btnHeight / 2;
        }
    }
    
    // Mouse'un 40px ile 300px çevresinde rastgele bir mesafe ve açı hesapla
    const minDistance = 40;
    const maxDistance = 300;
    const distance = Math.random() * (maxDistance - minDistance) + minDistance;
    const angle = Math.random() * Math.PI * 2;
    
    // Yeni koordinatları hesapla (butonun merkezini hizalayacak şekilde)
    let newX = mouseX + Math.cos(angle) * distance - btnWidth / 2;
    let newY = mouseY + Math.sin(angle) * distance - btnHeight / 2;
    
    // Ekran sınırlarının dışına taşmasını engelle (clamp)
    const maxX = viewportWidth - btnWidth - padding;
    const maxY = viewportHeight - btnHeight - padding;
    
    if (newX < padding) newX = padding;
    if (newX > maxX) newX = maxX;
    if (newY < padding) newY = padding;
    if (newY > maxY) newY = maxY;
    
    // Butonu body'ye taşı (böylece container'ın perspective/transform kurallarından kurtulup viewport'a göre konumlanır)
    if (noBtn.parentElement !== document.body) {
        document.body.appendChild(noBtn);
    }
    
    // Butonu yeni konumuna taşı
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Tıklanma animasyonu efekti (küçülüp büyüme)
    noBtn.style.transform = 'scale(0.85)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 100);
}

// Sadece tıklanınca farklı bir yere gitsin (sınırsız tıklanabilir)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton(e);
});

// Evet butonuna tıklama lojiği
const yesBtn = document.getElementById('yes-btn');
let yesClickedOnce = false;

if (yesBtn) {
    yesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!yesClickedOnce) {
            // İlk tıklama: Sadece metni değiştir
            yesBtn.innerText = "Çok çok seviyorum! ❤️";
            yesBtn.style.transform = 'scale(1.15)';
            yesClickedOnce = true;
        } else {
            // İkinci tıklama: Yönlendir
            window.location.href = 'yes.html';
        }
    });
}


// 2. Arka Plan Yüzen Kalpler
function createHeart() {
    if (!heartBg) return;
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Rastgele yatay konum, animasyon hızı ve boyut
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's'; // 6-10 sn arası
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px'; // 15-30px arası
    
    heartBg.appendChild(heart);
    
    // Ekrandan çıkınca elementi temizle
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// İlk açılışta arka planı doldurmak için kalpler oluştur
for(let i = 0; i < 15; i++) {
    setTimeout(createHeart, Math.random() * 6000);
}

// Her 450ms'de bir yeni kalp oluştur
setInterval(createHeart, 450);
