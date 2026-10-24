---
title: "Teaching with PARASOL"
path: /get-started/instructor-or-ta.html
description: "This page is for instructors and TAs teaching a course on PARASOL. Most course tasks need only a browser; course-specific customization needs a shell."
eyebrow: "Get started"
lastReviewed: 2026-09-29
audiences: [instructors, teaching-assistants]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/instructor-or-ta/), preview build of 2026-09-29"
canonicalUrl: /get-started/instructor-or-ta.html
legacyUrl: https://dsmlp-docs.ucsd.edu/instructor-or-ta/
format: html
---
<p>This page is for instructors and TAs teaching a course on PARASOL.
Most course tasks need only a browser; course-specific customization needs a
shell.</p>
<h2 id="course-timeline">Course Timeline</h2>
<h3 id="requesting-a-course">Requesting a Course</h3>
<p>Request PARASOL access for a course through the
<a href="https://support.ucsd.edu/its?id=sc_cat_item_guide&amp;sys_id=dc1afcd51b152910484f968f034bcb8b&amp;sysparm_category=90e152651b19a910484f968f034bcbf0">Specialized Instructional Computing Course Request</a>
form. Instructors, TAs, and departmental staff can submit it. Submission opens
in the 2nd week of the previous term. For Summer and Fall classes, submission
opens in the 2nd week of Spring.</p>
<p>The request is due 4 weeks before the start of instruction. Where the course
needs a Technical Point of Contact (TPOC), name one in the request. See
<a href="#technical-point-of-contact">Technical Point of Contact</a>. A late request gets
lower priority and is reviewed as time permits. Setup time and the date your
students get access depend on the complexity of the course and on the overall
request load. After a late request, your students may not get access until as
late as 4th week.</p>
<h3 id="course-setup-and-instructor-access">Course Setup and Instructor Access</h3>
<p>Course setup and instructor access open 4-5 weeks before the start of
instruction. You can request earlier setup. During this period, you and the
other course staff test features, validate assignments, and make
customizations. 1:1 Consultation for customization is limited in the final
weeks of each term. See <a href="#11-consultation">1:1 Consultation</a>.</p>
<h3 id="student-access">Student Access</h3>
<p>Student access follows TSS course rosters. TSS is the system formerly called
TritonLink.
<a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a>
gives when rosters load and when add and drop changes take effect. Auditors and
observers are not on the roster, and their access is
<a href="https://support.ucsd.edu/services?id=kb_article_view&amp;sysparm_article=KB0032124">managed through Canvas</a>.
<a href="https://extendedstudies.ucsd.edu/student-resources/registration-policies-and-procedures/concurrent-enrollment">Concurrent Enrollment</a>
students get access through Extended Studies staff.</p>
<h3 id="access-after-the-term">Access After the Term</h3>
<p>You and your students keep access for one additional quarter beyond the
instructional term, ignoring Summer for Spring courses. See
<a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a>.
The instructor can request that individual accounts stay active longer, for
Incomplete grade resolution, academic integrity proceedings, course development
or hand-off, or similar circumstances. See
<a href="/docs/access/when-access-starts-and-ends.html#extending-access-for-an-individual">Extending Access for an Individual</a>.</p>
<p>Course environments are purged one quarter after account deactivation, that is,
two quarters after the course, excluding Summer. The purge skips two things:
individual accounts extended on request, and instructor and course-wide files
archived on request. Ask ITS to archive files, to revive a previously archived
class environment, or to make an archive available for download. See
<a href="/docs/access/when-access-starts-and-ends.html#archiving-on-request">Archiving on Request</a>.</p>
<h3 id="independent-study-and-research">Independent Study and Research</h3>
<p>Students in for-credit independent study, capstones, and similar projects
request ongoing access through the
<a href="https://go.ucsd.edu/2wc5gH0">Independent Study Request</a> form. Direct those
students to <a href="/get-started/student-project.html">Projects &amp; Independent Study</a>. For non-credit
research, <a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a>
connects faculty, staff, and student researchers with compute platforms.</p>
<h2 id="standard-features--standard-software-images">Standard Features &amp; Standard Software Images</h2>
<p>Datahub offers a set of curated software environments that are sufficient for
many courses and use cases. These environments, with the session resources,
course file distribution, grading tools, and individual customization support
that accompany them, are the <strong>standard features</strong>. IT Services gives priority
support for questions, configuration help, malfunctions, and errors in the
standard features.
<a href="#support--technical-consultation">Support &amp; Technical Consultation</a> lists the
routes.</p>
<h3 id="standard-software-images">Standard Software Images</h3>
<p>You and your students can use the standard software images through web-based
Jupyter notebooks and from the command line.
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a> describes
them. The <code>rstudio-notebook</code> image derives from <code>datascience-notebook</code> and is
not GPU-enabled.</p>
<h3 id="session-resources">Session Resources</h3>
<p>CPU, memory, and NVIDIA GPU allocations are flexible, beginning at 2 CPU cores
and 4GB RAM dedicated to each student session. Upper limits depend on class
size, demand, and capacity. See
<a href="/docs/access/datahub-in-the-browser.html#the-browser-session">The Browser Session</a>.</p>
<h3 id="course-files-and-storage">Course Files and Storage</h3>
<p>Course-specific file and dataset distribution is available.
<a href="/docs/workspaces-and-storage/datasets.html#asking-for-a-dataset-to-be-staged">Asking for a Dataset to Be Staged</a>
gives the size limits.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
gives the storage each student gets, and
<a href="/docs/workspaces-and-storage/index.html">Workspaces &amp; Storage</a> covers course storage
in general. Tell ITS when assignments generate significant output for each
student.</p>
<h3 id="grading-tools">Grading Tools</h3>
<p><a href="/docs/grading/index.html">Grading</a> covers the tools for distributing, collecting, and
grading assignments, including roster integration with Canvas.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>Grade export to Canvas is manual. The workflow generates a CSV file, which you
upload to the Canvas gradebook. See
<a href="/docs/grading/notebook-grading-workflow.html#exporting-the-grades">Exporting the Grades</a>.</p></div>
<h3 id="individual-customizations">Individual Customizations</h3>
<p>Minor customizations that individuals make within the standard software images
get limited support. See
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a>.</p>
<h2 id="course-specific-customization">Course-Specific Customization</h2>
<p>The instructor can supplement the standard software images to meet the needs
of a course: add language modules (for example, Python or R libraries), add
system-level packages (compilers, utilities, and similar), or make more
extensive modifications.
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>
gives the procedure.</p>
<p>Highly complex use cases, such as clustered services like Spark or Postgres,
or software not derived from the standard images, are in regular use on
PARASOL. They need substantially more time and
expertise from the instructor or TPOC than ordinary customizations. See
<a href="#complex-customizations--experimental-features">Complex Customizations &amp; Experimental Features</a>.</p>
<h3 id="technical-point-of-contact">Technical Point of Contact</h3>
<p>The instructor, a designated <strong>Technical Point of Contact</strong> (TPOC), or both
must lead the installation, configuration, and student use of course-specific
features. ITS technical staff support customization through
<a href="#11-consultation">1:1 Consultation</a>.</p>
<p>The instructor or TPOC needs basic familiarity with Unix commands such as
<code>ssh</code>, <code>mkdir</code>, and <code>chmod</code>, and proficiency with the intended core platform
(for example, Python or R) in a desktop Mac or PC setting. ITS gives guidance
and basic training on the PARASOL environment and on system-specific
procedures.</p>
<h3 id="pinning-an-image">Pinning an Image</h3>
<p>You can ask ITS to pin a specific image for your course, so that an image
update partway through a project does not move your students. See
<a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a>.</p>
<h2 id="support--technical-consultation">Support &amp; Technical Consultation</h2>
<p>IT Services gives priority support for standard features and functionality
through the <a href="/docs/index.html">PARASOL Documentation</a>, the IT Service Desk,
and 1:1 Consultation. Send questions and feedback about PARASOL to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<h3 id="it-service-desk">IT Service Desk</h3>
<p>Contact the <a href="https://support.ucsd.edu/">IT Service Desk</a> by phone, web, or
email for the following.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Category</th>
<th>Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td>Outages, errors, or malfunctions</td>
<td>System issues, such as the service or its components being unavailable; user access issues, such as an enrolled student being unable to log in; errors or unexpected behavior within standard features</td>
</tr>
<tr>
<td>Requests and inquiries</td>
<td>Requests for system-side configuration or adjustments to course setup, such as resource limits, disk quotas, container tags, and file ownership or permissions; straightforward questions about core features, system capabilities, or clarification of documentation</td>
</tr>
</tbody>
</table></div>
<p>Effort is prioritized by the number of courses and students affected and by
the overall impact on instruction. Say in the ticket when an issue affects a
whole class or falls on an exam. Students route functionality concerns through
you. Take in-depth questions to <a href="#11-consultation">1:1 Consultation</a>.</p>
<p><a href="/docs/reference/getting-help.html#response-targets">Response Targets</a> gives the
response targets, including the incident tier for instructors. You can
escalate urgent problems that arise outside business hours through the Service
Desk.</p>
<h3 id="11-consultation">1:1 Consultation</h3>
<p>Instructors, TAs, and TPOCs can book
<a href="https://ucsd-datahub.youcanbook.me/">1:1 Consultation appointments</a> with ITS
technical experts for real-time guidance or help with standard features,
course-specific customizations, and complex or experimental features. Topics
include:</p>
<ul>
<li>In-depth questions about the configuration or usage of standard and core
  features</li>
<li>Discussion not well suited to ticket-based interaction</li>
<li>Functional or technical issues outside the standard and core features</li>
<li>First-time use of a custom container derived from a standard software image</li>
<li>Customization options and the selection of additional packages and tools</li>
<li>Functional or technical issues with course-specific features, such as build
  errors and version conflicts</li>
<li>Questions and training on the customization process, such as the use of git,
  GitHub, tags, and Actions, or the installation of language and system packages</li>
<li>Maintenance following updates to the standard software images</li>
</ul>
<p>At Spring 2026 staffing levels, each course can request up to 6 hours of 1:1
Consultation per term. Availability is reduced in the final weeks of each term.</p>
<h2 id="complex-customizations--experimental-features">Complex Customizations &amp; Experimental Features</h2>
<p>The compute clusters underlying PARASOL can host complex or novel
customizations that fall outside the normal bounds of ITS support. A
customization falls outside those bounds when, for example, installing or
integrating it may exercise untested or seldom-used features of Kubernetes,
Docker, or Linux, or when student use of it may need sophisticated technical
expertise or extensive assistance.</p>
<p>Available capabilities considered complex or experimental include:</p>
<ul>
<li>Instructor or TA containers not derived from a standard software image</li>
<li>Student-built customized containers, of any derivation</li>
<li>Background batch processing and analysis pipelines</li>
<li>MATLAB (Jupyter kernels or web UI), GNU Octave, or similar complex
  applications</li>
<li>Spark clusters</li>
<li>ArcGIS integration</li>
<li>Postgres and other persistent services</li>
</ul>
<p>Incorporating these or similar features into coursework takes significant time
from the instructor or TPOC before and during instruction: first to become
independently familiar with the underlying technologies, and then to serve as
primary support for students' use of them.</p>
<p>ITS gives technical guidance for these features but, without advance agreement,
is not responsible for implementation or usage. Schedule a
<a href="#11-consultation">1:1 Consultation</a> at least one full quarter before the
planned use to discuss feasibility.</p>
<h3 id="visual-studio-code">Visual Studio Code</h3>
<p>Visual Studio Code is not among the complex or experimental features. It is
supported and widely used. The supported configuration is Remote-SSH over a
ProxyCommand. See <a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a>.</p>
<h2 id="gpu-access-for-a-course">GPU Access for a Course</h2>
<p>From Fall 2026, a reservation system manages GPU access. See
<a href="/docs/gpu-access/index.html">GPU Access</a>. Its web app is at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>.</p>
<h3 id="quotas-and-service-unit-budgets">Quotas and Service Unit Budgets</h3>
<p>A course holds a GPU quota, the number of GPUs of each class it may hold at
once. Its students hold Service Unit (SU) budgets, which divide that capacity
across the roster. The instructor can request, by ticket, a change to the
course workspace's defaults, including its weekly budget, its booking horizon,
and its length cap. See
<a href="/docs/gpu-access/quotas-and-availability.html">Quotas, Cohorts &amp; Availability</a> and
<a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>.</p>
<h3 id="deadlines-and-the-quarterly-survey">Deadlines and the Quarterly Survey</h3>
<p>Quotas are date-aware, so a course's share can rise for the span of a project
deadline and revert afterward. See
<a href="/docs/gpu-access/quotas-and-availability.html#date-based-quota-changes">Date-Based Quota Changes</a>.
The quarterly survey asks you about assignment scope, GPU sizes, and
deadlines. Your responses allow a course's quota to rise in advance, for
example for week 9. Report assignment deadlines in the survey.
<a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> gives examples
of course work at each GPU size.</p>
<h3 id="course-calendar">Course Calendar</h3>
<p>As a workspace manager, you see every reservation in the course on the
reservation app's <strong>Group Reservations</strong> page. You can book on a student's
behalf, cancel a student's booking, and waive penalties. See
<a href="/docs/reference/managing-a-group.html">Managing a Group</a>. In a course whose roster is
loaded automatically, the instructor, TAs, and graders are all workspace
managers.</p>
<h3 id="assisting-a-student-at-the-service-unit-limit">Assisting a Student at the Service Unit Limit</h3>
<p>Request a budget change by ticket to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>. The change itself is an
administrative action. Students normally book their own windows. The other
route is to book on the student's behalf. Your booking goes through even when
the student's budget is spent, though not past the group pool or the workspace
length cap.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A booking you make on a student's behalf is charged to that student's budget.
It skips only the check that the student can afford it, so it can leave the
student over budget and block their own bookings and on-demand sessions until
the budget renews the following Monday.</p></div>
<p>See <a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a> and
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>.</p>
<h3 id="waiving-a-cancellation-charge">Waiving a Cancellation Charge</h3>
<p>A student who misses a booked window is assessed a cancellation charge. You
can waive the charge where warranted, on the <strong>Group Reservations</strong> page, when
cancelling or afterwards. See
<a href="/docs/gpu-access/service-units-and-budgets.html#having-a-charge-waived">Having a Charge Waived</a>.</p>
<h3 id="manager-reports">Manager Reports</h3>
<p>Manager reports cover reservations by group, peak simultaneous use by class,
reserved hours, and effective limits. See
<a href="/docs/reference/managing-a-group.html#what-the-reports-cover">What the Reports Cover</a>.
Three of the four reports display cluster-wide data rather than data for your
course alone.</p>
<h3 id="reservation-events">Reservation Events</h3>
<p>The reservation system reports on each student's GPU session with Kubernetes
events. Datahub shows them while a session starts, and <code>kubectl describe pod</code>
shows them from the command line. A student's question often quotes one.
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
<h3 id="advising-students">Advising Students</h3>
<p>Two conditions account for most of the student questions that reach you.
Launching a GPU session draws on the student's budget, even if no calendar is
opened. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.
A GPU session that stops using its GPU is reclaimed. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.
For students, <a href="/get-started/student-in-a-course.html">Using Datahub in a Course</a> covers both
for browser users, and
<a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a> covers them
for work that requires a terminal.</p>
<h2 id="maintenance-and-policy">Maintenance and Policy</h2>
<p>Under the
<a href="https://security.ucop.edu/policies/institutional-information-and-it-resource-classification.html">University of California classification levels</a>,
highly sensitive P4 data, such as clinical records or export-controlled
information, is prohibited on PARASOL. Legally or contractually
protected P3 data may be permitted after review. See
<a href="/docs/reference/policy.html#data-classification">Data Classification</a>.</p>
<p>Datahub may be unavailable during scheduled maintenance for time-sensitive
updates or security patches.
<a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a> gives the
schedule.</p>
<p><a href="/docs/reference/policy.html">Policy</a> gives the other conditions of use, covering shared
compute resources, availability and reliability, and appropriate use. It also
covers <a href="/docs/reference/policy.html#self-supporting-programs">Self-Supporting Programs</a>.</p>
