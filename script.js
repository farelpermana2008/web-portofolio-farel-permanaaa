document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // 1. EFEK ANIMASI MENGETIK BERULANG (TYPING/DELETING LOOP)
    // ===================================
    // Teks yang akan diketik berulang
    const texts = [
        "Hello I'm Farel Haby Permana",
        "Status : Single",
    ];

    const typedTextElement = document.getElementById('typed-text');
    let textIndex = 0;   // Index pada array 'texts'
    let charIndex = 0;   // Index karakter dalam teks saat ini
    let isDeleting = false; 

    function loopTyping() {
        if (!typedTextElement) return; // Hentikan jika elemen tidak ada

        const currentText = texts[textIndex];
        let speed = isDeleting ? 50 : 100; // Kecepatan menghapus vs mengetik

        if (isDeleting) {
            // MODE MENGHAPUS (DELETING)
            charIndex--;
        } else {
            // MODE MENGETIK (TYPING)
            charIndex++;
        }

        // Update tampilan teks
        typedTextElement.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            // Selesai mengetik: Jeda 1.5 detik, lalu mulai menghapus
            isDeleting = true;
            speed = 1500;
        } else if (isDeleting && charIndex === 0) {
            // Selesai menghapus: Pindah ke teks berikutnya
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Loop ke teks berikutnya
            speed = 500; // Jeda singkat sebelum mengetik lagi
        }

        // Panggil fungsi lagi setelah delay
        setTimeout(loopTyping, speed);
    }
    
    // Mulai animasi
    loopTyping();


    // ===================================
    // 2. EFEK PARALAKS 3D PADA KARTU HERO
    // ===================================
    const heroImageCard = document.querySelector('.hero-image-card');
    const cardInner = document.querySelector('.card-inner');

    if (heroImageCard && cardInner) {
        heroImageCard.addEventListener('mousemove', (e) => {
            const rect = heroImageCard.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posisi X relatif terhadap elemen
            const y = e.clientY - rect.top;  // Posisi Y relatif terhadap elemen

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Menghitung rotasi, lebih sensitif di tengah, maks 15 derajat
            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((x - centerX) / centerX) * -15;

            // Transformasi CSS
            cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        heroImageCard.addEventListener('mouseleave', () => {
            // Kembali ke posisi awal
            cardInner.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }


    // ===================================
    // 3. LOGIKA PENGIRIMAN FORMULIR KONTAK (SIMULASI)
    // ===================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            console.log(`Form Submitted: Name=${fullName}, Email=${email}, Message=${message}`);
            
            alert(`Terima kasih, ${fullName}! Pesan Anda telah dikirim.`);
            
            this.reset(); // Mengosongkan formulir
        });
    }

    // ===================================
    // 4. EFEK ACTIVE LINK SAAT SCROLL (NAVIGASI)
    // ===================================
    const navLinks = document.querySelectorAll('.nav-links a');
    // Ambil semua section yang memiliki ID
    const sections = document.querySelectorAll('section[id]'); 

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            // Ambil posisi bagian atas section saat ini
            const sectionTop = section.offsetTop - 150; 
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            // Cek jika href link mengandung ID section saat ini
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

}); 

// Di file script.js, di dalam document.addEventListener('DOMContentLoaded', ...){
// ... (Semua kode JS lama Anda: Typing Effect, Parallax, dll) ...

    // ===================================
    // 6. FUNGSI MODAL (VIEW PROJECT POP-UP)
    // ===================================

    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    
    // Dapatkan semua tombol "View Project"
    const viewProjectBtns = document.querySelectorAll('.view-project-btn'); 

    // ----------------------------------------------------------------
    // A. Fungsi untuk membuka modal saat tombol diklik
    // ----------------------------------------------------------------
    viewProjectBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link pindah halaman
            
            // Ambil URL gambar dari atribut data-image (lihat poin 4 di bawah)
            const imageUrl = button.getAttribute('data-image');
            
            if (imageUrl) {
                modalImage.src = imageUrl;
                modal.style.display = 'flex'; // Tampilkan modal
                document.body.style.overflow = 'hidden'; // Nonaktifkan scroll halaman utama
            } else {
                console.error('URL gambar tidak ditemukan pada tombol.');
            }
        });
    });

    // ----------------------------------------------------------------
    // B. Fungsi untuk menutup modal
    // ----------------------------------------------------------------

    // Menutup saat tombol X diklik
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Aktifkan kembali scroll
    });

    // Menutup saat area luar modal diklik
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Aktifkan kembali scroll
        }
    });

// } // Tutup document.addEventListener('DOMContentLoaded', ...);