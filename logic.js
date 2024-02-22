// Cache selectors
var $navbar = $(".navbar"),
  $navbarBrand = $(".navbar-brand"),
  $navbarNavLinks = $(".navbar-nav .nav-link"),
  $table = $("table"),
  $expContentContainer = $("#exp-content-container"),
  $filterGroup = $(".filter-group");

// Adjust body padding based on the fixed navbar height
$("body").css("padding-top", $navbar.outerHeight() + "px");

// Reload page upon clicking on navbar-brand
$navbarBrand.click(function () {
  window.location.href = window.location.href.split("#")[0];
});

// Add click event handler to all nav-links
$navbarNavLinks.on("click", function () {
  $navbarNavLinks.removeClass("active");
  $(this).addClass("active");
  // Close the offcanvas menu (if it's open)
  $("#offcanvasNavbar").offcanvas("hide");
});

// Add click event handler to all td elements in the table using event delegation
// Add touchstart event handler to exp-left-module for mobile devices
$table.on("touchstart click", "td", function () {
  $table.find("tr td").removeClass("golden").css("color", "");
  $(this).addClass("golden");
  // Get the data-content attribute value
  updateContent($(this).data("content"));
});

// Display the default content when the page is loaded
updateContent("product-owner-content");

function updateContent(content) {
  $expContentContainer.fadeOut(300, function () {
    $expContentContainer.empty().html(getContentHtml(content)).fadeIn(300);
  });
}

// Generate HTML content based on selected content
function getContentHtml(content) {
  switch (content) {
    case "product-owner-content":
      return "<div class='container-fluid'><h5>March 2022 - Present</h5><h6>TechMojo Solutions | Online Gaming, Sportsbook</h6><p class='body body-table'>In this universe, I act as a detective, decoding user needs and crafting product solutions. Navigating through ideas and innovations, I find joy in competitor analysis, transforming uncertainty into clarity, and sculpting requirements into the backbone of outstanding products.</p><ul class='exp-list-parent'><li class='exp-list'>HTML</li><li class='exp-list'>CSS</li><li class='exp-list'>Bootstrap</li><li class='exp-list'>jQuery</li><li class='exp-list'>Javascript</li><li class='exp-list'>NodeJS</li><li class='exp-list'>ExpressJS</li><li class='exp-list'>Git</li></ul></div>";
    case "business-analyst-content":
      return "<div class='container-fluid'><h5>June 2019 - March 2022</h5><h6>UnitedHealth Group | US Healthcare</h6><p class='body body-table'>In this role, I orchestrated successful system launches, provided guidance as a mentor, and served as a dedicated SME. I coordinated the creation of mockups and test cases, turning challenges into well-organized solutions.</p><ul class='exp-list-parent'><li class='exp-list'>PL/SQL</li><li class='exp-list'>JAVA</li><li class='exp-list'>Shell Scripting</li><li class='exp-list'>Tortoise SVN</li></ul></div>";
    case "software-engineer-content":
      return "<div class='container-fluid'><h5>July 2016 - June 2019</h5><h6>UnitedHealth Group | US Healthcare</h6><p class='body body-table'>As a developer, I seamlessly blended innovation and automation, crafting new modules for US Healthcare that enhanced member enrollment, facilitated plan rollovers, and streamlined premium invoice generation.</p><ul class='exp-list-parent'><li class='exp-list'>PL/SQL</li><li class='exp-list'>JAVA</li><li class='exp-list'>Shell Scripting</li><li class='exp-list'>Tortoise SVN</li></ul></div>";
    default:
      return "";
  }
}

// Add mouseover and mouseout event handlers to table td elements
$table.on({
    mouseover: function () {
      if (!$(this).hasClass("golden")) {
        $(this).css("color", "#94a3b8");
      }
    },
    mouseout: function () {
      if (!$(this).hasClass("golden")) {
        $(this).css("color", "");
      }
    },
  },
  "tr td"
);

// Add click event handler to filter-tabs elements using event delegation
$filterGroup.on("click", ".filter-tab", function () {
  // Check if the clicked tab is already active
  if ($(this).hasClass("active-tab")) {
    return; // Return early without executing further actions
  }

  var selectedTab = $(this).attr("class").split(" ")[1];
  $(".filter-group .filter-tab").removeClass("active-tab");
  $(this).addClass("active-tab");

  // Hide all project contents
  $(".filter-projects .project-content").hide();

  switch (selectedTab) {
    case "uhg-tab":
      $(".uhg-project").fadeIn();
      break;
    case "techmojo-tab":
      $(".techmojo-project").fadeIn();
      break;
    case "personal-tab":
      $(".personal-project").fadeIn();
      break;
    default:
      // Show all project contents if no specific tab is selected
      $(".filter-projects .project-content").fadeIn();
      break;
  }
});

// Show/hide "Move to Top" button based on scroll position
$(window).scroll(function () {
  $("#moveToTopBtn").toggleClass("show", $(this).scrollTop() > 50);
});

// Scroll to top when "Move to Top" button is clicked
$("#moveToTopBtn").click(function () {
  $("html, body").animate({
    scrollTop: 0
  }, "fast");
  return false;
});

// Function to open the overlay and prevent scrolling of background page
function openOverlay(overlayId) {
  document.getElementById(overlayId).style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling of background page
}

// Function to close the overlay and allow scrolling of background page
function closeOverlay(overlayId) {
  document.getElementById(overlayId).style.display = 'none';
  document.body.style.overflow = ''; // Allow scrolling of background page
}

// Add event listeners for each button
document.querySelectorAll('.project-button').forEach(button => {
  button.addEventListener('click', function () {
    const overlayId = this.getAttribute('data-overlay');
    openOverlay(overlayId);
  });
});

// Add event listener to close buttons of each overlay
document.querySelectorAll('.overlay .close').forEach(closeButton => {
  closeButton.addEventListener('click', function () {
    const overlayId = this.closest('.overlay').id;
    closeOverlay(overlayId);
  });
});

// Add event listener to close overlay when clicking outside the overlay content
document.querySelectorAll('.overlay').forEach(overlay => {
  overlay.addEventListener('click', function (event) {
    if (event.target === this) {
      const overlayId = this.id;
      closeOverlay(overlayId);
    }
  });
});