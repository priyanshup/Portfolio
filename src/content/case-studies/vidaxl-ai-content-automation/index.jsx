/**
 * content/case-studies/vidaxl-ai-content-automation/index.jsx
 *
 * Case Study: Scaling Product Launch Speed —
 * How AI Reduced Product Publishing Time from 3 Weeks to 3 Days
 *
 * IMAGES:
 *   Drop any diagrams, screenshots, or gifs into ./assets/ and
 *   import them here. Examples are commented throughout — uncomment
 *   and swap the src when the asset is ready.
 *
 *   Suggested assets to create:
 *     assets/manual-workflow.png   — flowchart of the before state
 *     assets/ai-pipeline.png       — architecture diagram of the built system
 *     assets/pilot-results.png     — chart of pilot metrics
 */

import {
  H2, H3, P,
  Callout, MetricRow,
  ImageFull, ImageHalf,
  BulletList, Divider,
} from '../components.jsx';

/*
 * Uncomment as you add images to ./assets/
 *
 * import manualWorkflowImg from './assets/manual-workflow.png';
 * import aiPipelineImg     from './assets/ai-pipeline.png';
 * import pilotResultsImg   from './assets/pilot-results.png';
 */

const VidaXLCaseStudy = () => (
  <>

    {/* ── HEADLINE METRICS — shown first, sets expectations ── */}
    <MetricRow metrics={[
      { val: "7%",   label: "Conversion Lift" },
      { val: "23%",  label: "Cost Reduction" },
      { val: "60h",  label: "Manual Work Saved / Week" },
      { val: "3d",   label: "Publishing Time (was 3 weeks)" },
    ]} />

    <Divider />

    {/* ── THE PROBLEM ── */}
    <H2>The Problem</H2>

    <P>
      At VidaXL, launching a new product online required multiple manual steps
      before it could appear on the website. After a product was manufactured,
      the workflow looked like this:
    </P>

    <BulletList items={[
      "Content team manually wrote product titles and descriptions",
      "Localization team translated the content for each market",
      "QA team verified the information for accuracy and brand voice",
      "Content was finally published on the website",
    ]} />

    <P>
      This workflow took 2–3 weeks per product. The impact compounded quickly:
      newly manufactured products sat in warehouses before appearing online,
      customers were unaware of available inventory, marketing campaigns were
      delayed, and operations teams spent dozens of hours every week on
      repetitive content creation. The business was losing valuable selling time
      on every single product launch.
    </P>

    {/*
      <ImageFull
        src={manualWorkflowImg}
        alt="The manual product publishing workflow before automation"
        caption="Before: a 2–3 week manual process involving four teams"
      />
    */}

    <Callout label="The Core Challenge" accent>
      How might we automatically generate high-quality product content and
      translations so newly manufactured products can go live within days
      instead of weeks?
    </Callout>

    <Divider />

    {/* ── DISCOVERY ── */}
    <H2>Discovery & Stakeholder Alignment</H2>

    <P>
      To understand the full scope of the problem, I ran structured discovery
      sessions across four teams: content operations, the localization team,
      catalog management, and e-commerce leadership. I also analyzed catalog
      publishing timelines and measured the operational workload tied to
      content creation.
    </P>

    <P>
      The central hypothesis I wanted to validate was whether AI could generate
      reliable product content using the structured product attributes already
      stored in our PIM system — without requiring additional data collection
      or manual input.
    </P>

    <H3>What I Found</H3>

    <BulletList items={[
      "Manual content writing was the single biggest bottleneck — creating titles, descriptions, and product USPs required approximately 60 hours of manual effort every week.",
      "Structured product data already existed — category, materials, dimensions, and features were all captured in the PIM system. The problem wasn't missing data; it was the manual transformation of that data into customer-facing content.",
      "Localization multiplied the workload — each product required translation across multiple markets, creating repetitive effort for the localization team that scaled linearly with every new SKU added.",
    ]} />

    <Callout label="Key Insight">
      The data needed to write great product content already existed.
      The bottleneck was entirely in the manual transformation step —
      which meant it was a strong candidate for automation.
    </Callout>

    <Divider />

    {/* ── APPROACH ── */}
    <H2>My Approach</H2>

    <P>
      With the hypothesis validated, I explored whether generative AI could
      transform structured product attributes into high-quality marketing
      content at scale. Working with a colleague from engineering, I ran
      experiments across several LLM models to find the right fit for
      our catalog structure and brand requirements.
    </P>

    <P>
      We designed prompts that combined key product attributes from the catalog,
      brand style guidelines, instructions for generating titles, descriptions,
      and USPs, and guardrails to keep the content concise and accurate for
      e-commerce. We tested the outputs on a representative sample of SKUs and
      had the content team review them blind.
    </P>

    <P>
      The feedback was consistently positive: descriptions were clear and
      informative, the tone aligned with the brand style guide, and the content
      was concise and appealing to customers. This validated the core assumption
      — AI could reliably automate large parts of the content creation workflow.
    </P>

    <Divider />

    {/* ── WHAT WE BUILT ── */}
    <H2>What We Built</H2>

    <P>
      We built an AI-powered content generation pipeline integrated directly
      with Salsify, our Product Information Management system. The end-to-end
      workflow eliminated every manual step between product attributes and
      published content:
    </P>

    <BulletList items={[
      "Product attributes were fetched automatically from Salsify PIM",
      "A structured prompt was generated dynamically using those attributes",
      "The prompt was sent to OpenAI's API for content generation",
      "AI generated product titles, product descriptions, and key selling points (USPs)",
      "Generated content was written back to Salsify automatically",
      "Products then moved through the standard publishing workflow — no manual content step",
    ]} />

    <P>
      To improve efficiency and reduce API costs, all requests were processed
      in batch jobs, allowing thousands of SKUs to be processed simultaneously
      rather than one at a time.
    </P>

    {/*
      <ImageFull
        src={aiPipelineImg}
        alt="The AI content generation pipeline architecture"
        caption="The automated pipeline: from PIM attributes to published content"
      />
    */}

    <H3>Pilot Program</H3>

    <P>
      Before rolling out globally, we ran a structured pilot program to validate
      quality at scale and build stakeholder confidence before a full commitment.
    </P>

    <BulletList items={[
      "Scope: 90,000 SKUs across 12 international markets",
      "Content teams reviewed AI-generated outputs for product accuracy, brand voice adherence, and correct localization",
      "Feedback loops were used to refine prompts and improve output quality iteratively",
    ]} />

    <P>
      After the pilot proved successful, the solution was expanded to 250,000
      SKUs across 30+ global markets.
    </P>

    {/*
      <ImageFull
        src={pilotResultsImg}
        alt="Pilot program results dashboard"
        caption="Pilot outcomes: quality validation across 90K SKUs and 12 markets"
      />
    */}

    <Divider />

    {/* ── RESULTS ── */}
    <H2>Results</H2>

    <P>
      Within the first month of full deployment, we observed measurable
      improvements across publishing speed, operational cost, and commercial
      performance:
    </P>

    <BulletList items={[
      "Product publishing time reduced from 2–3 weeks to 2–3 days",
      "60+ hours of manual content work eliminated per week",
      "23% reduction in operational content production costs",
      "7% increase in conversion rate for newly launched products",
    ]} />

    <P>
      The speed improvement had a compounding commercial impact: faster
      publishing meant newly manufactured products could appear online almost
      immediately after leaving the warehouse, unlocking earlier demand,
      improving catalog freshness, and reducing the gap between production and
      revenue.
    </P>

    <Divider />

    {/* ── REFLECTION ── */}
    <H2>What I'd Do Differently</H2>

    <H3>Introduce automated quality scoring earlier</H3>
    <P>
      During the pilot, we relied heavily on manual content validation by the
      content team. In hindsight, building an automated quality scoring layer —
      one that flags potential AI issues before content reaches human reviewers —
      would have reduced the manual review burden and caught edge cases faster.
    </P>

    <H3>Structure prompt optimisation as a formal process</H3>
    <P>
      We iterated on prompts organically during the pilot phase. A structured
      prompt testing framework with defined evaluation criteria and tracked
      experiments would have reduced iteration time and made the improvements
      more reproducible.
    </P>

    <H3>Enable content experimentation from day one</H3>
    <P>
      Once the system stabilised, we could have used it to generate multiple
      content variations per product and run A/B tests to further improve
      conversion performance. Building that experimentation capability into the
      initial architecture — rather than treating it as a future enhancement —
      would have compounded the commercial value significantly.
    </P>

    <Divider />

    {/* ── TAKEAWAYS ── */}
    <H2>Key Takeaways</H2>

    <P>
      This project reinforced something I now look for in every automation
      opportunity: the highest-value AI use cases are rarely about generating
      new data. They are about transforming structured data that already exists
      but requires manual effort to convert into something useful.
    </P>

    <BulletList items={[
      "AI delivers the most value when applied to structured, repetitive workflows where the input data already exists",
      "Piloting at meaningful scale before full rollout builds stakeholder trust and surfaces quality issues you can't anticipate in small tests",
      "Speed compounds commercially — reducing publishing time doesn't just save operational cost, it moves revenue forward",
    ]} />

  </>
);

export default VidaXLCaseStudy;