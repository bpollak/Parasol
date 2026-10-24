---
title: "Managing a Group"
path: /docs/reference/managing-a-group.html
description: "If you manage a workspace for a course or a lab, find out what you can do for its members, such as booking or canceling on their behalf, and what only an…"
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/managing-a-group/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/managing-a-group.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/managing-a-group/
format: html
---
<p class="lead">If you manage a workspace for a course or a lab, find out what you can do for
its members, such as booking or canceling on their behalf, and what only an
administrator can change. The reservation and workspace system has four
privilege tiers.</p>
<dl class="docs-glance">
<div><dt>Manager pages</dt><dd><strong>Group Reservations</strong>, <strong>Group Members</strong>, and <strong>Reports</strong></dd></div>
<div><dt>Bookings for members</dt><dd>Charged to the member's budget</dd></div>
<div><dt>Set by administrators</dt><dd>Budgets, group limits, and the workspace length cap</dd></div>
<div><dt>Request changes</dt><dd>By ticket to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></dd></div>
</dl>
<p>A workspace manager works on the manager pages of the reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>.</p>
<h2 id="the-four-tiers">The Four Tiers</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Tier</th>
<th>Who holds it</th>
<th>What it is for</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Member</strong></td>
<td>A student in a course, a member of a lab</td>
<td>Launching sessions and booking windows against their own budget</td>
</tr>
<tr>
<td><strong>Workspace manager</strong></td>
<td>An instructor, a TA, a PI</td>
<td>Running the workspace on behalf of its members</td>
</tr>
<tr>
<td><strong>Auditor</strong></td>
<td>Read-only staff</td>
<td>Seeing what is happening without changing it</td>
</tr>
<tr>
<td><strong>Administrator</strong></td>
<td>Cluster administrators, in ITS</td>
<td>Everything the platform can do</td>
</tr>
</tbody>
</table></div>
<p>The workspace manager tier is also called group manager. The reservation app
shows a manager's role as <strong>User</strong>; the manager pages in the sidebar are what
set a manager apart.</p>
<p>See also: <a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a></p>
<h3 id="becoming-a-manager">Becoming a Manager</h3>
<p>In a course workspace whose roster is loaded automatically, the course's owner,
its TAs, and its graders all become workspace managers. In other workspaces an
administrator appoints managers, or an existing manager does in a manager-curated
workspace; see <a href="#roster-curation">Roster Curation</a>.</p>
<h2 id="what-a-manager-may-do">What a Manager May Do</h2>
<p>A manager's sidebar in the reservation app adds <strong>Group Reservations</strong>,
<strong>Group Members</strong>, and <strong>Reports</strong>, and, where they apply, <strong>GPU Loans</strong> and
<strong>Group Rosters</strong>.</p>
<h3 id="viewing-the-groups-reservations">Viewing the Group's Reservations</h3>
<p><strong>Group Reservations</strong> lists every reservation in the workspaces the manager
manages. Filter by <strong>Username</strong> (an exact match), <strong>GPU Class</strong>, <strong>Group</strong>,
dates, and <strong>Status</strong>, then select <strong>Search</strong>.</p>
<ul>
<li>The <strong>SU</strong> column adds <code>(grp: X)</code> where the charge to the group pool differs
from the member's, and <code>(orig: X)</code> where the member's charge has changed since
booking, for example after a cancellation.</li>
<li>A red × on a row cancels it, and an amber × waives a penalty.</li>
<li>Under each row, <strong>Reserved</strong> gives the date and time the reservation was made.</li>
</ul>
<p><strong>Reserved</strong> is shown in the time zone of the viewer's browser, not in Pacific
time like the rest of the app. So is the <strong>Created</strong> column on
<strong>Group Members</strong>.</p>
<h3 id="booking-on-a-members-behalf">Booking on a Member's Behalf</h3>
<ol class="docs-steps">
<li><span class="docs-step-title">Open the form</span><p>Select <strong>New Reservation</strong> on <strong>Group Reservations</strong>.</p></li>
<li><span class="docs-step-title">Choose the booking</span><p>Choose:</p>
<ul>
<li>the group</li>
<li>the member</li>
<li>the GPU class</li>
<li>the date</li>
<li>the start time</li>
<li>the duration in whole hours</li>
<li>the number of GPUs</li>
</ul></li>
</ol>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A booking made on a member's behalf is charged to the member's budget. The
manager skips only the check that the member can afford it, so the booking
can leave the member at or over budget. That blocks the member's own bookings
and on-demand leases until the budget window renews.</p></div>
<p>A manager's booking also skips the booking horizon and the 48-hour member cap,
and may fall up to 90 days before or after the workspace's active dates. These
still apply:</p>
<ul>
<li>the group pool</li>
<li>the workspace length cap</li>
<li>the class grants</li>
<li>the GPU limits</li>
</ul>
<p>The row shows <strong>Submitted by</strong> and the manager's username.</p>
<h3 id="cancelling-and-waiving">Cancelling and Waiving</h3>
<p>A manager can cancel any reservation in a managed workspace with the red × on
<strong>Group Reservations</strong>. Cancelling a booking that is in progress deletes the
member's running sessions, which record a <code>ReservationCancelled</code> event. Where a
penalty applies, the dialog states it and offers <strong>Waive this penalty</strong>.</p>
<p>A penalty can also be waived afterwards, with the amber × on the cancelled
reservation. This covers a no-show, the member's own late cancellation, and a
teammate's cancellation in team mode.</p>
<p><strong>A manager's waiver clears the member's share of the penalty.</strong> The group
pool's share, where the workspace has a pool, is cleared only by an
administrator. Once only the pool's share remains, a manager sees no amber × on
the reservation, and the app refuses a manager's waiver. See
<a href="/docs/gpu-access/service-units-and-budgets.html#having-a-charge-waived">Having a Charge Waived</a>.</p>
<h3 id="gpu-loans">GPU Loans</h3>
<p><strong>GPU Loans</strong> appears where the workspace's cohort allows loans. A loan moves
part of one workspace's GPU limit for a class to another workspace in the same
cohort, for a set of dates.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Choose the groups</span><p>Under <strong>Propose a loan</strong>, choose the manager's own group and the other group.</p></li>
<li><span class="docs-step-title">Offer or request</span><p>Choose <strong>Offer</strong> to lend GPUs, or <strong>Request</strong> to borrow them.</p></li>
<li><span class="docs-step-title">Send the proposal</span><p>Choose the GPU class, the number of GPUs, and the dates, and select
<strong>Send proposal</strong>. The chart beside the form shows the effect on both groups.</p></li>
<li><span class="docs-step-title">Wait for approval</span><p>The other group's manager approves or rejects the proposal.</p></li>
</ol>
<p>Either side can withdraw a proposal that is awaiting approval, or cancel a loan
in force. A loan's status is <strong>Awaiting approval</strong>, <strong>In force</strong>, <strong>Expired</strong>,
<strong>Rejected</strong>, or <strong>Cancelled</strong>.</p>
<ul>
<li>A loan spans at most 120 days, and both groups need a GPU limit for the class
on every day of it.</li>
<li>Approval is refused while the lending group already holds more GPUs than the
loan would leave it, and the refusal names the first such day.</li>
<li>A loan changes GPU limits only. Reservations already made stand, and no budget
changes.</li>
</ul>
<h3 id="roster-curation">Roster Curation</h3>
<p>In a manager-curated workspace, <strong>Group Rosters</strong> lets a manager add existing
accounts, remove members, and make a member a manager or a manager a member.
Changes apply at once. It cannot create accounts. The rosters of course
workspaces loaded automatically, and of workspaces curated by administrators,
cannot be changed here.</p>
<h3 id="acting-as-a-member">Acting as a Member</h3>
<p>Where an administrator has allowed it for a workspace, a manager can act as one
of its members from <strong>Group Members</strong>, to see the reservation app as that member
sees it. A password or email address cannot be changed while acting as another
user. Select <strong>Exit Impersonation</strong> in the sidebar to return.</p>
<h3 id="a-managers-own-bookings">A Manager's Own Bookings</h3>
<p>For a manager's own bookings, the member budget is not checked, the booking
horizon and the 48-hour member cap are skipped, and the 90-day allowance around
the active dates applies, as for booking on a member's behalf. The booking wizard selects at
most 48 hours for everyone, so a longer booking is made with
<strong>New Reservation</strong> on <strong>Group Reservations</strong>.</p>
<h3 id="extending-a-members-job">Extending a Member's Job</h3>
<p>The reservation system accepts an <strong>Extend</strong> of a member's job from a workspace
manager, but the manager pages have no <strong>Extend</strong> button. A manager allowed to
act as members can Extend a job while acting as its owner; see
<a href="#acting-as-a-member">Acting as a Member</a>. Otherwise the member extends the job.
See <a href="/docs/gpu-access/reservations.html#extend">Extend</a>.</p>
<h2 id="budgets-and-limits-set-by-administrators">Budgets and Limits Set by Administrators</h2>
<ul>
<li><strong>Service Unit budgets.</strong> A manager may not edit Service Unit budgets, either a
member's or the workspace's own. Budgets are set administratively. See
<a href="/docs/gpu-access/service-units-and-budgets.html#the-size-of-a-budget">The Size of a Budget</a>.</li>
<li><strong>Group limits and quotas.</strong> A manager may not edit group limits or quotas. The
number of GPUs of each class that the workspace may hold at once is a
platform-side setting.</li>
<li><strong>The workspace length cap.</strong> A manager may not change the workspace length cap
either; see
<a href="/docs/gpu-access/reservations.html#reservation-length-caps">Reservation Length Caps</a>.</li>
</ul>
<p>A manager may request a change to any of these by ticket to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>. The ticket states:</p>
<ul class="docs-checklist">
<li>what the work is</li>
<li>the dates on which it matters</li>
</ul>
<p><a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a> covers
requests. For quotas, see
<a href="/docs/gpu-access/quotas-and-availability.html#requesting-a-quota-increase">Requesting a Quota Increase</a>.</p>
<h2 id="team-mode-cancellation-charges">Team Mode Cancellation Charges</h2>
<p>When a teammate cancels another member's booking in team mode, the teammate
cannot waive the penalty at the time of cancelling. A manager can waive it
afterwards. See <a href="#cancelling-and-waiving">Cancelling and Waiving</a>.</p>
<p>See also: <a href="/docs/gpu-access/reservations.html#team-mode">Team Mode</a></p>
<h2 id="what-the-reports-cover">What the Reports Cover</h2>
<p><strong>Reports</strong> shows four reports for a chosen date range of up to 60 days. The
default range is today and the following 13 days.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Report</th>
<th>Scope</th>
<th>What it shows</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Reservations by Group</strong></td>
<td>Every workspace on the cluster</td>
<td>The number of reservations in each workspace, by the day they start</td>
</tr>
<tr>
<td><strong>Max Simultaneous Reservations by GPU Class</strong></td>
<td>The whole cluster</td>
<td>The most GPUs of each class held at once on each day, counting only reservations that start that day</td>
</tr>
<tr>
<td><strong>Reserved Hours by GPU Class</strong></td>
<td>The whole cluster</td>
<td>GPU-hours reserved, by the day the reservations start</td>
</tr>
<tr>
<td><strong>Effective GPU Limits by Group</strong></td>
<td>The manager's own workspaces</td>
<td>For each day, the physical capacity, the cohort's limit, and the workspace's limit in force</td>
</tr>
</tbody>
</table></div>
<h3 id="effective-limits">Effective Limits</h3>
<p>Quotas are date-aware. A course's share may be raised for exactly the span of a
project deadline and revert automatically afterward. The limit in force in a
given week is therefore not necessarily the one quoted at provisioning.</p>
<p>The <strong>Effective GPU Limits by Group</strong> report shows the limit in force on each day.
<a href="/docs/gpu-access/quotas-and-availability.html#date-based-quota-changes">Date-Based Quota Changes</a>
covers date-ranged changes.</p>
<h2 id="cluster-wide-scope">Cluster-Wide Scope</h2>
<p>Three of the four reports display data for the whole cluster, not only the
manager's own workspace.</p>
<h3 id="reading-cluster-wide-figures">Reading Cluster-Wide Figures</h3>
<p>A total that includes every group on the cluster is not a total for one course.
A peak drawn from the whole cluster is not evidence about one roster.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>Establish what a report is scoped to before quoting a figure from it in a
ticket or a syllabus.</p></div>
<h3 id="other-groups-data">Other Groups' Data</h3>
<p>Data about other groups in the reports warrants discretion. A manager does not
circulate another department's booking pattern. A manager's own workspace is
visible to others on the same terms. The reports are a planning tool and are
not a public record.</p>
<h2 id="uses-of-the-reports">Uses of the Reports</h2>
<h3 id="evidence-for-a-limit-change">Evidence for a Limit Change</h3>
<p>The <strong>Max Simultaneous Reservations by GPU Class</strong> and <strong>Reserved Hours by GPU
Class</strong> reports supply the evidence a request to change a limit needs. Both are
cluster-wide, so pair them with <strong>Effective GPU Limits by Group</strong> and the
workspace's own reservations on <strong>Group Reservations</strong>.</p>
<p>An example is a workspace that reached its ceiling every evening of week 7, with a project due
in week 9. A survey of student deadlines a few weeks ahead allows cluster
administrators to raise a quota in advance rather than discover the surge as it
happens. <a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>
covers requests.</p>
<h3 id="moving-usage-off-peak">Moving Usage Off Peak</h3>
<p>Where reserved hours cluster in the evenings, a manager can tell students that
off-peak time is discounted and generally obtainable.
<a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>
covers off-peak discounts.</p>
<h2 id="limitations-of-the-reports">Limitations of the Reports</h2>
<p><strong>The reports are not a bill.</strong> Service Units divide capacity and do not cost
money.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
covers storage charges.</p>
<p><strong>The reports are not a live availability view.</strong> What the cluster is holding at
the current moment is shown on the status page. See
<a href="/docs/gpu-access/quotas-and-availability.html#the-status-page">The Status Page</a>.</p>
<p><strong>The reports are not controls.</strong> A manager's actions are those in
<a href="#what-a-manager-may-do">What a Manager May Do</a>. Every other change is
administrative and is requested by ticket.</p>
<p><strong>A report shows contention but does not resolve it.</strong> A course whose quota never
fits its roster has a provisioning problem rather than a scheduling one. Report
such a course to ITS during the term rather than after it.
<a href="/get-started/instructor-or-ta.html">Teaching with PARASOL</a> covers provisioning
for courses. <a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a> covers
provisioning for labs.</p>
<p>Zero availability in a class is not an outage, and a cohort can be fully drawn
while an individual group still has headroom on paper. See
<a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a>.</p>
<h2 id="grader-account-teams-and-technical-points-of-contact">Grader Account, Teams, and Technical Points of Contact</h2>
<p>The shared grader account, teams, and the Technical Point of Contact (TPOC)
designation are not privilege tiers.</p>
<h3 id="shared-grader-account">Shared Grader Account</h3>
<p>Each course receives one shared grader account for nbgrader and formgrader. It
holds write permission on the workspace's <code>public/</code> directory. An instructor's
own account does not inherit its powers.
<a href="/docs/grading/notebook-grading-workflow.html">Notebook Grading Workflow</a> covers the
shared grader account.</p>
<h3 id="teams">Teams</h3>
<p>A team is a Unix group, not a role. <code>launch.sh -G list</code> prints the teams an
account belongs to, and <code>-G &lt;teamid&gt;</code> launches with that team's data visible.
Team membership changes which files are readable. It does not change what a
member may do.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#team-directories">Team Directories</a>
covers team storage.</p>
<p>See also: <a href="/docs/gpu-access/reservations.html#team-mode">Team Mode</a></p>
<h3 id="technical-point-of-contact">Technical Point of Contact</h3>
<p>A TPOC is the person a course nominates to lead its customization work. The
designation is not a permission. It determines whom ITS works with, not what
the TPOC can do in the interface.
<a href="/get-started/instructor-or-ta.html#support--technical-consultation">Support &amp; Technical Consultation</a>
covers consultation appointments open to TPOCs.</p>
