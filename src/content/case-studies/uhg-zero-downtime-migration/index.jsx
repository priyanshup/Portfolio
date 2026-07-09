/**
 * content/case-studies/uhg-zero-downtime-migration/index.jsx
 *
 * Case Study: Zero Risk at Scale —
 * Engineering a Zero-Downtime Cross-System Migration
 *
 * IMAGES:
 *   Drop any diagrams or flowcharts into ./assets/ and import them here.
 *
 *   assets/format-mapping.png   — side-by-side of proprietary vs 837 field structure
 *   assets/migration-sequence.png — rolling state-by-state sequence diagram
 *   assets/monitoring-protocol.png — post-go-live monitoring checklist
 */

import {
  H2, H3, P,
  Callout, MetricRow,
  AtAGlance, ProcessFlow,
  BulletList, Divider,
} from '../components.jsx';

/*
 * Uncomment as you add images to ./assets/
 *
 * import formatMappingImg     from './assets/format-mapping.png';
 * import migrationSequenceImg from './assets/migration-sequence.png';
 * import monitoringImg        from './assets/monitoring-protocol.png';
 */

const UHGMigrationCaseStudy = () => (
  <>

    {/* ── AT A GLANCE — 60-second recruiter summary, always first ── */}
    <AtAGlance
      summary="Migrated a dental claims vendor off a proprietary format onto the industry-standard 837 across 28 states, without a single production incident."
      problem="A proprietary claims format carried an ongoing risk of missing or misrepresented fields, triggering claim rejections and delayed payment — and the migration had to happen with zero disruption to live claims processing."
      role="Sr. Business Systems Analyst"
      team="March Vision's technical team + UHG's internal claims processing team"
      timeline="Sequential rollout, one state at a time, alphabetically, across all 28 states"
      primaryMetric={{ val: "0", label: "Downtime Incidents Across 28 States" }}
      tech={["SQL", "Shell", "Java", "837 Standard"]}
    />

    {/* ── HEADLINE METRICS ── */}
    <MetricRow metrics={[
      { val: "0",    label: "Downtime Incidents" },
      { val: "28",   label: "States Migrated" },
      { val: "100%", label: "Rollout Success Rate" },
      { val: "M+",   label: "Claims Processed Uninterrupted" },
    ]} />

    <Divider />

    {/* ── THE PROBLEM ── */}
    <H2>The Problem</H2>

    <P>
      UnitedHealth Group was onboarding March Vision, a dental claims vendor
      operating across 28 US states, onto its claims processing infrastructure.
      March Vision had been transmitting claims data using a proprietary file
      format — one specific to their systems, which carried an ongoing risk of
      missing or misrepresenting the fields required for clean claim adjudication.
    </P>

    <P>
      The goal was to migrate all 28 states from this proprietary format to the
      healthcare industry standard: the 837 inbound claims format. The migration
      was not a technical upgrade for its own sake. The proprietary format
      created a permanent source of downstream risk — any missing critical field
      would trigger a claim rejection, generating provider follow-up cycles that
      delayed payment and increased operational overhead.
    </P>

    <P>
      The non-negotiable constraint was that the migration had to happen with
      zero disruption to claims processing. A single state going down during the
      transition would mean delayed claim adjudication — directly impacting
      members, providers, and UHG's operational commitments across that state.
    </P>

    <Callout label="The Core Challenge" accent>
      How do you migrate 28 independently-configured states from a proprietary
      claims format to an industry standard — safely, sequentially, and without
      a single instance of production downtime?
    </Callout>

    <Divider />

    {/* ── DISCOVERY ── */}
    <H2>Understanding the Landscape</H2>

    <P>
      Before any migration work could begin, I needed to understand both
      format specifications in detail — and, critically, how they diverged
      across each of the 28 states. March Vision's proprietary format was not
      uniform: each state had its own configuration rules, field mappings, and
      edge cases that had to be accounted for individually before any work began.
    </P>

    <P>
      I worked with March Vision's technical team and UHG's internal claims
      processing team to document the proprietary field structure for each state,
      then mapped each field to its equivalent in the 837 standard — or
      identified where no direct equivalent existed and a derivation rule was
      needed to cover the gap.
    </P>

    <Callout label="Key Insight">
      This was not one migration — it was 28 separate migrations, each with its
      own field mappings and edge cases. Treating it as a monolithic change would
      have been the fastest route to production failures. The only safe path was
      to understand and validate each state individually.
    </Callout>

    <Divider />

    {/* ── APPROACH ── */}
    <H2>My Approach</H2>

    <P>
      The migration strategy was built around three principles: understand
      each state individually before touching it, test thoroughly before going
      live, and monitor closely after go-live before moving to the next state.
    </P>

    <ProcessFlow steps={[
      "State-by-State Format Mapping",
      "Rolling Alphabetical Migration",
      "Dev Testing Before Every Cutover",
      "Post-Go-Live Monitoring Per State",
    ]} />

    <H3>1. State-by-State Format Mapping</H3>

    <P>
      For each of the 28 states, I mapped March Vision's proprietary field
      structure to the 837 inbound claims format. This involved documenting
      every field in the proprietary format, identifying its 837 equivalent,
      and defining derivation logic for fields with no direct counterpart.
      State-specific rules and edge cases were captured per state before
      migration work began — no state moved forward until its mapping was
      documented and reviewed.
    </P>

    {/*
      <ImageFull
        src={formatMappingImg}
        alt="Proprietary vs 837 field mapping by state"
        caption="Each state had its own field mapping specification before go-live"
      />
    */}

    <H3>2. Rolling Alphabetical Migration</H3>

    <P>
      Rather than attempting a simultaneous cutover across all 28 states —
      which would have concentrated all risk into a single event — I executed
      the migration in a rolling fashion, state by state, starting
      alphabetically. This kept risk contained to one state at a time and
      allowed learnings from earlier states to inform the approach for later
      ones. Each state's migration was treated as an independent go-live
      with its own validation checklist, even though the underlying process
      was consistent throughout.
    </P>

    {/*
      <ImageFull
        src={migrationSequenceImg}
        alt="Rolling state-by-state migration sequence"
        caption="28 independent go-lives — risk contained, learnings compounded"
      />
    */}

    <H3>3. Development Testing Before Every Production Cutover</H3>

    <P>
      Before any state was moved to production, I ran its new 837 configuration
      in a development environment using representative claims data from that
      state. The goal was to validate that the format mapping was correct, that
      no fields were being lost or misrepresented, and that the output was clean
      enough to pass through the claims processing pipeline without errors. Only
      after the development environment confirmed clean output did a state
      proceed to production.
    </P>

    <H3>4. Post-Go-Live Monitoring Per State</H3>

    <P>
      Going live was not the end of the process for each state. I monitored the
      first two production batch runs after every state's cutover to confirm that
      claims were processing correctly at scale — not just in the controlled
      conditions of development testing. Only after both batch runs were stable
      did the migration move to the next state in the sequence.
    </P>

    {/*
      <ImageFull
        src={monitoringImg}
        alt="Post-go-live monitoring protocol for each state"
        caption="Two production batch runs confirmed stable before moving to the next state"
      />
    */}

    <Divider />

    {/* ── WHAT WE BUILT ── */}
    <H2>What We Built</H2>

    <P>
      The core deliverable was a complete, verified migration from a proprietary
      to an industry-standard claims format across all 28 states — but the real
      output was a structured, repeatable process that kept 28 independent
      configurations organised and verifiable throughout.
    </P>

    <BulletList items={[
      "Detailed format mapping specifications for all 28 states, documenting every field translation and derivation rule",
      "Validated 837 configurations for each state, tested in development and confirmed before every production cutover",
      "A sequential go-live process applied consistently across all 28 states",
      "Two production batch runs monitored per state before proceeding to the next",
      "Full transition from a fragile proprietary format to the healthcare industry standard with no production failures",
    ]} />

    <Divider />

    {/* ── RESULTS ── */}
    <H2>Results</H2>

    <P>
      The migration was completed across all 28 states without a single
      instance of production downtime:
    </P>

    <BulletList items={[
      "Zero downtime incidents across the entire migration — every state transitioned without disruption to claims processing",
      "100% rollout success rate — no state required rollback or emergency intervention",
      "Millions of dental claims continued processing uninterrupted throughout the migration period",
      "Eliminated the ongoing risk of claim rejections caused by missing or misrepresented fields in the proprietary format",
      "Reduced the risk of delayed clean claim adjudication and provider follow-up cycles going forward",
    ]} />

    <P>
      Beyond the immediate migration, the move to the 837 standard removed a
      permanent source of operational fragility. Proprietary formats are inherently
      brittle — any change on the vendor's side can create silent field mismatches
      that only surface as claim rejections downstream. The industry standard
      provides a stable, well-understood baseline that both sides of the
      integration can depend on long term.
    </P>

    <Divider />

    {/* ── REFLECTION ── */}
    <H2>What I'd Do Differently</H2>

    <H3>Build an automated validation suite per state</H3>
    <P>
      Development testing before each go-live was rigorous but largely manual.
      Building a repeatable automated validation suite — one that could run
      representative claims through the new configuration and flag field-level
      discrepancies — would have reduced per-state testing time and created a
      more reliable safety net, particularly for edge cases that are easy to miss
      in manual review.
    </P>

    <H3>Create a centralised monitoring view across all active states</H3>
    <P>
      Post-migration monitoring was handled state by state, which meant tracking
      multiple batch runs in parallel as the migration progressed. A centralised
      view showing processing status across all 28 states in real time — with
      alerts surfaced automatically for any anomalies — would have reduced the
      manual overhead of monitoring and made it easier to detect patterns across
      states if any had emerged.
    </P>

    <H3>Document the migration playbook as it ran, not after</H3>
    <P>
      The process we followed was consistent and worked well, but the formal
      documentation was assembled retrospectively. Capturing learnings from each
      state as part of the go-live checklist — in real time, not at the end —
      would have made the playbook richer and more immediately transferable to
      future migrations of a similar kind.
    </P>

    <Divider />

    {/* ── TAKEAWAYS ── */}
    <H2>Key Takeaways</H2>

    <P>
      Zero-downtime migrations at scale are achievable — but only when the work
      is designed around containment and verification rather than speed. The most
      important decision we made was treating each state as a discrete,
      independently-validated migration rather than a step in a monolithic process.
    </P>

    <BulletList items={[
      "Rolling migrations contain risk — each state's go-live is a contained experiment, not a shared risk event across the entire rollout",
      "Testing before production is non-negotiable, but monitoring after production is equally critical — the development environment can never fully replicate real-world batch volumes",
      "Industry standards exist for a reason — migrating to 837 didn't just fix this migration, it removed a permanent source of downstream fragility that would otherwise have required ongoing management",
    ]} />

  </>
);

export default UHGMigrationCaseStudy;
