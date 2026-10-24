---
title: "Error Messages"
path: /docs/reference/error-messages.html
description: "Look up an error message or symptom by where you saw it, from signing in to the output of your own code, and find its cause and fix."
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/error-messages/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/error-messages.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/error-messages/
format: html
---
<p class="lead">Look up an error message or symptom by where you saw it, from signing in to the
output of your own code, and find its cause and fix. An idle-culled session, a
<code>DeadlineExceeded</code> status, and a refused <code>sudo</code> are expected platform behavior,
not faults.</p>
<h2 id="signing-in--starting-a-session">Signing In &amp; Starting a Session</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Cause</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td>The campus sign-on page returns repeatedly</td>
<td>A campus credential or Duo problem. Datahub uses standard UCSD single sign-on</td>
<td>The <a href="https://support.ucsd.edu/">ITS Service Desk</a> handles it</td>
</tr>
<tr>
<td><strong>Spawn failed</strong> within moments of the start</td>
<td>A full disk quota. A full quota prevents a session from starting and produces no message stating the cause</td>
<td>Check <strong>Services → disk-quota-service</strong>, then clear space. See <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#recovering-from-a-full-quota">Recovering from a Full Quota</a></td>
</tr>
<tr>
<td><strong>Spawn failed</strong> within moments of the start, and the quota is fine</td>
<td>A package in the account's own <code>.local/lib</code>, often from a <code>pip install</code>, loads ahead of the image's version and breaks the environment</td>
<td>From a terminal, run <code>mv .local/lib .local/lib.old</code>. See <a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a></td>
</tr>
<tr>
<td><strong>Spawn failed</strong> after a long wait</td>
<td>A busy cluster, or a slow download of the environment's image</td>
<td>Start the session again later. See <a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a></td>
</tr>
<tr>
<td><strong>Spawn failed</strong>, and none of these applies</td>
<td>A stale profile</td>
<td>Run <strong>manual-resetter</strong> from the services dropdown. It stops the account's servers, signs the account out, and resets the profile. Files are preserved. See <a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a></td>
</tr>
<tr>
<td>The course is not in the list</td>
<td>A provisioning matter, not an access fault. Rosters load one business day before the term, and a TSS change appears by 10am the following day</td>
<td>Ask the instructor or TA to confirm the roster. See <a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a></td>
</tr>
<tr>
<td>A <strong>504</strong> shortly after a crash</td>
<td>The pod stopped, from an infinite loop or from running out of memory, and the hub has not yet detected it</td>
<td>Run <code>kubectl delete pod &lt;pod-id&gt;</code> from the login node, then run <strong>manual-resetter</strong></td>
</tr>
<tr>
<td>A course <code>git-pull</code> link fails and appears broken</td>
<td>The link was clicked before the student signed in. The link needs a session to redirect into</td>
<td>Sign in, start the environment, then click the link again</td>
</tr>
<tr>
<td>"database is locked" in a notebook</td>
<td>A stale notebook signature database</td>
<td>From a terminal, run <code>rm ~/.local/share/jupyter/nbsignatures.db</code>, then stop and restart the server</td>
</tr>
</tbody>
</table></div>
<h3 id="stopping-a-session">Stopping a Session</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Closing the tab, closing the laptop, and signing out all leave the container
running and holding its resources. Stop a session with
<strong>File → Hub Control Panel → Stop My Server</strong>. See
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p></div>
<h2 id="launching-from-the-command-line">Launching From the Command Line</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Cause</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td>A GPU pod sits at <code>Pending</code> with a <code>FailedScheduling</code> event beginning <strong><code>0/N nodes are available</code></strong></td>
<td>Normal while the reservation system decides on the pod. The reason is in the event from <code>gpu-reservation-controller</code> beside it</td>
<td>Read the events in <code>kubectl describe pod</code>; see <a href="/docs/reference/reservation-events.html">Reservation Events</a>. With no such event and no <code>gpu-class</code> label, the label is missing; see <a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a></td>
</tr>
<tr>
<td><strong>"GPU quota exceeded. Wanted 1 but with 1 already in use, the quota of 1 would be exceeded"</strong></td>
<td>Another pod on the same account already holds the GPU</td>
<td>The earlier pod is usually terminating and clears within a minute or two. If it does not clear, run <code>kubectl get pods</code>, then <code>kubectl delete pod &lt;pod-id&gt;</code></td>
</tr>
<tr>
<td>The launcher rejects one of the program's own options</td>
<td>A missing <code>--</code>. The launcher reads everything before <code>--</code> as a launcher flag</td>
<td>Place <code>--</code> between the launcher flags and the program: <code>launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- python train.py --epochs 50</code></td>
</tr>
<tr>
<td>A GPU was requested and none arrived</td>
<td><code>-G</code> where <code>-g</code> was meant. <code>-g 1</code> is one GPU; <code>-G 1</code> is a team ID</td>
<td>Use <code>-g</code> for the GPU count. The failure does not mention capitalization. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-and-gpu-selection-flags">Resource and GPU Selection Flags</a></td>
</tr>
<tr>
<td>An <code>-n</code> node selection lands somewhere else</td>
<td><code>-n</code> takes a bare node number</td>
<td>Pass the number alone: <code>-n 30</code>, not <code>-n n30</code>. The leading <code>n</code> on the status page is not part of the value. Use <code>-n</code> only for a session launched without a booking; see <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a></td>
</tr>
<tr>
<td>A GPU launch with <code>-v</code> waits in <code>Pending</code> with no reservation event</td>
<td><code>-v</code> was passed without <code>-l gpu-class=</code>. <code>-v</code> narrows a GPU class to one model and does not replace the class label</td>
<td>Delete the pod and launch again with both, for example <code>-l gpu-class=large -v l40s</code>. Use <code>-v</code> only for a session launched without a booking; see <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a></td>
</tr>
<tr>
<td>A container starts with far less CPU and memory than expected</td>
<td><code>launch.sh</code> was called directly rather than through a wrapper. Bare <code>launch.sh</code> has lower CPU and memory defaults than the wrappers</td>
<td>Use <code>launch-scipy-ml.sh</code> or <code>launch-datascience.sh</code>, or pass <code>-c</code> and <code>-m</code>. See <a href="/docs/running-jobs/launch-sh-reference.html#default-resources">Default Resources</a></td>
</tr>
<tr>
<td><strong><code>sudo: The "no new privileges" flag is set, which prevents sudo from running as root.</code></strong></td>
<td>Containers run unprivileged, under the member's own UID, with no root. <code>sudo apt-get</code> fails by design</td>
<td>Install a system package in a custom image, where root is available at build time. See <a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a></td>
</tr>
<tr>
<td>A job keeps running after the pod is exited</td>
<td>Exiting a pod does not stop the processes inside it. <code>-b</code> backgrounds the pod, and <code>&amp;</code> backgrounds a process</td>
<td>Run <code>kubectl get pods</code>, then <code>kubectl delete pod &lt;pod-id&gt;</code>. See <a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a></td>
</tr>
</tbody>
</table></div>
<h2 id="statuses-kubectl-get-pods-reports">Statuses <code>kubectl get pods</code> Reports</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Status</th>
<th>What it means</th>
<th>What to do</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong><code>OOMKilled</code></strong></td>
<td>The container reached its memory limit</td>
<td>Size the job for its guaranteed memory request rather than its limit. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a> and <a href="/docs/running-jobs/watching-your-job.html#memory-limits-and-oomkilled">Memory Limits and <code>OOMKilled</code></a></td>
</tr>
<tr>
<td><strong><code>DeadlineExceeded</code></strong></td>
<td>The runtime limit was reached. The status does not indicate an error in the code</td>
<td>The runtime limit is 6 hours by default, or 12 hours if set at launch. See <a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td><strong><code>Pending</code></strong>, at length</td>
<td>The pod cannot currently be scheduled. A GPU pod may be waiting for its booking to open or for an on-demand lease</td>
<td>Run <code>kubectl describe pod &lt;pod-id&gt;</code> and read the events at the bottom of the output. See <a href="/docs/reference/reservation-events.html">Reservation Events</a></td>
</tr>
<tr>
<td><strong><code>Error</code></strong></td>
<td>The status does not identify a cause</td>
<td>Report the pod ID, the node named in the launch output, and the approximate time of the failure. See <a href="/docs/reference/getting-help.html">Getting Help</a></td>
</tr>
<tr>
<td>The session ended with no status and no error</td>
<td>Almost certainly an idle cull, not a crash. Saved work is preserved</td>
<td>See <a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
</tbody>
</table></div>
<h2 id="reservation-events-on-a-pod">Reservation Events on a Pod</h2>
<p>The reservation system writes its own events on GPU pods, such as
<code>OnDemandLeaseDenied</code>, <code>WaitingForReservation</code>, <code>UnknownGpuClass</code>, and
<code>Preempted</code>. Each is a full sentence that says what to do.
<a href="/docs/reference/reservation-events.html">Reservation Events</a> lists all 18.</p>
<h2 id="booking-refusals-in-the-reservation-app">Booking Refusals in the Reservation App</h2>
<p>The reservation app checks a booking when <strong>Next</strong> is selected on the date and
time step, and again on <strong>Confirm Reservation</strong>. A refusal appears at the top of
the page, word for word as in this table. The same messages appear in the
<strong>New Reservation</strong> form on <strong>Group Reservations</strong>. Times in them are Pacific,
on a 24-hour clock.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Message</th>
<th>Meaning</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Reservation must start at least 15 minutes in the future</code></td>
<td>The start is less than 15 minutes away. Bookings start on the hour, so at 10:46 the earliest start is 12:00</td>
<td>Choose a later hour</td>
</tr>
<tr>
<td><code>Reservations may not exceed 48 hours</code></td>
<td>The booking is longer than the member cap</td>
<td>Book a shorter window. See <a href="/docs/gpu-access/reservations.html#reservation-length-caps">Reservation Length Caps</a></td>
</tr>
<tr>
<td><code>This reservation runs H hours but group 'W' limits a single reservation to N hours.</code></td>
<td>The booking is longer than the workspace length cap</td>
<td>Book a shorter window, or request a longer cap by ticket</td>
</tr>
<tr>
<td><code>Group 'W' is for on-demand jobs only; reservations cannot be booked under it.</code></td>
<td>The workspace, such as <code>ORG_ON_DEMAND</code>, accepts on-demand leases only</td>
<td>Book under a course or lab workspace</td>
</tr>
<tr>
<td><code>Not a member of this group</code></td>
<td>The person being booked for is not in the workspace</td>
<td>Ask the instructor or TA to check the roster</td>
</tr>
<tr>
<td><code>Group not active before D</code>, <code>Group not active after D</code></td>
<td>The start date is outside the workspace's active dates</td>
<td>Choose a date within them</td>
</tr>
<tr>
<td><code>Reservations under this group must start at least N day(s) ahead — not before …</code></td>
<td>The workspace requires bookings N days in advance</td>
<td>Choose a later start</td>
</tr>
<tr>
<td><code>Reservations under this group must end within N day(s) — not after …</code></td>
<td>The booking ends beyond the booking horizon</td>
<td>Choose an earlier or shorter window. See <a href="/docs/gpu-access/reservations.html#the-booking-horizon">The Booking Horizon</a></td>
</tr>
<tr>
<td><code>GPU class not accessible under this group</code></td>
<td>The workspace was not granted this class</td>
<td>Choose a class the workspace was granted</td>
</tr>
<tr>
<td><code>Exceeds limit of N GPU(s) per reservation</code></td>
<td>Too many GPUs for one reservation of this class</td>
<td>Book fewer GPUs</td>
</tr>
<tr>
<td><code>This reservation costs X SU but you only have Y of Z SU remaining (currently using W).</code></td>
<td>The budget cannot cover the booking. "Currently using" counts ended, open, and upcoming bookings and kept penalties. With <code>in the week starting …</code>, the booking falls in that later week and draws on its budget. In team mode the message names the team</td>
<td>Book less, or wait for the budget to renew. See <a href="/docs/gpu-access/service-units-and-budgets.html#when-a-budget-runs-out">When a Budget Runs Out</a></td>
</tr>
<tr>
<td><code>This reservation costs X SU but the group pool only has …</code></td>
<td>The workspace's shared pool cannot cover the booking</td>
<td>Ask the workspace manager. See <a href="/docs/gpu-access/service-units-and-budgets.html#the-group-pool">The Group Pool</a></td>
</tr>
<tr>
<td><code>Only N GPU(s) available at …</code></td>
<td>The class has too few free GPUs in the hour named, the first hour that fails</td>
<td>Choose another hour, fewer GPUs, or another class</td>
</tr>
<tr>
<td><code>Only N GPU(s) available for this group at … (group ceiling: G)</code></td>
<td>The workspace holds its GPU limit for the class in that hour. Figures such as <code>borrowed</code> and <code>buffer</code> in the brackets describe idle capacity the workspace could borrow</td>
<td>Choose another hour. See <a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a></td>
</tr>
<tr>
<td><code>Only N GPU(s) available for this cohort at … (cohort ceiling: C)</code></td>
<td>The workspaces that share capacity with this one hold all of it in that hour</td>
<td>Choose another hour. See <a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a></td>
</tr>
</tbody>
</table></div>
<h3 id="booking-wizard-warnings">Booking Wizard Warnings</h3>
<p>The wizard checks a selection as it is made, and shows a warning below the
timeline while <strong>Next</strong> stays unavailable.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Warning</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Only k GPU(s) free across this range — need n.</code></td>
<td>Some hour in the selection has too few free GPUs. Move the selection or lower the GPU count</td>
</tr>
<tr>
<td><code>Not enough Service Units — needs X SU but only Y remain in your personal budget.</code></td>
<td>The selection costs more than the budget has left. The message can name the team's budget or the group pool instead</td>
</tr>
<tr>
<td><code>Past this group's booking window, which reaches …</code></td>
<td>The selection ends beyond the booking horizon</td>
</tr>
<tr>
<td><code>No bookable hours on this day.</code></td>
<td>The day is outside the workspace's active dates or booking horizon, or has passed</td>
</tr>
<tr>
<td><code>Start time has passed — choose a later hour.</code></td>
<td>The selection starts too soon</td>
</tr>
<tr>
<td><code>You are not assigned to any group. Contact an administrator.</code></td>
<td>The account belongs to no workspace. Ask the instructor or TA to check the roster, or write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
</tbody>
</table></div>
<h3 id="extend-adopt-and-cancel-refusals">Extend, Adopt, and Cancel Refusals</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Message</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Only an active reservation can be continued</code></td>
<td>The reservation was already cancelled or replaced, for example by an earlier <strong>Extend</strong>, or because its job ended</td>
</tr>
<tr>
<td><code>Only a job that has already started can be continued; book upcoming windows in the wizard</code></td>
<td><strong>Extend</strong> works only on a running job. Book a future window in the wizard</td>
</tr>
<tr>
<td><code>Only an in-progress booking can be continued</code></td>
<td>The booking's window has ended. Book a new window</td>
</tr>
<tr>
<td><code>This reservation already runs until …; an extension must end at or after that …</code></td>
<td>The new end would come before the reservation's current end. Extend cannot shorten a reservation, so nothing changes</td>
</tr>
<tr>
<td><code>Only reservations that have not ended may be adopted</code></td>
<td>The teammate's booking has already ended</td>
</tr>
<tr>
<td><code>Only active user-scheduled bookings may be adopted</code></td>
<td>The reservation is an on-demand lease, or has been cancelled</td>
</tr>
<tr>
<td><code>Already cancelled</code></td>
<td>The reservation was cancelled already, for example by a teammate, a workspace manager, or as a no-show</td>
</tr>
</tbody>
</table></div>
<p>An <strong>Extend</strong> refused for budget or capacity shows the same messages as a
booking refusal, and changes nothing.</p>
<h3 id="reservation-app-messages-in-the-browser">Reservation App Messages in the Browser</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Meaning</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Your session has expired. Please sign in again.</code> on the login page</td>
<td>The session expired, or <strong>Log out everywhere</strong> was used on another device</td>
<td>Sign in again. See <a href="/docs/access/sign-in-and-session-problems.html#expired-reservation-app-sessions">Expired Reservation App Sessions</a></td>
</tr>
<tr>
<td>A notice on the login page after signing in, such as <code>Your sign-in attempt expired or was started in another browser window. Please try again.</code></td>
<td>Sign-in failed. The notice names the reason</td>
<td>See <a href="/docs/access/sign-in-and-session-problems.html#sign-in-failure-notices">Sign-In Failure Notices</a></td>
</tr>
<tr>
<td>A message of the form <code>field: problem</code>, such as <code>gpu_count: Input should be a valid integer</code></td>
<td>The app rejected a value in the form. The message names the field</td>
<td>Correct the named field and try again. See <a href="/docs/access/sign-in-and-session-problems.html#form-errors-in-the-reservation-app">Form Errors in the Reservation App</a></td>
</tr>
</tbody>
</table></div>
<h2 id="errors-from-code--notebooks">Errors From Code &amp; Notebooks</h2>
<h3 id="cuda-out-of-memory-errors">CUDA Out-of-Memory Errors</h3>
<p><code>RuntimeError: CUDA out of memory</code> concerns the memory on the GPU card, which is
a separate and much smaller pool than the pod's RAM. It is a different failure
from the <code>OOMKilled</code> (out-of-memory) status, which concerns the pod's RAM. Apply
the usual remedies in this order:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Reduce the batch size</span></li>
<li><span class="docs-step-title">Restart the kernel</span><p>TensorFlow claims nearly all of the card's memory by
default and does not release it until the process ends, so a notebook that
ran TensorFlow earlier can leave too little GPU memory for PyTorch later in
the same session.</p></li>
<li><span class="docs-step-title">Move to the next GPU class up</span><p>Move up a class if the model does not fit, and request the
smallest class it fits in. <a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> lists
the classes.</p></li>
</ol>
<p>A run that succeeds in some sessions and fails in others of the same class can
be landing on a card or slice with less memory. See
<a href="/docs/gpu-access/workloads-by-gpu-class.html#differences-within-a-class">Differences Within a Class</a>.</p>
<h3 id="pytorch-gpu-detection">PyTorch GPU Detection</h3>
<p><code>torch.cuda.is_available()</code> returns <code>False</code> when the session has no GPU or is
running <code>rstudio-notebook</code>.</p>
<ul>
<li>A session has no GPU when it was launched without
<code>-g</code> or started from a CPU-only environment on the course's menu.</li>
<li><code>rstudio-notebook</code> derives from the CPU image and is not GPU-enabled. See
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a>.</li>
</ul>
<p>Confirm what a session holds from inside the container:</p>
<figure class="docs-command"><figcaption>Run inside the container</figcaption><pre class="docs-code"><code class="language-bash">nvidia-smi
python -c "import torch; print(torch.cuda.get_device_name(0));"</code></pre></figure>
<p>See also: <a href="/docs/gpu-access/gpu-classes.html#confirming-the-allocation">Confirming the Allocation</a></p>
<h3 id="full-storage-quota">Full Storage Quota</h3>
<p>A notebook save that fails with <code>[Errno 122] Disk quota exceeded</code>, or a "disk
quota exceeded" email, means the storage quota is full.</p>
<p>Files deleted in the
Jupyter interface move to <code>.local/share/Trash</code>, where they continue to count
against the quota until the automatic purge after 7 days. <strong>A deletion in the
Jupyter interface therefore frees no space before that purge.</strong>
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
describes storage quotas.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#jupyter-trash">Jupyter Trash</a>, <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#recovering-from-a-full-quota">Recovering from a Full Quota</a></p>
<h3 id="grading-validation-and-metadata-errors">Grading Validation and Metadata Errors</h3>
<p>"Failed to validate", "the source of the following cell has changed", or
"corrupt metadata" when grading means that a read-only or autograded cell was
copied, edited, or deleted.
<a href="/docs/grading/grading-failures.html">Common Grading Failures &amp; Recovery</a> describes
recovery.</p>
<h2 id="resource-tiers">Resource Tiers</h2>
<p>Confusing the per-pod, per-namespace, and on-request resource tiers is the usual
reason a job does not schedule.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a> lists
the tiers and their figures.</p>
