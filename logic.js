// window.onload = function () {
//   // Scroll to the top of the page
//   window.scrollTo(0, 0.01);
// };

// JavaScript to change color on click
$(document).ready(function () {
  // Add click event handler to all td elements in the table using event delegation
  $("table").on("click", "td", function () {
    // Remove highlighting from all td elements
    $("table tr td").removeClass("golden").css("color", "");

    // Change the background color of the clicked td
    $(this).addClass("golden");
  });

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
});
