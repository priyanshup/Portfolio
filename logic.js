window.onload = function () {
  // Scroll to the top of the page
  window.scrollTo(0, 0);
};

$(document).ready(function () {
  // Function to adjust body padding based on navbar height
  function adjustBodyPadding() {
    var navbarHeight = $(".navbar").outerHeight();
    $("body").css("padding-top", navbarHeight + "px");
  }

  // Adjust body padding when the page is loaded
  adjustBodyPadding();

  // Adjust body padding when the window is resized
  $(window).resize(function () {
    adjustBodyPadding();
  });

  // Adjust body padding when the navbar is toggled (if necessary)
  $(".navbar-toggler").click(function () {
    adjustBodyPadding();
  });

  // Reload page upon clicking on navbar-brand
  $(".navbar-brand").click(function () {
    //Fragment the URL after # and update it back to window
    window.location.href = window.location.href.split("#")[0];
  });

  // Add click event handler to all nav-links
  $(".navbar-nav .nav-link").on("click", function () {
    // Remove 'active' class from all nav-links
    $(".navbar-nav .nav-link").removeClass("active");

    // Add 'active' class to the clicked nav-link
    $(this).addClass("active");

    // Close the offcanvas menu (if it's open)
    $("#offcanvasNavbar").offcanvas("hide");
  });

  // Logic to change color on click
  // Add click event handler to all td elements in the table using event delegation
  $("table").on("click", "td", function () {
    // Remove highlighting from all td elements
    $("table tr td").removeClass("golden").css("color", "");

    // Change the background color of the clicked td
    $(this).addClass("golden");

    // Get the data-content attribute value
    var content = $(this).data("content");

    // Update the content in exp-right-module based on the selected content
    updateContent(content);
  });

  // Display the default content when the page is loaded
  updateContent("product-owner-content");

  function updateContent(content) {
    // Clear previous content
    $("#exp-content-container").fadeOut(300, function () {
      $(this).empty();

      // Add new content based on the selected content
      switch (content) {
        case "product-owner-content":
          $("#exp-content-container").html(
            "<div class='container-fluid'><h5>March 2022 - Present</h5> <h6> TechMojo Solutions | Online Gaming, Sportsbook</h6> <p class='body body-table'>In this universe, I act as a detective, decoding user needs and crafting product solutions. Navigating through ideas and innovations, I find joy in competitor analysis, transforming uncertainty into clarity, and sculpting requirements into the backbone of outstanding products. </p><ul class='exp-list-parent'><li class='exp-list'>HTML</li><li class='exp-list'>CSS</li><li class='exp-list'>Bootstrap</li><li class='exp-list'>jQuery</li><li class='exp-list'>Javascript</li><li class='exp-list'>NodeJS</li><li class='exp-list'>ExpressJS</li><li class='exp-list'>Git</li></ul></div>"
          );
          break;
        case "business-analyst-content":
          $("#exp-content-container").html(
            " <div class='container-fluid'> <h5>June 2019 - March 2022</h5> <h6>UnitedHealth Group | US Healthcare</h6> <p class='body body-table'>In this role, I orchestrated successful system launches, provided guidance as a mentor, and served as a dedicated SME. I coordinated the creation of mockups and test cases, turning challenges into well-organized solutions.</p><ul class='exp-list-parent'><li class='exp-list'>PL/SQL</li><li class='exp-list'>JAVA</li><li class='exp-list'>Shell Scripting</li><li class='exp-list'>Tortoise SVN</li></ul></div>"
          );
          break;
        case "software-engineer-content":
          $("#exp-content-container").html(
            " <div class='container-fluid'> <h5>July 2016 - June 2019</h5> <h6>UnitedHealth Group | US Healthcare</h6> <p class='body body-table'>As a developer, I seamlessly blended innovation and automation, crafting new modules for US Healthcare that enhanced member enrollment, facilitated plan rollovers, and streamlined premium invoice generation.</p><ul class='exp-list-parent'><li class='exp-list'>PL/SQL</li><li class='exp-list'>JAVA</li><li class='exp-list'>Shell Scripting</li><li class='exp-list'>Tortoise SVN</li></ul></div>"
          );
          break;
        default:
          break;
      }

      // Fade in the content
      $(this).fadeIn(300);
    });
  }

  // Hover effect over table td without the "golden" class
  $("table tr td").on({
    mouseover: function () {
      if (!$(this).hasClass("golden")) {
        $(this).css("color", "#94a3b8");
      }
    },
    mouseout: function () {
      if (!$(this).hasClass("golden")) {
        $(this).css("color", ""); // Set to an empty string to remove inline style
      }
    },
  });

  // Logic to highlight work tabs
  // Add click event handler to all filter-tabs elements using event delegation
  $(".filter-group").on("click", ".filter-tab", function () {
    $(".filter-group .filter-tab").removeClass("active-tab");
    $(this).addClass("active-tab");
    var selectedTab = $(this).attr("class").split(" ")[1];

    // Show all items initially
    $(".filter-projects .project-content").show();

    switch (selectedTab) {
      case "uhg-tab":
        $(".filter-projects .project-content:not(.uhg-project)").fadeOut();
        break;
      case "techmojo-tab":
        $(".filter-projects .project-content:not(.techmojo-project)").fadeOut();
        break;
      case "personal-tab":
        $(".filter-projects .project-content:not(.personal-project)").fadeOut();
        break;
      default:
        // Show all project contents with fade-in effect
        $(".filter-projects .project-content").fadeIn();
        break;
    }
  });

  // Check if the user has scrolled down
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      // If scrolled down, show the "Move to Top" button
      $("#moveToTopBtn").addClass("show");
    } else {
      // If at the top, hide the "Move to Top" button
      $("#moveToTopBtn").removeClass("show");
    }
  });

  // Scroll to the top when the button is clicked
  $("#moveToTopBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
  });
});
