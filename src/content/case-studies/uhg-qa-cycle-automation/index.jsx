/**
 * content/case-studies/uhg-qa-cycle-automation/index.jsx
 *
 * Case study: cutting QA cycle time by 30% with a test data generator.
 *
 * Images: put diagrams or screenshots in ./assets/, import them here and use
 * <ImageFull>. Useful ones would be the core versus feature-specific table
 * layers and a mock of the Excel sheet (with no real data).
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

const UHGQACaseStudy = () => (
  <>

    {/* The short version: problem, what I did, result, takeaway */}
    <Snapshot
      plain={`Healthcare software can't be tested with real patient data, so QA teams created fake data by hand before every test cycle. I built an Excel tool that generates safe test data automatically, and QA cycles got 30% shorter.`}
      problem={`Every QA cycle began with someone creating dummy patient data by hand. It was slow, inconsistent, and redone from scratch for each feature under test.`}
      did={`Watched how the development and QA teams actually worked to find the pattern, built a library of synthetic, privacy-safe data with built-in randomisation, generated the required database queries automatically, and delivered it all in Excel, which the team already used, so nobody needed training.`}
      result={`QA cycles got 30% shorter, no patient data appeared in test environments, and test setups became consistent and repeatable.`}
      takeaway={`Build internal tools where people already work, and design compliance rules in from the start.`}
      role="Sr. Business Systems Analyst"
      team="UHG development and QA teams"
      timeline="Built and adopted within one sprint cycle of release"
      tech={["Excel (VBA Macros)", "PL/SQL"]}
    />

    <MetricRow metrics={[
      { val: "30%",  label: "QA cycle time reduction" },
      { val: "0",    label: "PHI violations in test environments" },
      { val: "100%", label: "Manual data entry eliminated" },
    ]} />

    <H2>The problem</H2>

    <P>
      Testing healthcare software comes with a constraint most industries don't
      have: you can't use real user data in lower environments. Personal Health
      Information (PHI) is tightly regulated, so test environments have to be
      filled with synthetic data.
    </P>

    <P>
      In practice, before every QA cycle someone on the team had to create dummy
      user data by hand, filling the relevant database tables with realistic but
      fake entries for the feature under test. It took time, it was repetitive,
      and it varied by feature: different features needed different tables, and
      the work was redone for every cycle.
    </P>

    <P>
      This data setup was a hidden cost on every release. It slowed QA cycles,
      made test coverage inconsistent, and used engineering time that should have
      gone on testing.
    </P>

    <Callout label="The core question" accent>
      How do we give QA teams a reliable, PHI-safe source of test data that can
      be generated quickly, adjusted per feature, and imported straight into
      lower environments with no manual effort?
    </Callout>

    <H2>What I found</H2>

    <P>
      Before building anything I spent time watching how the development and QA
      teams worked day to day, particularly the test data setup across different
      feature cycles. I wanted to know which parts of the problem stayed the same
      and which changed by feature. A tool that solved only the constant parts
      would already remove most of the work.
    </P>

    <P>
      A clear structure emerged. A core set of database tables was needed for
      every test scenario regardless of feature: user identity, membership and
      coverage records. On top of that sat a variable layer of feature-specific
      tables that applied only to certain test cases. The tool had to automate
      the core layer completely and leave QA teams in control of the
      feature-specific layer.
    </P>

    <Callout label="The insight">
      Under the apparent variety, the data setup problem had a consistent shape.
      Most of the variation was in which feature-specific tables were needed,
      while the way to fill them stayed the same. One well-structured tool could
      therefore cover most test scenarios without custom configuration each time.
    </Callout>

    <H2>How I approached it</H2>

    <P>
      I designed a tool that generates the test data queries, so the manual
      setup step disappears while QA teams keep full control of the scenarios
      they want to test.
    </P>

    <ProcessFlow steps={[
      "Build the synthetic data library",
      "Generate queries automatically",
      "Build it in Excel",
    ]} />

    <H3>1. Build the synthetic data library</H3>
    <P>
      The tool rests on a library of synthetic, PHI-safe user profiles and data
      values covering the fields healthcare systems typically fill during a QA
      cycle. It contains no real patient information at any level. Compliance
      safety was part of the design from the start.
    </P>
    <P>
      Randomisation logic in the library means each use generates a different
      combination of data, so QA engineers get varied test scenarios without
      extra configuration. That removes repetitive, identical test data, a common
      source of missed edge cases.
    </P>

    <H3>2. Generate queries automatically</H3>
    <P>
      The tool generates DELETE, INSERT and UPDATE queries for every table
      relevant to the feature under test: the core tables every test needs, plus
      the feature-specific ones the QA team selects. The number of test users and
      the amount of data are configurable, so an engineer can generate data for
      one test user or twenty in the same workflow.
    </P>

    <H3>3. Build it in Excel</H3>
    <P>
      I built the tool in Excel with macros, on purpose. Excel was already what
      the QA team used every day, so there was no new system to learn, no
      credentials to manage and no deployment to coordinate. The team could start
      using it on day one without onboarding.
    </P>
    <P>
      Queries can be customised in the sheet before export and then imported
      straight into PL/SQL to run in the lower environment. That removes manual
      data entry, switching between tools and transcription errors.
    </P>

    <Collapsible title="What we built">

    <P>
      The result was a self-contained Excel tool that removed the manual data
      setup step from QA cycles:
    </P>

    <BulletList items={[
      "A library of synthetic, PHI-safe user profiles and values covering the fields commonly tested in healthcare",
      "Randomisation logic that produces varied, realistic test scenarios on every use with no extra configuration",
      "Automatic DELETE, INSERT and UPDATE queries for both the core and the feature-specific tables",
      "Configurable test user counts, so data for as many users as a scenario needs comes out in one step",
      "In-sheet customisation of queries before import into PL/SQL",
      "No dependency on production data or PHI at any point",
    ]} />
    </Collapsible>

    <H2>Results</H2>

    <P>
      QA teams adopted the tool immediately after release, and the effect showed
      within the first sprint:
    </P>

    <BulletList items={[
      "QA cycle time fell by 30%, because the manual data setup phase disappeared.",
      "PHI compliance risk in test environments was removed: all test data was synthetic by construction.",
      "QA engineers moved their effort from data preparation to testing logic, which improved the depth and consistency of coverage.",
      "Feature releases moved faster because QA cycles were shorter and more predictable.",
    ]} />

    <P>
      The tool also made QA more consistent between cycles. With manual data
      creation, different engineers set up the same scenario differently, which
      made results hard to compare. Generating data from the same library and
      logic every time made test setups reproducible and results more reliable.
    </P>

    <Collapsible title="What I'd do differently">

    <H3>Build it as a web app from the start</H3>
    <P>
      Excel was right for adoption speed because the QA team already used it. But
      macros are hard to version-control, awkward to share reliably across
      distributed teams, and fragile when the database schema changes. Given how
      much value the tool delivered, a lightweight web application from the start
      would have been easier to maintain and extend.
    </P>

    <H3>Detect schema changes</H3>
    <P>
      When database schemas changed, as they do in active development, someone
      had to update the tool's query templates by hand. A way to detect or be
      notified of schema changes would have stopped the tool from generating
      stale queries and reduced the maintenance load on whoever owned it.
    </P>

    <H3>Share a scenario library</H3>
    <P>
      Individual QA engineers soon built their own preferred configurations in
      the tool. A shared, team-maintained library of common scenarios, reusable
      across cycles and kept current in one place, would have reduced duplicated
      effort and given us one source of truth for how standard test cases should
      be set up.
    </P>
    </Collapsible>

    <H2>What I took from it</H2>

    <P>
      This project showed me where internal tooling pays off most: in the support
      work around the product more than in core product logic. Preparing test
      data is high-frequency, low-complexity work, exactly what automation should
      take over so engineers can spend their time on things that need their
      expertise.
    </P>

    <BulletList items={[
      "The best internal tools meet people where they already are. Building in Excel removed the adoption barrier that stops most internal tools before they start.",
      "Compliance rules are a design input. Building PHI safety into the architecture from day one meant the tool never needed a compliance exception or review.",
      "Hidden bottlenecks add up. A step that takes 30 minutes per cycle, repeated across dozens of cycles a quarter, is a lot of engineering time that rarely appears on any roadmap.",
    ]} />

  </>
);

export default UHGQACaseStudy;
