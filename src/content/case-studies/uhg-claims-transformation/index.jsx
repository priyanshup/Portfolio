/**
 * content/case-studies/uhg-claims-transformation/index.jsx
 *
 * Case study: speeding up claim payments by about 20%.
 *
 * Images: put diagrams or screenshots in ./assets/, import them here and use
 * <ImageFull>. Useful ones would be the four layers as a flow and a
 * before-and-after of one claim's outcome (with no real data).
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

const UHGClaimsCaseStudy = () => (
  <>

    {/* The short version: problem, what I did, result, takeaway */}
    <Snapshot
      plain={`Healthcare claims were rejected or delayed whenever the data arrived incomplete or with typos. I designed logic that fills in what can be worked out, corrects likely typos while keeping the provider informed, and gives clear errors when it can't. Payments got about 20% faster.`}
      problem={`Empty optional fields degraded claim quality, and mistakes in required fields caused outright rejections, which triggered expensive follow-up cycles with providers and delayed payment.`}
      did={`Analysed the incoming claim data to find the patterns, then designed four layers: derive empty optional fields, catch and correct likely typos (provider notified, payment held until confirmed), recover missing required fields before rejecting, and send providers clear notifications.`}
      result={`About 20% faster payment cycles (tracked by UHG's analytics team), fewer rejections and follow-ups, and every claim ending in a defined outcome with nothing dropped silently.`}
      takeaway={`The information needed to fix most data problems already existed. What was missing was the logic, and pairing every automated fix with transparency built trust.`}
      role="Sr. Business Systems Analyst"
      team="UHG claims processing team and provider-facing operations"
      timeline="One of 4 concurrent enterprise transformation initiatives, 2019 to 2022"
      tech={["SQL", "837 Standard", "Shell"]}
    />

    <MetricRow metrics={[
      { val: "~20%", label: "Faster payment cycles" },
      { val: "M+",   label: "Claims processed with none dropped silently" },
    ]} />

    <H2>The problem</H2>

    <P>
      Healthcare claims processing depends on the quality of the data in each
      inbound claim. The 837 claims format separates mandatory fields, without
      which a claim can't be processed, from non-mandatory fields that add detail
      but aren't needed for adjudication. In practice, non-mandatory fields often
      arrived empty.
    </P>

    <P>
      Those empty fields made life harder for claims processors and end users,
      who had to decide with less context than the system should have been able
      to give them. The more expensive problem was in mandatory fields. Errors
      there, whether from provider mistakes or manual typos, caused claims to be
      rejected outright. That started costly follow-up cycles with providers and
      delayed payment.
    </P>

    <P>
      The system handled claims reactively: if the data was wrong or incomplete,
      the claim failed and the manual follow-up began. The opportunity was to
      make the system smarter: derive what could be derived, correct what could
      be corrected, and tell providers clearly about what couldn't be resolved
      automatically.
    </P>

    <Callout label="The core question" accent>
      How do we reduce claim rejections and payment delays by building
      intelligence into the claims pipeline, so the system deals with imperfect
      data itself instead of failing silently or waiting for manual intervention?
    </Callout>

    <H2>What I found</H2>

    <P>
      I started by looking at patterns in incoming claim data. Working with the
      claims processing team, I identified which non-mandatory fields were most
      often empty, which mandatory fields were most often wrong, and how fields
      in the 837 format related to each other.
    </P>

    <P>
      Many of the gaps and errors weren't random. Non-mandatory fields that
      arrived empty could often be derived from mandatory fields that were always
      present. Mandatory field errors, especially typos, often followed a
      recognisable pattern when compared with historical data from the same
      provider. The system was failing on data that could be recovered with the
      right logic.
    </P>

    <Callout label="The insight">
      Most claim failures came from missing logic for handling imperfect data.
      The information needed to fix many of them already existed in the claim or
      in historical records, and nothing was using it.
    </Callout>

    <H2>How I approached it</H2>

    <P>
      I designed and built four layers of claims intelligence, each aimed at a
      different kind of data problem, from enriching incomplete claims to
      recovering claims that would otherwise be rejected.
    </P>

    <ProcessFlow steps={[
      "Derive non-mandatory fields",
      "Cross-check fields and correct typos",
      "Recover missing mandatory fields",
      "Notify providers",
    ]} />

    <H3>1. Derive non-mandatory fields</H3>
    <P>
      For non-mandatory fields that often arrived empty, I wrote logic to derive
      their values from mandatory fields that were always there. The rules relied
      on field relationships and known combinations documented in the 837
      standard.
    </P>
    <P>
      Claims processors and users then saw more complete claim information
      without waiting for providers to resubmit or answer questions, and
      providers didn't have to change how they submitted.
    </P>

    <H3>2. Cross-check fields and correct typos</H3>
    <P>
      Some pairs of fields in the 837 format should hold matching or related
      values, where one implies a specific value in the other. I built
      cross-validation logic to detect discrepancies between such fields.
    </P>
    <P>
      When a discrepancy appeared and the provider's historical submissions
      pointed clearly to a typo or entry error, the system could find and apply
      the right value. The correction was logged and the provider was told, and
      payment was held until the provider confirmed. No claim was corrected
      silently.
    </P>

    <H3>3. Recover missing mandatory fields</H3>
    <P>
      When a mandatory field was missing, which would normally mean an outright
      rejection, I built logic to check whether the value could be derived from
      other fields in the claim before rejecting it. It used field relationships
      in the 837 standard and derivation rules from the claims team's domain
      knowledge.
    </P>
    <P>
      Claims where the value could be derived reliably kept processing
      automatically. Claims where it couldn't were returned to the provider, with
      specific error information that made resubmitting easy.
    </P>

    <H3>4. Notify providers</H3>
    <P>
      Every automated correction or derivation that changed a claim's data was
      reported to the provider through an automated notification, and payment for
      the affected claims was held until the provider reviewed and confirmed the
      change. Automation never ran without the provider knowing. The
      notifications gave providers a clear record of what changed and why, which
      cut the confusion that usually leads to follow-up calls.
    </P>

    <Collapsible title="What we built">

    <P>
      The result was a layer of claims intelligence inside the processing
      pipeline, covering four kinds of data problem that had needed manual work
      or ended in rejection:
    </P>

    <BulletList items={[
      "Derivation logic that fills empty non-mandatory fields from existing mandatory data, using documented field relationships",
      "Cross-field validation and automatic typo correction, using the provider's historical data",
      "Recovery logic that tries to derive a missing mandatory field before rejecting the claim",
      "A provider notification framework: an automated alert for every correction, with payment held until the provider confirms",
      "Clear, specific error messages for claims that can't be resolved, so resubmitting is straightforward",
    ]} />

    <P>
      Every claim ended in a defined outcome: processed normally, enriched and
      continued, corrected with the provider notified, or returned with specific
      error information. Nothing fell through silently.
    </P>
    </Collapsible>

    <H2>Results</H2>

    <P>
      UHG's analytics team measured the effect over the period after deployment:
    </P>

    <BulletList items={[
      "Payment cycles got about 20% faster. Fewer rejections and quicker resolution of data issues shortened the time from claim submission to payment.",
      "Claim rejections caused by missing or incorrect non-mandatory fields fell significantly.",
      "Provider follow-up cycles dropped. Automated corrections with clear notifications replaced many manual back-and-forth exchanges.",
      "Claims processors and end users saw more complete claim information by default.",
    ]} />

    <P>
      The bigger change was in how the system treated imperfect data. It no
      longer failed on any deviation from perfect input. It separated what it
      could handle automatically, what it could handle with provider
      confirmation, and what needed resubmission. Applying that consistently at
      scale is where the payment improvement came from.
    </P>

    <Collapsible title="What I'd do differently">

    <H3>Feed correction outcomes back into the rules</H3>
    <P>
      The derivation and correction logic used known field relationships and
      historical data, and it stayed static after deployment. A feedback loop
      that tracked how accurate the automated corrections were, and used that to
      refine the rules, would have made the system more accurate over time.
    </P>

    <H3>Show processors what the layer is doing</H3>
    <P>
      Providers were told about derivations and corrections, but claims
      processors only saw the end result. A real-time audit view showing which
      fields were derived, which were corrected and why would have given
      processors more confidence and made edge-case review much faster.
    </P>

    <H3>Track how well providers resubmit</H3>
    <P>
      The clear error messages for unresolvable claims were meant to improve
      resubmissions, but we had no structured way to measure whether they did.
      Tracking resubmission accuracy per provider over time would have shown
      whether the messages worked and which providers needed more support or
      guidance on the format.
    </P>
    </Collapsible>

    <H2>What I took from it</H2>

    <P>
      The biggest shift was moving from pass/fail processing to treating data
      quality as a spectrum, with a different response at each level of
      recoverability. The pipeline stopped failing on any deviation from perfect
      input and started deciding between what could be fixed, what could be
      corrected, and what really had to be resubmitted.
    </P>

    <BulletList items={[
      "The information needed to fix most data quality problems already exists in the system. What's usually missing is the logic to use it.",
      "Automation without transparency erodes trust. Telling the provider about every automated correction made the system more trustworthy as well as more efficient.",
      "Clear error messages at the point of rejection pay off. A provider who understands exactly why a claim failed resubmits correctly the first time, which shortens the whole follow-up cycle.",
    ]} />

  </>
);

export default UHGClaimsCaseStudy;
