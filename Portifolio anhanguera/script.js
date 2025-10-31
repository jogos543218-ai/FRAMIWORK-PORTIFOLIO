// ===== 1. SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== 2. ANIMAÇÃO AO SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Aplicar animação às seções
document.querySelectorAll('.sobre_mim, .projetos, .contatos').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease-out';
  observer.observe(section);
});

// ===== 3. MODO ESCURO =====
// Criar botão de modo escuro
const darkModeButton = document.createElement('button');
darkModeButton.textContent = '🌙';
darkModeButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3B82F6;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 999;
`;

document.body.appendChild(darkModeButton);

// Função para ativar/desativar modo escuro
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  
  // Salvar preferência no navegador
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Mudar emoji do botão
  darkModeButton.textContent = isDarkMode ? '☀️' : '🌙';
}

// Verificar se usuário tinha modo escuro ativado
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  darkModeButton.textContent = '☀️';
}

darkModeButton.addEventListener('click', toggleDarkMode);

// Efeito hover no botão
darkModeButton.addEventListener('mouseover', function() {
  this.style.transform = 'scale(1.1)';
});

darkModeButton.addEventListener('mouseout', function() {
  this.style.transform = 'scale(1)';
});

// ===== 4. MENU MOBILE =====
// Criar botão de menu
const menuButton = document.createElement('button');
menuButton.textContent = '☰';
menuButton.className = 'menu-mobile-btn';
menuButton.style.cssText = `
  display: none;
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

document.querySelector('header').appendChild(menuButton);

// Mostrar botão em telas pequenas
function updateMenuButton() {
  if (window.innerWidth < 768) {
    menuButton.style.display = 'block';
  } else {
    menuButton.style.display = 'none';
    document.querySelector('.navbar').style.display = 'flex';
  }
}

updateMenuButton();
window.addEventListener('resize', updateMenuButton);

// Abrir/fechar menu mobile
menuButton.addEventListener('click', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar.style.display === 'none' || navbar.style.display === '') {
    navbar.style.display = 'flex';
    navbar.style.flexDirection = 'column';
    navbar.style.position = 'absolute';
    navbar.style.top = '70px';
    navbar.style.left = '0';
    navbar.style.right = '0';
    navbar.style.backgroundColor = 'rgba(30, 64, 175, 0.95)';
    navbar.style.padding = '1rem';
    navbar.style.gap = '0.5rem';
  } else {
    navbar.style.display = 'none';
  }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth < 768) {
      navbar.style.display = 'none';
    }
  });
});

// ===== 5. ADICIONAR ESTILOS DO MODO ESCURO =====
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
  body.dark-mode {
    background-color: #1F2937;
    color: #F3F4F6;
  }

  body.dark-mode header {
    background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  }

  body.dark-mode .sobre_mim,
  body.dark-mode .projetos,
  body.dark-mode .contatos {
    background-color: #374151;
    color: #F3F4F6;
  }

  body.dark-mode .titulo_um,
  body.dark-mode .titulo_tres,
  body.dark-mode .titulo_sete {
    color: #93C5FD;
  }

  body.dark-mode .historia,
  body.dark-mode .texto_convite,
  body.dark-mode .descricacao,
  body.dark-mode .projeto-tech {
    color: #D1D5DB;
  }

  body.dark-mode .project-card {
    background-color: #4B5563;
    color: #F3F4F6;
  }

  body.dark-mode .skill-item {
    background: linear-gradient(135deg, #4B5563 0%, #374151 100%);
    color: #F3F4F6;
  }

  body.dark-mode .contact-item {
    border-bottom-color: #4B5563;
    color: #D1D5DB;
  }

  body.dark-mode .contact-item:hover {
    color: #93C5FD;
  }

  body.dark-mode footer {
    background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  }
`;
document.head.appendChild(darkModeStyles);

console.log('✅ JavaScript carregado com sucesso!');
