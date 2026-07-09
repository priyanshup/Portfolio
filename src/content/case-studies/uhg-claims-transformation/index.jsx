/**
 * content/case-studies/uhg-claims-transformation/index.jsx
 *
 * Case Study: Transforming Claims at Scale —
 * Four Enterprise Initiatives That Moved Healthcare Operations Forward
 *
 * IMAGES:
 *   Drop any diagrams or flowcharts into ./assets/ and import them here.
 *
 *   assets/claims-flow-before.png  — claim lifecycle before intelligence layer
 *   assets/claims-flow-after.png   — claim lifecycle after: derive, validate, recover, notify
 *   assets/field-derivation.png    — diagram of non-mandatory field derivation logic
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
 * import claimsBeforeImg    from './assets/claims-flow-before.png';
 * import claimsAfterImg     from './assets/claims-flow-after.png';
 * import fieldDerivationImg from './assets/field-derivation.png';
 */

const UHGClaimsCaseStudy = () => (
  <>

    {/* ── AT A GLANCE — 60-second recruiter summary, always first ── */}
    <AtAGlance
      summary="Built a four-layer claims intelligence system that derives, corrects, and recovers imperfect data instead of rejecting it outright — cutting payment cycle times by ~20%."
      problem="Empty non-mandatory fields degraded claim quality, and errors in mandatory fields caused outright rejections — triggering expensive provider follow-up cycles and delayed payment."
      role="Sr. Business Systems Analyst"
      team="UHG claims processing team + provider-facing operations"
      timeline="One of 4 concurrent enterprise transformation initiatives, 2019–2022"
      primaryMetric={{ val: "~20%", label: "Faster Payment Cycles" }}
      tech={["SQL", "837 Standard", "Shell"]}
    />

    {/* ── HEADLINE METRICS ── */}
    <MetricRow metrics={[
      { val: "~20%", label: "Faster Payment Cycles" },
      { val: "M+",   label: "Claims Processed — No Silent Drops" },
    ]} />

    <Divider />

    {/* ── THE PROBLEM ── */}
    <H2>The Problem</H2>

    <P>
      Healthcare claims processing depends on the quality of the data that
      arrives in the inbound claim. The 837 claims format distinguishes between
      mandatory fields — without which a claim cannot be processed — and
      non-mandatory fields that enrich the data but are not required for
      adjudication. In practice, non-mandatory fields frequently arrived empty.
    </P>

    <P>
      Empty non-mandatory fields degraded the experience for claims processors
      and end users, who were left working with incomplete claim information and
      had to make decisions with less context than the system should have been
      able to provide. But the more operationally costly problem came from
      mandatory fields: errors in mandatory fields — whether from provider
      mistakes or manual data entry typos — caused claims to be rejected outright,
      triggering expensive follow-up cycles with providers and delaying payment.
    </P>

    <P>
      The system was processing claims reactively: if the data was wrong or
      incomplete, the claim failed and the manual follow-up cycle began.
      The opportunity was to make the system smarter — to derive what could be
      derived, correct what could be corrected, and give providers clear
      information on what genuinely could not be resolved automatically.
    </P>

    <Callout label="The Core Challenge" accent>
      How might we reduce claim rejections and payment delays by building
      intelligence directly into the claims processing pipeline — so the system
      handles imperfect data intelligently rather than failing silently or
      requiring manual intervention?
    </Callout>

    <Divider />

    {/* ── DISCOVERY ── */}
    <H2>Understanding the Data Landscape</H2>

    <P>
      The first step was understanding the patterns in the incoming claims data.
      I worked with the claims processing team to identify which non-mandatory
      fields were most frequently empty, which mandatory fields were most often
      incorrect, and what the relationship structures looked like between
      different fields in the 837 format.
    </P>

    <P>
      This analysis revealed that many of the gaps and errors were not random —
      they were predictable. Non-mandatory fields that arrived empty could often
      be derived from mandatory fields that were always present. Mandatory field
      errors, particularly typos, often showed a recognisable pattern when compared
      to historical data from the same provider. The system was failing on data
      that, with the right logic applied, was actually recoverable.
    </P>

    <Callout label="Key Insight">
      Most claim failures were not caused by genuinely missing information —
      they were caused by the absence of logic to handle imperfect data
      intelligently. The information needed to resolve many failures already
      existed in the claim or in historical records. It just wasn't being used.
    </Callout>

    <Divider />

    {/* ── APPROACH ── */}
    <H2>My Approach</H2>

    <P>
      I designed and built four distinct layers of claims intelligence, each
      addressing a different class of data problem — from enriching incomplete
      claims to recovering potentially rejectable ones.
    </P>

    <ProcessFlow steps={[
      "Non-Mandatory Field Derivation",
      "Cross-Field Validation & Typo Correction",
      "Mandatory Field Recovery Logic",
      "Provider Notification Framework",
    ]} />

    <H3>1. Non-Mandatory Field Derivation</H3>

    <P>
      For non-mandatory fields that frequently arrived empty, I developed logic
      to derive or populate their values from existing mandatory fields that were
      always present. The derivation rules used generic field relationships and
      known combinations across the 837 format — not assumptions, but documented
      dependencies within the claims standard itself.
    </P>

    <P>
      The result was that claims processors and users saw more complete claim
      information without waiting on providers to resubmit or respond to
      information requests. Downstream visibility improved without any change
      to the provider's submission workflow.
    </P>

    {/*
      <ImageFull
        src={fieldDerivationImg}
        alt="Non-mandatory field derivation logic"
        caption="Deriving empty fields from existing mandatory data — more complete claims, no provider action required"
      />
    */}

    <H3>2. Cross-Field Validation and Typo Correction</H3>

    <P>
      Certain pairs of fields in the 837 format are expected to hold matching
      or related values — where one field implies a specific value in another.
      I built cross-validation logic that detected discrepancies between these
      related fields when the submitted values did not align.
    </P>

    <P>
      Where a discrepancy was detected and historical submission data from the
      same provider pointed clearly to a typo or manual entry error, the system
      could identify and apply the correct value automatically. The correction
      was logged and the provider was notified; payment processing was paused
      until the provider confirmed the correction. No claims were corrected
      silently — every automated change came with provider visibility.
    </P>

    <H3>3. Mandatory Field Recovery Logic</H3>

    <P>
      When a mandatory field arrived missing — which would ordinarily trigger
      an outright claim rejection — I built logic to check whether the value
      could be derived from other fields present in the claim before rejecting
      it. Field relationships within the 837 standard, and known derivation
      rules from the claims processing team's domain knowledge, were used to
      attempt recovery before the rejection path was triggered.
    </P>

    <P>
      Claims where a mandatory value could be reliably derived continued
      processing automatically. Claims where no derivation was possible were
      returned to the provider — but with clear, specific error information
      that made resubmission straightforward rather than opaque.
    </P>

    <H3>4. Provider Notification Framework</H3>

    <P>
      Every automated correction or derivation that affected a claim's data was
      surfaced to the relevant provider through an automated notification.
      Payment processing for affected claims was paused until the provider
      reviewed and confirmed the change — ensuring that automation never operated
      without provider awareness. The notification framework gave providers
      a clear record of what had been changed and why, reducing the ambiguity
      that typically generates follow-up calls.
    </P>

    <Divider />

    {/* ── WHAT WE BUILT ── */}
    <H2>What We Built</H2>

    <P>
      The result was a claims intelligence layer embedded directly in the
      processing pipeline, handling four distinct classes of data problem
      that had previously required manual intervention or resulted in outright
      rejection:
    </P>

    <BulletList items={[
      "Non-mandatory field derivation logic — populating empty fields from existing mandatory data using documented field relationships",
      "Cross-field validation and automated typo correction — detecting discrepancies and applying corrections using historical provider data",
      "Mandatory field recovery logic — attempting derivation before the rejection path, reducing rejections for recoverable claims",
      "Provider notification framework — automated alerts for every correction, with payment processing paused pending provider confirmation",
      "Clear provider-facing error messages for unresolvable claims — specific enough to make resubmission straightforward",
    ]} />

    <P>
      Every claim had a defined outcome: processed normally, enriched and
      continued, corrected with provider notification, or returned with specific
      error information. Nothing fell through silently.
    </P>

    {/*
      <ImageFull
        src={claimsAfterImg}
        alt="Claims flow after the intelligence layer"
        caption="After: four intelligent paths replaced the binary pass/fail outcome"
      />
    */}

    <Divider />

    {/* ── RESULTS ── */}
    <H2>Results</H2>

    <P>
      The impact was measured and tracked by UHG's analytics team across
      the period following deployment:
    </P>

    <BulletList items={[
      "~20% improvement in payment cycle times — fewer rejections and faster resolution of data issues reduced the time between claim submission and payment",
      "Significant reduction in claim rejections caused by missing or incorrect non-mandatory fields",
      "Reduced provider follow-up cycles — automated corrections with clear notifications replaced many of the manual back-and-forth cycles",
      "Improved experience for claims processors and end users, who now saw more complete claim information by default",
    ]} />

    <P>
      The broader impact was a shift in how the system handled imperfect data.
      Rather than treating any deviation from perfect input as a reason to fail,
      the pipeline now distinguished between what it could handle automatically,
      what it could handle with provider confirmation, and what genuinely required
      resubmission. That distinction — applied consistently at scale — was where
      the payment cycle improvement came from.
    </P>

    <Divider />

    {/* ── REFLECTION ── */}
    <H2>What I'd Do Differently</H2>

    <H3>Build a feedback loop from correction outcomes into the derivation rules</H3>
    <P>
      The derivation and correction logic was built using known field relationships
      and historical data, but it was static once deployed. Building a feedback
      mechanism that tracked the accuracy of automated corrections over time —
      and used that signal to refine derivation rules — would have made the system
      progressively more accurate rather than remaining fixed at its initial
      calibration.
    </P>

    <H3>Give claims processors visibility into the intelligence layer in real time</H3>
    <P>
      The automated derivations and corrections were surfaced to providers, but
      claims processors saw the end result rather than the intermediate steps.
      A real-time audit view showing which fields were derived, which were
      corrected, and on what basis would have given processors more confidence
      in the outputs and made edge-case review significantly faster.
    </P>

    <H3>Track provider resubmission quality over time</H3>
    <P>
      The clear error messages returned for unresolvable claims were designed to
      improve resubmission quality, but we did not have a structured way to
      measure whether they actually did. Tracking resubmission accuracy per
      provider over time would have shown us whether the error messaging was
      working and highlighted providers that needed additional support or
      format guidance.
    </P>

    <Divider />

    {/* ── TAKEAWAYS ── */}
    <H2>Key Takeaways</H2>

    <P>
      The most important shift in this project was moving from binary pass/fail
      processing to a system that treated data quality as a spectrum — with
      different responses at different levels of recoverability. That framing
      changed what was possible: instead of failing on any deviation from
      perfect input, the pipeline became a decision engine that could
      distinguish between the fixable, the correctable, and the genuinely
      unresolvable.
    </P>

    <BulletList items={[
      "The information needed to fix most data quality problems already exists in the system — the bottleneck is usually the absence of logic to apply it, not the absence of the data itself",
      "Automation without transparency creates distrust — pairing every automated correction with a provider notification made the system more trustworthy, not just more efficient",
      "Clear error messages at the rejection point compound in value — a provider who understands exactly why a claim failed resubmits correctly the first time, reducing the entire follow-up cycle",
    ]} />

  </>
);

export default UHGClaimsCaseStudy;
