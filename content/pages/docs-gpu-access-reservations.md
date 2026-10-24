---
title: "Reservations"
path: /docs/gpu-access/reservations.html
description: "From Fall 2026, every GPU session on PARASOL runs under a reservation: either a booking made ahead in the reservation app, or an on-demand lease that the…"
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/reservations/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/reservations.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/reservations/
format: html
---
<p>From Fall 2026, every GPU session on PARASOL runs under a reservation: either a
booking made ahead in the reservation app, or an on-demand lease that the
reservation system creates when a session launches without one.</p>
<h2 id="the-reservation-app">The Reservation App</h2>
<p>The reservation app is at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>. Sign in with UCSD
single sign-on. The sidebar lists these pages:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Page</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Dashboard</strong></td>
<td>Reservations for today and tomorrow, the Service Unit (SU) budget, the GPU classes the member can book, and upcoming availability</td>
</tr>
<tr>
<td><strong>New Reservation</strong></td>
<td>Book a window</td>
</tr>
<tr>
<td><strong>My Reservations</strong></td>
<td>List, cancel, extend, and adopt reservations</td>
</tr>
<tr>
<td><strong>Rates</strong></td>
<td>The SU rate of every GPU class for each hour of the week</td>
</tr>
</tbody>
</table></div>
<p>Workspace managers see further pages.
<a href="/docs/reference/managing-a-group.html">Managing a Group</a> describes them.
Members of a workspace in
researcher mode also see <strong>Group Reservations</strong>; see
<a href="#researcher-mode">Researcher Mode</a>.</p>
<p>Times in the app are Pacific time, wherever the viewer is. No time zone is shown
next to them. The booking wizard also uses Pacific time to decide which hours
have passed. Two times on the manager pages follow the viewer's browser
instead; see
<a href="/docs/reference/managing-a-group.html#viewing-the-groups-reservations">Viewing the Group's Reservations</a>.</p>
<p><a href="/docs/access/sign-in-and-session-problems.html#reservation-app-sign-in">Reservation App Sign-In</a>
covers sign-in problems, including an expired session.</p>
<h2 id="reservation-types">Reservation Types</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Type</th>
<th>Created by</th>
<th>What it costs</th>
<th>What protects it</th>
</tr>
</thead>
<tbody>
<tr>
<td>Booking</td>
<td>The member, in the reservation app, ahead of time</td>
<td>SU for the window, charged when it is booked</td>
<td>A runtime guarantee to the end of the window</td>
</tr>
<tr>
<td>On-demand lease</td>
<td>The reservation system, when a GPU session launches with no booking</td>
<td>SU for the lease, as for a booking</td>
<td>A runtime guarantee to the end of the lease</td>
</tr>
<tr>
<td>Best-effort</td>
<td>Not enabled on PARASOL</td>
<td>None</td>
<td>None</td>
</tr>
</tbody>
</table></div>
<p>A reservation guarantees access, not a running job. Nothing starts when a
booked window opens. A notebook, a shell session, or a batch job is launched in
the usual way and is admitted onto the booking. See
<a href="#the-claim-window">The Claim Window</a>.</p>
<h2 id="booking-a-window">Booking a Window</h2>
<ol>
<li>Select <strong>New Reservation</strong>.</li>
<li>On <strong>Select Group</strong>, choose the workspace. A member of only one bookable
   workspace goes straight to the next step. A workspace marked
   <strong>On-demand only</strong> cannot be booked.</li>
<li>On <strong>Select GPU Class</strong>, choose the class. Each card shows the class's SU
   rate per GPU-hour and how many GPUs are free today and tomorrow.</li>
<li>On <strong>Select Date &amp; Time</strong>, set the number of GPUs and drag across the
   timeline to choose the hours. Hours with too few free GPUs, or with no quota
   left for the workspace, are dimmed and cannot be booked. An amber strip marks
   discounted off-peak hours. The line below the timeline shows the hours and
   the SU cost. Select <strong>Next</strong>.</li>
<li>On <strong>Confirm Reservation</strong>, add notes if needed and select
   <strong>Confirm Reservation</strong>.</li>
</ol>
<p><img alt="The Select Date &amp; Time step of the booking wizard. Hourly bars across two days show how many GPUs are free, with an amber strip under the off-peak hours. Three evening hours are selected, and the line below the timeline reads 6:00 PM to 9:00 PM, 3 hours, 1 GPU, 3 SU." src="/_images/docs/reservation-wizard-date-time.png" class="img-responsive docs-figure"></p>
<p><strong>Next</strong> checks the booking against every rule before the confirm step, and a
refusal appears at the top of the page.
<a href="/docs/reference/error-messages.html#booking-refusals-in-the-reservation-app">Booking Refusals in the Reservation App</a>
lists the refusal messages and their fixes.
The server checks again on <strong>Confirm Reservation</strong>, because capacity can change
in between.</p>
<h3 id="booking-rules">Booking Rules</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Rule</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Granularity</td>
<td>Whole hours</td>
</tr>
<tr>
<td>Earliest start</td>
<td>At least 15 minutes from now. This rule is separate from the claim window</td>
</tr>
<tr>
<td>Across midnight</td>
<td>Allowed. The timeline shows the chosen day and the next, and the booking must start on the chosen day</td>
</tr>
<tr>
<td>Longest selection in the wizard</td>
<td>48 hours, for everyone. A workspace's own length cap, 12 hours by default, is shorter; see <a href="#reservation-length-caps">Reservation Length Caps</a></td>
</tr>
<tr>
<td>Changing a booking</td>
<td>Not possible before it starts: cancel it and book again. Once it has started, <a href="#extend">Extend</a> replaces it with a new booking</td>
</tr>
<tr>
<td>Back-to-back bookings</td>
<td>Allowed. A booking that starts when another ends, for the same class, number of GPUs, and workspace, extends a running session's guarantee through both. The two stay separate reservations. See <a href="/docs/gpu-access/what-ends-a-session.html#back-to-back-bookings">Back-to-Back Bookings</a></td>
</tr>
<tr>
<td>Several bookings at once</td>
<td>Allowed, including overlapping ones, within the budget and the capacity available</td>
</tr>
<tr>
<td>GPUs in use at once</td>
<td>1 per account by default, however many are booked. Using overlapping bookings together, or a booking of more than 1 GPU, needs ITS to raise the account's limit first. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a></td>
</tr>
</tbody>
</table></div>
<p>A booking's SU cost is fixed when it is made. A booking stands once it is made,
even if the workspace's quota is later reduced.</p>
<h3 id="notes-and-emails">Notes and Emails</h3>
<p>Notes on a booking are visible to the workspace's instructors, TAs, and
administrators, to teammates in <a href="#team-mode">Team Mode</a>, and to the whole
workspace in <a href="#researcher-mode">Researcher Mode</a>.</p>
<p>The <strong>Email me reservation confirmation &amp; reminders</strong> checkbox is saved to the
member's profile and applies to every reservation, not only the one being made.
Reminder emails before a booking begin mid-quarter in Fall 2026. On-demand leases
send no email.</p>
<h2 id="the-booking-horizon">The Booking Horizon</h2>
<p>In course and research workspaces alike, a booking must by default end within
10 days of the moment it is made. The horizon is rolling: at 7 PM on a Monday,
it reaches 7 PM ten days later. A booking needs no more notice than the
earliest start in <a href="#booking-rules">Booking Rules</a>. The wizard shows the
bookable range above the timeline, for example
<code>Bookable Wed, Sep 23, 2026 – Sat, Oct 3, 2026 7:00 PM</code>. Workspace managers are
not bound by the horizon when they book.</p>
<p>See also: <a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a></p>
<h2 id="reservation-length-caps">Reservation Length Caps</h2>
<p>Two caps apply to the length of one reservation. The shorter one binds.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Cap</th>
<th>Applies to</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>The workspace length cap</td>
<td>Every reservation in the workspace, by anyone, administrators included</td>
<td>12 hours by default, in course and research workspaces alike. It can be set higher on request</td>
</tr>
<tr>
<td>The member cap</td>
<td>A member's own booking</td>
<td>48 hours. Workspace managers and administrators are exempt, and <a href="#researcher-mode">Researcher Mode</a> lifts it</td>
</tr>
</tbody>
</table></div>
<p>Only cluster administrators set the workspace length cap. A workspace manager
cannot change it. Request a change by ticket to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>, stating the length needed and how
the work checkpoints. A course's cap is changed at the instructor's request,
and a research workspace's at the researcher's.</p>
<p>The wizard selects at most 48 hours for everyone. A longer booking, where the
workspace allows one, is made on the <strong>Group Reservations</strong> page, which
workspace managers and researcher-mode members can use.</p>
<p>See also: <a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a></p>
<h2 id="reservation-length-and-session-runtime">Reservation Length and Session Runtime</h2>
<p>A reservation's length and a session's runtime are separate limits. A long
booking does not by itself grant a long-running session.</p>
<p>A session, the pod a launch creates, runs for 6 hours by default and up to 12
hours where that is set at launch. See
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>.
The runtime limit applies to a session under a booking as it does to any other.
For a workaround, write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>When a session under an open booking stops at its runtime limit, start a new
one within about 30 minutes, or the rest of the booking is cancelled as a
no-show and charged. See
<a href="#relaunching-inside-a-booked-window">Relaunching Inside a Booked Window</a>.</p></div>
<p>A run that writes its progress to durable storage at intervals can be picked up
again; a single uninterruptible process cannot. See
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a>.</p>
<p>Idle culling applies to a session for its whole life, however long the
reservation behind it, and a reserved GPU that stops being used is reclaimed
like any other
(<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>).</p>
<h2 id="reservation-statuses">Reservation Statuses</h2>
<p><strong>My Reservations</strong> lists the member's own reservations and, in team mode, the
teammates'. The <strong>Status</strong> filter has three settings:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Filter</th>
<th>Shows</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Recent &amp; Upcoming</strong> (default)</td>
<td>Every reservation that has not ended and is not cancelled, and any reservation, cancelled or not, from the last 24 hours</td>
</tr>
<tr>
<td><strong>All Reservations</strong></td>
<td>Every active reservation, and cancellations that had started or were charged. A booking cancelled free of charge appears only under <strong>Cancelled</strong></td>
</tr>
<tr>
<td><strong>Cancelled</strong></td>
<td>Cancelled reservations</td>
</tr>
</tbody>
</table></div>
<p>Select <strong>Filter</strong> to apply a change. The list is ordered oldest first.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Badge</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Upcoming</strong></td>
<td>The window has not started</td>
</tr>
<tr>
<td><strong>In Progress</strong></td>
<td>The window is open now</td>
</tr>
<tr>
<td><strong>Past</strong></td>
<td>The window has ended. An on-demand lease whose job is still running also reads <strong>Past</strong>; the Dashboard lists it under <strong>Running Past Window</strong></td>
</tr>
<tr>
<td><strong>On-demand</strong></td>
<td>An on-demand lease, shown beside the status badge</td>
</tr>
<tr>
<td><strong>Superseded</strong></td>
<td>Replaced by an Extend, or by a lease merging into a booking. The job kept running</td>
</tr>
<tr>
<td><strong>Ended</strong></td>
<td>An on-demand lease whose job ended, or that was cancelled</td>
</tr>
<tr>
<td><strong>Ended early</strong></td>
<td>A booking cancelled after it started</td>
</tr>
<tr>
<td><strong>Cancelled</strong></td>
<td>A booking cancelled before it started, or cancelled as a no-show</td>
</tr>
</tbody>
</table></div>
<h2 id="launching-without-a-booking">Launching Without a Booking</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Launching an eligible GPU session without a booking creates an on-demand
lease and charges the member's Service Unit budget as a booked window would;
there is no free exploratory launch. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<p>A GPU session is given an on-demand lease when the member has no matching
booking open, or opening within 30 minutes. Every GPU session that carries a
class label qualifies. A session limited to a node with <code>-n</code>, or to a GPU model
with <code>-v</code>, is given its lease only once a node it allows has a free GPU, and is
not charged before then; see
<a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>. The
lease covers the session's declared runtime plus 10 minutes. A session that
declares no runtime is given 1 hour, so a session launched with the defaults
holds a lease of 1 hour 10 minutes. The declared
runtime is separate from the runtime limit in
<a href="#reservation-length-and-session-runtime">Reservation Length and Session Runtime</a>,
which stops the pod.</p>
<p>For a longer guarantee, launch with the defaults and use <strong>Extend</strong> in the
reservation app once the session is running. See <a href="#extend">Extend</a>.</p>
<p>A lease ends when its session ends: stopping the session cancels the lease, and
the charge is for the time used. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p>
<h3 id="the-default-workspace">The Default Workspace</h3>
<p>A lease is charged to the workspace that the pod's <code>dsmlp/course</code> label names.
<code>launch.sh -W &lt;workspace&gt;</code> sets that label. A session whose pod names no course,
such as a command-line launch without <code>-W</code>, is charged to <code>ORG_ON_DEMAND</code>, a
workspace that every user is enrolled in automatically.</p>
<p><code>ORG_ON_DEMAND</code> accepts on-demand leases only and cannot be booked. It has the
default budget and length cap. See
<a href="/docs/gpu-access/service-units-and-budgets.html#the-size-of-a-budget">The Size of a Budget</a> and
<a href="#reservation-length-caps">Reservation Length Caps</a>. A job there can keep
running after its reservation ends, with no guarantee; see
<a href="/docs/gpu-access/what-ends-a-session.html#overstay">Overstay</a>. The runtime limit still stops the
pod. Its leases appear in <strong>My Reservations</strong> like any other.</p>
<h3 id="availability-and-denied-leases">Availability and Denied Leases</h3>
<p>A lease is refused when the class has no free GPU, the workspace holds its GPU
limit for the class, or the budget cannot cover it. The pod then stays
<code>Pending</code> with an <code>OnDemandLeaseDenied</code> event, and the request is retried until
it succeeds or the pod is deleted. The event says whether waiting can help. A
lease can also be refused for the request itself, such as a class the workspace
was not granted, and waiting does not change that. The pod stays <code>Pending</code> until
it is deleted and launched again with the request corrected, or until an
administrator changes the setting that refused it. Nothing fails the pod or
deletes it. Datahub shows the event while the session is starting. See
<a href="/docs/gpu-access/quotas-and-availability.html#waiting-for-an-on-demand-lease">Waiting for an On-Demand Lease</a>
and <a href="/docs/reference/reservation-events.html">Reservation Events</a>.</p>
<h2 id="choosing-between-booking-and-launching">Choosing Between Booking and Launching</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Situation</th>
<th>Route</th>
</tr>
</thead>
<tbody>
<tr>
<td>A GPU is needed at a set time, such as Thursday evening</td>
<td>Book a window</td>
</tr>
<tr>
<td>A short experiment, now, at 11am</td>
<td>Launch without a booking. Daytime capacity is generally idle</td>
</tr>
<tr>
<td>A run of several hours</td>
<td>Book a window within <a href="#reservation-length-caps">Reservation Length Caps</a>, or launch and then <a href="#extend">Extend</a></td>
</tr>
<tr>
<td>Work whose answer is not needed today, done cheaply</td>
<td>Run it off-peak; see <a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a></td>
</tr>
</tbody>
</table></div>
<h2 id="the-claim-window">The Claim Window</h2>
<p>A booked window must be claimed within 15 minutes of its start. A booking is
claimed when a matching session is waiting for it or running under it. There is
no confirmation step and no control that selects a booking: the reservation
system matches a session to a booking by itself.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>If no matching session is waiting or running 15 minutes after the start, the
booking is cancelled as a no-show and charged, and the capacity returns to the
pool. A command-line launch without <code>-W</code> never matches a course booking. A
session started after the no-show matches nothing and is given an on-demand
lease, charged separately. See
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>.</p></div>
<p>The claim window is measured from the start of a window already held. It does
not govern how far ahead a booking may be made.</p>
<h3 id="claiming-a-booking">Claiming a Booking</h3>
<p>A session claims a booking when all of these hold:</p>
<ul>
<li>The pod runs in the member's own namespace, as every launch does.</li>
<li>Its <code>gpu-class</code> label is the class booked.</li>
<li>Its <code>dsmlp/course</code> label names the workspace the booking was made under.
  <code>launch.sh -W &lt;workspace&gt;</code> sets the label.</li>
<li>It asks for no more GPUs than are free in the booking.</li>
</ul>
<p>Where several bookings match, the one that starts soonest and has room is used.
Two bookings are never combined for one pod.</p>
<p>A session that does not match does not claim the booking. It is given an
on-demand lease, charged separately, and the booking is cancelled as a no-show
if nothing else claims it. A pod that names no course, such as one launched
without <code>-W</code>, is treated as belonging to <code>ORG_ON_DEMAND</code>, so it never claims a
course booking. <code>kubectl describe pod</code> lists a pod's labels.</p>
<h3 id="launching-before-the-window-opens">Launching Before the Window Opens</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Session started</th>
<th>What happens</th>
</tr>
</thead>
<tbody>
<tr>
<td>Up to 30 minutes before the start</td>
<td>The pod waits, with a <code>WaitingForReservation</code> event, and is admitted within about 5 minutes of the opening. The waiting pod claims the booking</td>
</tr>
<tr>
<td>Earlier</td>
<td>The session starts on an on-demand lease and is charged for it. When the booking opens, the session moves onto the booking with a <code>ReservationRelinked</code> event, and the lease is retired without penalty. The charge is for the early time only</td>
</tr>
</tbody>
</table></div>
<h3 id="relaunching-inside-a-booked-window">Relaunching Inside a Booked Window</h3>
<p>When the last session under an open booking ends, start another matching
session within about 30 minutes. Otherwise the rest of the booking is cancelled
as a no-show and charged. This applies however the session ended: idle culling,
the runtime limit, the job finishing, or a manual stop. A long break with the
session stopped can therefore cost the rest of a booking. Cancel the rest of a
booking that will not be used.</p>
<h2 id="planning-a-long-window">Planning a Long Window</h2>
<p>Book the GPU class the work needs rather than the largest one available.
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> covers class selection.
<a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a> covers booking costs.</p>
<p>Unused time can be released by cancelling the rest of the booking. Releasing it
is not always free: the charge depends on how much of the booking was used and
how much remains. See
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>.</p>
<h2 id="continue-extend--adopt">Continue, Extend &amp; Adopt</h2>
<p><strong>Extend</strong> is the reservation app's name for the operation the reservation
system's interface calls "continue". The two names mean one operation. <strong>Adopt</strong>
belongs to team mode.</p>
<h3 id="extend">Extend</h3>
<p>Extend keeps a running job protected for longer. On <strong>My Reservations</strong> or the
<strong>Dashboard</strong>, select <strong>Extend</strong> on the job's reservation, choose how much time
to add under <strong>Extend by</strong>, and select <strong>Extend</strong>.</p>
<ul>
<li>Extend adds 1, 2, 4, 8, or 24 hours after the end of the job's reservation,
  or after the current time if that end has passed. Each choice shows the new
  end time and an SU estimate for the added time.</li>
<li>Extend starts a new booking now that runs to the new end, and moves the
  running job onto it. A reservation that still has time left is marked
  <strong>Superseded</strong> and charged only for the time used, with no penalty, so the
  net charge is for the added time.</li>
<li>The new booking is charged when it is made. The estimate in the dialog is at
  the full rate and does not include off-peak discounts.</li>
<li>Extend is offered on a booking that is in progress, and on an on-demand lease
  during or after its window. Only the job's owner sees <strong>Extend</strong>. A teammate
  cannot Extend another member's job.</li>
<li>The workspace length cap applies to the whole new booking, from now to the new
  end, so the time left on the old reservation counts toward it. A workspace
  with the default cap refuses 24 hours. The 48-hour member cap does not apply.</li>
<li>Extend cannot shorten a reservation. The reservation system refuses a new end
  earlier than the current one, and leaves the reservation unchanged.</li>
<li>Extend can be refused for capacity or budget. A refused Extend changes nothing.</li>
</ul>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>An Extended reservation is a booking, and a booking is not released when its
job ends. Cancel it when the job finishes. Otherwise it is cancelled as a
no-show about 30 minutes later. Either way, the unused time is charged on the
scale in
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>.</p></div>
<h3 id="adopt">Adopt</h3>
<p>In team mode, a teammate's booking that has not ended shows <strong>Adopt</strong> on
<strong>My Reservations</strong>. Adopting it transfers the booking to the adopter, and it
then runs under the adopter's namespace. Adopting a booking that is in progress
deletes the teammate's running pod, which records a <code>ReservationReassigned</code>
event.</p>
<h2 id="routes-to-more-time">Routes to More Time</h2>
<p>Book the full time the work requires at the outset, within the workspace length
cap, or <a href="#extend">Extend</a> a running job. A run that checkpoints can resume from
disk after a window ends. See
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a>.</p>
<h3 id="running-past-the-window">Running Past the Window</h3>
<p>There is no hard kill when a window closes. Past the window, the session keeps
running and draws no Service Units, but it is no longer protected: it can be
stopped when a booking needs its GPU, or to keep part of the class free. See
<a href="/docs/gpu-access/what-ends-a-session.html#overstay">Overstay</a> and
<a href="/docs/gpu-access/what-ends-a-session.html#the-countdown">The Countdown</a>.</p>
<h3 id="bookings-by-a-workspace-manager">Bookings by a Workspace Manager</h3>
<p>In a course, students book their own windows. An instructor, TA, or PI can
book on a member's behalf when the member cannot, such as when the member's
budget is spent or the window is beyond the booking horizon. The booking is
charged to the member's budget. The manager skips only the check that the member
can afford it, so the booking can leave the member at or over budget, which
blocks the member's own bookings and on-demand leases until the budget window
renews. The workspace length cap applies to a manager's booking as to any
other. See <a href="/docs/reference/managing-a-group.html">Managing a Group</a>.</p>
<h2 id="best-effort-reservations">Best-Effort Reservations</h2>
<p>Best-effort admission, which runs a session with no runtime guarantee and no
charge, is not enabled on PARASOL. A pod that asks for it is admitted on an
ordinary on-demand lease and charged for it, and records an <code>AnnotationIgnored</code>
event. Best-effort reservations do not appear in the reservation app.</p>
<h2 id="team-mode">Team Mode</h2>
<p>A workspace can run in team mode. Teams come from the course roster.</p>
<ul>
<li>The SU budget is a ceiling for the whole team rather than for each member.
  The Dashboard shows it as <strong>Team budget</strong>.</li>
<li>Teammates see one another's reservations on <strong>My Reservations</strong> and the
  Dashboard, and can cancel them and <a href="#adopt">Adopt</a> them.</li>
<li>A teammate cannot Extend another member's job.</li>
<li>A penalty from a teammate's cancellation cannot be waived at the time of the
  cancellation. A workspace manager can waive it afterwards; see
  <a href="/docs/gpu-access/service-units-and-budgets.html#having-a-charge-waived">Having a Charge Waived</a>.</li>
</ul>
<h3 id="team-data-and-the--g-flag">Team Data and the <code>-G</code> Flag</h3>
<p>The <code>launch.sh -G</code> flag controls which team data is visible, not reservations.
<code>-G list</code> prints the teams an account belongs to, and <code>-G &lt;teamid&gt;</code> launches
with that team's data visible under <code>teams/</code>. No connection between this flag
and team mode in the reservation system is documented.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#sections-teams-and-group-data">Sections, Teams and Group Data</a>
describes team data.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><code>-g</code> is the GPU count and <code>-G</code> is the group flag: <code>-g 1</code> asks for one GPU,
and <code>-G 1</code> does not. See
<a href="/docs/running-jobs/launch-sh-reference.html#resource-and-gpu-selection-flags">Resource and GPU Selection Flags</a>.<p></p></div>
<h2 id="researcher-mode">Researcher Mode</h2>
<p>In a workspace in researcher mode, every member can see every reservation in the
workspace, with usernames and notes, on the <strong>Group Reservations</strong> page. A member
can book for themselves past 48 hours with that page's <strong>New Reservation</strong> form,
up to the workspace length cap. A member cannot cancel or change another
member's reservation. Every other rule still applies: the budget, the booking
horizon, the workspace's active dates, the length cap, and the GPU limits.</p>
<h2 id="what-governs-how-much-is-held">What Governs How Much Is Held</h2>
<p>A workspace has a quota per GPU class, the most of that class the whole
workspace may hold at once
(<a href="/docs/gpu-access/quotas-and-availability.html">Quotas, Cohorts &amp; Availability</a>). Separately,
each member has a Service Unit budget that meters the member's own share
(<a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>).</p>
<p>A workspace quota is not a hard ceiling; the conditions for exceeding it are in
<a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a>.
Availability can also read zero while a workspace still has headroom under its
quota. See <a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a>.</p>
