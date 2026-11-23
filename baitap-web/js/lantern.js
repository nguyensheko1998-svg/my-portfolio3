/* Đèn kéo quân: 6 mặt, quay vòng tròn, rê chuột vào hình thì dừng, rê ra thì quay tiếp */
document.addEventListener('DOMContentLoaded', () => {
    const lantern = document.getElementById('lantern');
    const faces = lantern.querySelectorAll('.face');
    const status = document.getElementById('status');
    const speedInput = document.getElementById('speed');

    const FACE_W = 170;                                   // chiều rộng mỗi mặt (px)
    const RADIUS = (FACE_W / 2) / Math.tan(Math.PI / faces.length); // bán kính hình lục giác

    // Đặt từng mặt vào đúng vị trí quanh trục
    faces.forEach((face, i) => {
        face.style.transform = `rotateY(${i * (360 / faces.length)}deg) translateZ(${RADIUS}px)`;
    });

    let angle = 0;          // góc quay hiện tại (độ)
    let paused = false;     // true khi chuột đang ở trên 1 hình
    let last = performance.now();

    function frame(now) {
        const dt = (now - last) / 1000;
        last = now;
        if (!paused) {
            angle = (angle + Number(speedInput.value) * dt) % 360;
            lantern.style.transform = `rotateY(${angle}deg)`;
        }
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // Rê chuột vào hình -> dừng; rê ra -> quay tiếp
    faces.forEach(face => {
        face.addEventListener('mouseenter', () => {
            paused = true;
            face.classList.add('hot');
            status.textContent = 'Đèn đang dừng (đang xem ' + face.dataset.name + ')';
        });
        face.addEventListener('mouseleave', () => {
            paused = false;
            face.classList.remove('hot');
            status.textContent = 'Đèn đang quay';
        });
    });
});
