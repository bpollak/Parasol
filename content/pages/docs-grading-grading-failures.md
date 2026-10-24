---
title: "Common Grading Failures & Recovery"
path: /docs/grading/grading-failures.html
description: "Look up a grading problem in an nbgrader course by its symptom, such as a notebook that will not validate, a failed export, or a missing submission, and…"
eyebrow: "Grading"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/grading/grading-failures/), preview build of 2026-09-29"
canonicalUrl: /docs/grading/grading-failures.html
legacyUrl: https://dsmlp-docs.ucsd.edu/grading/grading-failures/
format: html
---
<p>Look up a grading problem in an nbgrader course by its symptom, such as a
notebook that will not validate, a failed export, or a missing submission, and
follow the recovery for its cause.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Section</th>
</tr>
</thead>
<tbody>
<tr>
<td>"Failed to validate", "source of the following cell has changed", corrupt metadata</td>
<td><a href="#validation--metadata-errors">Validation &amp; Metadata Errors</a></td>
</tr>
<tr>
<td><code>nbgrader export</code> fails</td>
<td><a href="#export-failures">Export Failures</a></td>
</tr>
<tr>
<td>"Database locked"</td>
<td><a href="#database-locked-error">Database Locked Error</a></td>
</tr>
<tr>
<td>Stale courses in the assignment list</td>
<td><a href="#stale-courses-in-the-assignment-list">Stale Courses in the Assignment List</a></td>
</tr>
<tr>
<td>A broken grader environment after a package install</td>
<td><a href="#broken-grader-environment-after-a-package-install">Broken Grader Environment After a Package Install</a></td>
</tr>
<tr>
<td>A submission or a student is missing</td>
<td><a href="#missing-submissions--missing-students">Missing Submissions &amp; Missing Students</a></td>
</tr>
<tr>
<td>An assignment cannot be manually graded</td>
<td><a href="#manual-grading-before-autograding">Manual Grading Before Autograding</a></td>
</tr>
<tr>
<td>Large files did not come through</td>
<td><a href="#assignment-file-size-cap">Assignment File Size Cap</a></td>
</tr>
<tr>
<td>No Formgrader, no assignment list</td>
<td><a href="#missing-formgrader-menu-or-assignment-list">Missing Formgrader Menu or Assignment List</a></td>
</tr>
<tr>
<td>A distribution link does nothing</td>
<td><a href="#unresponsive-distribution-links">Unresponsive Distribution Links</a></td>
</tr>
<tr>
<td>An assignment name is rejected as a duplicate</td>
<td><a href="#duplicate-assignment-names">Duplicate Assignment Names</a></td>
</tr>
</tbody>
</table></div>
<h2 id="validation--metadata-errors">Validation &amp; Metadata Errors</h2>
<p>A student cannot validate, the notebook reports that "the source of the
following cell has changed", a submission cannot be autograded because its
metadata is corrupt, or validation fails with a message about a required field.</p>
<p>The cause is a read-only or autograded cell that was copied, edited, or
deleted. nbgrader restores read-only cells from the original, and copies of
them break the mapping between the notebook and the assignment. This is
upstream nbgrader behavior, not a platform fault, and no platform-side fix
exists.</p>
<h3 id="recovering-the-notebook">Recovering the Notebook</h3>
<p>The student performs these steps:</p>
<ol>
<li>Rename the existing notebook, adding <code>-corrupted</code> to the filename, and
   download a copy as a fallback.</li>
<li>Re-fetch the assignment from the assignment list. The student's files then
   hold both copies.</li>
<li>Open both notebooks and copy the answers into the fresh notebook.</li>
<li>Re-submit.</li>
</ol>
<p>The grader then re-collects the assignment in Formgrader.</p>
<h3 id="preventing-copied-cells">Preventing Copied Cells</h3>
<p>Do not ask students to copy cells the course provided. State in the assignment
that adding cells is permitted and that duplicating the provided cells is not.</p>
<p>See also: <a href="/docs/grading/notebook-grading-workflow.html">Notebook Grading Workflow</a></p>
<h2 id="export-failures">Export Failures</h2>
<p>An <code>nbgrader export</code> failure typically occurs at the end of the term. Two
causes are known, both related to how an assignment was named or removed:</p>
<ul>
<li>A space in the assignment title. Name assignments without spaces.</li>
<li>An assignment deleted through the filesystem rather than with
  <code>nbgrader db assignment remove</code>. The database and the directories then
  disagree.</li>
</ul>
<p>To recover, delete the assignment with <code>nbgrader db assignment remove</code> and run
the export again. See
<a href="/docs/grading/notebook-grading-workflow.html#exporting-the-grades">Exporting the Grades</a>.</p>
<h2 id="grader-environment-failures">Grader Environment Failures</h2>
<h3 id="database-locked-error">Database Locked Error</h3>
<p>To clear a "Database locked" error:</p>
<ol>
<li>
<p>From a terminal in the course environment, run:</p>
<pre class="docs-code"><code class="language-bash">rm ~/.local/share/jupyter/nbsignatures.db</code></pre>
</li>
<li>
<p>Close the terminal.</p>
</li>
<li>Stop the server with <strong>File → Hub Control Panel → Stop My Server</strong>.</li>
<li>Start the server again.</li>
</ol>
<h3 id="stale-courses-in-the-assignment-list">Stale Courses in the Assignment List</h3>
<p>Old courses appear in the assignment list because nbgrader caches previously
used courses. To remove an old course, delete its directory from the cache:</p>
<pre class="docs-code"><code class="language-bash">cd ~/.local/share/jupyter/nbgrader_cache
ls -al
rm -r &lt;old_course_directory&gt;</code></pre>
<h3 id="broken-grader-environment-after-a-package-install">Broken Grader Environment After a Package Install</h3>
<p>For an individual account, the standard fixes are clearing <code>.local</code> and running
the manual resetter.
<a href="/docs/environments/customizing-your-environment.html#recovering-a-broken-environment">Recovering a Broken Environment</a>
describes the first.
<a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a>
describes the second. For
the shared grader account, raise the problem in the course support ticket
instead.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>The shared grader account holds the course's nbgrader state. Clearing that
account's environment by hand can destroy the course's grading.</p></div>
<h2 id="missing-submissions--missing-students">Missing Submissions &amp; Missing Students</h2>
<h3 id="student-missing-from-manage-students">Student Missing from Manage Students</h3>
<p>Students appear in <strong>Manage Students</strong> only after they have submitted
something, and then by username alone. Names are imported separately. See
<a href="/docs/grading/notebook-grading-workflow.html#the-student-roster">The Student Roster</a>.</p>
<h3 id="uncollected-submissions">Uncollected Submissions</h3>
<p>When a student reports a submission and nothing was collected, confirm three
things with the student:</p>
<ul>
<li>The student clicked <strong>Submit</strong> rather than only saving.</li>
<li>The assignment appears in the student's list of submitted assignments.</li>
<li>The student is looking at the same assignment that was collected.</li>
</ul>
<p>Repeat submissions are permitted. Only the most recent submission is available
to course staff, including a late one.</p>
<h3 id="manual-grading-before-autograding">Manual Grading Before Autograding</h3>
<p>An assignment cannot be manually graded until it has been autograded. Every
assignment must go through the autograder first, including an assignment with
no autograded cells.</p>
<h3 id="assignment-file-size-cap">Assignment File Size Cap</h3>
<p>A default cap on assignment file size can keep large files from coming
through. Raising the cap requires changing the nbgrader configuration in the
course environment. Request the change from ITS rather than editing the
configuration directly.</p>
<h2 id="missing-formgrader-menu-or-assignment-list">Missing Formgrader Menu or Assignment List</h2>
<p>A missing Formgrader menu has two causes. Check them in order of likelihood:</p>
<ol>
<li>The account. nbgrader works only from the shared course grader account,
   never from an instructor's or TA's own account.</li>
<li>The interface. NBClassic does not carry the nbgrader extension.
   <a href="/docs/grading/choosing-a-grading-tool.html#interface-support-for-nbgrader">Interface Support for nbgrader</a>
   lists the interfaces that support grading.</li>
</ol>
<h2 id="unresponsive-distribution-links">Unresponsive Distribution Links</h2>
<p>A <code>git-pull</code> distribution link clicked before signing in fails silently. Sign
in at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> first, then click the link
again. The sign-in steps are in
<a href="/docs/access/datahub-in-the-browser.html#signing-in">Signing In</a>.</p>
<h2 id="duplicate-assignment-names">Duplicate Assignment Names</h2>
<p>An assignment name is rejected as a duplicate when it is not unique. nbgrader
requires assignment names to be unique across every assignment the grader
account has created, not only within one course.</p>
<h2 id="opening-a-support-ticket">Opening a Support Ticket</h2>
<p>Instructors and TAs open a ticket for any problem that touches the shared
grader account, the course database, or a deadline. Incidents at a critical
point in the term are handled with more urgency than routine requests. State
the critical timing in the ticket. <a href="/docs/reference/getting-help.html">Getting Help</a>
lists support contacts and response targets.</p>
<p>Students contact the course instructor or TA first. The instructor or TA can
reproduce the problem and escalate it to ITS with the course context attached.</p>
