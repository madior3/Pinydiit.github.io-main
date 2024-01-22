/**======Preloader======== */

    // Simulate content loading
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() {
        // Hide preloader
        document.querySelector('.preloader').style.display = 'none';

        // Show content
        document.querySelector('.content').style.display = 'block';
      }, 3000); // You can adjust the delay according to your needs
    });
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.Contact.hash) {
      if (select(window.Contact.hash)) {
        scrollto(window.Contact.hash)
      }
    }
  });

  /** Background image slider */

  let images = [  'slider-image-1',  'slider-image-2',  'slider-image-3',  'slider-image-4',  'slider-image-5'];

let index = 0;
let interval = 6000; // Change this value to set the time between image changes (in milliseconds)

function changeImage() {
  let left = document.querySelector('.left');
  left.classList.remove(images[index % images.length]);
  index++;
  left.classList.add(images[index % images.length]);
}

setInterval(changeImage, interval);


  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  /**
   * Back to top button
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }

})()

/**progress bar */
window.addEventListener('scroll', function() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;

  document.getElementById('progress-bar').style.width = progress + '%';
});

/*========================Gallery==========================*/
// Gallery image hover
$( ".img-wrapper" ).hover(
  function() {
    $(this).find(".img-overlay").animate({opacity: 1}, 600);
  }, function() {
    $(this).find(".img-overlay").animate({opacity: 0}, 600);
  }
);

// Lightbox
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

// Add overlay
$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
$("#gallery").append($overlay);

// Hide overlay on default
$overlay.hide();

// When an image is clicked
$(".img-overlay").click(function(event) {
  // Prevents default behavior
  event.preventDefault();
  // Adds href attribute to variable
  var imageContact = $(this).prev().attr("href");
  // Add the image src to $image
  $image.attr("src", imageContact);
  // Fade in the overlay
  $overlay.fadeIn("slow");
});

// When the overlay is clicked
$overlay.click(function() {
  // Fade out the overlay
  $(this).fadeOut("slow");
});

// When next button is clicked
$nextButton.click(function(event) {
  // Hide the current image
  $("#overlay img").hide();
  // Overlay image Contact
  var $currentImgSrc = $("#overlay img").attr("src");
  // Image with matching Contact of the overlay image
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  // Finds the next image
  var $nextImg = $($currentImg.closest(".image").next().find("img"));
  // All of the images in the gallery
  var $images = $("#image-gallery img");
  // If there is a next image
  if ($nextImg.length > 0) { 
    // Fade in the next image
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  } else {
    // Otherwise fade in the first image
    $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
  }
  // Prevents overlay from being hidden
  event.stopPropagation();
});

// When previous button is clicked
$prevButton.click(function(event) {
  // Hide the current image
  $("#overlay img").hide();
  // Overlay image Contact
  var $currentImgSrc = $("#overlay img").attr("src");
  // Image with matching Contact of the overlay image
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  // Finds the next image
  var $nextImg = $($currentImg.closest(".image").prev().find("img"));
  // Fade in the next image
  $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  // Prevents overlay from being hidden
  event.stopPropagation();
});

// When the exit button is clicked
$exitButton.click(function() {
  // Fade out the overlay
  $("#overlay").fadeOut("slow");
});



/**===========Who we are Slider============= */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

const showSlide = (n) => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
}

const nextSlide = () => showSlide(currentSlide + 1);

const prevSlide = () => showSlide(currentSlide - 1);

const startSlideShow = () => slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

const stopSlideShow = () => clearInterval(slideInterval);

document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

// Pause the slideshow when the mouse is over the slider
document.querySelector('.Who-We-Are').addEventListener('mouseenter', stopSlideShow);

// Restart the slide show when the mouse leaves the slider
document.querySelector('.Who-We-Are').addEventListener('mouseleave', startSlideShow);

// Show the first slide and start the slide show when the page loads
showSlide(currentSlide);
startSlideShow();


//email form//
function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_4pqizya";
  const templateID = "template_jg2oyie";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("name").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!")

    })
    .catch(err=>console.log(err));
}


//subscribe//


//email form//
function sendMail() {
  var params = { 
   from_email: document.getElementById("from_email").value,
  };

  const serviceID = "service_4pqizya";
  const templateID = "template_zedtjom";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        
        document.getElementById("from_email").value = "";
        
        console.log(res);
        alert("Thank you for joining our mailing list. We look forward to updating you about Pinydiit Foundation's work")

    })
    .catch(err=>console.log(err));
}



//News And Events
$(document).ready(function () {
  $("#news-slider").owlCarousel({
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    navigation: true,
    navigationText: ["", ""],
    pagination: true,
    autoPlay: true
  });
});

// News and events Read More Button


