document.addEventListener('DOMContentLoaded', function() {

  const yearElement = document.getElementById('year');
  if (yearElement) {
     yearElement.textContent = new Date().getFullYear();
  }

  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const dotsNav = document.querySelector('.carousel-dots');

  let currentIndex = 0;

  // カルーセルのドット自動生成
  const dots = [];
  items.forEach((item, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dotsNav.appendChild(dot);
    dots.push(dot);

    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });

  // カルーセルの更新処理
  function updateCarousel(index) {
    if (index < 0) {
      currentIndex = items.length - 1;
    }
    else if (index >= items.length) {
      currentIndex = 0;
    }
    else {
      currentIndex = index;
    }
    
    // パーセント指定にすることで、リサイズやどんな画面幅（vw）でもバグりにくく調整
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // ボタンクリックイベント
  nextButton.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
  });

  // --- スワイプ（タッチ）対応コードの追加 ---
  let touchStartX = 0;
  let touchEndX = 0;

  // タッチ開始時の位置を記憶
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  // タッチ終了時に移動量を計算してスライドを切り替え
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50; // スワイプを判定する最低の移動距離（ピクセル）
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        // 左へのスワイプ ＝ 次のスライドへ
        updateCarousel(currentIndex + 1);
      } else {
        // 右へのスワイプ ＝ 前のスライドへ
        updateCarousel(currentIndex - 1);
      }
    }
  }
  setInterval(() => {
  updateCarousel(currentIndex + 1);
}, 5000);
});