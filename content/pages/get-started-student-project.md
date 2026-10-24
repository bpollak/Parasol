---
title: "Projects & Independent Study"
path: /get-started/student-project.html
description: "For independent study, capstones, and club or team projects on PARASOL outside a scheduled course: who is eligible and how to request access."
eyebrow: "Get started"
lastReviewed: 2026-09-29
audiences: [students, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/student-project/), preview build of 2026-09-29"
canonicalUrl: /get-started/student-project.html
legacyUrl: https://dsmlp-docs.ucsd.edu/student-project/
format: html
---
<p class="lead">This page is for work on PARASOL outside a scheduled course. It
assumes familiarity with a shell. Access through an enrolled course is separate
and follows different rules. See
<a href="/get-started/student-in-a-course.html">Using Datahub in a Course</a> and
<a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a>.</p>
<dl class="docs-glance">
<div><dt>For</dt><dd>For-credit and campus-sponsored work outside a scheduled course</dd></div>
<div><dt>You need</dt><dd>Familiarity with a shell</dd></div>
<div><dt>Request with</dt><dd>The <a href="https://go.ucsd.edu/2wc5gH0">Independent Study Request</a> form</dd></div>
<div><dt>Setup</dt><dd>Up to 5 business days from the request</dd></div>
</dl>
<h2 id="eligibility--requesting-access">Eligibility &amp; Requesting Access</h2>
<p>Project access covers for-credit and campus-sponsored work outside a scheduled
course:</p>
<ul class="docs-checklist">
<li>Designated independent study courses: 198/199, 293/298/299</li>
<li>Independent thesis or dissertation research</li>
<li>State-supported capstone projects</li>
<li>Campus-sponsored co-curricular activities, such as projects, workshops,
  clubs, and teams</li>
</ul>
<p>Non-credit personal projects may be approved on a case-by-case basis as
resources are available. The programs in
<a href="/docs/reference/policy.html#self-supporting-programs">Self-Supporting Programs</a> are
eligible, subject to the cost recovery set out there.</p>
<p>For non-students, and for research that is not for credit,
<a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> can help
connect faculty, staff, and student researchers with compute platforms.
<a href="/get-started/individual-researcher.html">Research on PARASOL</a> covers individual research on the
cluster.</p>
<h3 id="submitting-a-request">Submitting a Request</h3>
<p>Request access through the
<a href="https://go.ucsd.edu/2wc5gH0">Independent Study Request</a> form. A request states:</p>
<ul class="docs-checklist">
<li>Who is sponsoring the work</li>
<li>What will be run</li>
<li>The resources required</li>
<li>For how long</li>
</ul>
<div class="alert alert-success docs-callout" role="note"><p class="docs-callout-label"><strong>Name a sponsor and a concrete workload</strong></p><p>A request that names a faculty sponsor and a concrete workload is
provisioned considerably faster than one that describes the work only in general
terms.</p></div>
<p>Setting up access takes <strong>up to 5 business days</strong> from the request. See
<a href="/docs/access/when-access-starts-and-ends.html#independent-study-capstones--special-projects">Independent Study, Capstones &amp; Special Projects</a>.</p>
<h2 id="how-project-access-differs-from-course-access">How Project Access Differs from Course Access</h2>
<p>Most of what may be obtained for a course may be obtained for a project, and the
mechanics are the same. Project access differs in priority, support, duration,
and environment configuration.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-sort-by-attributes-alt"></span><h3 id="priority-relative-to-coursework">Priority Relative to Coursework</h3>
<p>Instruction has priority. When the cluster is busy, during 10th and Finals Weeks
and at major assignment deadlines, coursework is served ahead of project work.
Demand is generally lower during the day than in the evening.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-question-sign"></span><h3 id="support-tier">Support Tier</h3>
<p>Project work has no instructor or TA as a first tier of support. Support
questions go directly to the ITS Service Desk, whose staff have no prior
knowledge of the project.</p>
<p>Project issues may take longer to answer than issues
in a course. See <a href="/docs/reference/getting-help.html#individual-user-issues">Individual User Issues</a>.
<a href="#support">Support</a> lists the contacts.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-time"></span><h3 id="duration-of-access">Duration of Access</h3>
<p>Project access is granted for a defined period rather than tied to an
instructional term. Submit an extension request before access lapses rather
than afterwards.
<a href="/docs/access/when-access-starts-and-ends.html">When Access Starts &amp; Ends</a> covers access
periods.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-cog"></span><h3 id="environment-configuration">Environment Configuration</h3>
<p>No environment is configured on the student's behalf, and no course menu of
environments is offered. A course receives an image selected and tested by its
instructor.</p>
<p>A project receives the standard images and whatever is built upon
them, and the project decides what runs and how.
<a href="/docs/environments/index.html">Environments</a> covers images.</p></article>
</div>
<h2 id="getting-set-up">Getting Set Up</h2>
<ol class="docs-steps">
<li><span class="docs-step-title">Sign in</span><p>Sign in at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> for the browser
   route, or <code>ssh</code> to the login node for a terminal. Duo applies, and the VPN is
   not required for either route. See
   <a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a>.
   <a href="/docs/access/index.html">Access</a> describes the routes.</p></li>
<li><span class="docs-step-title">Locate the project workspace</span><p>Project access is provisioned as its own
   workspace, with its own home directory, separate from any course the student
   is enrolled in. Where both exist, select the workspace deliberately at launch.
   See <a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>.</p></li>
<li><span class="docs-step-title">Launch a container</span><p>Launch with <code>launch-scipy-ml.sh</code> for the GPU-capable image, or
   <code>launch-datascience.sh</code> for the CPU image.
   <a href="/docs/running-jobs/index.html">Running Jobs</a> covers launching.</p></li>
<li><span class="docs-step-title">Place large inputs in shared or external storage</span><p>Place large inputs in shared or external storage rather than in a per-user
   copy. A project home directory is not large.
   <a href="/docs/workspaces-and-storage/index.html">Workspaces &amp; Storage</a> covers storage.</p></li>
</ol>
<p>The login node is for launching jobs and moving files, not for running work. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.</p>
<h2 id="doing-the-work">Doing the Work</h2>
<p>Project work uses the same procedures as course work, documented on these pages.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Task</th>
<th>Documented in</th>
</tr>
</thead>
<tbody>
<tr>
<td>Request CPU, memory, or a GPU</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a></td>
</tr>
<tr>
<td>Run work that outlives the terminal</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a></td>
</tr>
<tr>
<td>Use <code>sbatch</code> and related commands</td>
<td><a href="/docs/reference/coming-from-hpc.html#slurm-compatibility-wrappers">Slurm Compatibility Wrappers</a></td>
</tr>
<tr>
<td>Edit in Visual Studio Code</td>
<td><a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a></td>
</tr>
<tr>
<td>Install packages, or build an image</td>
<td><a href="/docs/environments/index.html">Environments</a></td>
</tr>
<tr>
<td>Move data in and out</td>
<td><a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a></td>
</tr>
<tr>
<td>Share results with collaborators</td>
<td><a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#inside-the-workspace">Inside the Workspace</a></td>
</tr>
</tbody>
</table></div>
<h3 id="service-unit-budget">Service Unit Budget</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>An eligible GPU launch draws on the budget</strong></p><p>Launching an eligible GPU session draws on the project's Service Unit budget,
whether or not the reservation calendar is used. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<p>No TA observes a project's consumption or remarks when the budget is nearly
exhausted.
<a href="/docs/gpu-access/service-units-and-budgets.html#remaining-balance">Remaining Balance</a>
covers the balance.</p>
<h3 id="idle-gpu-sessions">Idle GPU Sessions</h3>
<p>A GPU session that stops using its GPU is reclaimed. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
<h3 id="missed-reservations">Missed Reservations</h3>
<p>A booked window that is missed is charged. See
<a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a> and
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>.
A waiver is a workspace-manager action, and no TA watches a project calendar to
offer one.</p>
<p><strong>Canceling at least 24 hours ahead costs nothing</strong>; a later cancellation
keeps part of the cost.</p>
<h3 id="reservation-events">Reservation Events</h3>
<p>The reservation system reports on a GPU session with Kubernetes events, shown by
<code>kubectl describe pod</code>, by <code>kubectl get events</code> after the pod is gone, and by
Datahub while a session starts.
<a href="/docs/reference/reservation-events.html">Reservation Events</a> defines each one:</p>
<ul>
<li>While a session waits: <code>WaitingForReservation</code>, <code>ReservationFull</code>,
  <code>ReservationTooSmall</code>, <code>OnDemandLeaseDenied</code>, <code>OnDemandLeaseRejected</code>,
  <code>OnDemandAdmissionPaused</code>, <code>UnknownGpuClass</code>, <code>NoReservation</code>,
  <code>AnnotationIgnored</code>, <code>NoMatchingNode</code>, <code>WaitingForNode</code>.</li>
<li>When it is admitted: <code>RuntimeGuaranteed</code>, <code>ReservationRelinked</code>,
  <code>OverstayRelinked</code>, <code>BestEffortAdmitted</code>.</li>
<li>When it is stopped: <code>Preempted</code>, <code>ReservationCancelled</code>,
  <code>ReservationReassigned</code>.</li>
</ul>
<h3 id="checkpointing">Checkpointing</h3>
<p>Checkpoint long-running work. See
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a>.</p>
<h2 id="troubleshooting">Troubleshooting</h2>
<p>See <a href="/docs/reference/error-messages.html">Error Messages</a>.
Common symptoms in project work are documented on these pages.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Documented in</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>OOMKilled</code></td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a></td>
</tr>
<tr>
<td><code>DeadlineExceeded</code></td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td><code>Pending</code>, with a <code>FailedScheduling</code> event</td>
<td>Normal while the reservation system decides; the reason is in the reservation event beside it. See <a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a></td>
</tr>
<tr>
<td>The session ended unexpectedly</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>, or <a href="/docs/gpu-access/what-ends-a-session.html#end-of-a-reservation-window">End of a Reservation Window</a></td>
</tr>
<tr>
<td>Reservation-related events in a pod</td>
<td><a href="/docs/reference/reservation-events.html">Reservation Events</a></td>
</tr>
</tbody>
</table></div>
<h2 id="outgrowing-project-access">Outgrowing Project Access</h2>
<p>Work has outgrown project access when it:</p>
<ul>
<li>needs capacity beyond what a project allocation carries</li>
<li>has become a lab's work rather than one person's</li>
<li>needs multi-day reservations</li>
<li>needs storage measured in terabytes</li>
</ul>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-user"></span><p class="docs-card-title">Independent work on an ongoing basis</p><p>See <a href="/get-started/individual-researcher.html">Research on PARASOL</a>.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-education"></span><p class="docs-card-title">Provisioning for a group</p><p>Provisioning belongs with a PI. Refer the PI to <a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a>.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><p class="docs-card-title">Work beyond this cluster</p><p><a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> can discuss other platforms.</p></article>
</div>
<h2 id="policy">Policy</h2>
<p><strong>Highly sensitive data (P4), such as clinical records or export-controlled
information, must not be used on PARASOL</strong>, and legally or contractually protected
information (P3) may be permitted after review. See
<a href="/docs/reference/policy.html#data-classification">Data Classification</a>.
<a href="/docs/reference/policy.html">Policy</a> sets out appropriate use, the sharing of compute
resources, and the other conditions of use.</p>
<h2 id="support">Support</h2>
<p>Questions and tickets go to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> or the
<a href="https://support.ucsd.edu/">ITS Service Desk</a>. A ticket includes:</p>
<ul class="docs-checklist">
<li>What was run</li>
<li>The full error</li>
<li>The workspace name</li>
</ul>
<p><a href="/docs/reference/getting-help.html#contents-of-a-support-ticket">Contents of a Support Ticket</a>
describes ticket contents further.
<a href="/docs/reference/getting-help.html">Getting Help</a> describes other routes.</p>
