---
title: "Job Modes, Runtime Limits & Configuration"
path: /docs/running-jobs/job-modes-and-limits.html
description: "Choose how a container launched with launch.sh behaves when you disconnect, and how long it may run."
eyebrow: "Running Jobs"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/running-jobs/job-modes-and-limits/), preview build of 2026-09-29"
canonicalUrl: /docs/running-jobs/job-modes-and-limits.html
legacyUrl: https://dsmlp-docs.ucsd.edu/running-jobs/job-modes-and-limits/
format: html
---
<p>Choose how a container launched with <code>launch.sh</code> behaves when you disconnect,
and how long it may run. The three job modes differ in what happens when no
session is attached, not in how much compute a job receives.</p>
<h2 id="job-modes">Job Modes</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Mode</th>
<th>Flag</th>
<th>What it provides</th>
<th>The job ends when</th>
</tr>
</thead>
<tbody>
<tr>
<td>Interactive</td>
<td>None (default)</td>
<td>A shell, or Jupyter, in the container</td>
<td>The connection drops, or the runtime limit is reached</td>
</tr>
<tr>
<td>Background</td>
<td><code>-b</code></td>
<td>A pod left running; the session stays on the login node</td>
<td>The pod is deleted, or the runtime limit is reached</td>
</tr>
<tr>
<td>Batch</td>
<td><code>-B -- &lt;command&gt;</code></td>
<td>No interactive session</td>
<td>The command finishes, or the runtime limit is reached</td>
</tr>
</tbody>
</table></div>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium                        # interactive
launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -c 4 -b                # background, reconnect later
launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- python train.py  # batch, runs and exits</code></pre>
<h3 id="interactive-pods">Interactive Pods</h3>
<p>Interactive mode is the default.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>An interactive pod is terminated when the connection to the login node drops,
including when a laptop goes to sleep, its lid is closed, or its wireless
network drops.</p></div>
<p>Run work that must survive a disconnection with <code>-b</code> or <code>-B</code>.</p>
<h3 id="background-pods">Background Pods</h3>
<p><code>-b</code> creates the pod and returns a prompt on the login node. The session is not
placed inside the pod. The launch output names the pod, as in
<code>pod/&lt;username&gt;-27068 created</code>, and you enter and delete the pod by that name:</p>
<pre class="docs-code"><code class="language-bash">kubesh &lt;username&gt;-27068               # enter the pod
kubectl get pods                      # list running pods and their IDs
kubectl delete pod &lt;username&gt;-27068   # delete the pod</code></pre>
<p>Inside, a background pod behaves like an interactive launch, with one
difference: exiting the pod does not stop processes started inside it. Leaving
with <code>exit</code> or <code>CONTROL+D</code> leaves everything started in the pod running.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A background pod holds its resources until it is deleted. It does not stop at
logout, and it does not stop when its work is finished.</p></div>
<p>Delete pods that are no longer in use.
<a href="/docs/running-jobs/watching-your-job.html#checking-on-a-detached-job">Checking On a Detached Job</a>
shows how to read a pod's status and output.</p>
<p>Backgrounding does not exempt a job from idle culling. The test is whether the
GPU is doing anything, not whether a session is attached. A background pod whose
job finished at 2 AM is culled like any other idle GPU container. See
<a href="/docs/gpu-access/what-ends-a-session.html#background-and-batch-jobs">Background and Batch Jobs</a>.</p>
<h3 id="backgrounding-a-pod-versus-backgrounding-a-process">Backgrounding a Pod Versus Backgrounding a Process</h3>
<ul>
<li><code>-b</code> backgrounds the pod. The container keeps running after the login-node
  connection ends.</li>
<li><code>&amp;</code> backgrounds a process inside the shell it is typed in. It returns a
  prompt. It does not make the container outlive the session.</li>
</ul>
<p>The two can be combined. A long run is usually a background pod with a
backgrounded process inside it:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -c 4 -b  # then: kubesh &lt;pod-id&gt;
python run.py all &gt; log.txt 2&gt;&amp;1 &amp;                                     # inside the pod
exit</code></pre>
<p>Inside the pod, <code>ps</code> lists processes and <code>kill &lt;pid&gt;</code> stops one. A process
backgrounded with <code>&amp;</code> inside an interactive pod, launched without <code>-b</code>, ends
with the pod.</p>
<h3 id="shell-sessions-with-tmux-or-screen">Shell Sessions with <code>tmux</code> or <code>screen</code></h3>
<p>The standard images include <code>tmux</code> and <code>screen</code>. Start either one inside the
container, and run the work in its session. The work keeps running when the SSH
connection to the login node drops, and when the login node's connection to the
container drops. The second connection can drop during a long session even
while the first holds.</p>
<p>To return to the session, enter the pod again and reattach:</p>
<pre class="docs-code"><code class="language-bash">kubesh &lt;pod-id&gt;   # enter the pod
tmux attach       # reattach a tmux session
screen -r         # or reattach a screen session</code></pre>
<p>Course material sometimes recommends <code>tmux</code> in place of <code>-b</code>. Neither <code>tmux</code>
nor <code>screen</code> keeps the container running, so work in either one lasts only as
long as the container. Only <code>-b</code> or <code>-B</code> keeps the container itself running
after the login-node connection ends.</p>
<h3 id="batch-jobs">Batch Jobs</h3>
<p><code>-B</code> runs a command to completion and exits. A batch job has no Jupyter server,
no shell, and nothing to reconnect to. The command to run follows <code>--</code>:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- python ./train.py</code></pre>
<p>The launcher confirms submission and names the pod. The pod is then managed with
<code>kubectl</code>:</p>
<pre class="docs-code"><code class="language-bash">kubectl get pods                 # Pending until it is scheduled
kubectl describe pod &lt;pod-name&gt;  # show why it is still Pending
kubectl logs &lt;pod-name&gt;          # show what it printed
kubectl delete pod &lt;pod-name&gt;    # delete it when the work is finished</code></pre>
<p><code>Pending</code> is a normal status, not an error. A pod stays Pending until the
resources it requested become free, which for a GPU may take several minutes. A
GPU pod stays Pending until the reservation system admits it, and
<code>kubectl describe pod</code> shows why in an event from <code>gpu-reservation-controller</code>;
see <a href="/docs/reference/reservation-events.html">Reservation Events</a>. A GPU pod with no
such event may be missing its <code>gpu-class</code> label. See
<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.</p>
<p><code>kubectl logs</code> reads from the pod, so its output is unavailable once the pod is
gone. To keep output after the pod ends, write it to a file in the home
directory. The home directory is on the same filesystem as the login node, so
the file outlives the container:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- bash -c 'python ./train.py &gt; out.txt 2&gt;&amp;1'</code></pre>
<p><a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a> covers logging for long
runs.</p>
<h3 id="running-a-script-non-interactively">Running a Script Non-Interactively</h3>
<p><code>-f &lt;script&gt;</code> runs a script inside the container, prints the job's output to the
terminal that submitted it, and exits. With the launcher's absolute path, a job
can be submitted from a personal machine in one command:</p>
<pre class="docs-code"><code class="language-bash">ssh &lt;user&gt;@dsmlp-login.ucsd.edu /opt/launch-sh/bin/launch.sh -W DSC40_FA26_001 \
    -c 8 -m 16 -g 1 -l gpu-class=medium \
    -i &lt;image&gt; -f ${HOME}/myproject/run-commands.sh</code></pre>
<p>Paths inside the script must be valid inside the container, which is not always
the same as valid on the login node.</p>
<p><code>-f</code> ends the container when the command ends. When GPUs are scarce, several
pieces of work submitted with <code>-f</code> each queue for a GPU separately. A background
pod (<code>-b</code>) with a shell inside it runs them all on one launch.</p>
<h2 id="running-several-jobs-at-once">Running Several Jobs at Once</h2>
<p>A member may run any number of shell, VS Code, and batch jobs at the same time,
alongside a Datahub session. Nothing has to be stopped before another job is
started, and launching from <code>dsmlp-login</code> while a browser session is open is not
a conflict.</p>
<p>Datahub itself allows a member one running session, so switching to a different
course environment in the browser requires stopping the running session. See
<a href="/docs/access/datahub-in-the-browser.html#concurrent-datahub-sessions">Concurrent Datahub Sessions</a>.</p>
<h3 id="aggregate-resource-limits">Aggregate Resource Limits</h3>
<p>Total CPU, memory, and GPU across everything a member has running must fit
within the Kubernetes limits set on the member's namespace and, where GPUs are
involved, within the reservation system's limits. A launch that would take the
total past them is refused, whatever mix of sessions makes up that total.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a> lists the namespace
limits.</p>
<p>When a launch is refused for this reason, stop a pod that is no longer in use
instead of filing a request. <code>kubectl get pods</code> lists what is running, and
<code>kubectl delete pod &lt;pod-id&gt;</code> stops a pod.</p>
<p>Every running pod holds its resources whether or not it is doing anything. A
pod that holds a GPU draws Service Units for as long as it runs. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p>
<p>See also: <a href="/docs/gpu-access/quotas-and-availability.html#limits-that-can-stop-a-launch">Limits That Can Stop a Launch</a></p>
<h2 id="the-runtime-limit">The Runtime Limit</h2>
<p>Every container has a runtime limit. When the limit is reached, the container
stops, whatever it was doing, and <code>kubectl get pods</code> reports <code>DeadlineExceeded</code>.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Setting</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Default runtime</td>
<td>6 hours</td>
</tr>
<tr>
<td>Maximum settable at launch</td>
<td>12 hours</td>
</tr>
<tr>
<td>Longer than 12 hours</td>
<td>By request to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>, stating the purpose</td>
</tr>
</tbody>
</table></div>
<p>The runtime limit also applies to a session running under a booking, however
long the booking. See
<a href="/docs/gpu-access/reservations.html#reservation-length-and-session-runtime">Reservation Length and Session Runtime</a>.</p>
<p>On the Research Cluster, the same figures apply, and extension requests go to
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a> instead.</p>
<p>The runtime limit is the same in every mode and does not depend on anyone being
attached. <code>-b</code> and <code>-B</code> do not extend it. They change what the job is attached
to, not how long it may run.</p>
<h3 id="the-deadlineexceeded-status">The <code>DeadlineExceeded</code> Status</h3>
<p><code>DeadlineExceeded</code> means the container reached its runtime limit. It does not
indicate a fault in the code. Anything written to a home directory survives, and
anything held only in memory is lost.
<a href="/docs/reference/error-messages.html">Error Messages</a> lists <code>DeadlineExceeded</code> and
other pod statuses.</p>
<h3 id="raising-the-runtime-limit">Raising the Runtime Limit</h3>
<p>The runtime is set by the environment variable <code>K8S_TIMEOUT_SECONDS</code>, in
seconds, and is read at launch. To raise the limit to 12 hours, export the
variable in the shell before launching:</p>
<pre class="docs-code"><code class="language-bash">export K8S_TIMEOUT_SECONDS=$(( 3600 * 12 ))
launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -b</code></pre>
<p>The variable is read at launch and not afterwards. The deadline is fixed when
the pod is created, and a container that is already running cannot be extended.</p>
<p>A personal launch script can carry the setting. See
<a href="#copying--editing-a-launch-script">Copying &amp; Editing a Launch Script</a>.</p>
<p>The runtime limit does not set what a GPU session is charged. The charge comes
from the session's reservation, a booking or an on-demand lease. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.
Stop the container when the work finishes early.</p>
<h3 id="runtime-limit-idle-culling-and-reservation-window">Runtime Limit, Idle Culling, and Reservation Window</h3>
<p>The runtime limit, idle culling, and the reservation window are separate, and
any one of them can end a container.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Mechanism</th>
<th>What it measures</th>
<th>Where it is documented</th>
</tr>
</thead>
<tbody>
<tr>
<td>Runtime limit</td>
<td>Wall-clock time since the pod started, whatever it is doing</td>
<td><a href="#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td>Idle culling</td>
<td>How long the GPU has been doing nothing</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
<tr>
<td>Reservation window</td>
<td>The capacity booked, and until when</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#end-of-a-reservation-window">End of a Reservation Window</a></td>
</tr>
</tbody>
</table></div>
<p>Idle culling can end a job well within its runtime limit: a GPU container that
stops using its GPU is reclaimed, after a warning.</p>
<p>Scheduled maintenance is separate from all three. The schedules are published
under <a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a>.
<a href="/docs/gpu-access/what-ends-a-session.html#maintenance-closures">Maintenance Closures</a>
describes the effect on sessions.
Instructional maintenance generally leaves running jobs alone. Research Cluster
maintenance terminates all running jobs. Do not start a 12-hour run that would
overlap a Research Cluster maintenance window.</p>
<h3 id="runs-longer-than-12-hours">Runs Longer Than 12 Hours</h3>
<p>Runs longer than 12 hours are arranged by request, not by a flag. Email
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>, or
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a> on the Research Cluster,
stating what the job is and roughly how long it needs.</p>
<p>A job that checkpoints can be restarted.
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a> covers checkpointing.</p>
<p>A reservation holds GPU capacity for multi-day work, but does not lift the
runtime limit. See
<a href="/docs/gpu-access/reservations.html#reservation-length-and-session-runtime">Reservation Length and Session Runtime</a>.</p>
<h2 id="configuring-without-flags">Configuring Without Flags</h2>
<p>Every <code>launch.sh</code> flag has an environment-variable equivalent, which is how the
wrapper scripts work.</p>
<p>A <strong>wrapper script</strong> is a short file that sets variables and then calls the
launcher. <code>launch-scipy-ml.sh</code> and <code>launch-datascience.sh</code> each export several
<code>K8S_*</code> variables and then <code>exec launch.sh</code>. Members can use the same mechanism:</p>
<pre class="docs-code"><code class="language-bash">export K8S_NUM_CPU=8
export K8S_GB_MEM=32
launch-scipy-ml.sh -W DSC40_FA26_001</code></pre>
<p>A value given on the command line overrides the variable. A personal default of
8 CPU does not prevent a request for 2 on a particular launch.</p>
<p>Variables, like flags, are read at launch and not afterwards. A variable
exported inside a running container does not change that container.</p>
<p>A variable set in <code>.bashrc</code> applies to every launch. A default of 8 CPU and a
GPU class in a shell profile applies to quick launches too, at the cost of
waiting time and Service Units.</p>
<h3 id="environment-variables">Environment Variables</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Variable</th>
<th>Equivalent to</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>K8S_NUM_CPU</code></td>
<td><code>-c</code></td>
<td>The reservation differs from the number set. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a></td>
</tr>
<tr>
<td><code>K8S_GB_MEM</code></td>
<td><code>-m</code></td>
<td>As for <code>K8S_NUM_CPU</code></td>
</tr>
<tr>
<td><code>K8S_NUM_GPU</code></td>
<td><code>-g</code></td>
<td></td>
</tr>
<tr>
<td><code>K8S_DOCKER_IMAGE</code></td>
<td><code>-i</code></td>
<td></td>
</tr>
<tr>
<td><code>K8S_TIMEOUT_SECONDS</code></td>
<td>None</td>
<td>Runtime in seconds. See <a href="#raising-the-runtime-limit">Raising the Runtime Limit</a></td>
</tr>
</tbody>
</table></div>
<h3 id="copying--editing-a-launch-script">Copying &amp; Editing a Launch Script</h3>
<p>To launch the same container repeatedly, copy a wrapper script and edit it:</p>
<pre class="docs-code"><code class="language-bash">cp -p "$(which launch-scipy-ml.sh)" "$HOME/my-launch.sh"
nano "$HOME/my-launch.sh"
"$HOME/my-launch.sh"</code></pre>
<p><code>cp -p</code> preserves the executable bit. The copy contains a short list of variable
assignments followed by a call to <code>launch.sh</code>. Change the values, save the file,
and run it.</p>
<p>A minimal script can also be written from scratch:</p>
<pre class="docs-code"><code class="language-bash">#!/bin/bash
export K8S_NUM_CPU=4
export K8S_GB_MEM=16
export K8S_TIMEOUT_SECONDS=$(( 3600 * 12 ))
exec /opt/launch-sh/bin/launch.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium "$@"</code></pre>
<p>The final <code>"$@"</code> passes anything typed after the script name through to the
launcher, so <code>./my-launch.sh -b</code> still works.</p>
<p>Setting variables does not select a workspace. A script for a course workspace
keeps the <code>-W</code> flag.</p>
<p>Keep the script in the home directory. The home directory persists between
containers and is visible from both the login node and inside the pod. Anything
written elsewhere in the container does not survive it. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>.</p>
<p>A personal copy of a wrapper is not a supported interface. When ITS changes a
wrapper, such as the image it points at or a default, a copy does not change
with it. Re-copy the wrapper at the start of each term, particularly after an
image update.</p>
<p>See also: <a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a></p>
