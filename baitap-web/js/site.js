document.addEventListener('DOMContentLoaded', () => {
    // Điền thông tin sinh viên (từ js/config.js)
    document.querySelectorAll('[data-sv]').forEach(el => {
        const v = SV[el.dataset.sv];
        el.textContent = v;
        if (/MSSV_CUA_BAN/.test(v)) el.classList.add('todo');
    });

    // Điền link bài 18, 19
    document.querySelectorAll('[data-link]').forEach(a => {
        const url = LINKS[a.dataset.link];
        a.href = url;
        a.textContent = url;
        a.target = '_blank';
        a.rel = 'noopener';
    });

    // Ảnh kết quả chưa có -> hiện khung nhắc thêm ảnh
    document.querySelectorAll('img.shot').forEach(img => {
        const miss = () => {
            const box = document.createElement('div');
            box.className = 'shot-missing';
            box.textContent = 'Chưa có ảnh. Hãy lưu ảnh chụp màn hình vào: ' + img.getAttribute('src');
            img.replaceWith(box);
        };
        if (img.complete && img.naturalWidth === 0) miss();
        else img.addEventListener('error', miss, { once: true });
    });
});
