---
title: "Service Units & Budgets"
path: /docs/gpu-access/service-units-and-budgets.html
description: "From Fall 2026, GPU time on PARASOL is metered in Service Units (SU), and each workspace member has a budget of them."
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/service-units-and-budgets/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/service-units-and-budgets.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/service-units-and-budgets/
format: html
---
<p>From Fall 2026, GPU time on PARASOL is metered in Service Units (SU), and each
workspace member has a budget of them.</p>
<h2 id="what-a-service-unit-is">What a Service Unit Is</h2>
<p>A <strong>Service Unit</strong> (SU) is a usage credit for GPU time. Each GPU class carries
an hourly SU rate, and every reservation is priced from that rate. The scheme
follows the HPC allocation model: a budget of credits, drawn down as GPU time
is used and renewed on a cycle.
<a href="/docs/reference/coming-from-hpc.html">Coming from HPC</a> lists HPC terms and their
PARASOL equivalents.</p>
<p>Service Units divide capacity and are not billed. Storage is not measured in
Service Units.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
covers storage charges.</p>
<h2 id="what-spends-service-units">What Spends Service Units</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Action</th>
<th>Effect on the member's budget</th>
</tr>
</thead>
<tbody>
<tr>
<td>Booking a window</td>
<td>Spends Service Units when the booking is made, priced by the GPU class, the hours, and the number of GPUs</td>
</tr>
<tr>
<td>Launching a GPU session without a booking</td>
<td>Creates an on-demand lease and spends Service Units. See <a href="#on-demand-lease-charges">On-Demand Lease Charges</a></td>
</tr>
<tr>
<td>A window booked by an instructor, TA, or PI on the member's behalf</td>
<td>Charged to the member's budget, as if the member had booked it. See <a href="/docs/gpu-access/reservations.html#bookings-by-a-workspace-manager">Bookings by a Workspace Manager</a></td>
</tr>
<tr>
<td>Cancelling at least 24 hours before the start</td>
<td>Nothing</td>
</tr>
<tr>
<td>Cancelling later, or during the window</td>
<td>The time used, plus a share of the unused time. See <a href="#the-cancellation-penalty">The Cancellation Penalty</a></td>
</tr>
<tr>
<td>Missing a booked window</td>
<td>Charged as a cancellation at the moment the booking is declared a no-show</td>
</tr>
<tr>
<td>Running past the end of a reservation</td>
<td>Nothing. See <a href="/docs/gpu-access/what-ends-a-session.html#overstay">Overstay</a></td>
</tr>
<tr>
<td>A session with no GPU</td>
<td>Nothing. CPU-only sessions are outside the reservation system</td>
</tr>
</tbody>
</table></div>
<h2 id="on-demand-lease-charges">On-Demand Lease Charges</h2>
<p>Launching a GPU session without a booking creates an <strong>on-demand lease</strong>: a
reservation made on the spot, which draws Service Units exactly as a booked
window would. This applies whether the reservation app is ever opened.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>There is no free exploratory launch. Launching an eligible GPU session is
what authorizes the spend, and nothing prompts for confirmation.</p></div>
<p>A lease covers the session's declared runtime plus 10 minutes, and is charged
when it is granted. A session that declares no runtime is given 1 hour, so it
holds a lease of 1 hour 10 minutes. The declared runtime is separate from the
6-hour runtime limit, which stops the pod. When the session ends, the lease is
cancelled and the charge is recalculated:</p>
<ul>
<li>The time used is charged in full.</li>
<li>Unused time in the lease's first 2 hours is free.</li>
<li>Unused time after the first 2 hours is charged on the scale in
  <a href="#the-cancellation-penalty">The Cancellation Penalty</a>.</li>
</ul>
<p>A lease of 1 hour 10 minutes ends inside its first 2 hours, so it is charged for
the time used and nothing more. For example, a default launch on one <code>medium</code>
GPU at the full rate is charged about 1.17 SU when the lease is granted. If the
session stops after 40 minutes, about 0.67 SU is kept.</p>
<p>A session that runs past the end of its lease draws no further Service Units,
and is no longer protected; see <a href="/docs/gpu-access/what-ends-a-session.html#overstay">Overstay</a>. A
longer guarantee comes from <a href="/docs/gpu-access/reservations.html#extend">Extend</a>, which is a booking
and is charged like one.</p>
<ul>
<li>An unused session is charged at the same rate as a used one. The charge is
  for holding the GPU, not for the work done on it.</li>
<li>A session that stops using its GPU continues to draw Service Units until
  idle culling reclaims the GPU. Idle culling waits longer on a quiet cluster
  than on a busy one. <a href="/docs/gpu-access/what-ends-a-session.html#the-timings">The Timings</a> lists
  the thresholds.</li>
<li>A script that starts a new GPU session on each iteration, or a job restarted
  repeatedly during debugging, is charged on every launch. Nothing stops the
  repeated charges.</li>
<li>A pod left waiting for a lease starts, and is charged, whenever the lease is
  granted. See
  <a href="/docs/gpu-access/quotas-and-availability.html#waiting-for-an-on-demand-lease">Waiting for an On-Demand Lease</a>.</li>
<li>A pod limited with <code>-n</code> or <code>-v</code> to a node or GPU model that has no free GPU
  is given no lease, and is not charged, until a node it allows has one. Under
  a booking, the same pod holds the booking, which is already charged, while it
  waits. See
  <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</li>
</ul>
<h2 id="limiting-the-spend">Limiting the Spend</h2>
<p>Stop sessions that are not in use. From the browser, use
<strong>File → Hub Control Panel → Stop My Server</strong>. From a terminal, run
<code>kubectl delete pod &lt;pod-id&gt;</code>.
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>
describes the browser procedure.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Logging out does not stop a session, and closing VS Code does not release a
pod.</p></div>
<p>Request the smallest GPU class the work fits in. A larger class is not faster
for a model that fits in a smaller one, and it costs more per hour; see
<a href="#what-an-hour-costs">What an Hour Costs</a>.
<a href="/docs/gpu-access/gpu-classes.html#choosing-a-class">Choosing a Class</a> covers class selection.</p>
<p>Check the remaining balance before a long run, not after it; see
<a href="#remaining-balance">Remaining Balance</a>.</p>
<p>A booked window costs no more than an on-demand lease for the same hours.
<a href="/docs/gpu-access/reservations.html">Reservations</a> describes booking. Off-peak hours are
discounted. See <a href="#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>.</p>
<h2 id="the-size-of-a-budget">The Size of a Budget</h2>
<p>Every workspace gives each member 10 SU per week by default, in course and
research workspaces alike, and in <code>ORG_ON_DEMAND</code>, the default workspace. The
instructor or researcher can ask for a different figure.
<a href="#changing-a-budget">Changing a Budget</a> lists the routes for changing a budget.</p>
<p>At the rates in <a href="#what-an-hour-costs">What an Hour Costs</a>, 10 SU buys 10
GPU-hours of <code>medium</code> at the full rate, or 20 off-peak.</p>
<p>A budget belongs to a workspace, not to a person. A person who is a student in
one course, a TA in another, and a member of a lab holds a separate budget in
each, on that workspace's cycle. A reservation draws on the budget of the
workspace it is made under: the workspace chosen in the booking wizard, or, for
an on-demand lease, the workspace the pod's <code>dsmlp/course</code> label names.
<code>launch.sh -W</code> sets that label, and a pod that names no workspace is charged to
<code>ORG_ON_DEMAND</code>. See
<a href="/docs/gpu-access/reservations.html#the-default-workspace">The Default Workspace</a> and
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>.</p>
<h3 id="budgets-and-workspace-quotas">Budgets and Workspace Quotas</h3>
<p>A budget limits how much GPU time a member may spend. A workspace's quota
limits how many GPUs of a class the workspace may hold at once. See
<a href="/docs/gpu-access/quotas-and-availability.html">Quotas, Cohorts &amp; Availability</a>. Either can stop
a launch, for different reasons. Remaining budget does not mean a GPU is free.</p>
<p>A budget window and a workspace quota are independent. A quota can change from
week to week, for example during a deadline surge, without any change to the
budget.</p>
<h2 id="what-an-hour-costs">What an Hour Costs</h2>
<p>A reservation costs the class's rate, times the hours, times the number of GPUs.
The rates in force for Fall 2026:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Class</th>
<th>SU per GPU per hour</th>
<th>Off-peak</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>xsmall</code></td>
<td>0.25</td>
<td>0.125</td>
</tr>
<tr>
<td><code>small</code></td>
<td>0.5</td>
<td>0.25</td>
</tr>
<tr>
<td><code>medium</code></td>
<td>1</td>
<td>0.5</td>
</tr>
<tr>
<td><code>large</code></td>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td><code>xlarge</code></td>
<td>4</td>
<td>2</td>
</tr>
</tbody>
</table></div>
<p>For example, 3 hours of two <code>medium</code> GPUs at the full rate costs 6 SU. The
<strong>Rates</strong> page in the reservation app is the authority on current rates; see
<a href="#the-rates-page">The Rates Page</a>. The booking wizard shows a booking's cost
before it is confirmed.</p>
<h3 id="peak--off-peak-hours">Peak &amp; Off-Peak Hours</h3>
<p>Service Unit rates are discounted by 50% in the off-peak hours, 1 AM to 4 PM
Pacific time, on every day of the week, weekends included. The peak hours run
from 4 PM to 1 AM. The discounted hours are marked on the <strong>Rates</strong> page, which
shows them for each day of the week, and by an amber strip on the booking
wizard's timeline. An off-peak window is also more likely to be available. On a
busy deadline evening there is a walk-up queue; at midday there usually is not.</p>
<p>Batch and background jobs, which run unattended, are the work most easily
moved off-peak, for example by starting them overnight. An interactive
debugging session is not easily moved.
See <a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a>.
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a> covers long
unattended runs.</p>
<p>Availability that reads zero in the evening often reads differently in the
morning, particularly for a workspace in an overcommitted cohort. See
<a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a>.</p>
<p>An off-peak booking is otherwise identical to a peak booking. The GPU hardware
is the same, and the runtime guarantee,
<a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a>, and
<a href="#the-cancellation-penalty">The Cancellation Penalty</a> apply exactly as they do
at peak.</p>
<h3 id="the-rates-page">The Rates Page</h3>
<p><strong>Rates</strong>, in the reservation app's sidebar, charts the rate of every GPU class
for each of the 168 hours of a week. Bar height is the rate; shorter amber bars
are discounted hours. Point at a bar for its exact rate, and use <strong>‹</strong> and
<strong>›</strong> to move between weeks.</p>
<p><strong>Show rate summary table</strong> lists each class's discount windows. The table can
list a discount window that does not apply in the week shown; the chart is
exact. The Rates page gives rates in <code>SU/hr</code> and the booking wizard in
<code>SU/GPU·h</code>. Both are per GPU.</p>
<h2 id="budget-windows--cadences">Budget Windows &amp; Cadences</h2>
<p>A Service Unit budget renews weekly by default, in every workspace: from
Monday 00:00 to the next Monday 00:00, Pacific time. A workspace can be given a
different window on request. The Dashboard shows the window in force; see
<a href="#anchor-modes">Anchor Modes</a>.</p>
<p>A reservation is charged wholly to the window its start falls in, however far
it runs into the next. A booking made for a later week draws on that week's
budget, not the current one's.</p>
<ul>
<li>Unused budget does not carry over to the next window.</li>
<li>No warning is sent as a budget runs low.</li>
<li>A reservation is priced when it is booked. A window that renews during a job
  does not change that price.</li>
</ul>
<p>Whether a course budget continues to renew after the instructional term is not
yet published.
<a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a>
describes access after the term.</p>
<h3 id="anchor-modes">Anchor Modes</h3>
<p>The Dashboard labels each workspace's budget with its mode:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Label</th>
<th>How the budget renews</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Weekly</strong></td>
<td>Each Monday. The default for every workspace</td>
</tr>
<tr>
<td><strong>Monthly</strong></td>
<td>On the first day of each month</td>
</tr>
<tr>
<td><strong>Quarterly</strong></td>
<td>On the first day of January, April, July, and October</td>
</tr>
<tr>
<td><strong>Rolling</strong></td>
<td>It does not renew. Only reservations that have not yet ended count, and their SU returns as each one ends</td>
</tr>
<tr>
<td><strong>Since creation</strong></td>
<td>It never renews</td>
</tr>
</tbody>
</table></div>
<h2 id="remaining-balance">Remaining Balance</h2>
<p>The <strong>SU Budget</strong> card on the reservation app's <strong>Dashboard</strong> shows one block
for each workspace that has a budget. <strong>Current Window</strong> gives the window's
first day and the day the budget renews. A bar shows the SU committed against
the budget, and a line below it gives the figures:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Figure</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Budget</strong></td>
<td>The budget for this window, including any increase an administrator has applied</td>
</tr>
<tr>
<td><strong>Used</strong></td>
<td>Reservations in this window that have ended</td>
</tr>
<tr>
<td><strong>Open</strong></td>
<td>Reservations in this window that have not yet ended</td>
</tr>
<tr>
<td><strong>Cancelled</strong></td>
<td>SU kept as cancellation penalties</td>
</tr>
<tr>
<td><strong>Remaining</strong></td>
<td>The budget, less Used, Open, and Cancelled</td>
</tr>
<tr>
<td><strong>Planned ahead</strong></td>
<td>SU booked into later windows, which draw on those windows' budgets</td>
</tr>
</tbody>
</table></div>
<p>The bar and the figure beside it leave out <strong>Cancelled</strong>, so they do not add up
to <strong>Remaining</strong> when a penalty has been kept. In team mode the block reads
<strong>Team budget</strong>, and a workspace with a pool shows a <strong>Group pool</strong> row. An
increase an administrator applies changes <strong>Budget</strong> without any other notice.</p>
<p>The booking wizard also shows a budget meter above its timeline. There, "used"
means everything charged to that window: ended, open, and kept penalties.</p>
<h2 id="the-group-pool">The Group Pool</h2>
<p>A workspace may hold a pool budget alongside its members' own budgets. A
reservation draws on both. The pool also limits workspace managers, and can
refuse a booking when the member's own budget still has room. Pool budgets are
expected to be uncommon in course workspaces. The PI of a research group can
state whether the group has one configured.</p>
<h2 id="changing-a-budget">Changing a Budget</h2>
<p>Budgets are set administratively. A workspace manager (an instructor, TA, or
PI) may not edit any budget, including that of the workspace they manage.
<a href="/docs/reference/managing-a-group.html">Managing a Group</a> lists manager privileges.</p>
<p>To change a budget, the manager requests it by ticket to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>, stating the workspace, what the
work is, and the date by which it matters.
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>
describes the request format.</p>
<p>A booking a manager makes on a member's behalf does not add to the member's
budget. It is charged to the member.</p>
<h2 id="the-cancellation-penalty">The Cancellation Penalty</h2>
<p>Cancelling a booking at least 24 hours before its start costs nothing. Any other
cancellation keeps part of the booking's cost:</p>
<ol>
<li>The time already used is charged in full.</li>
<li>The unused time that falls within the next 24 hours is counted. Unused time
   beyond that is free.</li>
<li>An exemption of half the used and counted time together, at most 8 hours, is
   free.</li>
<li>If the counted time is no more than the exemption, nothing more is charged.
   Otherwise the charge is the cost of the counted time, multiplied by the
   counted time less the exemption, divided by the counted time.</li>
</ol>
<p>The counted time is priced at the rates of the hours it covers, off-peak
discounts included. Examples on one <code>medium</code> GPU at the full rate, where 1 SU is
one hour:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Situation</th>
<th>SU kept</th>
</tr>
</thead>
<tbody>
<tr>
<td>Any booking, cancelled 24 hours or more before its start</td>
<td>0</td>
</tr>
<tr>
<td>A 4-hour booking, cancelled 1 hour before its start</td>
<td>2</td>
</tr>
<tr>
<td>A 12-hour booking, cancelled 1 hour before its start</td>
<td>6</td>
</tr>
<tr>
<td>A 12-hour booking, cancelled 20 hours before its start</td>
<td>2: only 4 of its hours fall within the next 24</td>
</tr>
<tr>
<td>A 24-hour booking, cancelled at its start</td>
<td>16</td>
</tr>
<tr>
<td>A 12-hour booking, cancelled 6 hours in</td>
<td>6, the time used</td>
</tr>
<tr>
<td>A 12-hour booking, cancelled 2 hours in</td>
<td>6: 2 used and 4 of penalty</td>
</tr>
<tr>
<td>A 48-hour booking, cancelled 10 hours in</td>
<td>26: 10 used and 16 of penalty</td>
</tr>
</tbody>
</table></div>
<p>Two consequences follow. A booking cancelled before it starts keeps half the
cost of its hours that fall within the next 24 hours; where more than 16 of its
hours fall in that span, it keeps all but 8 hours' worth of them. Handing back
the rest of a booking in progress is free only when the rest is no longer than
the time already used, and no more than 8 hours.</p>
<p>A no-show is charged on the same scale, at the moment the booking is declared a
no-show; see <a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a>. An on-demand
lease is charged on the same scale, except that unused time in its first 2 hours
is free; see <a href="#on-demand-lease-charges">On-Demand Lease Charges</a>.</p>
<p>A kept penalty appears on the Dashboard as <strong>Cancelled</strong> and counts against the
budget window until the window renews. A waiver frees it at once. Penalties are
assessed in Service Units. No money is billed.</p>
<h3 id="cancelling-a-booking">Cancelling a Booking</h3>
<p>On <strong>My Reservations</strong>, select <strong>Cancel</strong> on the reservation. The dialog states
what the cancellation will cost:</p>
<ul>
<li>For a booking that starts within 24 hours:
  <code>Late cancellation: X SU will be charged for reserved hours within the next 24 h (part is exempt).</code>
  When the cancellation costs nothing, no notice appears. When the app
  cannot work out the charge, the notice reads
  <code>Late cancellation: an SU penalty may apply for reserved hours within the next 24 h.</code></li>
<li>For a booking in progress: <code>You will be credited X SU.</code>, and a warning that
  pods running under the booking will be stopped.</li>
<li>For a booking more than 24 hours away: no notice, because nothing is charged.</li>
</ul>
<p>Select <strong>Yes, Cancel</strong> to confirm. Cancelling a booking in progress deletes the
sessions running under it; see
<a href="/docs/reference/reservation-events.html#reservationcancelled"><code>ReservationCancelled</code></a>.</p>
<h3 id="cancelling-in-advance">Cancelling in Advance</h3>
<p>A booking cancelled at least 24 hours before its start costs nothing, and the
capacity returns to the pool. Release a window as soon as it is known that it
will not be used.</p>
<h3 id="having-a-charge-waived">Having a Charge Waived</h3>
<p>A workspace manager may waive a penalty: for a course, the instructor or TA; for
a lab, the PI. Waiver requests go to the manager. A member cannot waive a
penalty on their own cancellation.</p>
<p>A manager waives a penalty when cancelling a member's booking, with <strong>Waive this
penalty</strong>, or afterwards, with the waive button on the cancelled reservation on
<strong>Group Reservations</strong>. A penalty from a teammate's cancellation in team mode is
waived afterwards in the same way. A manager's waiver clears the member's share
of the penalty. Where the workspace has a pool, only an administrator clears the
pool's share. See <a href="#the-group-pool">The Group Pool</a>.</p>
<p>A waiver is a judgment about circumstances, such as an illness, a booking made
on a member's behalf at the wrong hour, or a cluster problem during the window.
It is not an automatic remedy for a forgotten booking.</p>
<p>Researchers working outside a course have no manager to ask. Where a penalty
was assessed in circumstances that warrant relief, write to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> and describe what happened.</p>
<h2 id="when-a-budget-runs-out">When a Budget Runs Out</h2>
<p>A spent budget blocks the member's bookings and on-demand leases until the
window renews. A pending GPU session waits with an <code>OnDemandLeaseDenied</code> event
that quotes the budget and names the time it renews; see
<a href="/docs/reference/reservation-events.html#ondemandleasedenied">Reservation Events</a>.</p>
<p>A budget on the default weekly window renews each Monday. In a course, the
instructor or TA can request an increase by ticket. See
<a href="#changing-a-budget">Changing a Budget</a>. A booking the instructor or TA makes on
the member's behalf is charged to the member, so it does not help.</p>
<p>In a research workspace, write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>,
naming the work and the date by which it must be done. Where the deadline
permits, waiting for the budget window to renew is also an option. See
<a href="#budget-windows--cadences">Budget Windows &amp; Cadences</a>.</p>
