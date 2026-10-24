---
title: "Notebook Grading Workflow"
path: /docs/grading/notebook-grading-workflow.html
description: "Follow the nbgrader workflow for a Datahub course, from creating an assignment to importing its grades into Canvas."
eyebrow: "Grading"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/grading/notebook-grading-workflow/), preview build of 2026-09-29"
canonicalUrl: /docs/grading/notebook-grading-workflow.html
legacyUrl: https://dsmlp-docs.ucsd.edu/grading/notebook-grading-workflow/
format: html
---
<p class="lead">Follow the nbgrader workflow for a Datahub course, from creating an assignment
to importing its grades into Canvas. nbgrader runs inside Datahub from a <strong>shared
course grader account</strong>. If you have not chosen a grading tool yet, see
<a href="/docs/grading/choosing-a-grading-tool.html">Choosing a Grading Tool &amp; Interface</a>.</p>
<dl class="docs-glance">
<div><dt>Work from</dt><dd>The shared course grader account</dd></div>
<div><dt>Due dates</dt><dd>In UTC: <code>-0800</code> for PST, <code>-0700</code> for PDT</dd></div>
<div><dt>Assignment file size</dt><dd>Capped at 100MB by default</dd></div>
<div><dt>Grades to Canvas</dt><dd>Manual upload of <code>grades.csv</code></dd></div>
</dl>
<ol class="docs-flow" aria-label="From assignment to Canvas grade">
<li><span class="docs-flow-label">Create</span><strong>Add the assignment</strong><p>The staff version, with solutions and hidden tests, goes in <code>source/</code>.</p></li>
<li><span class="docs-flow-label">Release</span><strong>Generate, then release</strong><p><strong>Generate</strong> builds <code>release/</code>, with solutions stripped.</p></li>
<li><span class="docs-flow-label">Collect</span><strong>Collect after the deadline</strong><p><strong>Collect</strong> gathers what students turned in.</p></li>
<li><span class="docs-flow-label">Grade</span><strong>Autograde, then grade by hand</strong><p>Every assignment must be autograded before it can be manually graded.</p></li>
<li><span class="docs-flow-label">Export</span><strong>Export and import into Canvas</strong><p><code>nbgrader export</code> produces <code>grades.csv</code> for upload.</p></li>
</ol>
<h2 id="grader-account">Grader Account</h2>
<p>Each Datahub course is issued one shared nbgrader TA grader account, and its
credentials go to the instructor before instruction begins. <strong>nbgrader works only
from that account.</strong> An instructor's or TA's own account cannot use it.</p>
<p>To open Formgrader:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Sign in as the grader account</span><p>Sign in to <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> as the grader
account.</p></li>
<li><span class="docs-step-title">Launch the course environment</span></li>
<li><span class="docs-step-title">Open Formgrader</span><p>Open <strong>Nbgrader → Formgrader</strong>.</p></li>
</ol>
<p><a href="/docs/grading/choosing-a-grading-tool.html#interface-support-for-nbgrader">Interface Support for nbgrader</a>
lists the interfaces that support nbgrader.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Do not reset the grader account by hand</strong></p><p>The grader account is shared course infrastructure. Its local environment must
not be reset or cleaned by hand. Request any reset or cleanup in the course
ticket.</p></div>
<p><a href="/docs/grading/grading-failures.html">Common Grading Failures &amp; Recovery</a> lists known
failures of the grader environment and their recovery.</p>
<h3 id="multiple-graders">Multiple Graders</h3>
<p>There is no per-TA identity inside nbgrader. <strong>Agree on who is grading which
submissions</strong> before two people open the same submission.</p>
<h2 id="assignment-directories">Assignment Directories</h2>
<p>Work moves through four directories in the grader account's home directory,
each with the same internal structure:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Directory</th>
<th>Holds</th>
<th>Created by</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>source/</code></td>
<td>The staff version, with solutions and hidden tests</td>
<td>Course staff, when adding an assignment</td>
</tr>
<tr>
<td><code>release/</code></td>
<td>The student version, solutions stripped</td>
<td><strong>Generate</strong></td>
</tr>
<tr>
<td><em>submitted</em></td>
<td>What students turned in</td>
<td><strong>Collect</strong></td>
</tr>
<tr>
<td><code>autograded/</code></td>
<td>Graded submissions</td>
<td><strong>Autograde</strong></td>
</tr>
</tbody>
</table></div>
<h2 id="creating-an-assignment">Creating an Assignment</h2>
<ol class="docs-steps">
<li><span class="docs-step-title">Add a new assignment</span><p>In <strong>Manage Assignments</strong>, choose <strong>Add new assignment...</strong>.</p></li>
<li><span class="docs-step-title">Name it</span><p>Enter a name that follows the rules in <a href="#assignment-names">Assignment Names</a>.</p></li>
<li><span class="docs-step-title">Set the due date and time zone</span><p>Set the due date and the <strong>Timezone as UTC offset</strong>: <code>-0800</code> for PST, or
<code>-0700</code> for PDT. Due dates are in UTC.</p></li>
<li><span class="docs-step-title">Add the notebook and files</span><p>Open <code>source/{assignment_id}/</code> and add the notebook and any supporting files.</p></li>
<li><span class="docs-step-title">Rename the notebook</span><p>Rename the notebook to match the assignment name.</p></li>
</ol>
<h3 id="assignment-names">Assignment Names</h3>
<ul>
<li><strong>Omit the file extension.</strong> An assignment called <code>Assignment_1</code> creates a folder
  of that name; the notebooks inside it carry <code>.ipynb</code>.</li>
<li><strong>Use a name that is unique</strong> across every assignment the grader account has
  created, not only within the course.</li>
<li><strong>Do not use spaces.</strong> A space in the name is one of the two known causes of a
  failed export at the end of the term. See <a href="#export-failures">Export Failures</a>.</li>
</ul>
<h3 id="assignment-file-size-limit">Assignment File Size Limit</h3>
<p>Assignment file size is capped at 100MB by default. Raising the limit requires
editing <code>nbgrader_config.py</code> in the course environment. Contact ITS at
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> before raising it.</p>
<h2 id="marking-up-cells">Marking Up Cells</h2>
<p>Open the assignment notebook and turn on the nbgrader cell toolbar with
<strong>Nbgrader → Create Assignment</strong> or the panel on the right-hand side of the
notebook. In the classic interface, the toolbar is under
<strong>View → Cell Toolbar → Create Assignment</strong>. Every cell then carries a grading
control.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Cell type</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Manually graded answer</strong></td>
<td>A free response, in one cell</td>
</tr>
<tr>
<td><strong>Manually graded task</strong></td>
<td>Work the student does across cells, such as processing data and plotting it</td>
</tr>
<tr>
<td><strong>Autograded answer</strong></td>
<td>Code the student writes, tested later</td>
</tr>
<tr>
<td><strong>Autograder tests</strong></td>
<td><code>assert</code> statements that grade an autograded answer</td>
</tr>
<tr>
<td><strong>Read-only</strong></td>
<td>Anything students must not change, including test cells</td>
</tr>
</tbody>
</table></div>
<p><strong>Every marked cell needs an ID</strong>, and a point value where one applies.</p>
<h3 id="solution-and-hidden-test-regions">Solution and Hidden Test Regions</h3>
<p>Special comment lines delimit solutions and hidden tests. The region between
them is replaced when the assignment is generated:</p>
<figure class="docs-command"><figcaption>Solution and hidden test delimiters</figcaption><pre class="docs-code"><code class="language-python">### BEGIN SOLUTION
return sum(values) / len(values)
### END SOLUTION

### BEGIN HIDDEN TESTS
assert mean([2, 4]) == 3
### END HIDDEN TESTS</code></pre></figure>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Without the delimiters, the whole cell is released as-is, solutions included.</p></div>
<p>Leave at least one visible test, or a comment stating that hidden tests exist.</p>
<h3 id="copying-read-only-and-autograded-cells">Copying Read-Only and Autograded Cells</h3>
<p><strong>Do not ask students to copy a read-only or autograded cell.</strong> Copying one corrupts
the notebook's metadata and blocks autograding.
<a href="/docs/grading/grading-failures.html">Common Grading Failures &amp; Recovery</a> covers recovery.</p>
<h3 id="validating-solutions">Validating Solutions</h3>
<p>Before releasing, validate the assignment's own solutions with the
<strong>Validate</strong> button. A pop-up reports which cells failed, if any.</p>
<h2 id="generating-releasing--collecting">Generating, Releasing &amp; Collecting</h2>
<ol class="docs-steps">
<li><span class="docs-step-title">Generate</span><p>Select <strong>Generate</strong> in <strong>Manage Assignments</strong>. This creates <code>release/</code>,
mirroring <code>source/</code> with solutions stripped.</p></li>
<li><span class="docs-step-title">Preview the release version</span><p>Preview the release version and confirm that the hidden tests are hidden.</p></li>
<li><span class="docs-step-title">Release</span><p>Select <strong>Release</strong>. The button becomes an "x"; clicking it again un-releases
the assignment. Un-releasing does not recall copies that students have
already fetched.</p></li>
<li><span class="docs-step-title">Collect after the deadline</span><p>Select <strong>Collect</strong> after the deadline. A pop-up reports how many submissions
came in.</p></li>
</ol>
<h3 id="distributing-other-course-materials">Distributing Other Course Materials</h3>
<p>Course materials that are not nbgrader assignments, such as lecture notebooks
and data, are usually distributed with a <code>git-pull</code> link. The most common
failure of the link is a student clicking it before signing in.
<a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a> covers signing in.</p>
<h2 id="autograding-manual-grading--feedback">Autograding, Manual Grading &amp; Feedback</h2>
<p><strong>An assignment must be autograded before it can be manually graded.</strong> This applies
to every assignment, including one with no autograded cells.</p>
<h3 id="autograding">Autograding</h3>
<p>In <strong>Manage Assignments</strong>, click the submission count to open
<strong>Manage Submissions</strong>. Grade one submission with <strong>Autograde</strong>, or grade all of
them at once with the command line shown under the <strong>Instructions</strong> tab.
Results are written to <code>autograded/</code>.</p>
<h3 id="manual-grading">Manual Grading</h3>
<p>After autograding, each submission shows as <strong>graded</strong> or
<strong>needs manual grading</strong>. Submissions that need manual grading are worked
through in the <strong>Manual Grading</strong> tab, where per-cell comments are also added.</p>
<h3 id="feedback">Feedback</h3>
<p>Returning feedback takes two steps, and both are required.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Generate Feedback</span><p><strong>Generate Feedback</strong> builds an HTML breakdown of each student's assignment.</p></li>
<li><span class="docs-step-title">Release Feedback</span><p><strong>Release Feedback</strong> makes it visible to the student.</p></li>
</ol>
<h2 id="the-student-roster">The Student Roster</h2>
<p>The nbgrader roster updates from course enrollment through the instructional
weeks. It is not maintained by hand.</p>
<h3 id="adding-student-names">Adding Student Names</h3>
<p>Students do not appear in <strong>Manage Students</strong> until they submit something, and
then only by username. To add first and last names:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Write the roster CSV</span><p>From the login node, signed in as the grader account, run:</p>
<pre class="docs-code"><code class="language-bash">update-nbgrader -c &lt;course-id&gt;</code></pre>
<p>This writes a CSV to the grader account's home directory.</p></li>
<li><span class="docs-step-title">Check the CSV</span></li>
<li><span class="docs-step-title">Move it where the course environment can see it</span><p>Move it to a location the course environment can see. <code>workspace --list</code>
prints the course's path.</p></li>
<li><span class="docs-step-title">Import it</span><p>From a terminal inside the course environment, import it:</p>
<pre class="docs-code"><code class="language-bash">nbgrader db student import &lt;course-id&gt;-nbgrader-students.csv</code></pre></li>
</ol>
<p>Formgrader shows the names after the import.</p>
<h2 id="exporting-the-grades">Exporting the Grades</h2>
<p><strong>Grade export is manual.</strong> <code>nbgrader export</code> produces <code>grades.csv</code>, and course
staff upload that CSV to Canvas. There is no automatic route from Datahub to the
Canvas gradebook.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>Only graded work is exported. Submissions still at <strong>needs manual grading</strong>
are omitted. Complete
<a href="#autograding-manual-grading--feedback">Autograding, Manual Grading &amp; Feedback</a>
before exporting.</p></div>
<ol class="docs-steps">
<li><span class="docs-step-title">Open a terminal as the grader account</span><p>Sign in as the course grader account and open a terminal in the course
environment (<strong>File → New → Terminal</strong>).</p></li>
<li><span class="docs-step-title">Run the export</span><p>Run:</p>
<pre class="docs-code"><code class="language-bash">nbgrader export</code></pre>
<p>This writes <code>grades.csv</code> into the course home directory.</p></li>
<li><span class="docs-step-title">Download the CSV</span><p>Download <code>grades.csv</code> from the file browser.</p></li>
</ol>
<h3 id="export-failures">Export Failures</h3>
<p>Export fails for two known reasons:</p>
<ul>
<li>An assignment created with a space in its title.</li>
<li>An assignment deleted through the filesystem rather than with
<code>nbgrader db assignment remove</code>.</li>
</ul>
<p>In both cases, delete the assignment properly
and run the export again.
<a href="/docs/grading/grading-failures.html">Common Grading Failures &amp; Recovery</a> covers recovery.</p>
<h3 id="exporting-before-access-ends">Exporting Before Access Ends</h3>
<p>Access to the grader account ends on the same date as instructor and student
access to the course. See
<a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a>.</p>
<p><strong>Export grades and any other grading data that must be kept well before that
date</strong>, following
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#retrieving-work-before-access-ends">Retrieving Work Before Access Ends</a>.</p>
<h3 id="handling-the-exported-csv">Handling the Exported CSV</h3>
<p>The exported CSV, like other grading data, is student record data. Once
downloaded, it leaves the platform and is stored on a local machine. Handle and
dispose of it in line with <a href="/docs/reference/policy.html">Policy</a>.</p>
<h2 id="importing-into-canvas">Importing Into Canvas</h2>
<p>In <a href="https://canvas.ucsd.edu/">Canvas</a>, open the course, then:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Open the import</span><p>Select the <strong>Grades</strong> tab, then <strong>Actions → Import</strong>.</p></li>
<li><span class="docs-step-title">Choose the CSV</span><p>Choose the exported <code>grades.csv</code>.</p></li>
<li><span class="docs-step-title">Map unrecognized assignments</span><p>Map any assignment Canvas does not recognize. Canvas offers a
<strong>--Choose Assignment--</strong> dropdown for each unknown assignment. Pick the
matching Canvas assignment, or create one, and set the points it is worth.</p></li>
<li><span class="docs-step-title">Continue to the review screen</span><p>Select <strong>Continue</strong>. Canvas shows every student and their new grade, with
changes highlighted in red.</p></li>
<li><span class="docs-step-title">Review, then save</span><p>Review that screen, then select <strong>Save Changes</strong>.</p></li>
</ol>
<p>The highlighted rows are the grades about to change. <strong>The review screen is the
last point before Canvas writes them.</strong></p>
<p>The <a href="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-import-grades-in-the-Gradebook/ta-p/807">Canvas gradebook import documentation</a>
gives the field order Canvas expects.</p>
<h2 id="scope-of-the-canvas-integration">Scope of the Canvas Integration</h2>
<p>Canvas carries course membership into Datahub and creates teams from Canvas
groups. It does not receive grades from nbgrader or from Datahub by any
automatic route, and a Canvas account is not the account used to sign in to
Datahub.</p>
<p>Enrolled student access comes from TSS course rosters; auditors, observers, TAs,
and other course staff are added through Canvas. See
<a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a>.</p>
<h2 id="the-otter--gradescope-routes">The Otter &amp; Gradescope Routes</h2>
<p>On the Otter and Gradescope routes, grades reach Canvas through Gradescope, not
through Datahub. A course that needs automatic grade transfer uses a Gradescope
route.
<a href="/docs/grading/choosing-a-grading-tool.html">Choosing a Grading Tool &amp; Interface</a> compares the
routes.</p>
