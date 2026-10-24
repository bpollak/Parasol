---
title: "Working from the Command Line"
path: /get-started/working-from-the-command-line.html
description: "This page is for reaching a course environment from a terminal."
eyebrow: "Get started"
lastReviewed: 2026-09-29
audiences: [students]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/working-from-the-command-line/), preview build of 2026-09-29"
canonicalUrl: /get-started/working-from-the-command-line.html
legacyUrl: https://dsmlp-docs.ucsd.edu/working-from-the-command-line/
format: html
---
<p>This page is for reaching a course environment from a terminal. It assumes a
terminal and the <code>ssh</code> command, and no knowledge of Kubernetes, Docker, or Linux
administration.</p>
<h2 id="access">Access</h2>
<p>Every student enrolled in a course that uses Datahub already has command-line
access. No form or request is required. The shell reaches the same environment
as <a href="/get-started/student-in-a-course.html">Using Datahub in a Course</a> and adds jobs that
survive a disconnect, GPU classes not offered in the course menu, and a desktop
editor. <a href="/get-started/student-project.html">Projects &amp; Independent Study</a> covers work outside
a course.</p>
<h2 id="obtaining-a-terminal">Obtaining a Terminal</h2>
<p>A terminal is available in the browser or over SSH. The two routes are not
equivalent.</p>
<h3 id="jupyterlab-terminal">JupyterLab Terminal</h3>
<p>JupyterLab provides a terminal inside a running browser session. It is suitable
for quick commands, and it ends when the session ends.</p>
<h3 id="ssh-to-the-login-node">SSH to the Login Node</h3>
<p>The login node accepts Active Directory (AD) credentials. See
<a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a>. Duo
applies. <a href="/docs/access/the-login-node.html#duo-authentication">Duo Authentication</a>
gives the interval. The VPN is not required for <code>ssh</code> and is required only to
reach a port inside a container. See
<a href="/docs/access/the-login-node.html#vpn-requirement">VPN Requirement</a>.
SSH is the route that allows work to be started and left running after
disconnection.</p>
<h3 id="use-of-the-login-node">Use of the Login Node</h3>
<p>The login node is for launching jobs and moving files. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.
A training script, a large <code>pip install</code>, or a data conversion runs inside a
container, not on the login node.</p>
<h3 id="concurrent-browser-and-shell-sessions">Concurrent Browser and Shell Sessions</h3>
<p>Launching a container from <code>dsmlp-login</code> while a Datahub session is open is
ordinary use. A member may have one Datahub session running at a time. See
<a href="/docs/access/datahub-in-the-browser.html#concurrent-datahub-sessions">Concurrent Datahub Sessions</a>.
Shell, VS Code, and batch jobs are not limited by it, and any number of them
may run at once. The limit on all of them together is the total CPU, memory,
and GPU across everything running. See
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>.</p>
<h2 id="launching-a-container">Launching a Container</h2>
<p>The wrapper scripts set defaults and hand off to <code>launch.sh</code>.
<code>launch-scipy-ml.sh</code> starts the GPU-capable image, and <code>launch-datascience.sh</code>
starts the CPU image.
<a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a> lists the flags.</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001  # GPU-capable image, wrapper defaults
launch.sh -h                          # the flag summary, from the tool itself</code></pre>
<h3 id="default-resources">Default Resources</h3>
<p>Bare <code>launch.sh</code> starts a smaller container than the wrappers do, so switching
from a wrapper to <code>launch.sh</code> directly reduces the CPU and memory a container
receives. Neither set of defaults matches the resources a browser session
starts with, which come from the course's spawn configuration. The command-line
defaults and the browser figure describe different things.
<a href="/docs/running-jobs/launch-sh-reference.html#default-resources">Default Resources</a>
gives all three.</p>
<h3 id="requesting-resources">Requesting Resources</h3>
<p>Resources are requested with flags at launch:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -c 4 -m 16 -g 1 -l gpu-class=medium   # 4 CPU, 16GB RAM, 1 GPU</code></pre>
<p>Limits apply at three tiers: a single pod, a namespace in total, and a higher
tier available on request. Confusing the tiers is the usual cause of a job that
will not schedule. A single container cannot request the namespace's full
memory total.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a> gives the
figures for each tier. A request for the third tier states what the resources
are for. See
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>.</p>
<h3 id="requests-and-limits">Requests and Limits</h3>
<p>The memory named at launch is a limit, not a guarantee. A job that ran on one
day can be <code>OOMKilled</code> (out-of-memory) on a busier node without reaching that
limit.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a>
describes the amount <code>launch.sh</code> guarantees.</p>
<h3 id="selecting-a-workspace">Selecting a Workspace</h3>
<p>A member of more than one workspace selects the workspace with <code>-W</code>. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>.</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001</code></pre>
<p>Pass <code>-W</code> on a GPU launch even with only one workspace. It decides which
workspace's budget the session is charged to, and which bookings it can claim;
see <a href="#reservations-from-the-command-line">Reservations from the Command Line</a>.</p>
<h2 id="selecting-a-gpu-class">Selecting a GPU Class</h2>
<p>The browser offers the environments a course has configured. From the shell, a
GPU class is requested directly:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium</code></pre>
<p><a href="/docs/gpu-access/gpu-classes.html#gpu-class-sizes">GPU Class Sizes</a> lists the classes
and their memory sizes. Request the smallest class the model fits within. See
<a href="/docs/gpu-access/gpu-classes.html#choosing-a-class">Choosing a Class</a>. A larger class
is not faster for a model that fits in a smaller one, and it is scarcer and
draws more budget.
<a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> gives examples of
the work each class suits.</p>
<p><code>-v</code> limits a session to one GPU model within its class, and is for a session
launched without a booking only; see
<a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</p>
<h3 id="workspace-class-grants">Workspace Class Grants</h3>
<p>Each workspace is granted one or more GPU classes, and a request for a class
the workspace was not granted is refused. The refusal is not a fault. Adding a
class is a request for the instructor to make. See
<a href="/docs/gpu-access/gpu-classes.html#workspace-class-grants">Workspace Class Grants</a>.</p>
<h3 id="pending-gpu-launches">Pending GPU Launches</h3>
<p>A GPU launch waits in <code>Pending</code> until the reservation system admits it. The
reason for a wait is in the events that <code>kubectl describe pod</code> shows; see
<a href="#reservation-events">Reservation Events</a>. A pending GPU pod with no event from
the reservation system is usually missing its <code>gpu-class</code> label. See
<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.</p>
<h2 id="job-modes-and-limits">Job Modes and Limits</h2>
<p><code>launch.sh</code> runs a container in one of three modes. See
<a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a>.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Mode</th>
<th>Flag</th>
<th>Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td>Interactive</td>
<td>None (default)</td>
<td>The launch returns a shell, and the job ends at disconnection</td>
</tr>
<tr>
<td>Background</td>
<td><code>-b</code></td>
<td>The container keeps running after disconnection, for reconnection later</td>
</tr>
<tr>
<td>Batch</td>
<td><code>-B</code></td>
<td>A command runs to completion with no terminal, and the job exits when it finishes</td>
</tr>
</tbody>
</table></div>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -b                     # background, reconnect later
launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- python train.py  # batch, runs and exits</code></pre>
<h3 id="option-separator">Option Separator</h3>
<p>The <code>--</code> separator divides <code>launch.sh</code>'s own options from those of the command
being run. Without it, the launcher attempts to interpret the program's
arguments as its own.
<a href="/docs/running-jobs/launch-sh-reference.html#option-separator">Option Separator</a>
describes the separator.</p>
<h3 id="reattaching-to-a-background-job">Reattaching to a Background Job</h3>
<p><code>-b</code> returns to the login node with the container still running.
<code>kubesh &lt;pod-id&gt;</code> reattaches to it. Leaving with <code>exit</code> stops neither the
container nor the processes started in it. <code>kubectl delete pod &lt;pod-id&gt;</code> stops
both.
A backgrounded container holds its resources until you delete it. See
<a href="/docs/running-jobs/job-modes-and-limits.html#background-pods">Background Pods</a> and
<a href="/docs/running-jobs/watching-your-job.html#checking-on-a-detached-job">Checking On a Detached Job</a>.</p>
<h3 id="slurm-compatibility-wrappers">Slurm Compatibility Wrappers</h3>
<p>Wrappers for <code>sbatch</code>, <code>srun</code>, <code>squeue</code>, and <code>scancel</code> are provided, so habits
carried from an HPC system largely work. No Slurm scheduler runs behind them,
and there is no MPI or multi-node support. See
<a href="/docs/reference/coming-from-hpc.html#slurm-compatibility-wrappers">Slurm Compatibility Wrappers</a>.
<code>--partition</code> is not a scheduling partition. It is forwarded as a GPU class
label. See
<a href="/docs/reference/coming-from-hpc.html#the---partition-option">The <code>--partition</code> Option</a>.</p>
<h3 id="runtime-limit">Runtime Limit</h3>
<p>Jobs default to 6 hours, and up to 12 hours may be set at launch. See
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>.
A booking does not lift the runtime limit. See
<a href="/docs/gpu-access/reservations.html#reservation-length-and-session-runtime">Reservation Length and Session Runtime</a>.</p>
<h3 id="idle-culling">Idle Culling</h3>
<p>A container holding a GPU it has stopped using is reclaimed. Backgrounding a
job does not exempt it. The test is whether the GPU is doing anything, not
whether a session is attached.
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>
gives the criteria.</p>
<h3 id="checkpointing">Checkpointing</h3>
<p>Runtime limits, idle culling, and reservation windows can each end a container
without any fault in the code. Checkpoint long-running work. See
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a>.</p>
<h3 id="unused-containers">Unused Containers</h3>
<p>An idle container continues to hold its CPU, its memory, and its GPU. Shut down
containers that are not in use.</p>
<h2 id="editing-in-visual-studio-code">Editing in Visual Studio Code</h2>
<p>Visual Studio Code (VS Code) is supported through Remote-SSH over a
ProxyCommand. The ProxyCommand launches the container by way of the login node,
and <code>launch.sh -H</code> starts an SSH server inside it for VS Code to attach to.
<a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a> describes the setup.</p>
<p>Use one Host entry per course. Reusing a single entry across courses causes the
host keys to collide, and the resulting failure presents as a security warning
rather than a configuration error. See
<a href="/docs/access/remote-editor-setup.html#host-entries-for-multiple-courses">Host Entries for Multiple Courses</a>.</p>
<p><code>.vscode-server</code> grows past a gigabyte and can use up a course-sized home
quota. See
<a href="/docs/access/remote-editor-setup.html#growth-of-vscode-server">Growth of <code>.vscode-server</code></a>.
Each launch copies the login node's <code>authorized_keys</code> into the container, so
you install the key once, on the login node. See
<a href="/docs/access/remote-editor-setup.html#key-copy-in-the-container">Key Copy in the Container</a>.</p>
<h2 id="interpreting-job-outcomes">Interpreting Job Outcomes</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Reported</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>OOMKilled</code></td>
<td>The container exceeded its memory limit. See <a href="#requests-and-limits">Requests and Limits</a> and <a href="/docs/running-jobs/watching-your-job.html#memory-limits-and-oomkilled">Memory Limits and <code>OOMKilled</code></a></td>
</tr>
<tr>
<td><code>DeadlineExceeded</code></td>
<td>The job reached its runtime limit. See <a href="#runtime-limit">Runtime Limit</a></td>
</tr>
<tr>
<td><code>Pending</code>, with a <code>FailedScheduling</code> event</td>
<td>A GPU job waiting for the reservation system. The reason is in the reservation event beside it. See <a href="#pending-gpu-launches">Pending GPU Launches</a></td>
</tr>
<tr>
<td>A session ended, with a warning beforehand</td>
<td>Idle culling. See <a href="#idle-culling">Idle Culling</a></td>
</tr>
</tbody>
</table></div>
<p>If a GPU session ends and none of these statuses applies, the usual cause is
the reservation system: the session was past its guarantee and was preempted,
or its reservation was cancelled or given to a teammate. <code>kubectl get events</code>
shows which, for about an hour afterwards; see
<a href="#reservation-events">Reservation Events</a>.
<a href="/docs/reference/error-messages.html">Error Messages</a> lists error text, causes, and
fixes.</p>
<h2 id="reservations-from-the-command-line">Reservations from the Command Line</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Launching a GPU session without a reservation creates one and draws on the
Service Unit budget, from the shell as from the browser. There is no
exploratory launch that is free of charge. Starting an eligible session
authorizes the spend, and a script that launches in a loop can exhaust a
term's budget. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<p>A launch without a booking holds an on-demand lease of 1 hour 10 minutes and
is charged for the time the session uses within it. For a longer guarantee,
open the reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a> once the session is
running and use <a href="/docs/gpu-access/reservations.html#extend">Extend</a>.</p>
<p><code>-W</code> decides which workspace a GPU launch is charged to, and which bookings it
can claim. A GPU launch without <code>-W</code> is charged to <code>ORG_ON_DEMAND</code>, the default
workspace, and never claims a course booking. See
<a href="/docs/gpu-access/reservations.html#claiming-a-booking">Claiming a Booking</a>.</p>
<p><a href="/docs/gpu-access/index.html">GPU Access</a> covers booking, the cost of each class, the
cancellation penalty, and overstay.</p>
<h3 id="reservation-events">Reservation Events</h3>
<p>The reservation system reports on a GPU session with Kubernetes events, shown by
<code>kubectl describe pod</code>, and by <code>kubectl get events</code> after the pod is gone.
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
<h2 id="custom-images">Custom Images</h2>
<p>A course, or occasionally an individual student, may require a library stack
the standard images do not provide. Check what the course already provides
before building an image. <a href="/docs/environments/index.html">Environments</a> covers
standard and custom images.</p>
<h2 id="support">Support</h2>
<p>Course questions go to the course instructor or TA. Platform questions go to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> or the
<a href="https://support.ucsd.edu/">ITS Service Desk</a>. A ticket includes the course, the
exact command run, and the full error.
<a href="/docs/reference/getting-help.html#response-targets">Response Targets</a> lists ITS
response targets. <a href="/docs/reference/getting-help.html">Getting Help</a> covers support
routing.</p>
