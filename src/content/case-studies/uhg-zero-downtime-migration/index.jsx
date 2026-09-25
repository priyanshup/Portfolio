/**
 * content/case-studies/uhg-zero-downtime-migration/index.jsx
 *
 * Case study: migrating 28 states to the 837 claims format with zero downtime.
 *
 * Images: put diagrams or screenshots in ./assets/, import them here and use
 * <ImageFull>. Useful ones would be a field-mapping example (with no real
 * data) and the rollout sequence.
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

const UHGMigrationCaseStudy = () => (
  <>

    {/* The short version: problem, what I did, result, takeaway */}
    <Snapshot
      plain={`A dental claims vendor sent its claims in its own private format, and that kept causing rejections. I moved all 28 states to the industry-standard format one at a time, without any downtime.`}
      problem={`The vendor's proprietary claims format carried a permanent risk of missing or misrepresented fields. Those caused claim rejections and delayed payments, and the migration had to cause zero disruption to live processing.`}
      did={`Mapped every field in each state to the 837 standard, migrated state by state so risk stayed contained, tested each state in development first, and watched the first two production batch runs before starting the next.`}
      result={`Zero downtime incidents and no rollbacks across all 28 states. Millions of claims kept flowing during the migration, and a lasting source of rejection risk is gone.`}
      takeaway={`Plan zero-downtime migrations around containment and checking, and treat each state as its own migration.`}
      role="Sr. Business Systems Analyst"
      team="March Vision's technical team and UHG's internal claims processing team"
      timeline="Sequential rollout, one state at a time, alphabetically, across all 28 states"
      tech={["SQL", "Shell", "Java", "837 Standard"]}
    />

    <MetricRow metrics={[
      { val: "0",    label: "Downtime incidents" },
      { val: "28",   label: "States migrated" },
      { val: "100%", label: "Rollout success rate" },
      { val: "M+",   label: "Claims processed without interruption" },
    ]} />

    <H2>The problem</H2>

    <P>
      UnitedHealth Group was bringing March Vision, a dental claims vendor
      operating in 28 US states, onto its claims processing systems. March Vision
      sent claims in a proprietary file format specific to its own systems. That
      format could leave out or misrepresent fields needed for clean claim
      adjudication.
    </P>

    <P>
      The goal was to move all 28 states to the healthcare industry standard, the
      837 inbound claims format. The reason was risk. Any missing critical field
      in the proprietary format triggered a claim rejection, which started a
      follow-up cycle with the provider, delayed payment and added operational
      work.
    </P>

    <P>
      One constraint couldn't be traded away: no disruption to claims processing.
      A single state going down during the transition would delay claim
      adjudication for members and providers there, and for UHG's commitments in
      that state.
    </P>

    <Callout label="The core question" accent>
      How do you migrate 28 independently configured states from a proprietary
      claims format to an industry standard, one at a time, with no production
      downtime?
    </Callout>

    <H2>What I found</H2>

    <P>
      Before any migration work, I needed to understand both formats in detail
      and, above all, how they differed across the 28 states. March Vision's
      format wasn't uniform. Each state had its own configuration rules, field
      mappings and edge cases, and each had to be accounted for before anything
      moved.
    </P>

    <P>
      I worked with March Vision's technical team and UHG's internal claims
      processing team to document the proprietary field structure for each
      state. Then I mapped every field to its 837 equivalent, or noted where no
      direct equivalent existed and a derivation rule was needed.
    </P>

    <Callout label="The insight">
      This was really 28 separate migrations, each with its own field mappings
      and edge cases. Treating it as one big change would have been the quickest
      way to production failures. The only safe route was to understand and
      check each state on its own.
    </Callout>

    <H2>How I approached it</H2>

    <P>
      The strategy came down to three principles: understand each state before
      touching it, test before going live, and monitor closely after go-live
      before moving to the next state.
    </P>

    <ProcessFlow steps={[
      "Map each state's format",
      "Migrate state by state",
      "Test in development first",
      "Monitor after go-live",
    ]} />

    <H3>1. Map each state's format</H3>
    <P>
      For each state I mapped March Vision's proprietary fields to the 837
      inbound claims format. That meant documenting every proprietary field,
      finding its 837 equivalent, and writing derivation logic for fields with no
      direct counterpart. State-specific rules and edge cases were recorded
      before migration work started, and no state moved on until its mapping had
      been documented and reviewed.
    </P>

    <H3>2. Migrate state by state, alphabetically</H3>
    <P>
      A simultaneous cutover for all 28 states would have concentrated all the
      risk in one event, so I ran a rolling migration, one state at a time,
      starting alphabetically. That kept risk to one state at once and let what
      we learned from early states shape the later ones. Each state was an
      independent go-live with its own validation checklist, even though the
      process was the same throughout.
    </P>

    <H3>3. Test in development before every cutover</H3>
    <P>
      Before a state moved to production, I ran its new 837 configuration in a
      development environment using representative claims data from that state.
      I was checking that the mapping was correct, that no fields were lost or
      misrepresented, and that the output was clean enough to pass through the
      claims pipeline without errors. A state only went to production once
      development showed clean output.
    </P>

    <H3>4. Monitor after go-live</H3>
    <P>
      I kept watching each state after it went live: the first two production
      batch runs, to confirm claims were processing correctly at scale and not
      only in development testing. The next state started once both runs were
      stable.
    </P>

    <Collapsible title="What we built">

    <P>
      The main deliverable was a complete, verified migration from the
      proprietary format to the industry standard in all 28 states. It also
      produced a repeatable process that kept 28 separate configurations
      organised and checkable.
    </P>

    <BulletList items={[
      "Format mapping specifications for all 28 states, documenting every field translation and derivation rule",
      "A validated 837 configuration for each state, tested in development and confirmed before each production cutover",
      "A sequential go-live process, applied the same way in every state",
      "Two production batch runs monitored per state before moving on",
      "A full move from a fragile proprietary format to the industry standard, with no production failures",
    ]} />
    </Collapsible>

    <H2>Results</H2>

    <P>
      All 28 states were migrated without a single production downtime incident:
    </P>

    <BulletList items={[
      "Zero downtime incidents. Every state moved without disrupting claims processing.",
      "100% rollout success. No state needed a rollback or an emergency fix.",
      "Millions of dental claims kept processing throughout the migration.",
      "The ongoing risk of rejections caused by missing or misrepresented fields in the proprietary format is gone.",
      "Lower risk of delayed clean-claim adjudication and provider follow-ups from here on.",
    ]} />

    <P>
      The move also removed a lasting source of fragility. Proprietary formats
      are brittle: a change on the vendor's side can create silent field
      mismatches that only show up later as rejected claims. The industry
      standard gives both sides of the integration a stable, well-understood
      baseline.
    </P>

    <Collapsible title="What I'd do differently">

    <H3>Automate validation for each state</H3>
    <P>
      Development testing before each go-live was thorough but mostly manual. A
      repeatable automated suite that ran representative claims through the new
      configuration and flagged field-level differences would have cut testing
      time per state and caught edge cases that are easy to miss by hand.
    </P>

    <H3>Build one monitoring view for all active states</H3>
    <P>
      I tracked post-migration batch runs state by state, which meant following
      several in parallel as the migration went on. One view showing processing
      status across all 28 states in real time, with alerts for anomalies, would
      have reduced the manual effort and made patterns across states easier to
      spot.
    </P>

    <H3>Write the playbook as I went</H3>
    <P>
      The process was consistent and it worked, but I wrote the formal
      documentation afterwards. Capturing what each state taught us as part of
      the go-live checklist, in real time, would have made the playbook richer
      and easier to reuse on similar migrations.
    </P>
    </Collapsible>

    <H2>What I took from it</H2>

    <P>
      Zero-downtime migrations at scale are possible when the plan is built
      around containment and verification, with speed coming second. The most
      important decision was treating each state as its own migration.
    </P>

    <BulletList items={[
      "A rolling migration contains risk. Each go-live is a small, contained experiment.",
      "Testing before production is essential, and so is monitoring after it, because a development environment can't fully reproduce real batch volumes.",
      "Industry standards exist for good reasons. Moving to 837 fixed this migration and also removed a source of downstream fragility that would have needed ongoing management.",
    ]} />

  </>
);

export default UHGMigrationCaseStudy;
