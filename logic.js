// window.onload = function () {
//   // Scroll to the top of the page
//   window.scrollTo(0, 0.1);
// };

$(document).ready(function () {
  // Adjust body padding based on the fixed navbar height
  $("body").css("padding-top", $(".navbar").outerHeight() + "px");

  // Reload page upon clicking on navbar-brand
  $(".navbar-brand").click(function () {
    location.reload();
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
  updateContent("product-analyst-content");

  function updateContent(content) {
    // Clear previous content
    $("#exp-content-container").fadeOut(300, function () {
      $(this).empty();

      // Add new content based on the selected content
      switch (content) {
        case "product-analyst-content":
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
    // Remove highlighting from all tabs
    $(".filter-group .filter-tab").removeClass("active-tab");

    // Change the color of the clicked tab
    $(this).addClass("active-tab");
  });
});
