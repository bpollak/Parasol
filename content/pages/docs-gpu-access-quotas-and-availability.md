---
title: "Quotas, Cohorts & Availability"
path: /docs/gpu-access/quotas-and-availability.html
description: "Use this page when a GPU launch waits, or when the reservation calendar offers nothing although your workspace has quota to spare."
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/quotas-and-availability/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/quotas-and-availability.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/quotas-and-availability/
format: html
---
<p>Use this page when a GPU launch waits, or when the reservation calendar offers
nothing although your workspace has quota to spare. Find out which capacity
limit applies and how to get more GPU capacity.</p>
<h2 id="what-a-quota-is">What a Quota Is</h2>
<p>A <strong>quota</strong> is the maximum number of GPUs of each class that a workspace may
hold at one time. A quota is not a reservation of hardware, not an individual
allowance, and not a Service Unit budget.</p>
<p>The quota belongs to the workspace, not to the member. Every member of a course
or lab draws on the same ceiling. A launch refused because the workspace is at
its limit means that other members hold the capacity. The quota sets how much
capacity the workspace has, and Service Units divide it fairly between members.
See <a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>.</p>
<p>Quotas are set per GPU class. A workspace at its <code>medium</code> limit may still have
<code>small</code> headroom. A workspace is granted particular classes, and a request for a
class it was not granted is refused whatever is idle. Spare capacity in one
class cannot be lent to another, so a busy <code>medium</code> class says nothing about
<code>large</code>. <a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> describes the classes.</p>
<h2 id="date-based-quota-changes">Date-Based Quota Changes</h2>
<p>Quotas are date-aware and can be set week by week or day by day. A course's
share can be raised for the span of a project deadline and revert automatically
afterward. A lab's share can be raised the same way for a conference deadline.</p>
<p>A dated change requires the dates in advance. For courses, the quarterly survey
asks instructors and TAs about assignment scope, GPU sizes, and deadlines. The
answers allow a quota to be raised for week 9 before the surge begins.
<a href="/get-started/instructor-or-ta.html">Teaching with PARASOL</a> covers course GPU
planning.
For research workspaces, include the date in the request; see
<a href="#requesting-a-quota-increase">Requesting a Quota Increase</a>.</p>
<h2 id="borrowing-beyond-quota">Borrowing Beyond Quota</h2>
<p>Quotas are not hard ceilings, and borrowing is enabled on the cluster. A
booking or an on-demand lease may use idle capacity beyond its workspace's quota
for any hour within 12 hours of the moment it is made. Hours further ahead are
held to the quota. A group that has exhausted its share can still obtain GPUs
that would otherwise be idle.</p>
<p>Borrowing is opportunistic. A group borrows whatever capacity is idle at the
moment it asks. Once a booking or lease is admitted, the borrowed capacity is
protected like any other reservation for its full length.</p>
<p>Borrowing has two tiers, and course workspaces always hold the senior tier. The
junior tier may borrow only the capacity above a deeper reserve floor. The tier
matters only when a reservation is made, not after it is admitted. Groups that
contribute hardware to the cluster have a separate arrangement. See
<a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a>.</p>
<p>Borrowing does not raise a Service Unit budget. Borrowed GPU time is charged at
the same rate as any other.</p>
<h3 id="the-reserve-floor">The Reserve Floor</h3>
<p>ITS maintains a reserve floor of unborrowable capacity in each GPU class. Idle
capacity is therefore not always available. The status page may show free GPUs
of a class that borrowing will not release, because part of that headroom is
held back.</p>
<h2 id="cohorts">Cohorts</h2>
<p>A <strong>cohort</strong> is a group of groups. Within a cohort, the member groups' quotas
may sum to more than the physical capacity behind them. This allows each group
a higher peak than a fixed division of the hardware would. Where several groups
in a cohort peak at the same time, availability can read zero while a workspace
still has headroom; see
<a href="#zero-availability-with-headroom-remaining">Zero Availability With Headroom Remaining</a>.</p>
<p>A cohort is not a workspace. Members belong to a workspace, and that workspace
may sit in a cohort alongside groups its members never encounter.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>
describes workspaces.</p>
<p>The reservation app does not show members which cohort their workspace is in.
The word appears only in some refusals, such as
<code>Only 0 GPU(s) available for this cohort at …</code>, and on the workspace managers'
<strong>Reports</strong> and <strong>GPU Loans</strong> pages.</p>
<h3 id="zero-availability-with-headroom-remaining">Zero Availability With Headroom Remaining</h3>
<p>The reservation calendar can offer nothing even where a workspace has quota to
spare. This is not a fault. A quota is a ceiling on what a group may hold, not a
set of GPUs held aside for it. For example, a workspace whose <code>medium</code> quota is
four and which currently holds none can be offered nothing on a Thursday
evening, because the other groups in its cohort hold the hardware, as they are
entitled to.</p>
<p>The quota has not been reduced and the budget is untouched. The same request
often succeeds a few hours later. Bookings are first-come, and quota headroom
does not displace a booking that already exists. Options when nothing is
available:</p>
<ul>
<li>Book a different hour rather than a different day. Peak evening demand is the
  constraint. The same window at midday or overnight is more likely to be
  available and is cheaper under
  <a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>.</li>
<li>Request a smaller class. Classes do not share spare capacity with one
  another, so a full <code>medium</code> class says nothing about <code>small</code>.</li>
<li>Borrow inside 12 hours. Last-minute jobs may pick up capacity that is idle at
  the time, including capacity beyond the group's own quota; see
  <a href="#borrowing-beyond-quota">Borrowing Beyond Quota</a>.</li>
</ul>
<p>Overcommitment affects what can be obtained, not what is delivered. A GPU that
is obtained is held for the window at the class it was booked at. A cohort does
not make a session slower.</p>
<p>Zero availability is not an outage and does not need a ticket. A cohort that is
consistently unable to work indicates a provisioning problem. Report it to the
instructor, TA, or PI.</p>
<h3 id="cohorts-without-overcommitment">Cohorts Without Overcommitment</h3>
<p>Where a set of quotas sums to the physical capacity behind it, the members of
that cohort are guaranteed access up to their full group ceiling through to the
12-hour boundary. Zero availability with headroom remaining does not arise in
such a cohort. Where a cohort is deliberately overcommitted, the group ceiling
is a maximum rather than a guarantee.</p>
<p>The cohort holding hardware contributors is not overcommitted. A lab that
contributes hardware has group limits matching its contribution, so its own
capacity is available when it books.
<a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a> covers hardware
contribution.</p>
<h2 id="limits-that-can-stop-a-launch">Limits That Can Stop a Launch</h2>
<p>Four separate capacity limits can stop the same launch, and they fail in similar
ways.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Limit</th>
<th>What it caps</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>A single pod</td>
<td>What one container may hold</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#defaults-and-resource-tiers">Defaults and Resource Tiers</a></td>
</tr>
<tr>
<td>The namespace</td>
<td>Everything running at once</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a></td>
</tr>
<tr>
<td>The group quota</td>
<td>What the whole workspace may hold, per class</td>
<td><a href="#what-a-quota-is">What a Quota Is</a></td>
</tr>
<tr>
<td>The cohort</td>
<td>What the surrounding groups are holding at the moment</td>
<td><a href="#cohorts">Cohorts</a></td>
</tr>
</tbody>
</table></div>
<p>A Service Unit budget is a fifth limit, and it is not a capacity limit. It caps
how much GPU time a member may spend, not how many GPUs exist to spend it on.
Remaining budget does not mean a GPU is free, and a free GPU does not mean the
budget covers it.</p>
<p>A GPU quota does not cover storage. Storage quotas are a separate system with
different values; see
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>.</p>
<h2 id="when-the-cluster-is-full">When the Cluster Is Full</h2>
<p>The table lists the symptoms of a launch that cannot obtain a GPU.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td>A session takes a long time to start</td>
<td>The request is waiting for capacity. It has not failed.</td>
</tr>
<tr>
<td>An <code>OnDemandLeaseDenied</code> event</td>
<td>The on-demand lease the launch asked for was refused. The pod waits, and the request is retried. The event says whether waiting can help. See <a href="#waiting-for-an-on-demand-lease">Waiting for an On-Demand Lease</a>.</td>
</tr>
<tr>
<td>The same event on Datahub</td>
<td>Datahub shows the pod's events while a session is starting, including <code>OnDemandLeaseDenied</code>.</td>
</tr>
<tr>
<td>An <code>OnDemandAdmissionPaused</code> event</td>
<td>On-demand admission is paused for the whole class, for example while its nodes are down. Leave the pod in place.</td>
</tr>
<tr>
<td>A <code>WaitingForNode</code> event</td>
<td>The pod was launched with <code>-n</code> or <code>-v</code>, and no node it allows has a free GPU. No lease is requested, and nothing is charged, until one does. See <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</td>
</tr>
<tr>
<td>A GPU class shows no availability for a date</td>
<td>The class is fully booked, or capacity has been withdrawn for maintenance. See <a href="/docs/gpu-access/what-ends-a-session.html#maintenance-closures">Maintenance Closures</a>.</td>
</tr>
<tr>
<td>A <code>FailedScheduling</code> event from the scheduler</td>
<td>Normal for every GPU pod that has not yet been admitted. Read the reservation events beside it. See <a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.</td>
</tr>
</tbody>
</table></div>
<p><a href="/docs/reference/reservation-events.html">Reservation Events</a> lists every event the
reservation system writes.</p>
<p>Zero availability does not always mean the cluster is full. Two other
conditions produce the same symptom: a request for a class the workspace was
not granted, which is refused whatever is idle, and a cohort that is fully drawn
while one of its groups still has headroom on paper. See
<a href="#what-a-quota-is">What a Quota Is</a> and
<a href="#zero-availability-with-headroom-remaining">Zero Availability With Headroom Remaining</a>.</p>
<h3 id="queue-position-and-wait-time">Queue Position and Wait Time</h3>
<p>A reservation admits a session ahead of the walk-up queue. The walk-up queue
itself is not visible: the platform reports no queue length, no queue position,
no estimated wait, and no notification as a turn approaches. A waiting launch
shows only that it is waiting.</p>
<p>The wait depends on demand and can be much longer than a few minutes. If a
launch has not obtained a GPU within 5 to 10 minutes, book a window in the
reservation app instead. A GPU needed at a particular time is obtained by
booking it through <a href="/docs/gpu-access/reservations.html">Reservations</a>.</p>
<h3 id="waiting-for-an-on-demand-lease">Waiting for an On-Demand Lease</h3>
<p>Every GPU session that carries a class label, and has no booking to wait for,
asks for an on-demand lease. The reservation system retries a refused request
for as long as the pod exists, and the <code>OnDemandLeaseDenied</code> event says whether
waiting can help:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Refusal</th>
<th>Retried</th>
</tr>
</thead>
<tbody>
<tr>
<td>Capacity or budget that can free up</td>
<td>Every 2 to 5 minutes</td>
</tr>
<tr>
<td>A refusal the reservation app expects to clear at a known time, such as a budget renewal</td>
<td>At that time, or every 30 minutes until then</td>
</tr>
<tr>
<td>A refusal of the request itself, such as a class the workspace was not granted</td>
<td>At lengthening intervals, up to every 30 minutes</td>
</tr>
</tbody>
</table></div>
<p>The request never fails outright, and nothing deletes the pod. A refusal of the
request itself does not clear by waiting: delete the pod and launch again with
the request corrected, or ask for the workspace setting that refused it to be
changed.
<a href="/docs/reference/reservation-events.html#ondemandleasedenied"><code>OnDemandLeaseDenied</code></a>
gives the event text.</p>
<p>Waiting pods are served in the order the pods were created, so deleting and
recreating a pod moves it to the back.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A forgotten pending GPU pod starts, and is charged, as soon as capacity or
budget frees up, even days later. Delete a pending pod that is no longer
wanted with <code>kubectl delete pod &lt;pod-id&gt;</code>, or stop the Datahub session.</p></div>
<h3 id="waiting-for-capacity">Waiting for Capacity</h3>
<p>A launch that carries <code>-f</code> releases its GPU when the script ends. The flag runs
the script and ends the container, so a launch that waited for a GPU holds it
only for the length of the script.
<a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a> covers the flag.</p>
<h2 id="obtaining-capacity-when-the-cluster-is-busy">Obtaining Capacity When the Cluster Is Busy</h2>
<ul>
<li>Check <a href="#the-status-page">The Status Page</a> before launching. It shows the GPU
  models on each node and how many GPUs are free. For free GPUs by class, see
  <a href="#upcoming-availability-in-the-reservation-app">Upcoming Availability in the Reservation App</a>.</li>
<li>Book a window instead of retrying. Repeated launches into a full cluster do
  not obtain a GPU, and each on-demand launch that succeeds spends Service
  Units; see
  <a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.
  A window booked a day ahead costs the same Service Units and obtains the GPU.</li>
<li>Move work off peak evening hours. Contention is concentrated in peak evening
  hours, and off-peak hours are discounted under
  <a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>.</li>
<li>Develop on CPU and train on GPU. A GPU attached to a container is unusable by
  anyone else even while it is idle. PyTorch and TensorFlow both switch between
  CPU and GPU with very little code. Developing on CPU is also the fastest route
  to a session when GPUs are scarce.</li>
<li>Stop finished sessions with <strong>File → Hub Control Panel → Stop My Server</strong> in
  the browser, or with <code>kubectl delete pod &lt;pod-id&gt;</code> from the shell.</li>
<li>Borrow idle capacity beyond the workspace quota for last-minute work; see
  <a href="#borrowing-beyond-quota">Borrowing Beyond Quota</a>.</li>
</ul>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Logging out does not stop a session. A session left running holds its GPU.
See <a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p></div>
<h2 id="the-status-page">The Status Page</h2>
<p><a href="https://datahub.ucsd.edu/hub/status">datahub.ucsd.edu/hub/status</a> is the live
view of the cluster. It lists the compute nodes, the GPU models on each node,
and how many GPUs on each node are currently free.</p>
<p>The status page can be read without signing in, so it stays available while a
Datahub sign-in is failing.
<a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a> covers
sign-in problems.</p>
<p>The current capacity of each GPU class, as the reservation system counts it, is
in the reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>; see
<a href="#upcoming-availability-in-the-reservation-app">Upcoming Availability in the Reservation App</a>.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Information</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td>GPU models</td>
<td>The hardware behind each class at the moment. A GPU is requested by class, with <code>-l gpu-class=</code>, because GPU access is granted by class. <code>-v</code> limits a session to one model within its class, and is for a session launched without a booking only. See <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</td>
</tr>
<tr>
<td>Node numbers</td>
<td>The <code>-n</code> flag takes a bare number: <code>-n 30</code>, not <code>-n n30</code>. The leading <code>n</code> shown on the status page is not part of the value. A pod pinned to a full node waits for that node rather than taking the same GPU elsewhere. Pin a node only for a session launched without a booking; see <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</td>
</tr>
<tr>
<td>Demand over the day</td>
<td>Peak evening demand is predictable and is visible on the status page.</td>
</tr>
</tbody>
</table></div>
<p>During instructional maintenance, the status page may show less hardware than
usual. This does not indicate a fault. The maintenance schedule is published under
<a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a>.</p>
<p>See also: <a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a></p>
<h3 id="upcoming-availability-in-the-reservation-app">Upcoming Availability in the Reservation App</h3>
<p>The reservation app's <strong>Dashboard</strong> carries an <strong>Upcoming Availability</strong> panel.
For each GPU class, it shows the GPUs free now and in each hour up to 12 hours
ahead, across the whole cluster. The figures leave out the reserve floor: in
<code>Free now 3/6</code>, the 6 is the capacity above the floor, not the class's size.
<strong>Show exact hourly numbers</strong> gives the figures as a table.</p>
<p>The panel does not apply a workspace's quota or cohort. The booking wizard
does, so the numbers it offers for the same hour are often lower.</p>
<h3 id="limitations-of-the-status-page">Limitations of the Status Page</h3>
<p>A GPU that the status page shows as free may still not be obtainable. The page
does not reflect any of these conditions:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Condition</th>
<th>Effect</th>
</tr>
</thead>
<tbody>
<tr>
<td>The workspace was not granted the GPU class</td>
<td>A class the workspace was not granted is refused whatever is idle. See <a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a>.</td>
</tr>
<tr>
<td>The reserve floor</td>
<td>Part of the visible headroom in each class is unborrowable capacity that ITS holds back. See <a href="#the-reserve-floor">The Reserve Floor</a>.</td>
</tr>
<tr>
<td>A cohort</td>
<td>The workspace may sit in a cohort whose groups' quotas together exceed the hardware behind them. See <a href="#cohorts">Cohorts</a>.</td>
</tr>
<tr>
<td>A reservation</td>
<td>From Fall 2026, a booked window holds hardware that stays idle until its owner launches into it. See <a href="/docs/gpu-access/reservations.html">Reservations</a>.</td>
</tr>
<tr>
<td>The Service Unit budget</td>
<td>The budget is a separate limit. A free GPU does not mean the budget covers it. See <a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>.</td>
</tr>
</tbody>
</table></div>
<p>The status page describes hardware, not entitlement, and shows a snapshot. On a
busy evening, availability can change between reading the page and launching.
Booking a window is the alternative to refreshing the page.</p>
<p>Zero availability is not an outage and does not need a ticket. Report a GPU
class that is unobtainable for days rather than hours, or a status page that is
unreachable while datahub.ucsd.edu is up, through
<a href="/docs/reference/getting-help.html">Getting Help</a>.</p>
<h2 id="requesting-a-quota-increase">Requesting a Quota Increase</h2>
<p>Quotas and group limits are set administratively. A workspace manager (an
instructor, TA, or PI) may view them but may not edit them.
<a href="/docs/reference/managing-a-group.html">Managing a Group</a> describes manager
privileges.</p>
<p>Send the request by ticket to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>,
naming the work, the GPU class it needs, and the dates it matters on. A request
that names a deadline can be granted for that window alone.</p>
<p>See also: <a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a></p>
