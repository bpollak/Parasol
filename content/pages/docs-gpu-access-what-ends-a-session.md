---
title: "What Ends a Session"
path: /docs/gpu-access/what-ends-a-session.html
description: "A session ends for one of five causes other than its own code: idle culling, the runtime limit, preemption, eviction, or maintenance."
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/what-ends-a-session/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/what-ends-a-session.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/what-ends-a-session/
format: html
---
<p class="lead">A session ends for one of five causes other than its own code: idle culling,
the runtime limit, preemption, eviction, or maintenance. None of them is a
crash, and none of them loses saved work.</p>
<dl class="docs-glance">
<div><dt>Idle cull</dt><dd>About 30 minutes unused, up to 6 hours when quiet</dd></div>
<div><dt>Runtime limit</dt><dd>6 hours, or 12 hours where set at launch</dd></div>
<div><dt>Preemption notice</dt><dd>Usually about 15 minutes, with no minimum</dd></div>
<div><dt>Saved work</dt><dd>Not lost by any of the five causes</dd></div>
</dl>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Cause</th>
<th>Signal</th>
<th>Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>Idle culling</td>
<td>The GPU was unused for about 30 minutes</td>
<td><a href="#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
<tr>
<td>Runtime limit</td>
<td>The pod reached 6 hours, or 12 hours where that was set at launch</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td>Preemption</td>
<td>The session was past its runtime guarantee, and its GPU was needed</td>
<td><a href="#preemption">Preemption</a></td>
</tr>
<tr>
<td>Eviction</td>
<td>The reservation the session ran under was cancelled, or given to a teammate</td>
<td><a href="#eviction">Eviction</a></td>
</tr>
<tr>
<td>Maintenance</td>
<td>A node was drained, or the Research Cluster maintenance window opened</td>
<td><a href="#maintenance-closures">Maintenance Closures</a></td>
</tr>
</tbody>
</table></div>
<p>The end of a reservation window does not by itself stop a session; see
<a href="#end-of-a-reservation-window">End of a Reservation Window</a>.</p>
<h2 id="idle-culling">Idle Culling</h2>
<p><strong>Idle culling</strong> is the shutdown of a GPU session that holds a GPU and is not
using it.</p>
<h3 id="what-counts-as-idle">What Counts as Idle</h3>
<p>A session that holds a GPU, has no GPU memory in use, and uses essentially no
CPU for about 30 minutes is shut down. When the cluster is quiet, the threshold
is up to 6 hours instead. No session is culled in its first 45 minutes. A
session that has been working hard receives a grace period of up to an hour
after the GPU goes quiet before the idle clock starts.</p>
<p>Idle culling applies to every GPU class. CPU-only sessions are not culled by
this mechanism.</p>
<p><strong>A session is idle only when every condition in this table holds at once.</strong> If
any one of them fails, the culler treats the session as busy.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Signal</th>
<th>Idle means</th>
</tr>
</thead>
<tbody>
<tr>
<td>GPU memory</td>
<td>No more than about 150 MiB in use, on every GPU the session holds</td>
</tr>
<tr>
<td>GPU memory, changing</td>
<td>Any change since the last check counts as activity and restarts the clock</td>
</tr>
<tr>
<td>CPU</td>
<td>At most about 0.1 cores, taken as the maximum over the last hour</td>
</tr>
<tr>
<td>Age</td>
<td>The session is at least 45 minutes old. Nothing younger is ever considered idle</td>
</tr>
</tbody>
</table></div>
<p>A model loaded on the GPU is not idle, because it holds framebuffer memory. A
session that finished training an hour ago and has been at a shell prompt since
is idle, because it holds no GPU memory.</p>
<p>The CPU condition uses the maximum over the last hour, not the current value. A
job that does a burst of work every forty minutes is not culled between bursts.</p>
<h3 id="the-timings">The Timings</h3>
<ol class="docs-flow" aria-label="From launch to an idle cull">
<li><span class="docs-flow-label">Start</span><strong>Never culled at first</strong><p>No session is culled in its first 45 minutes.</p></li>
<li><span class="docs-flow-label">Grace</span><strong>The GPU goes quiet</strong><p>15 to 60 minutes pass before the quiet time counts as idle.</p></li>
<li><span class="docs-flow-label">Idle</span><strong>The idle clock runs</strong><p>30 minutes, or 6 hours when the class is underloaded.</p></li>
<li><span class="docs-flow-label">Cull</span><strong>The session is shut down</strong><p>A warning starts when 30 minutes remain.</p></li>
</ol>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Stage</th>
<th>Duration</th>
</tr>
</thead>
<tbody>
<tr>
<td>First 45 minutes</td>
<td>Never culled, whatever the session is doing</td>
</tr>
<tr>
<td>Grace after the GPU goes quiet</td>
<td>15 to 60 minutes before the quiet time counts as idle, scaling with how much GPU work the session has already done. A session with two hours or more of GPU activity receives the full hour</td>
</tr>
<tr>
<td>Normal cull</td>
<td>30 minutes of idleness</td>
</tr>
<tr>
<td>When the class is underloaded</td>
<td>6 hours of idleness</td>
</tr>
<tr>
<td>Check interval</td>
<td>Every 5 minutes</td>
</tr>
</tbody>
</table></div>
<p>The 6-hour threshold is a property of the GPU class, not of the session. It
applies when every node behind the GPU class is under 75% allocated on CPU,
memory, and GPU at the same time.</p>
<p>The same idle session can therefore be culled
after 6 hours on a quiet evening and after 30 minutes in week 10. <strong>Do not plan
work around the 6-hour threshold.</strong></p>
<h3 id="warnings--pod-status">Warnings &amp; Pod Status</h3>
<p>A session is warned before it is culled. The warning starts when 30 minutes
remain before the cull.</p>
<p>The idle status is recorded on the pod and can be read from the command line:</p>
<figure class="docs-command"><figcaption>Read the idle status of a pod</figcaption><pre class="docs-code"><code class="language-bash">kubectl get pods
kubectl describe pod &lt;pod-id&gt;</code></pre></figure>
<p>Under <code>Annotations</code>:</p>
<ul>
<li><code>dsmlp/idle-gpu-status</code> reads <code>ok</code>, <code>idle</code> or <code>warning</code>.</li>
<li><code>dsmlp/idle-gpu-cull-deadline</code> gives the time at which the session would be
culled if nothing changes.</li>
</ul>
<p>The cull deadline is a projection. It is recalculated on every pass, moves as
conditions change, and is removed as soon as the session does GPU work again.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>A missing annotation does not indicate a healthy session. It means the
session is out of scope, has not yet been checked, or has already been culled.</p></div>
<p>On a busy cluster, the <code>idle</code> status does not appear. With a 30-minute threshold
and a 30-minute warning lead, the status changes directly from <code>ok</code> to
<code>warning</code>. The <code>idle</code> status appears on a quiet cluster, while the 6-hour
threshold applies.</p>
<h3 id="effects-of-idle-culling">Effects of Idle Culling</h3>
<p>A cull is a deliberate stop, not a crash or a fault in the code. It requires no
report and no fix.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span><p class="docs-card-title">Lost</p><p>The container is deleted.</p><p>Anything held only in the session's memory is lost, such as a notebook kernel's
variables or a model trained for two hours and not saved.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-floppy-saved"></span><p class="docs-card-title">Kept</p><p>The home directory, the <code>private/</code> area, and the
workspace's shared directories are not deleted.</p></article>
</div>
<p>Checkpoint long runs. A culled session requires no cleanup before a relaunch.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>, <a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a></p>
<h3 id="background-and-batch-jobs">Background and Batch Jobs</h3>
<p>Idle culling tests whether the GPU is in use, not whether a session is attached
to it. The culler treats each of these as an idle session:</p>
<ul>
<li>A background pod (<code>-b</code>) that was disconnected from three hours ago</li>
<li>A batch job whose Python process has already exited</li>
<li>A <code>nohup</code>-ed script that is waiting on a download</li>
</ul>
<p><strong>A job that is computing on the GPU is never culled</strong>, however long it runs and
whether or not anyone is watching it. Backgrounding an active training run does
not expose it to idle culling. A GPU session held open for later use is culled.</p>
<p>See also: <a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a></p>
<h3 id="inside-a-booked-window">Inside a Booked Window</h3>
<p>A cull does not cancel the reservation straight away. The booked window stands,
and a session may be launched into it again. If no session is running under the
booking about 30 minutes after the cull, the rest of the booking is cancelled as
a no-show and charged.</p>
<p>See also: <a href="/docs/gpu-access/reservations.html#relaunching-inside-a-booked-window">Relaunching Inside a Booked Window</a></p>
<h3 id="browser-inactivity-and-disconnection">Browser Inactivity and Disconnection</h3>
<p>Some third-party course material gives Datahub an inactivity timeout of 20
minutes, or of 30. Neither figure comes from ITS, and neither describes idle
culling. Idle culling measures whether a GPU is in use, not whether a browser
tab is active.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Logging out or closing a laptop does not stop a session: it keeps running,
holding its GPU and drawing on the budget, until it is stopped with
<strong>File → Hub Control Panel → Stop My Server</strong>.</p></div>
<p>See also: <a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>, <a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a></p>
<h2 id="end-of-a-reservation-window">End of a Reservation Window</h2>
<p><strong>The close of a reservation window does not stop the session running in it.</strong>
Where no one else needs the capacity, the session continues to run.</p>
<p>The window defines what was charged for and what is guaranteed. A session's
<strong>runtime guarantee</strong> runs to the end of its reservation, and on through any
booking that directly follows it; see
<a href="#back-to-back-bookings">Back-to-Back Bookings</a>. After the guarantee ends, the
session runs without it.</p>
<ol class="docs-flow" aria-label="From a protected session to preemption">
<li><span class="docs-flow-label">Protected</span><strong>Inside the guarantee</strong><p>A session inside its guarantee is never preempted.</p></li>
<li><span class="docs-flow-label">Window ends</span><strong>The session keeps running</strong><p>The close of the window does not stop it.</p></li>
<li><span class="docs-flow-label">Overstay</span><strong>Running unprotected</strong><p>No Service Units are drawn. Extend brings it back under a guarantee.</p></li>
<li><span class="docs-flow-label">Preemption</span><strong>Stopped if its GPU is needed</strong><p>Usually with about 15 minutes' notice, and sometimes less.</p></li>
</ol>
<h3 id="the-countdown">The Countdown</h3>
<p>In the Fall 2026 standard images, JupyterLab shows the session's status in the
status bar at the bottom of the window. While the session is inside its
guarantee, the indicator reads <strong>Job protected</strong> and counts down to the end of
the guarantee. Its color follows the session's state:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Color</th>
<th>State</th>
</tr>
</thead>
<tbody>
<tr>
<td>Green</td>
<td>Inside the runtime guarantee</td>
</tr>
<tr>
<td>Amber</td>
<td>Inside the guarantee, with another booking due to start when it ends</td>
</tr>
<tr>
<td>Gray</td>
<td>Past the guarantee, with nothing waiting for the capacity. See <a href="#overstay">Overstay</a></td>
</tr>
<tr>
<td>Red, pulsing</td>
<td>Past the guarantee and at risk of preemption. The countdown runs to the earliest moment the session could be stopped</td>
</tr>
</tbody>
</table></div>
<p>The indicator is hidden when there is nothing to report.</p>
<p><img alt="The JupyterLab status bar reading Job protected 59:55, below a notification that says GPU resources reserved until 10:56 AM, with a Details link." src="/_images/docs/jupyterlab-reservation-status.png" class="img-responsive docs-figure"></p>
<p>Selecting the indicator, or running <strong>Show Job Reservation/Resource Status</strong>
from the command palette, opens a dialog with the full detail.</p>
<p>A brief
notification appears when the session is admitted, when it moves to a
different reservation, and when it starts running past its guarantee. While the
session is at risk, a notification with a <strong>Details</strong> link stays on screen. It
closes, with an all-clear, when the warning is withdrawn.
<a href="/docs/running-jobs/checkpointing.html#warning-timings">Warning Timings</a> lists how
much notice a warning gives.</p>
<p>VS Code shows the same status in its own status bar, with the same
notifications. Setup instructions for this display in VS Code and other remote
editors are not yet published. For connecting VS Code itself, see
<a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a>.</p>
<p><img alt="The VS Code status bar reading Job protected 55:49, below a notification that says GPU resources reserved (medium) until 10:49 AM, from DSMLP Job Reservation/Resource Status, with a Details button." src="/_images/docs/vscode-reservation-status.png" class="img-responsive docs-figure"></p>
<p>From the command line, <code>kubectl describe pod</code> shows the end of the guarantee in
the pod's annotations; see
<a href="/docs/running-jobs/kubernetes.html#reservation-annotations">Reservation Annotations</a>.</p>
<p>A checkpoint written before the guarantee ends survives the end of the window.
From that point, the session can be stopped, extended, or left running.</p>
<h3 id="back-to-back-bookings">Back-to-Back Bookings</h3>
<p>A booking that starts exactly when the current one ends, for the same GPU
class, the same number of GPUs, and the same workspace, extends the guarantee at
once. The two bookings stay separate reservations in the reservation app.</p>
<p>Any other later booking protects a running session only once it opens:</p>
<ul>
<li>A
session on an on-demand lease moves onto the booking as soon as it opens, and
records a <code>ReservationRelinked</code> event.</li>
<li>A session on another booking moves onto
it once the booking is open and the session's own guarantee has ended, and
records an <code>OverstayRelinked</code> event.</li>
</ul>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>The gap is unprotected</strong></p><p>Between the end of the guarantee and the
opening of the later booking, the session is unprotected, and another member's
booking that starts in that gap can stop it up to 15 minutes before that
booking starts. <a href="/docs/gpu-access/reservations.html#extend">Extend</a> is the reliable way to keep a
running session guaranteed.</p></div>
<p>See also: <a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a></p>
<h3 id="overstay">Overstay</h3>
<p><strong>Overstay</strong> is running a session past the end of its runtime guarantee.
Overstay draws no Service Units. Its cost is that the session is no longer
protected.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>An overstaying session keeps running with no guarantee. It can be stopped
whenever its GPU is needed, usually with about 15 minutes' notice, and
sometimes less. See <a href="#preemption">Preemption</a>.</p></div>
<p>The reservation app's Dashboard lists a job running past an on-demand lease
under <strong>Running Past Window</strong>, with an <strong>Extend</strong> button. On the pod, the
<code>galends/guarantee-status</code> annotation changes from <code>guaranteed</code> to <code>overstay</code>
within about 5 minutes of the guarantee ending.</p>
<p><a href="/docs/gpu-access/reservations.html#extend">Extend</a> brings an overstaying session back under a
guarantee. A longer window arranged in advance is the alternative to overstay;
see <a href="/docs/gpu-access/reservations.html#routes-to-more-time">Routes to More Time</a>.</p>
<h2 id="preemption">Preemption</h2>
<p><strong>Preemption</strong> is the ending of a session that is past its runtime guarantee,
because its GPU is needed. It is a capacity outcome, not a fault. <strong>A session
inside its guarantee is never preempted.</strong></p>
<h3 id="what-triggers-preemption">What Triggers Preemption</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Trigger</th>
<th>When</th>
</tr>
</thead>
<tbody>
<tr>
<td>A booking starts, and its GPU class has too few free GPUs</td>
<td>Up to 15 minutes before the booking starts, and again at its start. The stop stands even if the booking is then never claimed</td>
</tr>
<tr>
<td>Headroom</td>
<td>PARASOL keeps 15% of each GPU class free for on-demand jobs. When less is free, sessions past their guarantee are warned, and can be stopped once at least 15 minutes have passed</td>
</tr>
</tbody>
</table></div>
<p>An on-demand lease never triggers preemption. A lease that finds no free GPU
waits.</p>
<h3 id="which-sessions-are-stopped">Which Sessions Are Stopped</h3>
<p>Only sessions past their guarantee are candidates. Among them, sessions are
chosen by the type of reservation they ran under, in this order:</p>
<ol>
<li>Best-effort</li>
<li>On-demand leases</li>
<li>Bookings</li>
</ol>
<p>Within a type, the choice is random.
Sessions are stopped until enough GPUs are free.</p>
<h3 id="notice-before-preemption">Notice Before Preemption</h3>
<ol class="docs-flow" aria-label="From the termination warning to a forced stop">
<li><span class="docs-flow-label">Warn</span><strong>Termination-warning annotations</strong><p>Usually about 15 minutes of notice, with no minimum.</p></li>
<li><span class="docs-flow-label">Delete</span><strong>The pod receives <code>SIGTERM</code></strong><p>The pod is deleted in the ordinary way.</p></li>
<li><span class="docs-flow-label">Grace</span><strong>A grace period</strong><p>10 minutes for pods started by <code>launch.sh</code>.</p></li>
<li><span class="docs-flow-label">Stop</span><strong>A forced stop</strong><p>Saved work survives. Anything held only in memory does not.</p></li>
</ol>
<p>A session that may be preempted is first marked with termination-warning
annotations on its pod. The notice is usually about 15 minutes, and there is no
minimum. The pod is then deleted in the ordinary way: <code>SIGTERM</code>, a grace period
of 10 minutes for pods started by <code>launch.sh</code>, then a forced stop.
<a href="/docs/running-jobs/checkpointing.html#the-termination-warning">The Termination Warning</a>
describes reading and acting on the warning.</p>
<p>Saved work survives preemption. Anything held only in memory does not.</p>
<p>The session records the outcome as a <code>Preempted</code> event, written just before the
pod is deleted.</p>
<p>See also: <a href="/docs/reference/reservation-events.html#preempted">Reservation Events</a></p>
<h2 id="eviction">Eviction</h2>
<p>A running session is deleted, <strong>with no warning beforehand</strong>, in two cases:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Event</th>
<th>Cause</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ReservationCancelled</code></td>
<td>The reservation the session ran under was cancelled while its window was open: by its owner, a workspace manager, an administrator, or a teammate in team mode</td>
</tr>
<tr>
<td><code>ReservationReassigned</code></td>
<td>A teammate adopted the booking in team mode, or it was given to another user</td>
</tr>
</tbody>
</table></div>
<p>Before deleting a session for a cancellation, the reservation system moves it
onto another open booking of the same member, where one matches and has room.
A session moved that way keeps running and records a <code>ReservationRelinked</code>
event instead.</p>
<p>Both eviction events are type <code>Normal</code>, and the pod is gone by
the time they can be read, so read them with <code>kubectl get events</code>.</p>
<p>See also: <a href="/docs/reference/reservation-events.html#events-when-a-pod-is-stopped">Reservation Events</a></p>
<h2 id="maintenance-closures">Maintenance Closures</h2>
<p>Two maintenance regimes apply: instructional maintenance and Research Cluster
maintenance. The schedule for both is published under
<a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a>. <strong>Do not
start a 12-hour run that would overlap an announced maintenance window.</strong></p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-wrench"></span><p class="docs-card-title"><a href="#instructional-maintenance">Instructional maintenance</a></p><p>Usually affects a subset of worker nodes, so running work is generally unaffected. A running job can still be terminated when a node is drained.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-off"></span><p class="docs-card-title"><a href="#research-cluster-maintenance">Research Cluster maintenance</a></p><p>Terminates all running jobs. Notices come from rcd-support@ucsd.edu.</p></article>
</div>
<h3 id="instructional-maintenance">Instructional Maintenance</h3>
<p>Campus policy requires prompt patching of servers. The instructional
maintenance window is reserved for that patching and is not a scheduled outage.</p>
<p>Instructional maintenance usually affects a subset of worker nodes. Scheduling
policy tries to place jobs on nodes that will not be touched, so running work is
generally unaffected.</p>
<p>During the window, the platform may operate at reduced
capacity, and, depending on the work being done, the whole cluster can be
briefly inaccessible. A running job can still be terminated, because some
updates require a node to be drained.</p>
<p>Patching is deferred where possible during 10th week and Finals week, unless a
vulnerability requires immediate action. Critical updates occasionally require
work outside the window. ITS notifies instructors and TAs of such work as far in
advance as possible.</p>
<h3 id="research-cluster-maintenance">Research Cluster Maintenance</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>All running jobs end</strong></p><p>Research Cluster maintenance terminates all running jobs. Jobs are not drained,
migrated, or deferred to another node. A multi-day training run started the day
before is lost when the window opens, together with everything not written to
disk.</p></div>
<p>Windows are placed to avoid the start and end of a quarter, midterm periods, and
known conference deadlines, and each notice is followed by a reminder shortly
before the day. This placement reflects past practice, not a published
commitment. The notice sent for each window governs.</p>
<p>Research Cluster maintenance notices are sent from
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>, which also answers
questions about them.</p>
<h3 id="gpu-class-availability-during-maintenance">GPU Class Availability During Maintenance</h3>
<p>When nodes are taken out of service for planned work, the GPU classes they back
have fewer GPUs, or none, for the duration. A class can therefore show nothing
available on particular dates even though no one has booked it. The reservation
app shows the lower figure without a label. Bookings already made are not
cancelled.</p>
<p>A class that shows nothing available on a date may be fully booked or closed for
maintenance. The two cases look identical to a user. While a class is short of
nodes, a GPU session waiting for an on-demand lease records an
<code>OnDemandAdmissionPaused</code> event.</p>
<p>Where a class in regular use shows nothing available across a specific span of
days and no notice has been sent, report it to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> instead of assuming demand.</p>
<p>See also: <a href="/docs/gpu-access/quotas-and-availability.html#when-the-cluster-is-full">When the Cluster Is Full</a></p>
<h3 id="jobs-ending-outside-any-window">Jobs Ending Outside Any Window</h3>
<p>Worker nodes are patched on demand, year-round, without user notification. Only
the JupyterHub, login, and file-server components follow the notified schedule.
The worker nodes that run containers are maintained as the need arises.</p>
<p>On-demand patching can end a job cleanly, at no particular time, with no error
from the job and no maintenance announcement. This is not the common case, and
it cannot be scheduled around.</p>
