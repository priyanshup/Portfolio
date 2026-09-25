/**
 * content/case-studies/vidaxl-ai-content-automation/index.jsx
 *
 * Case study: cutting product publishing time from 3 weeks to 3 days with AI.
 *
 * Images: put diagrams or screenshots in ./assets/, import them here and use
 * <ImageFull>. Useful ones would be the manual workflow, the pipeline
 * architecture and the pilot results.
 *
 * Voice: plain first person, British spelling, no dashes as connectors.
 * See DESIGN.md, "Writing voice".
 */

import {
  H2, H3, P,
  Callout, MetricRow, Collapsible,
  Snapshot, ProcessFlow,
  BulletList,
} from '../components.jsx';

const VidaXLCaseStudy = () => (
  <>

    {/* The short version: problem, what I did, result, takeaway */}
    <Snapshot
      plain={`VidaXL is an online retailer, and every new product needed its title, description and translations written by hand, a 2 to 3 week job. I owned the product that has AI draft them from data the company already had, so new products now go live in days.`}
      problem={`Writing and translating product content by hand took 2 to 3 weeks per launch and about 60 hours of manual work every week. New products sat in warehouses instead of selling.`}
      did={`Ran discovery with four teams, worked with an engineering colleague to test whether AI could write on-brand content from the product data already in the catalogue, designed the prompts, and had the content team review the output blind. Piloted on 90K SKUs before scaling to 250K+.`}
      result={`Publishing time fell from 2 to 3 weeks to 2 to 3 days. Over 60 hours of manual work a week disappeared, content production cost dropped 23%, and conversion on newly launched products rose 7%.`}
      takeaway={`AI works best on repetitive tasks where the input data already exists, and a pilot at real scale earns the trust you need to roll it out.`}
      role="Product Owner"
      team="Content ops, localisation, catalogue management and e-commerce leadership, plus an engineering partner"
      timeline="Piloted on 90K SKUs across 12 markets, then expanded to 250K+ SKUs across 30+ markets"
      tech={["GCP", "OpenAI", "Python", "Salsify"]}
    />

    <MetricRow metrics={[
      { val: "7%",   label: "Conversion lift" },
      { val: "23%",  label: "Cost reduction" },
      { val: "60h",  label: "Manual work saved per week" },
      { val: "3d",   label: "Publishing time (was 3 weeks)" },
    ]} />

    <H2>The problem</H2>

    <P>
      At VidaXL, a new product couldn't go on sale until it had a title, a
      description and translations for each market. After a product was
      manufactured, the workflow looked like this:
    </P>

    <BulletList items={[
      "The content team wrote the titles and descriptions by hand.",
      "The localisation team translated them for each market.",
      "QA checked the content for accuracy and brand voice.",
      "The content was finally published on the website.",
    ]} />

    <P>
      That took 2 to 3 weeks per product. In the meantime, newly manufactured
      products sat in warehouses, customers couldn't see what was in stock, and
      marketing campaigns waited. The operations teams spent about 60 hours
      every week on repetitive content work.
    </P>

    <Callout label="The core question" accent>
      Could we generate good product content and translations automatically, so
      new products go live within days instead of weeks?
    </Callout>

    <H2>What I found</H2>

    <P>
      I ran discovery sessions with four teams: content operations,
      localisation, catalogue management and e-commerce leadership. I also
      looked at how long publishing really took and how much work sat behind it.
    </P>

    <P>
      My working hypothesis was that AI could write reliable product content
      from the structured attributes already stored in our PIM system, the
      database that holds our product information, with no new data collection
      and no manual input.
    </P>

    <BulletList items={[
      "Writing titles, descriptions and selling points by hand took about 60 hours a week and was the biggest bottleneck.",
      "The data already existed. Category, materials, dimensions and features were all in the PIM. What was slow was turning that data into text customers would read.",
      "Translation multiplied the work. Every product had to be translated for every market, so the effort grew in step with the catalogue.",
    ]} />

    <Callout label="The insight">
      The data needed to write good product content was already there. The slow
      part was turning it into text by hand, which made it a good candidate for
      automation.
    </Callout>

    <H2>How I approached it</H2>

    <ProcessFlow steps={[
      "Test the AI hypothesis with real LLM experiments",
      "Design prompts and blind-test them against brand guidelines",
      "Build the automated pipeline into Salsify PIM",
      "Pilot on 90K SKUs, then scale to 250K+",
    ]} />

    <P>
      First I checked the hypothesis. With a colleague from engineering, I ran
      experiments on several large language models (LLMs) to see which one suited our catalogue
      structure and brand requirements.
    </P>

    <P>
      Then we wrote prompts that combined the product attributes, the brand
      style guide, instructions for titles, descriptions and selling points, and
      guardrails to keep the copy short and accurate for e-commerce. We tried
      them on a representative sample of SKUs and asked the content team to
      review the results blind.
    </P>

    <P>
      The feedback was consistently good. The descriptions were clear, the tone
      matched the style guide, and the copy was concise. That validated the core
      assumption: AI could take over much of the content writing.
    </P>

    <Collapsible title="What we built">

    <P>
      We built a content pipeline inside Salsify, our product information
      management system. It works like this:
    </P>

    <BulletList items={[
      "It pulls the product attributes from Salsify.",
      "It builds a prompt from those attributes.",
      "It sends the prompt to OpenAI's API.",
      "The API returns a title, a description and key selling points.",
      "The result is written back to Salsify.",
      "The product then goes through the normal publishing workflow, with no manual content step.",
    ]} />

    <P>
      Requests run in batch jobs, so thousands of SKUs are processed at once.
      That was more efficient and cut our API costs.
    </P>

    <H3>The pilot</H3>

    <P>
      Before rolling out globally, we ran a pilot on 90,000 SKUs (individual products) across 12
      international markets. The content teams checked the output for product
      accuracy, brand voice and correct localisation, and we used their feedback
      to refine the prompts. Once the pilot worked, we expanded to 250,000 SKUs
      across more than 30 markets.
    </P>
    </Collapsible>

    <H2>Results</H2>

    <P>Within the first month of full rollout:</P>

    <BulletList items={[
      "Publishing time fell from 2 to 3 weeks to 2 to 3 days.",
      "60+ hours of manual content work a week disappeared.",
      "Content production costs dropped by 23%.",
      "Conversion rate for newly launched products rose by 7%.",
    ]} />

    <P>
      Faster publishing also moved revenue forward. New products could be online
      almost as soon as they left the warehouse, so demand started earlier and
      the catalogue stayed fresher.
    </P>

    <Collapsible title="What I'd do differently">

    <H3>Score quality automatically</H3>
    <P>
      During the pilot the content team checked everything by hand. An automated
      quality score that flags likely AI problems before a person sees the
      content would have cut that review work and caught edge cases sooner.
    </P>

    <H3>Treat prompt testing as a process</H3>
    <P>
      We refined prompts as we went. A proper test framework with agreed
      evaluation criteria and tracked experiments would have shortened the
      iterations and made the improvements repeatable.
    </P>

    <H3>Plan for experiments from the start</H3>
    <P>
      Once the system was stable, we could generate several versions of a
      product's content and A/B test them for conversion. I'd build that in from
      the beginning.
    </P>
    </Collapsible>

    <H2>What I took from it</H2>

    <P>
      The best AI opportunities I've seen are where structured data already
      exists and people spend their time turning it into something else by hand.
    </P>

    <BulletList items={[
      "AI works best on structured, repetitive work where the input data already exists.",
      "A pilot at real scale builds trust with stakeholders and shows quality problems that small tests miss.",
      "Speed pays off commercially as well as operationally, because revenue arrives earlier.",
    ]} />

  </>
);

export default VidaXLCaseStudy;
