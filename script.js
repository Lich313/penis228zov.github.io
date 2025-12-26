// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    updateTime();
    setupEventListeners();
    setupScrollSpy();
    
    // Обновляем время каждую секунду
    setInterval(updateTime, 1000);
});

// Инициализация галереи
function initializeGallery() {
    const gallery = document.getElementById('image-gallery');
    const images = [
        {
            url: 'https://via.placeholder.com/300x200/3498db/ffffff?text=Проект+1',
            alt: 'Пример проекта 1'
        },
        {
            url: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=Проект+2',
            alt: 'Пример проекта 2'
        },
        {
            url: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Проект+3',
            alt: 'Пример проекта 3'
        },
        {
            url: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Проект+4',
            alt: 'Пример проекта 4'
        },
        {
            url: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=Проект+5',
            alt: 'Пример проекта 5'
        },
        {
            url: 'https://via.placeholder.com/300x200/1abc9c/ffffff?text=Проект+6',
            alt: 'Пример проекта 6'
        }
    ];

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.alt;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Кнопка приветствия
    const welcomeBtn = document.getElementById('welcome-btn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', showWelcomeMessage);
    }

    // Счетчик
    const incrementBtn = document.getElementById('increment-btn');
    if (incrementBtn) {
        incrementBtn.addEventListener('click', incrementCounter);
    }

    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Плавная прокрутка для навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Показать приветственное сообщение
function showWelcomeMessage() {
    alert('Добро пожаловать на наш сайт! 🎉\nМы рады видеть вас здесь!');
    
    // Добавляем анимацию к кнопке
    const btn = document.getElementById('welcome-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
}

// Счетчик
let counter = 0;
function incrementCounter() {
    counter++;
    const counterElement = document.getElementById('counter-value');
    if (counterElement) {
        counterElement.textContent = counter;
        counterElement.style.color = getRandomColor();
        
        // Анимация счетчика
        counterElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Обработка формы
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Валидация
    if (!validateForm(formData)) {
        showFormMessage('Пожалуйста, заполните все поля правильно', 'error');
        return;
    }
    
    // Имитация отправки формы
    simulateFormSubmission(formData);
}

// Валидация формы
function validateForm(formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (formData.name.trim().length < 2) {
        return false;
    }
    
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    if (formData.message.trim().length < 10) {
        return false;
    }
    
    return true;
}

// Имитация отправки формы
function simulateFormSubmission(formData) {
    const submitBtn = document.querySelector('#contact-form .btn');
    const originalText = submitBtn.textContent;
    
    // Показываем индикатор загрузки
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Имитируем задержку сети
    setTimeout(() => {
        console.log('Данные формы:', formData);
        showFormMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Сбрасываем форму
        document.getElementById('contact-form').reset();
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Показать сообщение формы
function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    messageElement.textContent = message;
    messageElement.className = type;
    
    // Автоматически скрываем сообщение через 5 секунд
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Обновление времени
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = `Текущее время: ${timeString}`;
    }
}

// Spy-scroll для навигации
function setupScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
}

// Вспомогательная функция для случайного цвета
function getRandomColor() {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    console.log('Размер окна изменен:', window.innerWidth, 'x', window.innerHeight);
});

// Добавляем класс при скролле для анимаций
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
