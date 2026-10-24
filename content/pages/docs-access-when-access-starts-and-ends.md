---
title: "When Access Starts & Ends"
path: /docs/access/when-access-starts-and-ends.html
description: "Access to PARASOL is granted through a workspace rather than to an individual, and the date it opens depends on the kind of workspace (What a Workspace Is…"
eyebrow: "Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/access/when-access-starts-and-ends/), preview build of 2026-09-29"
canonicalUrl: /docs/access/when-access-starts-and-ends.html
legacyUrl: https://dsmlp-docs.ucsd.edu/access/when-access-starts-and-ends/
format: html
---
<p class="lead">Access to PARASOL is granted through a workspace rather than to an
individual, and the date it opens depends on the kind of workspace
(<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>).
After a course ends, access ends first, the course environment is purged on a
later date, and instructor and course-wide files are archived only on request.</p>
<dl class="docs-glance">
<div><dt>Students</dt><dd>Access follows the TSS roster, with no request or form</dd></div>
<div><dt>Access retained</dt><dd>One additional quarter beyond the instructional term</dd></div>
<div><dt>Purge</dt><dd>Two quarters after the course, excluding Summer</dd></div>
<div><dt>Archive</dt><dd>Instructor and course-wide files, up to 3 years, on request</dd></div>
</dl>
<h2 id="students-enrolled-in-a-course">Students Enrolled in a Course</h2>
<p>Student access follows the course roster in TSS (formerly TritonLink). No
request or form is required. An environment appears for every student enrolled
in a course that uses the platform.</p>
<p>Datahub sign-in uses standard UCSD single sign-on. See
<a href="/docs/access/datahub-in-the-browser.html#signing-in">Signing In</a>. <code>ssh</code> to the login node
takes the Active Directory username instead. See
<a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a>.</p>
<h3 id="roster-loading-and-changes">Roster Loading and Changes</h3>
<ul>
<li>Rosters are loaded into workspaces <strong>one business day before the start of the
term</strong>.</li>
<li>A TSS change, such as an add, a drop, or a section change, is reflected in
PARASOL <strong>by 10am the day following the change</strong>.</li>
</ul>
<p>Report anything still missing after that time to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<p>Waitlisted students are enrolled along with the rest of the roster. The
instructor can re-add a student removed from a waitlist as an observer.</p>
<h3 id="auditors-observers-and-concurrent-enrollment">Auditors, Observers, and Concurrent Enrollment</h3>
<p>Auditors and observers are not on the TSS roster. The instructor or TA adds them
through Canvas. Obtain the instructor's permission before requesting access as
an auditor.</p>
<p>Concurrent Enrollment students receive access through Extended Studies staff.</p>
<h3 id="late-course-requests">Late Course Requests</h3>
<p>Late course requests are lower priority and are reviewed as time permits.
Students in a course that was requested late may not gain access until as late
as 4th week.</p>
<h2 id="instructors-tas--course-staff">Instructors, TAs &amp; Course Staff</h2>
<p><a href="/get-started/instructor-or-ta.html#course-timeline">Course Timeline</a> sets out the deadline
for course requests and the date course setup and instructor access open.</p>
<p>Each course receives a shared nbgrader grader account. Formgrader works only
with that account, and instructor and TA accounts cannot be used for it.
<a href="/docs/grading/notebook-grading-workflow.html#grader-account">Grader Account</a>
describes the account.</p>
<h3 id="adding-tas-and-course-staff">Adding TAs and Course Staff</h3>
<p>The instructor adds TAs through Canvas. Departmental staff, co-instructors, and
anyone else who is not a UC San Diego student cannot be added through Canvas. To
have them added to the roster, email <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>
or follow up in the course's Service Desk ticket.</p>
<h3 id="personal-accounts-for-instructors">Personal Accounts for Instructors</h3>
<p>An instructor who needs access to evaluate the platform, or to develop a course
that does not yet exist, requests a personal account through the ITS Service
Desk instead of waiting for a course to be provisioned.</p>
<h2 id="independent-study-capstones--special-projects">Independent Study, Capstones &amp; Special Projects</h2>
<p>The following work is requested through the
<a href="https://go.ucsd.edu/2wc5gH0">Independent Study Request</a> form:</p>
<ul>
<li>For-credit independent study and research (for example, 199/299)</li>
<li>Thesis-related research</li>
<li>Certain departmentally sponsored student projects</li>
</ul>
<p>The form asks about:</p>
<ul class="docs-checklist">
<li>The project</li>
<li>Its resource requirements</li>
<li>Its sponsorship</li>
</ul>
<p>Setting up access takes <strong>up to 5 business days</strong> from the request. Non-instructional
activities such as clubs and personal projects may be approved case by case, as
resources allow.</p>
<p>The Independent Study Request form is for individuals. Access for a course is
requested separately, through the Specialized Instructional Computing Course
Request form. See <a href="/get-started/instructor-or-ta.html#course-timeline">Course Timeline</a>.</p>
<h3 id="eligibility-limits">Eligibility Limits</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Population</th>
<th>Eligibility through this route</th>
</tr>
</thead>
<tbody>
<tr>
<td>Self-supporting programs, such as MBA, MAS, and Extension</td>
<td>Eligible under the terms in <a href="/docs/reference/policy.html#self-supporting-programs">Self-Supporting Programs</a></td>
</tr>
<tr>
<td>Health Sciences departments, such as Medicine, Pharmacy, and Neurosciences</td>
<td>Datahub access may be limited by Health Sciences security restrictions. PARASOL access is unaffected.</td>
</tr>
<tr>
<td>Non-student researchers, including postdoctoral scholars</td>
<td>Not eligible. Contact Research IT Services.</td>
</tr>
</tbody>
</table></div>
<h3 id="priority-of-student-research-jobs">Priority of Student Research Jobs</h3>
<p>Student research jobs run at a lower priority than coursework. Contention is
expected during 8th-10th week and finals.</p>
<h2 id="research-labs--individual-researchers">Research Labs &amp; Individual Researchers</h2>
<p>Research IT Services curates lab and research workspaces manually, with the
potential to auto-populate from departmental staff affiliation. Research
workspaces have no roster feed and no fixed calendar. A research workspace opens
when it is provisioned, and its membership changes on request.</p>
<p>Research IT handles platform selection. Support for the Research Cluster and
Universal Scale Storage is through
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>.</p>
<h2 id="service-units-for-new-members">Service Units for New Members</h2>
<p>A new member of a workspace receives the full Service Unit (SU) budget for the
current week. The budget is not prorated for a member added late. See
<a href="/docs/gpu-access/service-units-and-budgets.html#the-size-of-a-budget">The Size of a Budget</a>.</p>
<h2 id="reporting-missing-access">Reporting Missing Access</h2>
<p>Most reports of missing access concern a roster change that has not yet reached
the time in <a href="#roster-loading-and-changes">Roster Loading and Changes</a>. A
report made after that time names:</p>
<ul class="docs-checklist">
<li>The course code</li>
<li>The system in use (Datahub or <code>dsmlp-login</code>)</li>
<li>Whether the person is enrolled, auditing, or on an independent study request</li>
</ul>
<p>See also: <a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a> ·
<a href="/docs/reference/getting-help.html">Getting Help</a></p>
<h2 id="one-additional-quarter">One Additional Quarter</h2>
<p>Instructors and students retain access for <strong>one additional quarter</strong> beyond the
instructional term, ignoring Summer for Spring courses. For a Spring course, the
additional quarter is Fall.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Course taught in</th>
<th>Access retained through</th>
<th>Access ends (current cycle)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fall 2026</td>
<td>Winter 2027</td>
<td>20 March 2027</td>
</tr>
<tr>
<td>Winter 2027</td>
<td>Spring 2027</td>
<td>19 June 2027</td>
</tr>
<tr>
<td>Spring 2027</td>
<td>Fall 2027 (Summer is not counted)</td>
<td>18 December 2027</td>
</tr>
</tbody>
</table></div>
<p>The course's shared grader account and TA access to the course environment
follow the same schedule.</p>
<h2 id="extending-access-for-an-individual">Extending Access for an Individual</h2>
<p>An extension applies to an individual account, not to the course environment.
The workspace keeps its own schedule, and the extension continues the account's
access to it.</p>
<h3 id="instructor-requests">Instructor Requests</h3>
<p>An instructor may request that individual accounts stay active longer. The
established reasons are:</p>
<ul>
<li>Incomplete grade resolution</li>
<li>Academic integrity proceedings</li>
<li>Course development</li>
<li>Hand-off to another instructor</li>
<li>Similar circumstances</li>
</ul>
<p>Submit the request by ticket or to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> <strong>before access lapses</strong>.</p>
<h3 id="students-continuing-work-after-a-course">Students Continuing Work After a Course</h3>
<p>A student continuing work after a course ends submits an
<a href="https://go.ucsd.edu/2wc5gH0">Independent Study Request</a>. The request moves the
work into an independent study context and does not extend the course.</p>
<h2 id="how-long-research-access-lasts">How Long Research Access Lasts</h2>
<p>Independent study and research access is tied to the project rather than to a
term. No expiry is published for it. Report a project that has ended or a change
of sponsorship.</p>
<p>Access to ETS resources is limited to currently registered UC San Diego
students. A change in registration status can therefore end access regardless of
the state of the project.</p>
<h2 id="effects-of-the-end-of-access">Effects of the End of Access</h2>
<p>When access ends, the course environment no longer appears among a member's
available environments, and its home directory is no longer reachable from that
account.</p>
<p>The files are not deleted at that point. The purge is a separate, later
event. See <a href="#the-retention-timeline">The Retention Timeline</a>. Instructor
and course-wide files can be archived on request. See
<a href="#archiving-on-request">Archiving on Request</a>.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Copy files out before access ends</strong></p><p>Files in a course environment become unreachable on the date access ends,
which is earlier than the purge date. Copy them out before access ends. After
that date, work in the environment can be recovered only on request to ITS.</p></div>
<p>Methods for copying files out are in
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#retrieving-work-before-access-ends">Retrieving Work Before Access Ends</a>.</p>
<h3 id="the-personal-area-after-a-course">The Personal Area After a Course</h3>
<p>The personal area, <code>private/</code>, belongs to the account rather than to a course,
and it is not removed when course access ends. It persists until the account
itself is removed:</p>
<ul>
<li>At graduation</li>
<li>At separation from the university</li>
<li>For a student, after more than two quarters without registration</li>
</ul>
<h2 id="the-retention-timeline">The Retention Timeline</h2>
<p>Course environments are purged one quarter after account deactivation, which is
two quarters after the course, excluding Summer.</p>
<ol class="docs-flow" aria-label="A course environment from the term to the purge">
<li><span class="docs-flow-label">Term</span><strong>The course runs</strong><p>Access follows the course roster.</p></li>
<li><span class="docs-flow-label">Next quarter</span><strong>Access retained</strong><p>One additional quarter, ignoring Summer for Spring courses.</p></li>
<li><span class="docs-flow-label">Access ends</span><strong>Files become unreachable</strong><p>The environment no longer appears. The files are not deleted yet.</p></li>
<li><span class="docs-flow-label">One quarter later</span><strong>Course environment purged</strong><p>Extended accounts and archived files are excluded.</p></li>
</ol>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Course taught in</th>
<th>Access ends</th>
<th>Files purged or archived</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fall 2026</td>
<td>20 March 2027</td>
<td>19 June 2027</td>
</tr>
<tr>
<td>Winter 2027</td>
<td>19 June 2027</td>
<td>18 September 2027</td>
</tr>
<tr>
<td>Spring 2027</td>
<td>18 December 2027</td>
<td>26 March 2028</td>
</tr>
</tbody>
</table></div>
<p>The purge excludes individual accounts that have been extended on request
(<a href="#extending-access-for-an-individual">Extending Access for an Individual</a>) and
instructor and course-wide files that have been archived
(<a href="#archiving-on-request">Archiving on Request</a>).</p>
<p>The purge is a lifecycle event. It is separate from routine deletion, such as
the Jupyter Trash folder, which empties itself after 7 days.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a></p>
<h2 id="archiving-on-request">Archiving on Request</h2>
<p>Instructor and course-wide files can be archived for <strong>up to 3 years</strong> on request.
Request archiving before the environment is purged, and preferably before access
ends.</p>
<p>Contact ITS to:</p>
<ul>
<li>Archive a class</li>
<li>Revive a previously archived class environment</li>
<li>Have an archive made available for download</li>
</ul>
<p>Large datasets cannot be archived. Alternatives exist for course data that must
be kept beyond its retention window. Raise the need with ITS early rather than
at the purge date.</p>
<h3 id="student-home-directories">Student Home Directories</h3>
<p>Student home directories are not archived. Archiving covers instructor and
course-wide files, and an extension covers an individual account. Neither
preserves a student's own work by default.</p>
<p>A student who needs to keep notebooks copies them out of the environment while
it is still reachable.</p>
<h2 id="session-length">Session Length</h2>
<p>Access and retention dates do not govern how long a single session runs. A job
runs for <strong>6 hours by default and up to 12 hours</strong> when that is requested at
launch. See
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>.
For runs longer than 12 hours, contact
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<p>Sessions holding a GPU are also subject to idle culling, which is not an error
and does not lose saved work. The criteria are in
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
