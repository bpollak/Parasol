---
title: "Using Datahub in a Course"
path: /get-started/student-in-a-course.html
description: "This page is for students whose course uses Datahub, working entirely in a web browser at datahub.ucsd.edu."
eyebrow: "Get started"
lastReviewed: 2026-09-29
audiences: [students]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/student-in-a-course/), preview build of 2026-09-29"
canonicalUrl: /get-started/student-in-a-course.html
legacyUrl: https://dsmlp-docs.ucsd.edu/student-in-a-course/
format: html
---
<p>This page is for students whose course uses Datahub, working entirely in a
web browser at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>. If you are not
enrolled in such a course, start at <a href="/about/how-parasol-works.html#where-to-begin">Where to Begin</a>.</p>
<h2 id="signing-in">Signing In</h2>
<ol>
<li>Go to <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> and sign in through
   <strong>UCSD single sign-on</strong> with your campus credentials. Duo applies. Datahub
   has no separate credentials.</li>
<li>Select the course. If you are enrolled in more than one course that uses
   Datahub, each course is listed separately. See
   <a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>.</li>
<li>Select an environment. Your instructor decides what appears in this menu.
   Most courses offer one CPU option and, where the course uses them, a GPU
   option.</li>
<li>Wait for the environment to start. A launch can take a minute or two, and
   longer when the cluster is busy.</li>
</ol>
<p><img alt="The Select Your Notebook Environment page. Two options are listed, each naming a course, its instructor and its term, with the image and its size below, 2 CPU and 8G RAM. A Launch Environment button sits below the list." src="/_images/docs/datahub-spawn-menu.png" class="img-responsive docs-figure"></p>
<p>Your files are in the file browser on the left, and they persist between
sessions.</p>
<h2 id="starting-and-stopping-sessions">Starting and Stopping Sessions</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Signing out or closing the tab does not stop your session. The container
keeps running and holding its resources, including its GPU if it has one. To
stop it, select <strong>File → Hub Control Panel → Stop My Server</strong>.</p></div>
<p>A session also ends on its own when it reaches its time limit, and a GPU
session ends when you leave it idle. Saved files persist when a session ends;
unsaved work is lost. Stopping your session is also how you release a GPU you
have finished with. See
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p>
<h3 id="one-datahub-session">One Datahub Session</h3>
<p>You can have one Datahub session running at a time. To start a different
course environment, stop the running one with
<strong>File → Hub Control Panel → Stop My Server</strong>. The limit applies only to
Datahub: work you launch from a terminal runs alongside it. See
<a href="/docs/access/datahub-in-the-browser.html#concurrent-datahub-sessions">Concurrent Datahub Sessions</a>.</p>
<h2 id="sign-in-and-startup-failures">Sign-In and Startup Failures</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Usual cause</th>
</tr>
</thead>
<tbody>
<tr>
<td>Your course is not listed</td>
<td>Your enrollment has not propagated yet. Your instructor can check the roster. See <a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a></td>
</tr>
<tr>
<td>Sign-in fails at the campus sign-on page</td>
<td>A campus credential or Duo problem rather than a Datahub one. The <a href="https://support.ucsd.edu/">ITS Service Desk</a> handles it</td>
</tr>
<tr>
<td>"Spawn failed", or the spinner never completes</td>
<td>A failure within moments can come from a full disk quota or a broken package you installed into your own <code>.local</code>. A failure after a long wait can come from a busy cluster or a slow download of the environment's image. A stale profile can also prevent a start, and the <strong>manual resetter</strong> under the services dropdown clears it. See <a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a></td>
</tr>
<tr>
<td>Everything loads but your files are missing</td>
<td>Your session may be in a different course's workspace than you intended. Check which course you selected</td>
</tr>
</tbody>
</table></div>
<p>See also: <a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a></p>
<h2 id="working-in-the-course-environment">Working in the Course Environment</h2>
<h3 id="session-resources">Session Resources</h3>
<p>Your course session typically begins at 2 CPU cores and 4GB RAM of its own.
Upper limits depend on class size, demand, and capacity. See
<a href="/docs/access/datahub-in-the-browser.html#the-browser-session">The Browser Session</a>.</p>
<h3 id="directories">Directories</h3>
<p>Your home directory is private to you and specific to one course. A shared
area that everyone in the course can read is where datasets and starter
notebooks usually appear. A private area follows you into every course you
take. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>.</p>
<h3 id="storage-quota">Storage Quota</h3>
<p>Your course home directory holds notebooks and modest data. Use a large
dataset from the shared area rather than making a personal copy.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
gives the quota sizes.</p>
<h3 id="installing-packages">Installing Packages</h3>
<p>You can install Python packages into your own environment.
<a href="/docs/environments/customizing-your-environment.html#installing-python-packages-into-a-private-kernel">Installing Python Packages Into a Private Kernel</a>
gives the steps. You cannot install system-level packages, because containers
run unprivileged. If your course needs a system library, ask the instructor to
request it. See
<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>.</p>
<h3 id="moving-files">Moving Files</h3>
<p>Drag and drop in the file browser handles small files. For larger transfers,
see <a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a>.</p>
<h2 id="assignments">Assignments</h2>
<p>Most courses distribute, collect, and grade notebooks with tools built into
the environment. Your instructor tells you which tool the course uses and how
to fetch and submit work. If an assignment will not fetch or submit, report it
to your instructor or TA before opening a ticket.</p>
<p>See also: <a href="/docs/grading/index.html">Grading</a></p>
<h2 id="using-a-gpu">Using a GPU</h2>
<p>If your course offers a GPU option, selecting it is all you need to do.</p>
<h3 id="service-unit-budget">Service Unit Budget</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Starting a GPU session books capacity and draws on your Service Unit (SU)
budget for the course, even if you do not use the reservation calendar.
Launching the session is what authorizes that spend, and a session you leave
running costs the same as one you are using.</p></div>
<p>Your course budget renews each week, and you book your own windows. If your
budget runs out, ask your instructor or TA. They can request an increase, or
book a window on your behalf. A booking they make on your behalf is still
charged to your own budget, and can leave it overdrawn until it renews. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>
and <a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>.</p>
<h3 id="idle-gpu-sessions">Idle GPU Sessions</h3>
<p>If your GPU session stops using its GPU, it is reclaimed after a period of
idleness. A warning comes first. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
<h3 id="reservations">Reservations</h3>
<p>If you need a GPU at a known time, reserve one in the reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>. A reservation
guarantees access, not a running job. Launch your notebook as usual, and it
goes onto the reserved capacity ahead of the walk-up queue. See
<a href="/docs/gpu-access/reservations.html">Reservations</a>.</p>
<p>If you miss the start of a booked window, you can still claim it within a short
grace period. After that, the reservation is cancelled, the capacity returns to
the pool, and a cancellation charge applies. The same happens when your session stops
partway through a booking and you do not restart it within about 30 minutes.
Your instructor or TA can waive the charge where warranted. Cancelling at least
24 hours ahead costs nothing; a later cancellation keeps part of the cost. See
<a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a> and
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>.</p>
<h3 id="reservation-events">Reservation Events</h3>
<p>The reservation system reports on your GPU session with Kubernetes events.
Datahub shows them while a session starts, and <code>kubectl describe pod</code> shows
them from the command line.
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
<h2 id="problems-in-a-running-session">Problems in a Running Session</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Cause and remedy</th>
</tr>
</thead>
<tbody>
<tr>
<td>The kernel keeps dying on a large dataset</td>
<td>Out of memory. Load less at a time, or ask your instructor whether a larger option is available</td>
</tr>
<tr>
<td>The notebook is slow and unresponsive</td>
<td>Check what else you have open. Every notebook holds its own kernel and its own memory</td>
</tr>
<tr>
<td><code>[Errno 122] Disk quota exceeded</code> when saving</td>
<td>Your storage quota is full. See <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#common-causes-of-a-full-quota">Common Causes of a Full Quota</a></td>
</tr>
<tr>
<td>Your session ended while you were away</td>
<td>Expected when a session reaches its time limit, or when you leave a GPU session idle. See <a href="#starting-and-stopping-sessions">Starting and Stopping Sessions</a> and <a href="#idle-gpu-sessions">Idle GPU Sessions</a></td>
</tr>
<tr>
<td>GPU code reports no device found</td>
<td>Your session may not have a GPU. Check which environment you selected</td>
</tr>
</tbody>
</table></div>
<p>For problems that need a terminal to diagnose, see
<a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a>.</p>
<p>See also: <a href="/docs/reference/error-messages.html">Error Messages</a></p>
<h2 id="duration-of-access">Duration of Access</h2>
<p>You keep access for one additional quarter beyond the term in which the course
ran: a Fall course stays available through the end of Winter. Summer does not
count against a Spring course. Retrieve anything you need before that period
ends. See
<a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a>.</p>
<h2 id="maintenance-and-policy">Maintenance and Policy</h2>
<p>Datahub may be unavailable during scheduled maintenance for time-sensitive
updates or security patches.
<a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a> gives the
schedule. <a href="/docs/reference/policy.html">Policy</a> gives the rules on acceptable use and
data classification.</p>
<h2 id="work-that-requires-a-terminal">Work That Requires a Terminal</h2>
<p><a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a> covers SSH,
<code>launch.sh</code>, background and batch jobs, VS Code, and GPU classes that a course
menu does not offer. Command-line work uses the same course access. There is no
eligibility requirement, and you have nothing to request.</p>
<h2 id="support">Support</h2>
<p>Take course questions, such as assignments, packages your course needs, and
the environment your course provides, to your instructor or TA. They are the
first tier of support. Take platform problems, such as being unable to sign in
or the service behaving differently than documented, to the
<a href="https://support.ucsd.edu/">ITS Service Desk</a> or
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>. In a ticket, name the course, say
what you were doing, give the exact error, and include a screenshot.</p>
<p>See also: <a href="/docs/reference/getting-help.html#response-targets">Response Targets</a>, <a href="/docs/reference/getting-help.html">Getting Help</a></p>
