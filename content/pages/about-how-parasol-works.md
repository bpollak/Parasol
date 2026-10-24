---
title: "How PARASOL Works"
path: /about/how-parasol-works.html
description: "Start here if you are new to Datahub and PARASOL: what the platform offers every course and lab, the rules for all work on it, and where to begin."
eyebrow: "About PARASOL"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/overview/), preview build of 2026-09-29"
canonicalUrl: /about/how-parasol-works.html
legacyUrl: https://dsmlp-docs.ucsd.edu/overview/
format: html
---
<p class="lead">Start here if you are new to Datahub and PARASOL, the platform formerly called the Data Science &amp; Machine Learning Platform (DSMLP). Find out what the service offers every course and lab, the
constraints that apply to all work on it, and the page to begin with for your
role.</p>
<dl class="docs-glance">
<div><dt>Organized into</dt><dd>Workspaces: one per course, one per lab, or a general catch-all</dd></div>
<div><dt>Course session</dt><dd>Typically begins at 2 CPU cores and 4GB RAM</dd></div>
<div><dt>GPUs</dt><dd>Five classes, organized by size</dd></div>
<div><dt>GPU access</dt><dd>A reservation system, from Fall 2026</dd></div>
</dl>
<h2 id="datahub-dsmlp-and-the-research-cluster">Datahub, PARASOL, and the Research Cluster</h2>
<p>UC San Diego's Datahub and PARASOL
provide thousands of undergraduates, graduate students, and their instructors
with access to Jupyter, RStudio, and other computational resources for scheduled
classes, formal independent study, and student projects.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><p class="docs-card-title">Datahub</p><p><strong>Datahub</strong> is the web interface, at
<a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-tasks"></span><p class="docs-card-title">PARASOL</p><p><strong>PARASOL</strong> is the cluster that
runs Datahub sessions, and it is also reachable from a terminal.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-education"></span><p class="docs-card-title">Research Cluster</p><p>The same cluster runs
research work and, in that context, is also called the <strong>Research Cluster</strong>.</p></article>
</div>
<p><strong>Datahub and the PARASOL cluster are a single service, and the same files are present in both.</strong></p>
<p>The platforms are used in courses ranging from introductory Data Science
lectures to graduate-level applied machine learning, and in curricula in
Biology, Music, Social Sciences, and Public Health. In AY 2025-26, the platforms
hosted more than 140 classes, 75 instructors, and 18,000 student enrollments.</p>
<ul class="row agent-metric-grid" aria-label="Platform use in AY 2025-26">
<li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">140+</strong><span class="agent-metric-label">Classes</span><span class="agent-metric-note">AY 2025-26</span></div></li>
<li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">75</strong><span class="agent-metric-label">Instructors</span><span class="agent-metric-note">AY 2025-26</span></div></li>
<li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">18,000</strong><span class="agent-metric-label">Student enrollments</span><span class="agent-metric-note">AY 2025-26</span></div></li>
</ul>
<h2 id="where-to-begin">Where to Begin</h2>
<p>Each audience has its own starting page.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Audience</th>
<th>Starting page</th>
<th>Assumes</th>
</tr>
</thead>
<tbody>
<tr>
<td>A student enrolled in a course that uses Datahub</td>
<td><a href="/get-started/student-in-a-course.html">Using Datahub in a Course</a></td>
<td>A web browser and nothing else</td>
</tr>
<tr>
<td>A student in such a course, where the course requires SSH, <code>launch.sh</code>, batch jobs, VS Code, or a GPU class the course menu does not offer</td>
<td><a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a></td>
<td>A terminal and <code>ssh</code></td>
</tr>
<tr>
<td>Teaching or assisting with a course</td>
<td><a href="/get-started/instructor-or-ta.html">Teaching with PARASOL</a></td>
<td>A browser for most tasks</td>
</tr>
<tr>
<td>Undertaking a personal project, independent study, capstone, or club or team project</td>
<td><a href="/get-started/student-project.html">Projects &amp; Independent Study</a></td>
<td>Familiarity with a shell</td>
</tr>
<tr>
<td>A graduate student, postdoc, undergraduate, or staff researcher working without a lab workspace</td>
<td><a href="/get-started/individual-researcher.html">Research on PARASOL</a></td>
<td>Familiarity with a shell</td>
</tr>
<tr>
<td>Faculty arranging access for a research group</td>
<td><a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a></td>
<td>Some steps are performed by ITS staff</td>
</tr>
</tbody>
</table></div>
<p>Coursework and a personal project are two separate workspaces, with different
eligibility, different resources, and different access lifetimes.
<a href="/get-started/student-in-a-course.html">Using Datahub in a Course</a> and
<a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a> cover
coursework. <a href="/get-started/student-project.html">Projects &amp; Independent Study</a> covers a
personal project.</p>
<h2 id="workspaces">Workspaces</h2>
<p>Users are divided into groups called <strong>workspaces</strong>: one per course, one per
lab, or one general catch-all population. A workspace anchors all cluster
configuration: rosters, storage, container images, GPU access, and storage and
GPU quotas. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>.</p>
<p>A member may belong to several workspaces at once, for example as a TA for one
course, a student in another, and a member of a lab, and chooses the workspace
to work in at launch. A member of more than one workspace has a home directory
in each. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>.</p>
<p>See also: <a href="/docs/workspaces-and-storage/index.html">Workspaces &amp; Storage</a></p>
<h2 id="standard-features">Standard Features</h2>
<h3 id="job-environment">Job Environment</h3>
<p>All jobs, whether browser-based Jupyter sessions, command-line jobs, or batch
jobs, run in a compute environment derived from the member's account and
workspace together with any job-specific configuration. A course session in the
browser typically begins at 2 CPU cores and 4GB RAM. See
<a href="/docs/access/datahub-in-the-browser.html#the-browser-session">The Browser Session</a>.
Upper limits are based on class size, demand, and capacity.</p>
<h3 id="gpus">GPUs</h3>
<p>GPUs are organized into five classes by size rather than by hardware model.
Each workspace is given access to one or more classes, matching its anticipated
work. <a href="/docs/gpu-access/gpu-classes.html#gpu-class-sizes">GPU Class Sizes</a> lists the
classes.
<a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> gives examples of
the work each class suits.</p>
<h3 id="storage">Storage</h3>
<p>Each member has three areas.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-user"></span><p class="docs-card-title">Home directory</p><p>Per-user and per-workspace.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-folder-open"></span><p class="docs-card-title">Shared area</p><p>Readable by everyone in the workspace.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-lock"></span><p class="docs-card-title">Private area</p><p>Per-user and cluster-wide, available in every workspace.</p></article>
</div>
<p><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>
lists the directories.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
gives the quotas for course and research home directories.
Optional mounts of external storage are available. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a>.</p>
<h3 id="standard-software-images">Standard Software Images</h3>
<p>Curated images cover the widely used Python, R, and Julia data analysis stacks.
They include a CUDA/GPU-enabled image with TensorFlow and PyTorch, and an
RStudio image. Courses and labs may further customize or pin their own images.
<a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a> describes
the images.</p>
<h3 id="ways-to-work">Ways to Work</h3>
<p>Work is done in a browser, at a terminal over SSH, or in a desktop editor such
as VS Code connected to a cluster container. <a href="/docs/access/index.html">Access</a>
describes each route.</p>
<h2 id="gpu-reservations">GPU Reservations</h2>
<p>From Fall 2026, access to GPUs is managed by a reservation system.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-calendar"></span><p class="docs-card-title">A booking</p><p>A booking,
made in the reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>, holds capacity for a
specific window, and for the length of that window sessions are admitted ahead
of the walk-up queue.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-flash"></span><p class="docs-card-title">On-demand use</p><p>Ad-hoc,
on-demand use without a booking is also supported.</p></article>
</div>
<p><a href="/docs/gpu-access/reservations.html">Reservations</a> describes booking. Reservations,
per-group quotas, and Service Unit budgets are the mechanisms that manage
contention for GPUs. See <a href="/docs/gpu-access/index.html">GPU Access</a>.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>An on-demand launch draws on the Service Unit budget as a booked window does,
and launching an eligible session authorizes that spend. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<h2 id="platform-constraints">Platform Constraints</h2>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-lock"></span><h3 id="root-access">Root Access</h3>
<p>Containers run unprivileged, under the member's own UID, with no root or sudo
inside the container. See
<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>.</p>
<p><code>sudo apt-get install</code> fails by design, and the failure is not a fault to
report.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-log-in"></span><h3 id="computation-on-the-login-node">Computation on the Login Node</h3>
<p>The login node is for launching jobs and moving files, and running computation
on it is prohibited. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-time"></span><h3 id="idle-gpu-sessions">Idle GPU Sessions</h3>
<p>An idle GPU session still holds its GPU, and the session is reclaimed once it
has been idle long enough. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p></article>
</div>
<h2 id="support">Support</h2>
<p>Questions and feedback go to the contact for the topic.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Topic</th>
<th>Contact</th>
</tr>
</thead>
<tbody>
<tr>
<td>A course a student is enrolled in</td>
<td>The instructor or TA, first</td>
</tr>
<tr>
<td>PARASOL itself</td>
<td><a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>, or the <a href="https://support.ucsd.edu/">ITS Service Desk</a></td>
</tr>
<tr>
<td>The Research Cluster, or Universal Scale Storage</td>
<td><a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a></td>
</tr>
<tr>
<td>Which platform is appropriate for a research project</td>
<td><a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a></td>
</tr>
<tr>
<td>1:1 Consultation, for instructors, TAs, and Technical Points of Contact (TPOCs)</td>
<td><a href="https://ucsd-datahub.youcanbook.me/">ucsd-datahub.youcanbook.me</a></td>
</tr>
</tbody>
</table></div>
<p>Urgent or broadly scoped problems may be escalated through the ITS Service
Desk. A ticket for such a problem states what is affected and how many people.
See
<a href="/docs/reference/getting-help.html#incidents-affecting-more-than-one-person">Incidents Affecting More Than One Person</a>.
<a href="/docs/reference/getting-help.html#response-targets">Response Targets</a> gives ITS
response targets.
<a href="/get-started/instructor-or-ta.html#support--technical-consultation">Support &amp; Technical Consultation</a>
sets out the terms of 1:1 Consultation.
<a href="/docs/reference/getting-help.html">Getting Help</a> lists all support routes.</p>
<h2 id="policy">Policy</h2>
<p><a href="/docs/reference/policy.html">Policy</a> sets out the conditions of use.</p>
<ul>
<li>Highly sensitive data (P4), such as clinical records or export-controlled
  information, must not be used on PARASOL, and legally or
  contractually protected information (P3) may be permitted after review. See
  <a href="/docs/reference/policy.html#data-classification">Data Classification</a>.</li>
<li>PARASOL system resources are shared among all courses and research
  groups, and demand, in particular for GPUs, may exceed capacity at peak hours
  during 10th and Finals Weeks or at assignment deadlines. See
  <a href="/docs/reference/policy.html#use-of-shared-resources">Use of Shared Resources</a>.</li>
<li>Datahub may be unavailable during scheduled maintenance for time-sensitive
  updates or security patches.
  <a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a> gives the
  schedule.</li>
<li>PARASOL is not to be used to host externally available services or
  applications except as required for coursework or projects. See
  <a href="/docs/reference/policy.html#hosting-externally-available-services">Hosting Externally Available Services</a>
  and <a href="/docs/reference/policy.html#availability-and-reliability">Availability and Reliability</a>.</li>
<li>The campus-wide IT policy on acceptable use applies to PARASOL. See
  <a href="/docs/reference/policy.html#appropriate-use">Appropriate Use</a>.</li>
</ul>
