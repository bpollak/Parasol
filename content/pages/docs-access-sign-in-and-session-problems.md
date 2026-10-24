---
title: "Sign-In & Session Problems"
path: /docs/access/sign-in-and-session-problems.html
description: "Use this page when you cannot sign in to datahub.ucsd.edu, your course does not appear, or a session will not start."
eyebrow: "Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/access/sign-in-and-session-problems/), preview build of 2026-09-29"
canonicalUrl: /docs/access/sign-in-and-session-problems.html
legacyUrl: https://dsmlp-docs.ucsd.edu/access/sign-in-and-session-problems/
format: html
---
<p>Use this page when you cannot sign in to
<a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>, your course does not appear, or a
session will not start. Most of these failures have a self-service remedy.</p>
<h2 id="campus-sign-in-failures">Campus Sign-In Failures</h2>
<p>Datahub sign-in is standard UCSD single sign-on. An account that cannot get past
the campus sign-in page has a campus credential problem, not a Datahub problem,
and the <a href="https://support.ucsd.edu/">ITS Service Desk</a> handles it.</p>
<h2 id="missing-course">Missing Course</h2>
<p>Sign-in succeeds, but the expected course does not appear. A missing course is a
provisioning matter, not an access fault.</p>
<h3 id="roster-loading-and-tss-changes">Roster Loading and TSS Changes</h3>
<p>Rosters are loaded into workspaces one business day before the start of the
term, and a TSS change, such as an add, a drop, or a section change, is
reflected in PARASOL by 10am the day following the change. A course
that is not listed before those times has not been loaded yet. Report a course
that is still missing after that time to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.
<a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a>
describes roster provisioning.</p>
<h3 id="roster-checks-by-course-staff">Roster Checks by Course Staff</h3>
<p>The instructor or TA is the first contact for a course matter. Course staff can
see the roster and can tell a student who is not yet enrolled from one who is
enrolled but not provisioned. Auditors, observers, and Extended Studies students
are not on the TSS roster that the automatic setup uses, and the instructor adds
them through Canvas. See
<a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a>.</p>
<h3 id="access-outside-a-course">Access Outside a Course</h3>
<p>No roster grants access for an independent study, a capstone, or a personal
project. Access for this work is obtained by request. See
<a href="/get-started/student-project.html">Projects &amp; Independent Study</a>.</p>
<h2 id="spawn-failed">"Spawn Failed"</h2>
<p>The account is signed in and an environment has been selected, but the
environment does not start. How long the failure takes to appear narrows down
the cause:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>When the failure appears</th>
<th>Possible causes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Within moments of the start</td>
<td>A full disk quota, or a broken package in <code>.local/lib</code></td>
</tr>
<tr>
<td>After a long wait</td>
<td>A busy cluster, or a slow download of the environment's image</td>
</tr>
</tbody>
</table></div>
<p>A stale profile can also stop a session from starting. The manual resetter
clears it.</p>
<h3 id="full-disk-quota">Full Disk Quota</h3>
<p>A full disk quota prevents a session from starting and produces no error
message. The quota is shown at
<a href="https://datahub.ucsd.edu/hub/spawn">datahub.ucsd.edu/hub/spawn</a> → <strong>Services</strong> →
<strong>disk-quota-service</strong>.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
describes storage quotas.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#recovering-from-a-full-quota">Recovering from a Full Quota</a></p>
<h3 id="broken-package-in-local">Broken Package in <code>.local</code></h3>
<p>Packages under <code>.local/lib/python3.x/site-packages</code> load ahead of the packages
the image provides, and one incompatible package can stop a notebook from
starting. Move them aside from a terminal:</p>
<pre class="docs-code"><code class="language-bash">ssh USERNAME@dsmlp-login.ucsd.edu
workspace --list                  # the workspaces available to the account
workspace -c COURSE_ID            # enter the course workspace
mv .local/lib .local/lib.old      # move the offending packages aside</code></pre>
<p>Install packages into a virtual environment rather than into <code>.local</code>.
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a>
describes installing packages.</p>
<h3 id="busy-cluster">Busy Cluster</h3>
<p>On a busy cluster, a session can wait for CPU, memory, or a GPU until the start
fails. A GPU session started without a booking also waits for an on-demand
lease, which may not be granted in time. Start the session again later. See
<a href="/docs/gpu-access/quotas-and-availability.html#when-the-cluster-is-full">When the Cluster Is Full</a>.</p>
<h3 id="slow-image-download">Slow Image Download</h3>
<p>A session cannot start until its environment's image is on the cluster. When
the image has to be downloaded in full, the start can fail before the download
finishes. A full download of the <code>scipy-ml-notebook</code> image can take about 20
minutes. Start the session again later.</p>
<h3 id="stale-profile-and-the-manual-resetter">Stale Profile and the Manual Resetter</h3>
<p>The <strong>manual resetter</strong> is provided for a stale profile. It stops any running
servers, signs the account out, and resets the profile. Files are preserved.</p>
<ol>
<li>Open <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>.</li>
<li>Open the <strong>services</strong> dropdown and choose <strong>manual-resetter</strong>.</li>
<li>Click reset.</li>
</ol>
<p>The manual resetter also stops a running session that cannot be reached from
the browser.</p>
<h3 id="unexplained-spawn-failures">Unexplained Spawn Failures</h3>
<p>Report a spawn failure that none of these causes explains, with the time and
the course. See <a href="#reporting-a-problem">Reporting a Problem</a>.</p>
<h2 id="links-clicked-before-sign-in">Links Clicked Before Sign-In</h2>
<p>Course materials are often distributed by a link that fetches a repository into
the course environment:</p>
<pre class="docs-code"><code class="language-text">https://datahub.ucsd.edu/hub/user-redirect/git-pull?repo=&lt;url-encoded&gt;&amp;urlpath=tree%2F&lt;dir&gt;%2F&amp;branch=main</code></pre>
<p>The most common failure of such a link is a click before sign-in. The link needs
a signed-in session to redirect into. Without one, it fails in a way that
resembles a broken link.</p>
<p>To open the link:</p>
<ol>
<li>Sign in at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>.</li>
<li>Start the course environment.</li>
<li>Click the link.</li>
</ol>
<p>Clicking a failed link again after signing in also works.</p>
<p>See also: <a href="/docs/grading/index.html">Grading</a></p>
<h2 id="launches-refused-by-the-cluster">Launches Refused by the Cluster</h2>
<h3 id="gpu-held-by-an-existing-pod">GPU Held by an Existing Pod</h3>
<p>A launch that reports an exceeded GPU quota indicates that a pod on the same
account already holds the requested GPU. The earlier pod is usually terminating
and clears within a minute or two. If it does not clear, delete it from the
login node:</p>
<pre class="docs-code"><code class="language-bash">ssh USERNAME@dsmlp-login.ucsd.edu
kubectl get pods
kubectl delete pod &lt;pod-id&gt;</code></pre>
<h3 id="aggregate-resource-limits">Aggregate Resource Limits</h3>
<p>Concurrent sessions are permitted, but their combined CPU, memory, and GPU must
fit within the Kubernetes limits on the namespace and, for GPUs, within the
reservation system's limits. A launch that would take the total past those
limits is refused. The remedy is to stop a session or job that is no longer in
use. No request is required.
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>
describes running several jobs together.</p>
<h3 id="504-error-after-a-crash">504 Error After a Crash</h3>
<p>A notebook that exhausts its memory or runs an infinite loop can take its pod
down. The hub then returns a 504 error until it detects the failure and resets.
To recover:</p>
<ol>
<li>Delete the pod with <code>kubectl delete pod</code>. This shortens the wait for the hub
   to reset. See <a href="#gpu-held-by-an-existing-pod">GPU Held by an Existing Pod</a>.</li>
<li>Run the manual resetter. See
   <a href="#stale-profile-and-the-manual-resetter">Stale Profile and the Manual Resetter</a>.</li>
<li>Start the session again.</li>
</ol>
<p><a href="/docs/reference/error-messages.html">Error Messages</a> lists error messages and their
causes.</p>
<h3 id="sessions-left-running-after-sign-out">Sessions Left Running After Sign-Out</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Logging out, closing the tab, and closing a laptop leave the container running
and holding its resources.</p></div>
<p>Stop the session with <strong>File → Hub Control Panel → Stop My Server</strong>. See
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p>
<h2 id="reservation-app-sign-in">Reservation App Sign-In</h2>
<p>The reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a> uses UCSD single
sign-on, like Datahub, but keeps its own session.</p>
<h3 id="expired-reservation-app-sessions">Expired Reservation App Sessions</h3>
<p>A reservation app session ends after 8 hours without use, and 24 hours after
sign-in in any case. The app then returns to its login page with the notice
<code>Your session has expired. Please sign in again.</code> A booking that was being made
in the wizard is lost. Sign in again and start the booking again.</p>
<p><strong>Log out everywhere</strong> ends the session on every device at once. Each other
device shows the same notice at its next request to the app, such as opening
another of the app's pages. The device where <strong>Log out everywhere</strong> was selected
returns to the login page with no notice.</p>
<h3 id="sign-in-failure-notices">Sign-In Failure Notices</h3>
<p>A failed sign-in returns to the login page with one of these notices:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Notice</th>
<th>Meaning</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Your sign-in attempt expired or was started in another browser window. Please try again.</code></td>
<td>Sign-in took more than 10 minutes, or <strong>Back</strong> or <strong>Refresh</strong> was used during it</td>
<td>Start again from the login page</td>
</tr>
<tr>
<td><code>Your sign-in provider did not complete the sign-in. Please try again.</code></td>
<td>Campus sign-in did not complete</td>
<td>Start again from the login page. If it happens again, write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
<tr>
<td><code>Your sign-in provider did not return your account details. Please try again, and contact an administrator if this keeps happening.</code></td>
<td>Campus sign-in completed but did not pass the account to the app</td>
<td>Start again from the login page. If it happens again, write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
<tr>
<td><code>Your account's domain is not permitted to use this service.</code></td>
<td>A non-UCSD account was used</td>
<td>Sign in with a UCSD account</td>
</tr>
<tr>
<td><code>Your account has been deactivated. Contact an administrator if you believe this is a mistake.</code></td>
<td>The reservation app account is deactivated</td>
<td>Write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
<tr>
<td><code>Sign-in failed. Please try again.</code></td>
<td>Sign-in failed for another reason</td>
<td>Start again from the login page. If it happens again, write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
</tbody>
</table></div>
<h3 id="form-errors-in-the-reservation-app">Form Errors in the Reservation App</h3>
<p>When the app rejects a value sent from a form, the message names the field and
the problem, as <code>field: problem</code>. The app joins several problems with <code>;</code>. For
example, a blank <strong>GPU Count</strong> in the <strong>New Reservation</strong> form on
<strong>Group Reservations</strong> gives <code>gpu_count: Input should be a valid integer</code>.
Correct the named field and try again.</p>
<h2 id="end-of-course-access">End of Course Access</h2>
<p>Course access is retained for a period beyond the term the course ran in. See
<a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a>.
After that period, the course no longer appears, and its absence is not a fault.
Files remain retrievable for a period afterward, and an extension can be
requested.
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#retrieving-work-before-access-ends">Retrieving Work Before Access Ends</a>
describes copying files out.</p>
<h2 id="reporting-a-problem">Reporting a Problem</h2>
<p>Raise course matters with the instructor or TA first. For platform matters,
email <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> or file a ticket with the
<a href="https://support.ucsd.edu/">ITS Service Desk</a>. A report includes the following
details:</p>
<ul>
<li>The course</li>
<li>The system in use (Datahub or <code>dsmlp-login</code>)</li>
<li>The environment name</li>
<li>The exact command, if there was one</li>
<li>A screenshot</li>
</ul>
<p><a href="/docs/reference/getting-help.html#response-targets">Response Targets</a> lists response
targets for individual issues.</p>
