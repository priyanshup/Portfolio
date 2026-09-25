/**
 * content/case-studies/techmojo-sportsbook-gtm/index.jsx
 *
 * Case study: launching a white-label sportsbook in five countries in one
 * month.
 *
 * Images: put diagrams or screenshots in ./assets/, import them here and use
 * <ImageFull> or <ImageHalf>. Useful ones would be the MVP scope buckets, the
 * launch playbook, a map of the five markets and the performance chart.
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

const TechmojoSportsbookCaseStudy = () => (
  <>

    {/* The short version: problem, what I did, result, takeaway */}
    <Snapshot
      plain={`A betting platform I worked on kept adding features and couldn't launch. I defined what "ready to launch" meant, wrote a repeatable playbook for entering regulated markets, and ran compliance alongside development. Five countries went live within a month.`}
      problem={`Stakeholders kept expanding the scope of an unlaunched platform, while five target countries each had different regulatory requirements. Left alone, the product risked an endless development cycle.`}
      did={`Sorted every backlog item into MVP, Phase 2 or Phase 3 with documented stakeholder sign-off, wrote the launch playbook (dependencies, owners, turnaround times and compliance checkpoints), and moved compliance into a parallel workstream. I coordinated five Scrum teams and two business analysts.`}
      result={`Launched in the UK, Germany, Spain, Japan and Turkey within a month, reached 25,000+ active users, grew revenue 200% within three months, and improved performance by 30% under peak traffic.`}
      takeaway={`A written definition of "done" coordinates teams as well as product, and a repeatable launch process gets faster with every market.`}
      role="Product Owner"
      team="5 Scrum teams, 50+ engineers, 2 business analysts"
      timeline="MVP to 5-country launch in 1 month; revenue growth tracked over the following 3 months"
      tech={["AWS", "Java Microservices", "Redis", "React"]}
    />

    <MetricRow metrics={[
      { val: "200%", label: "Revenue growth" },
      { val: "5",    label: "Countries launched" },
      { val: "30%",  label: "System performance boost" },
      { val: "25K+", label: "Active users after expansion" },
    ]} />

    <H2>The problem</H2>

    <P>
      At Techmojo we were building a white-label sportsbook: one platform that
      several operators could run in different countries. The business wanted to
      launch quickly and test it in real markets. The product was still in heavy
      development, though, and stakeholders kept proposing new features.
    </P>

    <P>
      That fed itself. Every extra feature pushed the launch back, a later
      launch delayed revenue, and the pressure to justify the delay led to
      requests for even more features. Left alone, the product was heading for
      an endless development cycle.
    </P>

    <P>
      Each target country also had its own regulatory requirements and
      localisation needs. Launching in several markets without a clear process
      would have meant coordination failures and more delays.
    </P>

    <Callout label="The core question" accent>
      How do we launch a working sportsbook MVP quickly, and build a process for
      entering several regulated markets without rebuilding the platform each
      time?
    </Callout>

    <H2>What I found</H2>

    <P>
      First I needed to know what launch really required, as opposed to what
      stakeholders wanted at launch. I talked to four groups:
    </P>

    <BulletList items={[
      "Engineering leads across several Scrum teams",
      "The compliance and regulatory teams for each market",
      "Business stakeholders who managed operator relationships",
      "Client representatives with market-specific requirements",
    ]} />

    <P>
      A pattern showed up quickly. Many of the requested features were good
      ideas, but the first launch didn't depend on them. What was missing was a
      clear line between what was essential and what could come later.
    </P>

    <Callout label="The insight">
      The biggest threat to the launch was the lack of a shared, written
      definition of "done". Without one, scope could grow indefinitely and
      nobody was ever wrong to ask for more.
    </Callout>

    <H2>How I approached it</H2>

    <P>I worked on three things at the same time.</P>

    <ProcessFlow steps={[
      "Define a clear MVP",
      "Create a repeatable launch framework",
      "Run compliance in parallel",
    ]} />

    <H3>1. Define a clear MVP</H3>

    <P>
      The most urgent problem was scope creep. I built a structured feature list
      and went through it with the engineering leads and business stakeholders.
      Every backlog item went into one of three buckets:
    </P>

    <BulletList items={[
      "MVP: features needed for the product to be launchable and compliant",
      "Phase 2: high-value features for the first wave after launch",
      "Phase 3: longer-term improvements that could wait for proven demand",
    ]} />

    <P>
      Everyone agreed the buckets in writing. Development focused on the MVP
      bucket, and every new request was checked against the same list instead of
      going straight into the sprint.
    </P>

    <H3>2. Create a repeatable launch framework</H3>

    <P>
      With the MVP scope locked, the next question was how to make market
      expansion scale. Launching in one country had shown how much coordination
      it took, and doing that ad hoc for each new market wouldn't work for five
      countries at once. So I wrote a launch playbook covering:
    </P>

    <BulletList items={[
      "Every product and engineering dependency that had to be met before a market could go live",
      "The integration steps across teams and who owned each one",
      "Typical turnaround times for each activity in the launch sequence",
      "The compliance and regulatory checkpoints for each type of country",
    ]} />

    <P>
      I shared the playbook with all stakeholders and client representatives
      before each launch, so they could supply what we needed and finish their
      part early.
    </P>

    <H3>3. Run compliance in parallel</H3>

    <P>
      Regulatory requirements varied a lot between markets, and compliance had
      usually been the last step. It often delayed launches that were otherwise
      ready to ship.
    </P>

    <P>
      I worked with the compliance team to map their requirements for each
      upcoming market and shared the launch timeline with them early, including
      which markets were next and when. Compliance stopped being a sequential
      bottleneck and became a workstream that ran alongside development.
    </P>

    <Collapsible title="What we built">

    <P>
      We ended up with a working sportsbook and a way of expanding into new
      markets. We needed both.
    </P>

    <BulletList items={[
      "A clearly defined MVP scope with documented stakeholder sign-off",
      "A phased roadmap for Phase 2 and Phase 3 releases across markets",
      "A repeatable process for entering new regulated markets",
      "Coordinated delivery across five Scrum teams (50+ engineers) and two business analysts",
      "AWS infrastructure tuned for high-concurrency peak traffic across global markets",
    ]} />

    <P>
      With the playbook in place, each new market followed a predictable
      process. The second launch was faster than the first, and the third was
      faster than the second.
    </P>
    </Collapsible>

    <H2>Results</H2>

    <P>
      The MVP definition and the launch framework let us expand across five
      markets within one month:
    </P>

    <BulletList items={[
      "Launched in the UK, Germany, Spain, Japan and Turkey within one month",
      "Acquired 25,000+ active users shortly after the expansion",
      "Revenue grew 200% within three months of the first launch",
      "System performance improved 30% under peak global traffic",
    ]} />

    <P>
      We released Phase 2 and Phase 3 features gradually after the launches, so
      the platform kept improving while it earned revenue. That confirmed the
      phased approach as both a launch strategy and a way to keep delivering.
    </P>

    <Collapsible title="What I'd do differently">

    <H3>Add product analytics sooner</H3>
    <P>
      We had platform metrics from day one, but deeper behavioural analytics,
      especially on betting patterns and feature use by market, arrived later
      than they should have. Earlier analytics would have let us tune features
      for specific regions faster, and Phase 2 priorities would have rested on
      real usage data.
    </P>

    <H3>Run experiments by market from launch</H3>
    <P>
      Different countries showed different betting patterns and preferences, but
      only once we had meaningful traffic. If I'd designed experiments into the
      launch plan from the start, we would have improved engagement in the
      weaker markets sooner.
    </P>

    <H3>Automate launch readiness tracking</H3>
    <P>
      The playbook worked, but tracking readiness across several markets meant
      manual status updates and frequent check-ins. A dashboard that scored each
      market's readiness in real time, with blockers surfaced automatically,
      would have cut the coordination work and given leadership visibility
      without regular status meetings.
    </P>
    </Collapsible>

    <H2>What I took from it</H2>

    <P>
      On a project with many stakeholders, the product work and the coordination
      work matter equally. A great product shipped into a broken launch process
      still gives mediocre results.
    </P>

    <BulletList items={[
      "A documented MVP definition coordinates teams as well as product. It gives everyone the same answer to \"is this needed for launch?\"",
      "Repeatable processes get better with use. The second launch is faster than the first if you write down what the first one taught you.",
      "Compliance works best as a parallel workstream. In my experience, leaving it as a final gate is the most common cause of avoidable launch delays.",
    ]} />

  </>
);

export default TechmojoSportsbookCaseStudy;
