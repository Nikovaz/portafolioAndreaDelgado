document.addEventListener('DOMContentLoaded', function() {
    // Animación suave de scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Eliminar clase activa de todos los enlaces
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Añadir clase activa al enlace clickeado
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 30,
                behavior: 'smooth'
            });
        });
    });
    
    // Actualizar enlace activo basado en el scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(item => item.classList.remove('active'));
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    });
    
    // Animación de entrada para secciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-card').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Clase para animar
    document.addEventListener('scroll', function() {
        document.querySelectorAll('.section-card.animate').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    });
    
    // Iniciar la animación para los elementos visibles al cargar
    setTimeout(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
    }, 100);
    
    // Efecto 3D avanzado para los logos usando Three.js (si está disponible)
    if (window.THREE) {
        // Configuración básica de Three.js
        const logos = document.querySelectorAll('.logo-3d');
        
        logos.forEach(logo => {
            const width = logo.offsetWidth;
            const height = logo.offsetHeight;
            
            // Crear escena
            const scene = new THREE.Scene();
            
            // Crear cámara
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 5;
            
            // Crear renderizador
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(width, height);
            renderer.setClearColor(0x000000, 0);
            
            // Limpiar el contenedor antes de añadir el canvas
            while (logo.firstChild) {
                logo.removeChild(logo.firstChild);
            }
            
            logo.appendChild(renderer.domElement);
            
            // Crear geometría y material
            const geometry = new THREE.BoxGeometry(3, 3, 0.2);
            
            // Usar la URL de la imagen original como textura
            const logoImg = logo.getAttribute('data-img-src') || 'images/default-logo.png';
            const texture = new THREE.TextureLoader().load(logoImg);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            
            // Función de animación
            function animate() {
                requestAnimationFrame(animate);
                
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                
                renderer.render(scene, camera);
            }
            
            animate();
        });
    }
    
    // Animación para las barras de habilidades
    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            setTimeout(() => {
                level.style.width = width;
            }, 300);
        });
    }
    
    // Observar cuando la sección de habilidades entra en el viewport
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.getElementById('habilidades');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});
