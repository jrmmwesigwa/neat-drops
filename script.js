document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      const menuIcon = this.querySelector('svg');
      if (navLinks.classList.contains('active')) {
        menuIcon.innerHTML = `
          <line x1="18" x2="6" y1="6" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6" x2="18" y1="6" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        `;
      } else {
        menuIcon.innerHTML = `
          <line x1="4" x2="20" y1="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" x2="20" y1="6" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" x2="20" y1="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
      }
    });
    
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        const menuIcon = menuToggle.querySelector('svg');
        menuIcon.innerHTML = `
          <line x1="4" x2="20" y1="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" x2="20" y1="6" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" x2="20" y1="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
      });
    });
    
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        const menuIcon = menuToggle.querySelector('svg');
        menuIcon.innerHTML = `
          <line x1="4" x2="20" y1="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" x2="20" y1="6" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" x2="20" y1="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
      }
    });
  }
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      console.log('Form submission started');

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const phone = document.getElementById('phone').value;
      const company = document.getElementById('company').value;
      const service = document.getElementById('service').value;
      
      if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all required fields.');
        return;
      }

      const loading = document.getElementById('formLoading');
      const success = document.getElementById('formSuccess');
      const error = document.getElementById('formError');
      const submitButton = document.getElementById('submitButton');
      
      console.log('Showing loading state');
      loading.style.display = 'block';
      success.style.display = 'none';
      error.style.display = 'none';
      submitButton.disabled = true;
      
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScoPGbjeEy6apCmU4QRzGVoiufmslhYuAjUEZhSzsaxn_P9og/formResponse';
      const formData = new FormData();
      
      formData.append('entry.143685243', name);
      formData.append('entry.997111489', email);
      formData.append('entry.821941437', phone);
      formData.append('entry.377210624', company);
      formData.append('entry.389484974', service);
      formData.append('entry.2127373601', message);

      fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then(() => {
        console.log('Fetch completed (assumed success)');
        loading.style.display = 'none';
        success.style.display = 'block';
        contactForm.reset();
        
        const toast = document.getElementById('toast');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 5000);
        }
        
        setTimeout(() => {
          success.style.display = 'none';
          submitButton.disabled = false;
        }, 5000);
      })
      .catch(err => {
        console.error('Critical fetch error:', err);
        if (navigator.onLine) {
          console.log('Assuming success despite timeout');
          loading.style.display = 'none';
          success.style.display = 'block';
          contactForm.reset();
          
          const toast = document.getElementById('toast');
          if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 5000);
          }
          
          setTimeout(() => {
            success.style.display = 'none';
            submitButton.disabled = false;
          }, 5000);
        } else {
          loading.style.display = 'none';
          error.style.display = 'block';
          submitButton.disabled = false;
          
          setTimeout(() => {
            error.style.display = 'none';
          }, 5000);
        }
      });
    });
  }
});