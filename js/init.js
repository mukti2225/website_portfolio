/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {
  /*----------------------------------------------------*/
  /* FitText Settings
------------------------------------------------------ */

  setTimeout(function () {
    $("h1.responsive-headline").fitText(1, { minFontSize: "40px", maxFontSize: "90px" });
  }, 100);

  /*----------------------------------------------------*/
  /* Smooth Scrolling
------------------------------------------------------ */

  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /*----------------------------------------------------*/
  /* Highlight the current section in the navigation bar
------------------------------------------------------*/

  var sections = $("section");
  var navigation_links = $("#nav-wrap a");

  sections.waypoint({
    handler: function (event, direction) {
      var active_section;

      active_section = $(this);
      if (direction === "up") active_section = active_section.prev();

      var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

      navigation_links.parent().removeClass("current");
      active_link.parent().addClass("current");
    },
    offset: "35%",
  });

  /*----------------------------------------------------*/
  /*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

  $("header").css({ height: $(window).height() });
  $(window).on("resize", function () {
    $("header").css({ height: $(window).height() });
    $("body").css({ width: $(window).width() });
  });

  /*----------------------------------------------------*/
  /*	Fade In/Out Primary Navigation
------------------------------------------------------*/

  $(window).on("scroll", function () {
    var h = $("header").height();
    var y = $(window).scrollTop();
    var nav = $("#nav-wrap");

    if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
      nav.fadeOut("fast");
    } else {
      if (y < h * 0.2) {
        nav.removeClass("opaque").fadeIn("fast");
      } else {
        nav.addClass("opaque").fadeIn("fast");
      }
    }
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
------------------------------------------------------*/

  /*----------------------------------------------------*/
  /*	Flexslider
/*----------------------------------------------------*/
  $(".flexslider").flexslider({
    namespace: "flex-",
    controlsContainer: ".flex-container",
    animation: "slide",
    controlNav: true,
    directionNav: false,
    smoothHeight: true,
    slideshowSpeed: 7000,
    animationSpeed: 600,
    randomize: false,
  });

  /*----------------------------------------------------*/
  /*	contact form
------------------------------------------------------*/

  $("form#contactForm button.submit").click(function () {
    var contactName = $("#contactForm #contactName").val();
    var contactEmail = $("#contactForm #contactEmail").val();
    var contactSubject = $("#contactForm #contactSubject").val();
    var contactMessage = $("#contactForm #contactMessage").val();

    var data = "contactName=" + contactName + "&contactEmail=" + contactEmail + "&contactSubject=" + contactSubject + "&contactMessage=" + contactMessage;

    $.ajax({
      type: "POST",
      url: "sendEmail.php",
      data: data,
      success: function (msg) {
        // Message was sent
        if (msg == "OK") {
          $("#image-loader").fadeOut();
          $("#message-warning").hide();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();
        }
        // There was an error
        else {
          $("#image-loader").fadeOut();
          $("#message-warning").html(msg);
          $("#message-warning").fadeIn();
        }
      },
    });
    return false;
  });
});

/*----------------------------------------------------*/
/*	portfolio
------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  // --- Modal Portfolio ---
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    item.addEventListener("click", function () {
      const videoElement = this.querySelector("video");
      const imgElement = this.querySelector("img"); // Diperbaiki
      const title = this.querySelector(".title").textContent;
      const subtitle = this.querySelector(".subtitle").textContent;

      let mediaSrc = "";
      let isVideo = false;

      if (videoElement) {
        mediaSrc = videoElement.querySelector("source").src;
        isVideo = true;
      } else if (imgElement) {
        mediaSrc = imgElement.src;
      }

      // Tampilkan modal
      showModal(mediaSrc, title, subtitle, isVideo);
    });
  });

  function showModal(mediaSrc, title, subtitle, isVideo) {
    let modal = document.querySelector(".portfolio-modal");

    if (!modal) {
      modal = document.createElement("div");
      modal.classList.add("portfolio-modal");
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <div class="media-container"></div>
          <h2 class="modal-title"></h2>
          <p class="modal-subtitle"></p>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modal.querySelector(".modal-title").textContent = title;
    modal.querySelector(".modal-subtitle").textContent = subtitle;
    const mediaContainer = modal.querySelector(".media-container");
    mediaContainer.innerHTML = "";

    if (isVideo) {
      mediaContainer.innerHTML = `<video controls autoplay width="100%">
          <source src="${mediaSrc}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
    } else {
      mediaContainer.innerHTML = `<img src="${mediaSrc}" alt="${title}" style="width:100%"/>`;
    }

    modal.style.display = "flex";

    // Tutup modal saat tombol close diklik
    modal.querySelector(".close-btn").addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Tutup modal saat klik di luar konten
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // --- Filter Portfolio ---
  const filters = document.querySelectorAll(".portfolio.filters a");

  filters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active class
      document.querySelector(".filters a.active")?.classList.remove("active");
      this.classList.add("active");

      let filterClass = this.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        item.style.display = filterClass === "*" || item.classList.contains(filterClass.substring(1)) ? "block" : "none";
      });
    });
  });
});

/*----------------------------------------------------*/
/* logo slider
------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const logoTrack = document.querySelector(".logo-track");
  const logoSlide = document.querySelector(".logo-slide");

  for (let i = 0; i < 0; i++) {
    let clone = logoSlide.cloneNode(true);
    clone.style.marginLeft = "10px";
    logoTrack.appendChild(clone);
  }
});
