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
// Check if the clicked tab is already active
if ($(this).hasClass("golden")) {
return; // Return early without executing further actions
}
$table.find("tr td").removeClass("golden").css("color", "");
$(this).addClass("golden");
// Get the data-content attribute value
updateContent($(this).data("content"));
});
// Display the default content when the page is loaded
updateContent("product-owner-content-vidaxl");
function updateContent(content) {
$expContentContainer.fadeOut(300, function () {
$expContentContainer.empty().html(getContentHtml(content)).fadeIn(300);
});
}
// Generate HTML content based on selected content
function getContentHtml(content) {
switch (content) {
case "product-owner-content-vidaxl":
return `
<div class='container-fluid'>
   <h4>vidaXL | Ecommerce, Retail</h4>
   <h5>Sep 2024 – Present</h5>
   <p class='body body-table'>Content and Product Publications</p>
   <ul class='body indented-list'>
      <li>Led automation of <span class='highlight golden'>90,000+ SKUs</span>, boosting visibility (+31%), engagement (+22%), and conversion (+7%)</li>
      <li>Deployed <span class='highlight golden'>AI-driven workflows</span> (OpenAI), cutting ops cost by 23% and manual workload by 60 hours/week</li>
      <li>Centralized <span class='highlight golden'>digital asset management</span>, lowering storage costs by 21% and improving retrieval speed by 15%</li>
      <li>Automated <span class='highlight golden'>multilingual content</span> for 12 languages, lifting international sales by 5% and regional engagement by 15%</li>
      <li>Spearheaded <span class='highlight golden'>Agile transformation</span>, improving sprint velocity by 10% and reducing backlog spillover by 18%</li>
      <li>Implemented <span class='highlight golden'>OKRs & KPI dashboards</span>, boosting leadership visibility and tracking by 35%</li>
      <li>Partnered with <span class='highlight golden'>DevOps</span> to streamline CI/CD, improving release speed and stability</li>
   </ul>
   <p class='body'><strong>Tools & Skills:</strong></p>
   <ul class='exp-list-parent'>
      <li class='exp-list'>Salsify (PIM)</li>
      <li class='exp-list'>Productsup</li>
      <li class='exp-list'>Azure</li>
      <li class='exp-list'>GCP</li>
      <li class='exp-list'>AI / Automation</li>
      <li class='exp-list'>Datadog</li>
      <li class='exp-list'>Grafana</li>
      <li class='exp-list'>Cloudinary</li>
      <li class='exp-list'>Agile / Scrum</li>
      <li class='exp-list'>Jira & Confluence</li>
   </ul>
</div>
`;
case "product-owner-content-techmojo":
return `
<div class='container-fluid'>
   <h4>TechMojo Solutions | Online Gaming, Sportsbook</h4>
   <h5>Mar 2022 – Aug 2024</h5>
   <p class='body body-table'>Sportsbook Platforms & Trading Systems</p>
   <ul class='body indented-list'>
      <li>Owned full <span class='highlight golden'>product lifecycle</span> from MVP to scale-up, driving 1.5x feature adoption via roadmap optimization</li>
      <li>Launched <span class='highlight golden'>white-label sportsbook</span> in 5 countries, scaling to 25K DAUs and growing revenue by 200% in 6 months</li>
      <li>Optimized <span class='highlight golden'>platform APIs</span>, improving performance by 30% and real-time data accuracy by 20%</li>
      <li>Streamlined backlog prioritization, reducing <span class='highlight golden'>time-to-market</span> by 20% and improving delivery by 35%</li>
      <li>Built <span class='highlight golden'>real-time dashboards</span>, reducing stakeholder decision time by 25%</li>
      <li>Scaled Agile with <span class='highlight golden'>50-member cross-functional team</span>, improving velocity by 20% and cutting dependencies by 40%</li>
      <li>Established <span class='highlight golden'>feedback loops & experimentation</span> (A/B testing, feature flagging), accelerating iteration by 30% and boosting user satisfaction by 12%</li>
   </ul>
   <p class='body'><strong>Tools & Skills:</strong></p>
   <ul class='exp-list-parent'>
      <li class='exp-list'>Jira</li>
      <li class='exp-list'>Confluence</li>
      <li class='exp-list'>Wireframing (Balsamiq / Figma)</li>
      <li class='exp-list'>HTML / CSS</li>
      <li class='exp-list'>JavaScript</li>
      <li class='exp-list'>NodeJS</li>
      <li class='exp-list'>ExpressJS</li>
      <li class='exp-list'>Agile Delivery</li>
   </ul>
</div>
`;
case "business-analyst-content":
return `
<div class='container-fluid'>
   <h4>UnitedHealth Group | US Healthcare</h4>
   <h5>Jun 2019 – Mar 2022</h5>
   <p class='body body-table'>Claims Processing System</p>
   <ul class='body indented-list'>
      <li>Delivered 4 <span class='highlight golden'>enterprise transformation initiatives</span>, boosting operational efficiency by 25%</li>
      <li>Automated <span class='highlight golden'>claims workflows</span>, cutting manual errors by 10% and accelerating payments by 20%</li>
      <li>Executed <span class='highlight golden'>risk-mitigated go-lives</span>, reducing downtime by 15% and achieving 99.8% uptime</li>
      <li>Boosted QA with <span class='highlight golden'>mock test automation</span>, improving defect detection by 22% and test validation by 30%</li>
      <li>Developed <span class='highlight golden'>standardized onboarding & training automation</span>, reducing ramp-up time by 27%</li>
   </ul>
   <p class='body'><strong>Tools & Skills:</strong></p>
   <ul class='exp-list-parent'>
      <li class='exp-list'>SQL / PL-SQL</li>
      <li class='exp-list'>Java</li>
      <li class='exp-list'>Shell Scripting</li>
      <li class='exp-list'>Agile / Scrum</li>
      <li class='exp-list'>Mockups & Wireframes</li>
   </ul>
</div>
`;
case "software-engineer-content":
return `
<div class='container-fluid'>
   <h4>UnitedHealth Group | US Healthcare</h4>
   <h5>Jul 2016 – Jun 2019</h5>
   <p class='body body-table'>Member Enrollment System</p>
   <ul class='body indented-list'>
      <li>Automated <span class='highlight golden'>member account creation</span>, resolving 800+ tickets in 4 weeks and reducing workload by 92%</li>
      <li>Built <span class='highlight golden'>automation tools</span> (SQL & shell), replacing 60% of manual daily tasks</li>
      <li>Developed <span class='highlight golden'>real-time alerting system</span>, reducing failure response time by 35%</li>
      <li>Engineered <span class='highlight golden'>custom scripts</span> for enrollment workflows, cutting processing time by 30% and lowering failure rates</li>
   </ul>
   <p class='body'><strong>Tools & Skills:</strong></p>
   <ul class='exp-list-parent'>
      <li class='exp-list'>PL/SQL</li>
      <li class='exp-list'>Java</li>
      <li class='exp-list'>Shell Scripting</li>
      <li class='exp-list'>Tortoise SVN</li>
      <li class='exp-list'>Automation</li>
   </ul>
</div>
`;
default:
return "";
}
}
// Add mouseover and mouseout event handlers to table td elements
$table.on(
{
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
case "vidaxl-tab":
$(".vidaxl-project").fadeIn();
break;
case "techmojo-tab":
$(".techmojo-project").fadeIn();
break;
case "uhg-tab":
$(".uhg-project").fadeIn();
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
$("html, body").animate(
{
scrollTop: 0,
},
"fast"
);
return false;
});
// Function to open the overlay and prevent scrolling of background page
function openOverlay(overlayId) {
document.getElementById(overlayId).style.display = "block";
document.body.style.overflow = "hidden"; // Prevent scrolling of background page
}
// Function to close the overlay and allow scrolling of background page
function closeOverlay(overlayId) {
document.getElementById(overlayId).style.display = "none";
document.body.style.overflow = ""; // Allow scrolling of background page
}
// Add event listeners for each button
document.querySelectorAll(".project-button").forEach((button) => {
button.addEventListener("click", function () {
const overlayId = this.getAttribute("data-overlay");
openOverlay(overlayId);
});
});
// Add event listener to close buttons of each overlay
document.querySelectorAll(".overlay .close").forEach((closeButton) => {
closeButton.addEventListener("click", function () {
const overlayId = this.closest(".overlay").id;
closeOverlay(overlayId);
});
});
// Add event listener to close overlay when clicking outside the overlay content
document.querySelectorAll(".overlay").forEach((overlay) => {
overlay.addEventListener("click", function (event) {
if (event.target === this) {
const overlayId = this.id;
closeOverlay(overlayId);
}
});
});