/**
 * content/case-studies/uhg-qa-cycle-automation/index.jsx
 *
 * Case Study: Shipping Faster Without Breaking Things —
 * Building a QA Automation Product for Healthcare Systems
 *
 * IMAGES:
 *   Drop any diagrams or screenshots into ./assets/ and import them here.
 *
 *   assets/manual-process.png   — flowchart of the before state (manual data setup)
 *   assets/tool-architecture.png — diagram of the Excel tool's query generation logic
 *   assets/cycle-comparison.png — before/after QA cycle time comparison
 */

import {
  H2, H3, P,
  Callout, MetricRow,
  BulletList, Divider,
} from '../components.jsx';

/*
 * Uncomment as you add images to ./assets/
 *
 * import manualProcessImg    from './assets/manual-process.png';
 * import toolArchitectureImg from './assets/tool-architecture.png';
 * import cycleComparisonImg  from './assets/cycle-comparison.png';
 */

const UHGQACaseStudy = () => (
  <>

    {/* ── HEADLINE METRICS ── */}
    <MetricRow metrics={[
      { val: "30%",  label: "QA Cycle Time Reduction" },
      { val: "0",    label: "PHI Violations in Test Envs" },
      { val: "100%", label: "Manual Data Entry Eliminated" },
    ]} />

    <Divider />

    {/* ── THE PROBLEM ── */}
    <H2>The Problem</H2>

    <P>
      Testing healthcare software creates a constraint that does not exist
      in most other industries: you cannot use real user data in lower
      environments. Personal Health Information (PHI) is tightly regulated
      under healthcare compliance requirements, which means test environments
      must be populated exclusively with synthetic, fabricated data.
    </P>

    <P>
      In practice, this meant that before every QA cycle, someone on the team
      had to manually create dummy user data — populating the relevant database
      tables with realistic but fabricated entries that the feature under test
      could run against. The process was time-consuming, repetitive, and varied
      depending on which feature was being tested. Different features required
      different tables to be set up, and the work had to be redone entirely for
      every new test cycle.
    </P>

    <P>
      This manual data setup was a hidden tax on every release. It was slowing
      down QA cycles, creating inconsistency in test coverage, and consuming
      engineering time that could have been spent on testing logic rather than
      data preparation.
    </P>

    {/*
      <ImageFull
        src={manualProcessImg}
        alt="The manual test data setup process before automation"
        caption="Before: manual data entry required before every QA cycle"
      />
    */}

    <Callout label="The Core Challenge" accent>
      How might we give QA teams a reliable, PHI-safe source of test data that
      can be generated quickly, customised per feature, and imported directly
      into lower environments — without any manual effort?
    </Callout>

    <Divider />

    {/* ── DISCOVERY ── */}
    <H2>Understanding the Pattern</H2>

    <P>
      Before building anything, I spent time observing how the development and
      QA teams worked day to day — specifically watching the test data setup
      process across different feature cycles. My goal was to understand which
      parts of the problem were consistent and which varied by feature, because
      a tool that only solved the consistent parts would already eliminate most
      of the work.
    </P>

    <P>
      Through this observation, a clear structure emerged: there was a core set
      of database tables that every test scenario needed regardless of the feature
      under test — things like user identity, membership, and coverage records.
      On top of that core sat a variable layer of feature-specific tables that
      only applied to particular test cases. Any tool I built needed to handle
      both: automate the core layer entirely, and give QA teams control over
      the feature-specific layer.
    </P>

    <Callout label="Key Insight">
      The data setup problem had a consistent shape beneath the apparent variety.
      Most variation was in which feature-specific tables were needed — not in
      how to populate them. That meant a single, well-structured tool could
      handle the majority of test scenarios without requiring custom configuration
      each time.
    </Callout>

    <Divider />

    {/* ── APPROACH ── */}
    <H2>My Approach</H2>

    <P>
      I designed a tool that automated the generation of test data queries —
      removing the manual setup step entirely while keeping QA teams in full
      control of the scenarios they wanted to test.
    </P>

    <H3>1. Building the Synthetic Data Library</H3>

    <P>
      The foundation of the tool was a library of synthetic, PHI-safe user
      profiles and data values covering all the fields healthcare systems
      typically populate during a QA cycle. The library contained no real
      patient information at any level — compliance safety was designed in
      from the start, not layered on as a constraint.
    </P>

    <P>
      Randomisation logic was built into the library so that each use of the
      tool generated unique data combinations automatically, creating varied
      test scenarios without any additional configuration from the QA engineer.
      Repetitive, identical test data — a common source of missed edge cases —
      was eliminated by default.
    </P>

    <H3>2. Automated Query Generation</H3>

    <P>
      The tool automatically generated DELETE, INSERT, and UPDATE queries for
      all tables relevant to the feature being tested — both the core tables
      every test required and the feature-specific tables the QA team selected.
      The number of test users and the scale of data generated were configurable
      inputs, so a QA engineer could generate data for one test user or twenty
      using the same workflow.
    </P>

    {/*
      <ImageFull
        src={toolArchitectureImg}
        alt="Query generation logic in the Excel tool"
        caption="The tool: select feature type, configure scale, generate all queries"
      />
    */}

    <H3>3. Built in Excel — Zero Adoption Friction</H3>

    <P>
      The tool was built in Excel with macro automation. This was a deliberate
      choice: Excel was already the tool the QA team used daily. There was no
      new system to learn, no credentials to manage, no deployment to co-ordinate.
      The QA team could start using the tool on day one without any onboarding.
    </P>

    <P>
      Generated queries could be further customised within the sheet itself
      before export, and then imported directly into PL/SQL for execution in
      the lower environment. No manual data entry, no context switching between
      tools, no risk of transcription errors.
    </P>

    <Divider />

    {/* ── WHAT WE BUILT ── */}
    <H2>What We Built</H2>

    <P>
      The result was a self-contained Excel-based test data generation tool
      that removed the manual data setup step from QA cycles entirely:
    </P>

    <BulletList items={[
      "A library of synthetic, PHI-safe user profiles and data values covering all commonly tested healthcare fields",
      "Randomisation logic that generated varied, realistic test scenarios on every use without additional configuration",
      "Automated generation of DELETE, INSERT, and UPDATE queries for both core tables and feature-specific tables",
      "Configurable test user counts — data for as many test users as the scenario required, generated in one step",
      "In-sheet customisation — queries could be adjusted within Excel before being imported directly into PL/SQL",
      "Zero dependency on production data or PHI at any point in the test data lifecycle",
    ]} />

    {/*
      <ImageFull
        src={cycleComparisonImg}
        alt="QA cycle time before and after the tool"
        caption="Before vs after: the manual data setup phase removed entirely"
      />
    */}

    <Divider />

    {/* ── RESULTS ── */}
    <H2>Results</H2>

    <P>
      The tool was adopted across QA cycles immediately after release, and the
      impact was measurable within the first sprint:
    </P>

    <BulletList items={[
      "30% reduction in QA cycle time — the manual data setup phase was eliminated entirely",
      "PHI compliance risk in test environments was removed completely — all test data was synthetic by construction",
      "QA engineers shifted focus from data preparation to testing logic, improving the depth and consistency of test coverage",
      "Feature releases moved faster as a direct result of shorter, more predictable QA cycles",
    ]} />

    <P>
      Beyond the time saving, the tool improved the consistency of QA across
      cycles. Manual data creation had been subject to variation — different
      engineers set up the same scenario differently, making test results harder
      to compare. With the tool generating data from the same library and logic
      every time, test setups became reproducible and results more reliable.
    </P>

    <Divider />

    {/* ── REFLECTION ── */}
    <H2>What I'd Do Differently</H2>

    <H3>Build it as a web application from the start</H3>
    <P>
      Excel was the right choice for adoption speed — the QA team was already
      using it, and there was zero onboarding friction. But Excel macros have
      real limitations: they are difficult to version-control, hard to share
      reliably across distributed teams, and brittle when the underlying database
      schema changes. Given the value the tool delivered, investing in a
      lightweight web application from the outset would have made it significantly
      more maintainable and extensible as the product grew.
    </P>

    <H3>Add schema-change awareness</H3>
    <P>
      When database schemas changed — as they inevitably do in active development
      — the tool's query templates needed to be updated manually to reflect the
      new structure. Building in a mechanism to detect or be notified of schema
      changes would have prevented the tool from generating stale queries after
      updates and reduced the maintenance burden on whoever owned the tool.
    </P>

    <H3>Create a shared test scenario library</H3>
    <P>
      Individual QA engineers quickly built preferred configurations of their
      own within the tool. A shared, team-maintained library of common test
      scenarios — reusable across cycles and kept up to date centrally — would
      have reduced duplicated effort and created a single source of truth for
      how standard test cases should be set up.
    </P>

    <Divider />

    {/* ── TAKEAWAYS ── */}
    <H2>Key Takeaways</H2>

    <P>
      The most durable lesson from this project was about where internal tooling
      creates the most value: not in core product logic, but in the invisible
      support work that surrounds it. Data preparation for testing is exactly
      the kind of high-frequency, low-complexity task that automation should
      eliminate — freeing engineers to spend their time on work that actually
      requires their expertise.
    </P>

    <BulletList items={[
      "The best internal tools meet people where they already are — building in Excel eliminated the adoption barrier that kills most internal tooling efforts before they start",
      "Compliance constraints are a design input, not a limitation — designing PHI safety into the architecture from day one meant the tool never required a compliance exception or review process",
      "Hidden bottlenecks compound quickly — a step that takes 30 minutes per cycle, run across dozens of cycles per quarter, is a significant investment of engineering time that rarely appears on any roadmap",
    ]} />

  </>
);

export default UHGQACaseStudy;
