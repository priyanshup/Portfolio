/**
 * data/roles.js
 *
 * Single source of truth for career roles, newest first.
 * Feeds the Experience section, the Hero badge and subtitle, and the
 * years-of-experience figure.
 *
 * Fields:
 *   id        stable slug
 *   company, role, domain, location
 *   start     "Mon YYYY"
 *   end       "Mon YYYY" or "Present"
 *   current   true for the present role (only one)
 *   headline  one line shown on the collapsed row: the result, not the duties
 *   note      one sentence on how this role connects to the previous one
 *   bullets   shown when the row is expanded
 *   tags      stack and skills
 *
 * Adding a role: put it first, then set the previous role's current to false
 * and give it an end date. Roles beyond EXPERIENCE_VISIBLE (config) fold under
 * "Earlier roles".
 *
 * Voice: plain first-person statements, British spelling, no dashes as
 * connectors. Keep every number tied to something the case studies also say.
 * See DESIGN.md, "Writing voice".
 */

export const roles = [
  {
    id: "heineken",
    company: "Heineken",
    role: "Product Owner, Digital Commerce",
    domain: "Digital Commerce",
    location: "Hyderabad, India",
    start: "Jun 2026",
    end: "Present",
    current: true,
    headline: "A digital ordering and delivery pilot for distributors and drivers",
    note: "Moved from consumer e-commerce to B2B distribution.",
    bullets: [
      "Supported the pilot of a digital commerce platform. Distributors use it to receive, process and fulfil orders, and drivers use a companion app to complete deliveries and keep proof of delivery. The order-to-delivery flow is now digital from start to finish.",
      "Took part in system integration testing (SIT), user acceptance testing (UAT), the pilot launch and hypercare. Another team built the platform, and I worked alongside them.",
      "Now working on the next phase, the feature roadmap and in-app analytics, together with a Senior Product Owner and a Business Analyst.",
    ],
    tags: ["Digital Commerce", "B2B", "SIT / UAT", "Roadmap", "Product Analytics"],
  },
  {
    id: "vidaxl",
    company: "VidaXL",
    role: "Product Owner",
    domain: "E-commerce Platform",
    location: "Hyderabad, India",
    start: "Sep 2024",
    end: "Jun 2026",
    current: false,
    headline: "7% conversion lift in 30 days and 23% lower monthly operating cost",
    note: "Applied product ownership to AI at catalogue scale: 90K+ SKUs across 12 markets.",
    bullets: [
      "Conversion rose 7% across all SKUs within 30 days of introducing OpenAI-generated multilingual product content.",
      "Cut monthly operating costs by 23% and saved 60+ hours of manual work a week by automating localisation.",
      "Built real-time KPI dashboards on GCP. Leadership made decisions 35% faster.",
      "Cut cloud storage costs by 21% by centralising asset retrieval and metadata handling.",
    ],
    tags: ["GCP", "OpenAI", "Python", "Productsup", "Salsify"],
  },
  {
    id: "techmojo",
    company: "Techmojo Solutions",
    role: "Product Owner",
    domain: "Sportsbook & Gaming",
    location: "Hyderabad, India",
    start: "Mar 2022",
    end: "Aug 2024",
    current: false,
    headline: "200% revenue growth within 3 months of MVP, across 5 countries",
    note: "Took on full product ownership: five Scrum teams and 50+ people.",
    bullets: [
      "Grew revenue 200% within three months of the MVP, with a go-to-market plan covering the UK, Germany, Spain, Japan and Turkey.",
      "Led five Scrum teams (50+ people) and two business analysts, keeping roadmap priorities and technical grooming in step for complex betting logic.",
      "Improved system performance by 30%. I used AWS CloudWatch logs to find the bottlenecks, then reworked the APIs behind them.",
      "Cut time to market by 20% with a RICE-based framework that weighed technical debt against growth features.",
    ],
    tags: ["AWS", "Java Microservices", "Redis", "React", "RICE"],
  },
  {
    id: "uhg-bsa",
    company: "UnitedHealth Group",
    role: "Sr. Business Systems Analyst",
    domain: "Healthcare",
    location: "Hyderabad, India",
    start: "Jun 2019",
    end: "Mar 2022",
    current: false,
    headline: "25% better operational efficiency across four transformation initiatives",
    note: "The move from writing code to owning business outcomes.",
    bullets: [
      "Managed four enterprise transformation initiatives and improved operational efficiency by 25%.",
      "Automated claims processing from end to end. Payment cycles got 20% faster and manual errors fell by 10%.",
      "Built a mock-data automation tool that cut QA cycles by 30%, so releases could be validated sooner.",
    ],
    tags: ["SQL", "Shell", "Java", "JIRA", "Healthcare"],
  },
  {
    id: "uhg-swe",
    company: "UnitedHealth Group",
    role: "Software Engineer",
    domain: "Healthcare",
    location: "Hyderabad, India",
    start: "Jul 2016",
    end: "Jun 2019",
    current: false,
    headline: "92% of manual account-creation workload automated; 900+ ticket backlog cleared",
    note: "Where I built the technical foundation: Java, SQL and shell on healthcare systems that had to stay up.",
    bullets: [
      "Automated 92% of the manual workload for account creation and cleared a backlog of 900+ tickets in four weeks.",
      "Wrote 25+ SQL and shell scripts to replace daily manual tasks, which made the platform more reliable and incidents quicker to handle.",
    ],
    tags: ["Java", "SQL", "Shell", "CRON"],
  },
];

/* Derived values. Never hard-code these elsewhere. */

const yearOf = (label) => Number(label.slice(-4));

/** First year of the career = start year of the oldest role. */
export const careerStartYear = yearOf(roles[roles.length - 1].start);

/** Whole years of experience, recomputed each year. */
export const yearsExperience = () => new Date().getFullYear() - careerStartYear;

/** The present role (first role flagged current, else the newest). */
export const currentRole = roles.find((r) => r.current) ?? roles[0];

/** "Product Owner, Digital Commerce": the role as written. */
export const roleAsPhrase = (r) => r.role;
/** "Product Owner, Digital Commerce" -> "Product Owner" */
export const roleShort = (r) => r.role.split(', ')[0];
