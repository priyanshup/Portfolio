/**
 * data/dna.js
 *
 * The four items in "What I bring". Static grid, so any even count works.
 *
 *   desc   the full sentence(s), shown from md up
 *   short  one sentence shown on phones, where the section is a list of rows.
 *          Distilled from desc; never add a fact that isn't in desc.
 */

import { IconCode, IconTarget, IconZap, IconTrendingUp } from '../components/ui/Icons';

export const dnaItems = [
  {
    icon: IconCode,
    title: "Engineering roots",
    short: "I spent three years as a software engineer on Java, SQL and shell, so I can follow an architecture discussion and see its trade-offs.",
    desc: "I spent three years as a software engineer writing Java, SQL and shell for healthcare systems that had to stay up. It's why I can follow an architecture discussion and see the trade-offs in it.",
  },
  {
    icon: IconTarget,
    title: "Product strategy",
    short: "CSPO certified. I've led engineering organisations of 50+ people, prioritise with RICE and Kano, and set goals with OKRs.",
    desc: "CSPO certified. I've led engineering organisations of 50+ people. I prioritise with RICE and Kano, set goals with OKRs, and have handled P&L management and go-to-market (GTM) planning.",
  },
  {
    icon: IconZap,
    title: "AI and scale",
    short: "I've used LLMs, GCP and cloud-native architecture to automate at scale, from 90K+ SKUs at VidaXL to claims for millions of patients.",
    desc: "I've used LLMs, GCP and cloud-native architectures to automate at scale: a publishing engine for 90K+ SKUs at VidaXL, and claims processing for healthcare that covered millions of patients.",
  },
  {
    icon: IconTrendingUp,
    title: "Working from data",
    short: "GA4 certified. I work with Tableau, Power BI and SQL, and my VidaXL KPI dashboards got leadership decisions out 35% faster.",
    desc: "GA4 certified. I work with Tableau, Power BI and SQL, and I've run A/B tests and funnel analysis. The KPI dashboards I built at VidaXL got leadership decisions out 35% faster.",
  },
];
