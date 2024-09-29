const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdownBtn = document.querySelector('.drop-btn');
const dropdown = document.querySelector('.dropdown');


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('toggle');
    navLinks.classList.toggle('active');
});



//Dropdown menu
dropdownBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('active');
});


document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

window.addEventListener('scroll', () => {
    dropdown.classList.remove('active');
});





//slide

let slideIndex = 0;
const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const totalSlides = slide.length;
const slideWidth = slide[0].offsetWidth; 


function cloneSlides() {
    for (let i = 0; i < getVisibleSlides(); i++) {
        const firstClone = slide[i].cloneNode(true);
        const lastClone = slide[totalSlides - i - 1].cloneNode(true);
        slides.appendChild(firstClone);  
        slides.insertBefore(lastClone, slide[0]);  
    }
}


function getVisibleSlides() {
    if (window.innerWidth > 768) {
        return 3; 
    } else {
        return 2; 
    }
}


function startSlide() {
    slideIndex++;
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

    
    if (slideIndex >= totalSlides + getVisibleSlides()) {
        setTimeout(() => {
            slides.style.transition = 'none';
            slideIndex = getVisibleSlides();
            slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }, 500); 
    }
}


setInterval(startSlide, 4000);


cloneSlides();


window.addEventListener('resize', () => {
    slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
});


//Floating CTA

document.getElementById("floating-icon").addEventListener("click", function() {
    var icons = document.getElementById("social-icons");
    if (icons.style.display === "block") {
        icons.style.display = "none";
    } else {
        icons.style.display = "block";
    }
});


// services section
function toggleAccordion(serviceId) {
    const serviceList = document.getElementById(serviceId);
    const isOpen = serviceList.style.display === "block";


    document.querySelectorAll('.service-list').forEach(list => list.style.display = 'none');

   
    if (!isOpen) {
        serviceList.style.display = "block";
    }
}





function showServiceQuestions() {
    const sections = document.querySelectorAll('.service-questions');
    sections.forEach(section => section.style.display = 'none');

    const selectedService = document.getElementById('service-select').value;
    if (selectedService) {
        document.getElementById(`${selectedService}-questions`).style.display = 'block';
    }
}

function calculateCost() {
    let totalCost = 0;

    if (document.getElementById('web-dev-questions').style.display === 'block') {
        totalCost += document.getElementById('ecommerce-web').checked ? parseInt(document.getElementById('ecommerce-web').value) : 0;
        totalCost += document.getElementById('seo').checked ? parseInt(document.getElementById('seo').value) : 0;
        totalCost += document.getElementById('web-maintenance').checked ? parseInt(document.getElementById('web-maintenance').value) : 0;
        totalCost += document.getElementById('responsive-design').checked ? parseInt(document.getElementById('responsive-design').value) : 0;
    }

    if (document.getElementById('tech-it-questions').style.display === 'block') {
        totalCost += document.getElementById('computer-maintenance').checked ? parseInt(document.getElementById('computer-maintenance').value) : 0;
        totalCost += document.getElementById('software-install').checked ? parseInt(document.getElementById('software-install').value) : 0;
    }

    if (document.getElementById('copywriting-questions').style.display === 'block') {
        totalCost += document.getElementById('ad-copy').checked ? parseInt(document.getElementById('ad-copy').value) : 0;
        const blogPages = parseInt(document.getElementById('blog-articles').value);
        totalCost += blogPages * 50;
    }

    if (document.getElementById('online-learning-questions').style.display === 'block') {
        totalCost += document.getElementById('web-courses').checked ? parseInt(document.getElementById('web-courses').value) : 0;
    }

    document.getElementById('estimated-cost').innerText = `Estimated Total: $${totalCost}`;
}

function sendEmail(event) {
    event.preventDefault();

    let selectedServices = '';
    if (document.getElementById('web-dev-questions').style.display === 'block') {
        selectedServices += 'Web Development Services:\n';
        selectedServices += document.getElementById('ecommerce-web').checked ? '- E-commerce Website\n' : '';
        selectedServices += document.getElementById('seo').checked ? '- SEO Optimization\n' : '';
        selectedServices += document.getElementById('web-maintenance').checked ? '- Web Maintenance\n' : '';
        selectedServices += document.getElementById('responsive-design').checked ? '- Responsive Design\n' : '';
    }

    if (document.getElementById('tech-it-questions').style.display === 'block') {
        selectedServices += 'Tech & IT Services:\n';
        selectedServices += document.getElementById('computer-maintenance').checked ? '- Computer Maintenance\n' : '';
        selectedServices += document.getElementById('software-install').checked ? '- Software Installation\n' : '';
    }

    if (document.getElementById('copywriting-questions').style.display === 'block') {
        selectedServices += 'Copywriting Services:\n';
        const blogPages = document.getElementById('blog-articles').value;
        selectedServices += blogPages > 0 ? `- Blog/Article Pages: ${blogPages}\n` : '';
        selectedServices += document.getElementById('ad-copy').checked ? '- Ad Copywriting\n' : '';
    }

    if (document.getElementById('online-learning-questions').style.display === 'block') {
        selectedServices += 'Online Learning & Coaching Services:\n';
        selectedServices += document.getElementById('web-courses').checked ? '- Web Development Courses\n' : '';
    }

    const totalCost = document.getElementById('estimated-cost').innerText;

    
    const message = `${selectedServices}\nTotal Cost: ${totalCost}`;

    alert('The following estimate will be sent to your email:\n' + message);
    
}




// Testimonials

function clearForm() {
    document.getElementById('cost-calculator-form').reset();
    document.getElementById('estimated-cost').innerText = 'Estimated Total: $0';
    const sections = document.querySelectorAll('.service-questions');
    sections.forEach(section => section.style.display = 'none');
}

const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;
let slideInterval;

function startTestimonialRotation() {
    const slideWidth = testimonials[0].clientWidth;
    const totalSlides = testimonials.length;

    
    duplicateTestimonials();

    
    slideInterval = setInterval(() => {
        currentIndex++;

        if (currentIndex === totalSlides) {
            testimonialSlider.style.transition = 'none';
            currentIndex = 0;
            testimonialSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        setTimeout(() => {
            testimonialSlider.style.transition = 'transform 0.5s ease-in-out';
            testimonialSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }, 10);
    }, 3000);
}


function duplicateTestimonials() {
    const slider = document.querySelector('.testimonial-slider');
    slider.innerHTML += slider.innerHTML; 
}


startTestimonialRotation();


window.addEventListener('resize', () => {
    clearInterval(slideInterval);
    currentIndex = 0;
    testimonialSlider.style.transform = 'translateX(0)';
    startTestimonialRotation();
});


// Newsletter section

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const message = document.getElementById('message');

    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)) {
        message.textContent = 'Thank you for subscribing!';
        message.style.color = '#5cb85c';
        
     
        document.getElementById('newsletter-form').reset();
    } else {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = '#d9534f';
    }
});


//FAQ


const faqItems = document.querySelectorAll('.faq-item');


faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        
        item.classList.toggle('active');
    });
});
