---
title: "Getting Help"
path: /docs/reference/getting-help.html
description: "Find out whom to contact about PARASOL, what to include in a ticket, and how to ask for a change you cannot make yourself, such as more disk space or a…"
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/getting-help/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/getting-help.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/getting-help/
format: html
---
<p>Find out whom to contact about PARASOL, what to include in a ticket,
and how to ask for a change you cannot make yourself, such as more disk space
or a larger GPU class. If you are a student in a course, start with your
instructor or TA.</p>
<h2 id="support-tiers">Support Tiers</h2>
<p>Students in a course contact their instructor or TA first. Course staff are the
first tier of support for course matters: an assignment, a package the course
needs, an environment that does not contain what the syllabus specifies, or a
missing roster entry. Course staff hold the course's own support ticket with ITS
and can see the course and its roster.</p>
<p>Platform problems go directly to ITS, whoever reports them. Platform problems
include an inability to sign in at all, a service that is down, and behavior
that differs from the documentation.</p>
<p>Researchers and lab members have no instructor tier and use the contacts in
<a href="#support-contacts">Support Contacts</a> directly.</p>
<h2 id="support-contacts">Support Contacts</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Question</th>
<th>Contact</th>
</tr>
</thead>
<tbody>
<tr>
<td>A course a student is enrolled in</td>
<td>The instructor or TA, first</td>
</tr>
<tr>
<td>PARASOL itself: access, images, launching, quotas, GPUs</td>
<td><a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
<tr>
<td>The Research Cluster, or Universal Scale Storage</td>
<td><a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a></td>
</tr>
<tr>
<td>An outage, or anything to be tracked as a ticket</td>
<td>The <a href="https://support.ucsd.edu/">ITS Service Desk</a></td>
</tr>
<tr>
<td>Which platform is appropriate for a research project</td>
<td><a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a></td>
</tr>
<tr>
<td>An in-depth conversation, for an instructor, TA, or Technical Point of Contact (TPOC)</td>
<td><a href="https://ucsd-datahub.youcanbook.me/">1:1 Consultation</a></td>
</tr>
</tbody>
</table></div>
<h3 id="email-and-the-service-desk">Email and the Service Desk</h3>
<p>Email to <code>datahub@ucsd.edu</code> and a ticket through the Service Desk reach the same
staff. Email to that address opens a case, and the Service Desk web form submits
to the same queue. Either route may be used. The web form is better suited to
screenshots and long pastes.</p>
<h3 id="platform-selection">Platform Selection</h3>
<p>Research IT is the first contact for the question of whether a research project
belongs on PARASOL. Research IT can compare a project against the other platforms
the campus runs, including capabilities PARASOL does not have, such as a full
batch scheduler, MPI, and multi-node work, and against the platforms a PI's
group already uses.</p>
<p>See also: <a href="/docs/reference/coming-from-hpc.html">Coming from HPC</a></p>
<h2 id="contents-of-a-support-ticket">Contents of a Support Ticket</h2>
<p>A ticket that ITS can act on without further questions contains the following
items.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Item</th>
<th>Detail</th>
</tr>
</thead>
<tbody>
<tr>
<td>The course or workspace</td>
<td>By name or ID, for example COGS 108. The disk-quota-service page displays the ID.</td>
</tr>
<tr>
<td>The system</td>
<td><code>datahub.ucsd.edu</code> in a browser, or <code>dsmlp-login</code> at a terminal</td>
</tr>
<tr>
<td>The environment or container</td>
<td>The one selected, for example <code>scipy-ml-notebook</code></td>
</tr>
<tr>
<td>The exact command</td>
<td>If there was one, copied rather than described</td>
</tr>
<tr>
<td>The exact error</td>
<td>Copied rather than described, with a screenshot</td>
</tr>
<tr>
<td>The time</td>
<td>Approximately when it happened, and whether it happens every time</td>
</tr>
</tbody>
</table></div>
<h3 id="command-line-details">Command-Line Details</h3>
<p>A ticket about a problem at the command line also includes the node and the
pod. The launch output names the node the pod was assigned to, for example
<code>INFO pod assigned to node: its-dsmlp-n04.ucsd.edu</code>, and <code>kubectl get pods</code>
gives the pod ID and its status.</p>
<p>See also: <a href="/docs/reference/error-messages.html">Error Messages</a></p>
<h3 id="incidents-affecting-more-than-one-person">Incidents Affecting More Than One Person</h3>
<p>A report of an incident that affects more than one person states its scope in
the first line. ITS prioritizes effort by the number of courses and students
affected and by the overall impact on instruction. A first line such as "none of
my 200 students can start a notebook, and the midterm is Thursday" distinguishes
a broad incident from an individual report such as "my notebook will not start".</p>
<h2 id="response-targets">Response Targets</h2>
<h3 id="individual-user-issues">Individual User Issues</h3>
<p>ITS targets resolution of individual user issues within 1-2 business days. The
target applies to students in a course, researchers, and instructors, and to
the requests in <a href="#administrative-requests">Administrative Requests</a>.</p>
<p>A problem report from an independent study or project user, whose access came
through the Independent Study Request form, may take up to 5 days to answer.</p>
<h3 id="instructor-incident-tier">Instructor Incident Tier</h3>
<p>For instructors only, an incident affecting multiple courses, many users, or a
critical point in the quarter such as an exam carries a target response time of
30 minutes from first contact to the Service Desk and a target resolution time
of 8 hours. The tier is an instructional commitment. An instructor or TA reaches
it by reporting a broad incident. An individual user does not reach it by
marking a ticket urgent, and a student whose whole class is affected reaches it
by telling the instructor.</p>
<h3 id="escalation-outside-business-hours">Escalation Outside Business Hours</h3>
<p>Urgent problems outside business hours may be escalated through the Service
Desk. Escalation may be requested, and the Service Desk determines how it is
routed.</p>
<h2 id="11-consultation">1:1 Consultation</h2>
<p>1:1 Consultation appointments connect instructors, TAs, and TPOCs with ITS
technical staff for real-time guidance. See
<a href="/get-started/instructor-or-ta.html#support--technical-consultation">Support &amp; Technical Consultation</a>.</p>
<h2 id="administrative-requests">Administrative Requests</h2>
<p>None of the requests in this section has a self-service control. The requester
has no form, slider, or setting in the interface for any of them; each is an
administrative action taken by someone else.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Request</th>
<th>Granted by</th>
<th>Information to include</th>
</tr>
</thead>
<tbody>
<tr>
<td>More disk space</td>
<td>Cluster administrators, by ticket. In a course, the instructor or TA raises it on the course's existing ticket.</td>
<td>The workspace ID, the current disk-quota-service reading, what is taking the space, and what has already been cleared</td>
</tr>
<tr>
<td>A resource tier above the default. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a></td>
<td>Cluster administrators, by ticket to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
<td>What the work is, the CPU and memory it needs and why, whether it is one container or several at once, and how long the raise is needed for</td>
</tr>
<tr>
<td>A GPU class the workspace was not granted</td>
<td>Cluster administrators. A request from an instructor or PI carries more weight than one from a member.</td>
<td>The workspace, the class needed, the model or dataset whose memory footprint requires it, and the dates it matters on</td>
</tr>
<tr>
<td>More Service Units</td>
<td>Cluster administrators set budgets. A workspace manager may request a change but cannot edit a budget.</td>
<td>The workspace, what the work is, the date by which it must be done, and what the budget has already been spent on</td>
</tr>
<tr>
<td>A waived cancellation penalty</td>
<td>The workspace manager: an instructor or TA for a course, a PI for a lab, at cancellation or afterwards. A manager's waiver clears the member's share; only an administrator clears a group pool's share.</td>
<td>Which booking, and what happened</td>
</tr>
<tr>
<td>A longer reservation than the workspace permits</td>
<td>Cluster administrators, by ticket to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>. They alone set the workspace length cap; a course's cap is usually changed at the instructor's request</td>
<td>The length needed, why the work cannot be split into shorter windows, and how it checkpoints</td>
</tr>
</tbody>
</table></div>
<h3 id="cancellation-penalty-waivers">Cancellation Penalty Waivers</h3>
<p>A cancellation penalty waiver needs no ticket. The workspace manager grants it
on the <strong>Group Reservations</strong> page of the reservation app, without ITS
involvement.</p>
<p>See also: <a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a></p>
<h3 id="booking-on-a-members-behalf">Booking on a Member's Behalf</h3>
<p>A booking a workspace manager makes on a member's behalf is charged to the
member's budget. It is not a way around a spent budget: it can leave the member
over budget, which blocks their own bookings and on-demand leases until the
window renews. When a member has run out of Service Units before a deadline,
request more by ticket.</p>
<p>See also: <a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a></p>
<h2 id="writing-an-administrative-request">Writing an Administrative Request</h2>
<p>An administrative request names the workspace, describes the work, states the
deadline and time window, and lists what has already been tried.</p>
<h3 id="naming-the-workspace">Naming the Workspace</h3>
<p>Almost every limit in <a href="#administrative-requests">Administrative Requests</a>
belongs to a workspace rather than to an individual. A request that does not
name a workspace cannot be acted on. The disk-quota-service page displays the
workspace ID, and <code>workspace --list</code> on the login node prints every workspace an
account belongs to.</p>
<p>See also: <a href="/docs/workspaces-and-storage/what-a-workspace-is.html#naming-a-workspace-on-the-command-line">Naming a Workspace on the Command Line</a></p>
<h3 id="describing-the-work">Describing the Work</h3>
<p>One sentence describing the work is sufficient. "Fine-tuning a 7B model for a
CSE 251 project" indicates the GPU class, the approximate memory, and the
approximate duration.</p>
<h3 id="deadline-and-time-window">Deadline and Time Window</h3>
<p>A request bounded in time is easier to approve than an open-ended one. Quotas
are date-aware: cluster administrators can raise a course's share for the span
of a project deadline and let it revert automatically. A request for "32 CPU for
the week of the 9th" is therefore stronger than a request for "32 CPU".</p>
<h3 id="checks-before-requesting">Checks Before Requesting</h3>
<p>For a disk quota, state that the Jupyter Trash is empty and that no personal
copy of a shared dataset is held. For a GPU class, state that a smaller class
does not fit. These two checks resolve a large share of requests without a
ticket.</p>
<h2 id="workspace-managers-and-cluster-administrators">Workspace Managers and Cluster Administrators</h2>
<p>The <strong>workspace manager</strong> is the instructor or TA in a course, and the PI in a
lab. A manager may view the group's reservations, book on a member's behalf,
cancel members' bookings, and waive a cancellation charge, among other actions.
A manager may not edit Service Unit budgets, group limits, or the workspace
length cap, regardless of seniority.</p>
<p><strong>Cluster administrators</strong> hold all other administrative controls and are
reached by ticket.</p>
<p>See also: <a href="/docs/reference/managing-a-group.html">Managing a Group</a></p>
<h2 id="other-administrative-requests">Other Administrative Requests</h2>
<p>The requests in this table also have no self-service path.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Request</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>A run longer than 12 hours</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#runs-longer-than-12-hours">Runs Longer Than 12 Hours</a></td>
</tr>
<tr>
<td>A dataset staged for a course or lab</td>
<td><a href="/docs/workspaces-and-storage/datasets.html#asking-for-a-dataset-to-be-staged">Asking for a Dataset to Be Staged</a></td>
</tr>
<tr>
<td>An external filesystem mounted</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a></td>
</tr>
<tr>
<td>A raised group quota, or one raised for a deadline week</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#requesting-a-quota-increase">Requesting a Quota Increase</a></td>
</tr>
<tr>
<td>Access extended for an individual beyond the standard end of access</td>
<td><a href="/docs/access/when-access-starts-and-ends.html#extending-access-for-an-individual">Extending Access for an Individual</a></td>
</tr>
<tr>
<td>Course files archived rather than purged</td>
<td><a href="/docs/access/when-access-starts-and-ends.html#archiving-on-request">Archiving on Request</a></td>
</tr>
<tr>
<td>An image pinned so a course does not move mid-term</td>
<td><a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a></td>
</tr>
<tr>
<td>A P3 dataset reviewed</td>
<td><a href="/docs/reference/policy.html#data-classification">Data Classification</a></td>
</tr>
</tbody>
</table></div>
<h2 id="expected-behaviors-reported-as-faults">Expected Behaviors Reported as Faults</h2>
<p>Several of the most frequently reported behaviors are the system working as
designed.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Observed behavior</th>
<th>Cause</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>A GPU session ended while unattended, with no error</td>
<td>Idle culling</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
<tr>
<td><code>DeadlineExceeded</code></td>
<td>The runtime limit</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td><code>sudo</code> refused</td>
<td>Containers run unprivileged</td>
<td><a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a></td>
</tr>
<tr>
<td>A past course no longer appears</td>
<td>Course access ended on schedule</td>
<td><a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a></td>
</tr>
<tr>
<td>No capacity available at a deadline</td>
<td>Contention</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#when-the-cluster-is-full">When the Cluster Is Full</a></td>
</tr>
</tbody>
</table></div>
<p>A quota increase, a GPU class, or a longer reservation window is an
administrative request rather than a fault report. These requests have no
self-service path. See <a href="#administrative-requests">Administrative Requests</a>.</p>
