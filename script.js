// BELFIS - Script JavaScript
// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Función principal de inicialización
function initializeWebsite() {
    setupMobileMenu();
    setupSmoothScroll();
    setupHeaderEffects();
    setupTitleAnimation();
    setupContactForm();
    setupScrollAnimations();
    console.log('BELFIS Website cargado correctamente');
}

// === ANIMACIÓN DEL TÍTULO PRINCIPAL ===
function setupTitleAnimation() {
    const title = document.getElementById('animatedTitle');
    if (!title) return;
    
    // Esperar un momento antes de iniciar la animación
    setTimeout(function() {
        animateTitle();
    }, 500);
}

function animateTitle() {
    const title = document.getElementById('animatedTitle');
    if (!title) return;
    
    // Método más directo: establecer el HTML directamente
    title.innerHTML = 'Recupera tu bienestar con <span class="highlight">BELFIS</span>';
    
    // Verificar que BELFIS aparezca
    console.log('Título configurado:', title.innerHTML);
    
    // Opcional: agregar animación de aparición al título completo
    title.style.opacity = '0';
    title.style.animation = 'fadeInUp 1s ease-out 0.5s forwards';
}

// === MENÚ MÓVIL ===
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menú
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// === SCROLL SUAVE ===
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // Altura del header fijo
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === EFECTOS DEL HEADER ===
function setupHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// === FORMULARIO DE CONTACTO ===
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
       e.preventDefault();
        handleFormSubmission();
    });
    
    // Validación en tiempo real
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function handleFormSubmission() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('.btn-submit');
    
    if (!validateForm()) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    // Mostrar estado de carga
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (reemplazar con EmailJS real)
    setTimeout(function() {
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        form.reset();
        
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(function(field) {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    // Limpiar error previo
    clearFieldError(field);
    
    // Validar campo requerido
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    // Validar email
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Ingresa un email válido');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.style.borderColor = '#f44336';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '#e1e5e9';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// === SISTEMA DE NOTIFICACIONES ===
function showNotification(message, type) {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Configurar estilos según el tipo
    let backgroundColor = '#2196F3';
    let icon = 'info-circle';
    
    if (type === 'success') {
        backgroundColor = '#4CAF50';
        icon = 'check-circle';
    } else if (type === 'error') {
        backgroundColor = '#f44336';
        icon = 'exclamation-circle';
    }
    
    notification.innerHTML = 
        '<div style="display: flex; align-items: center; gap: 1rem;">' +
        '<i class="fas fa-' + icon + '"></i>' +
        '<span>' + message + '</span>' +
        '<button onclick="closeNotification(this.parentElement.parentElement)" style="background: none; border: none; color: white; cursor: pointer; margin-left: auto;">' +
        '<i class="fas fa-times"></i>' +
        '</button>' +
        '</div>';
    
    // Aplicar estilos
    notification.style.cssText = 
        'position: fixed; top: 100px; right: 20px; background: ' + backgroundColor + '; ' +
        'color: white; padding: 1rem 1.5rem; border-radius: 10px; ' +
        'box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 10000; ' +
        'transform: translateX(100%); transition: transform 0.3s ease; ' +
        'max-width: 400px; font-family: Arial, sans-serif;';
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(function() {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto cerrar después de 5 segundos
    setTimeout(function() {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// === ANIMACIONES DE SCROLL ===
function setupScrollAnimations() {
    // Solo si el navegador soporta IntersectionObserver
    if (!window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.servicio-card, .nosotros-content, .ubicacion-content, .contacto-content');
    animatedElements.forEach(function(element) {
        element.classList.add('scroll-animation');
        observer.observe(element);
    });
}

// === FUNCIONES AUXILIARES ===
function restartTitleAnimation() {
    animateTitle();
}

// Hacer funciones disponibles globalmente para debugging
window.belfisFunctions = {
    restartAnimation: restartTitleAnimation,
    showNotification: showNotification
};