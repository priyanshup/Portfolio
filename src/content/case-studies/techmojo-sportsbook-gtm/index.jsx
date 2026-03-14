/**
 * content/case-studies/techmojo-sportsbook-gtm/index.jsx
 *
 * Case Study: From MVP to 200% —
 * The GTM Playbook for a Global Sportsbook
 *
 * IMAGES:
 *   Drop any diagrams, flowcharts, or screenshots into ./assets/ and
 *   import them here. Suggested assets to create:
 *
 *   assets/mvp-scope.png         — feature categorisation diagram (MVP vs Phase 2/3)
 *   assets/launch-playbook.png   — the repeatable launch framework as a flowchart
 *   assets/expansion-map.png     — world map showing the 5 country rollout
 *   assets/performance-chart.png — system performance improvement chart
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
 * import mvpScopeImg       from './assets/mvp-scope.png';
 * import launchPlaybookImg from './assets/launch-playbook.png';
 * import expansionMapImg   from './assets/expansion-map.png';
 * import perfChartImg      from './assets/performance-chart.png';
 */

const TechmojoSportsbookCaseStudy = () => (
  <>

    {/* ── HEADLINE METRICS ── */}
    <MetricRow metrics={[
      { val: "200%", label: "Revenue Growth" },
      { val: "5",    label: "Countries Launched" },
      { val: "30%",  label: "System Performance Boost" },
      { val: "25K+", label: "Active Users Post-Expansion" },
    ]} />

    <Divider />

    {/* ── THE PROBLEM ── */}
    <H2>The Problem</H2>

    <P>
      At Techmojo, we were building a white-label sportsbook platform designed
      to support multiple operators and international markets simultaneously.
      The business wanted to launch quickly and validate the platform in real
      markets — but the product was still under heavy development, and
      stakeholders were continuously proposing new features.
    </P>

    <P>
      This created a compounding risk: every additional feature delayed the
      launch timeline, which delayed revenue, which increased pressure to
      add more features to justify the delay. Without intervention, the
      product risked an indefinite development cycle.
    </P>

    <P>
      At the same time, each target country had different regulatory
      requirements and localisation needs. Attempting to launch across
      multiple markets without a clear, structured process would have
      created significant coordination failures and further delays.
    </P>

    {/*
      <ImageFull
        src={expansionMapImg}
        alt="Target market map — UK, Germany, Spain, Japan, Turkey"
        caption="Five simultaneous markets, each with distinct regulatory requirements"
      />
    */}

    <Callout label="The Core Challenge" accent>
      How might we launch a functional sportsbook MVP quickly while creating
      a scalable process to expand into multiple regulated markets — without
      rebuilding the platform each time?
    </Callout>

    <Divider />

    {/* ── DISCOVERY ── */}
    <H2>Discovery & Stakeholder Alignment</H2>

    <P>
      The first step was understanding what was truly required to launch the
      product — as opposed to what stakeholders wanted at launch. I worked
      closely with four groups to build that picture:
    </P>

    <BulletList items={[
      "Engineering leads across multiple scrum teams",
      "Compliance and regulatory teams responsible for each market",
      "Business stakeholders managing operator relationships",
      "Client representatives with market-specific requirements",
    ]} />

    <P>
      Through these conversations, a consistent pattern emerged: many of the
      requested features were genuinely valuable, but not required for the
      first launch. The risk wasn't a lack of good ideas — it was the absence
      of a clear line between what was essential and what could come later.
    </P>

    <Callout label="Key Insight">
      The biggest threat to launch wasn't technical complexity. It was
      the absence of a shared, documented definition of "done" — which
      meant scope could expand indefinitely without anyone being wrong.
    </Callout>

    <Divider />

    {/* ── APPROACH ── */}
    <H2>My Approach</H2>

    <P>
      To move the product toward launch without sacrificing quality or
      stakeholder trust, I focused on three priorities in parallel.
    </P>

    <H3>1. Defining a Clear MVP</H3>

    <P>
      The most urgent problem was preventing scope creep from delaying
      the launch indefinitely. I created a structured feature list and
      worked with engineering leads and business stakeholders to categorise
      every item in the backlog into three buckets:
    </P>

    <BulletList items={[
      "MVP — features required for the product to be launchable and compliant",
      "Phase 2 — high-value features to be delivered in the first wave post-launch",
      "Phase 3 — longer-term enhancements that could wait for validated demand",
    ]} />

    <P>
      This created explicit, documented alignment across teams. Development
      focus shifted entirely to the MVP bucket, and every new feature request
      was triaged against the same framework rather than added to the active
      sprint.
    </P>

    {/*
      <ImageFull
        src={mvpScopeImg}
        alt="Feature categorisation: MVP vs Phase 2 vs Phase 3"
        caption="The MVP scoping framework — every feature has a home, launch stays on track"
      />
    */}

    <H3>2. Creating a Repeatable Launch Framework</H3>

    <P>
      Once the MVP scope was locked, the next challenge was making market
      expansion scalable. Launching in one country had taught us that the
      coordination overhead was significant — and that doing it ad hoc for
      each new market would not scale to five countries simultaneously.
    </P>

    <P>
      I documented a formal launch playbook that captured:
    </P>

    <BulletList items={[
      "All product and engineering dependencies required before a market could go live",
      "Integration steps across teams and the owner of each",
      "Typical turnaround times for each activity in the launch sequence",
      "Compliance and regulatory checkpoints specific to each country type",
    ]} />

    <P>
      This playbook was shared with all stakeholders and client representatives
      in advance of each new market launch, so they could provide required
      information and complete their dependencies without creating last-minute
      bottlenecks.
    </P>

    {/*
      <ImageFull
        src={launchPlaybookImg}
        alt="The repeatable market launch framework"
        caption="The launch playbook — a structured sequence that made each new market faster than the last"
      />
    */}

    <H3>3. Coordinating Compliance in Parallel</H3>

    <P>
      Regulatory compliance varied significantly across markets and had
      historically been treated as a final step rather than a parallel
      workstream. This meant compliance work often delayed launches that
      were otherwise ready to ship.
    </P>

    <P>
      I worked closely with the compliance team to map their requirements
      for each upcoming market, shared the launch timeline with them early,
      and ensured they had visibility into which markets were launching next
      and when. Compliance work moved from a sequential bottleneck into a
      concurrent workstream aligned with the development schedule.
    </P>

    <Divider />

    {/* ── WHAT WE BUILT ── */}
    <H2>What We Built</H2>

    <P>
      The result was both a working sportsbook platform and a structured
      operational framework for market expansion — neither of which alone
      would have been sufficient to hit the launch targets.
    </P>

    <BulletList items={[
      "A clearly defined MVP product scope with documented stakeholder sign-off",
      "A phased roadmap for Phase 2 and Phase 3 feature releases across markets",
      "A repeatable launch process for entering new regulated markets",
      "Coordinated execution across 5 scrum teams (50+ engineers) and 2 business analysts",
      "AWS infrastructure optimised for high-concurrency peak traffic across global markets",
    ]} />

    <P>
      With the playbook in place, expanding to each new market became a
      structured, predictable process rather than a bespoke coordination
      effort. The second market launch was faster than the first. The third
      was faster than the second.
    </P>

    {/*
      <ImageHalf
        left={{ src: perfChartImg, alt: "System performance before optimisation", caption: "Before" }}
        right={{ src: perfChartImg, alt: "System performance after optimisation", caption: "After — 30% improvement" }}
      />
    */}

    <Divider />

    {/* ── RESULTS ── */}
    <H2>Results</H2>

    <P>
      The structured MVP definition and launch framework enabled rapid,
      controlled expansion across five markets within one month:
    </P>

    <BulletList items={[
      "Successful launches across UK, Germany, Spain, Japan, and Turkey within one month",
      "25,000+ active users acquired shortly after expansion",
      "200% revenue growth within 3 months of the first launch",
      "30% improvement in system performance under peak global traffic loads",
    ]} />

    <P>
      Phase 2 and Phase 3 features were gradually released across markets
      after the initial launches, allowing the platform to continue improving
      while already generating revenue — validating the phased approach as
      both a launch strategy and a long-term product delivery model.
    </P>

    <Divider />

    {/* ── REFLECTION ── */}
    <H2>What I'd Do Differently</H2>

    <H3>Integrate product analytics earlier</H3>
    <P>
      We had platform metrics from day one, but deeper behavioural analytics —
      specifically around betting patterns and feature engagement by market —
      were added later than they should have been. Earlier investment in
      analytics would have let us optimise features for specific regions faster
      and informed the Phase 2 prioritisation with real usage data rather than
      assumptions.
    </P>

    <H3>Run market-specific experiments from launch</H3>
    <P>
      Different countries showed distinct betting patterns and user preferences
      that only became visible after we had meaningful traffic. Designing
      structured experiments into the launch plan from the start — rather than
      treating them as a post-stabilisation activity — would have accelerated
      engagement improvements in underperforming markets.
    </P>

    <H3>Build an automated launch readiness dashboard</H3>
    <P>
      The launch playbook worked well, but tracking readiness across multiple
      markets simultaneously relied on manual status updates and frequent
      check-ins. An automated dashboard showing each market's launch readiness
      score in real time — with blockers surfaced automatically — would have
      reduced coordination overhead and given leadership better visibility
      without requiring regular status meetings.
    </P>

    <Divider />

    {/* ── TAKEAWAYS ── */}
    <H2>Key Takeaways</H2>

    <P>
      The most important lesson from this project was that in complex,
      multi-stakeholder environments, the product work and the coordination
      work are equally important. Shipping a great product into a broken
      launch process produces mediocre results. Getting both right is what
      creates the compounding growth.
    </P>

    <BulletList items={[
      "A documented MVP definition is a coordination tool as much as a product tool — it gives every team a shared answer to the question 'is this required for launch?'",
      "Repeatable processes compound in value — the second market launch is always faster than the first if you've documented what the first one taught you",
      "Compliance is a parallel workstream, not a final gate — treating it as a dependency to be resolved last is the single most common cause of avoidable launch delays",
    ]} />

  </>
);

export default TechmojoSportsbookCaseStudy;