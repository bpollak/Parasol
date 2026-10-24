---
title: "Watching a Running Job"
path: /docs/running-jobs/watching-your-job.html
description: "Check whether a running job is using the CPU, memory, and GPU it requested, whether a detached job is still going, and what an OOMKilled status means."
eyebrow: "Running Jobs"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/running-jobs/watching-your-job/), preview build of 2026-09-29"
canonicalUrl: /docs/running-jobs/watching-your-job.html
legacyUrl: https://dsmlp-docs.ucsd.edu/running-jobs/watching-your-job/
format: html
---
<p class="lead">Check whether a running job is using the CPU, memory, and GPU it requested,
whether a detached job is still going, and what an <code>OOMKilled</code> status means.
When you finish, list and stop the sessions your account still holds.</p>
<dl class="docs-glance">
<div><dt>CPU and memory</dt><dd><code>htop</code>, inside the container</dd></div>
<div><dt>GPU</dt><dd><code>nvidia-smi</code>, inside the container</dd></div>
<div><dt>Detached jobs</dt><dd><code>kubectl get pods</code></dd></div>
<div><dt>Stop a browser session</dt><dd><strong>File → Hub Control Panel → Stop My Server</strong></dd></div>
</dl>
<h2 id="monitoring-from-the-browser">Monitoring from the Browser</h2>
<p>The standard images in
<a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a> display
CPU, memory, and GPU utilization for the running container in the Jupyter
interface. The display appears along the top of the interface rather than at one
fixed position.</p>
<p><strong>The display does not show whether code is running on the GPU.</strong> A container with a
GPU attached shows the GPU as attached whether or not any process is using it.
<a href="#checking-gpu-utilization">Checking GPU Utilization</a> describes the check for
GPU use.</p>
<h2 id="monitoring-from-a-shell-inside-the-container">Monitoring from a Shell Inside the Container</h2>
<p>Open a terminal in the Jupyter interface, or enter a running pod from the login
node with <code>kubesh &lt;pod-id&gt;</code>, and run:</p>
<figure class="docs-command"><figcaption>In a Jupyter terminal or a <code>kubesh</code> shell</figcaption><pre class="docs-code"><code class="language-bash">htop        # CPU and memory, live
nvidia-smi  # the GPU: model, memory in use, and the processes using it</code></pre></figure>
<p><code>htop</code> reports the pod's own figures, not the cluster's. Compare them against
the resources requested at launch. See
<a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a>.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Not on the login node</strong></p><p>Do not run <code>htop</code> or <code>nvidia-smi</code> on <code>dsmlp-login</code>, and do not leave a
monitoring loop running there. The login node is for launching jobs and moving
files. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.</p>
<p><code>htop</code> run on the login node reports the login node, not the container in which
the job runs.</p></div>
<h2 id="checking-gpu-utilization">Checking GPU Utilization</h2>
<p>Run these commands inside the container:</p>
<figure class="docs-command"><figcaption>Run inside the container</figcaption><pre class="docs-code"><code class="language-bash">python -c "import torch; print(torch.cuda.get_device_name(0));"
nvidia-smi</code></pre></figure>
<p><strong>The <code>python</code> command</strong> diagnoses a "no device found" message. That message is much
more often an environment problem than a scheduling one. For example, the
<code>rstudio-notebook</code> image derives from the CPU image and cannot see a GPU. See
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a>.
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> covers requesting a GPU.
<a href="/docs/reference/error-messages.html#pytorch-gpu-detection">PyTorch GPU Detection</a>
lists the usual causes of a missing device.</p>
<p><strong><code>nvidia-smi</code></strong> reports the GPU model, its memory, and the processes using it. Run
it again partway through a job. If the memory in use has not changed and no
process is listed against the GPU, the job is training on the CPU.</p>
<h3 id="idle-culling-and-monitoring">Idle Culling and Monitoring</h3>
<p>A GPU session that stops using its GPU is reclaimed by idle culling. Attaching
to a pod, tailing a log, or leaving <code>nvidia-smi</code> running does not exempt a
session from idle culling.
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>
lists the criteria.</p>
<h2 id="memory-limits-and-oomkilled">Memory Limits and <code>OOMKilled</code></h2>
<p><strong>The <code>OOMKilled</code> (out of memory) status means the container reached its memory
limit</strong>, not that the code threw an error. It appears in the status column of
<code>kubectl get pods</code>. It is the most common way a long job ends without a
traceback. <a href="/docs/reference/error-messages.html">Error Messages</a> describes the
status and its usual cause.</p>
<p>Memory is requested at launch with <code>-m</code>.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a>
describes how that value sets the memory request and limit, and why an identical
job can succeed on one run and be killed on another.</p>
<p>Memory use changes over the course of a run. An <code>htop</code> reading taken in the
first minutes of a run says little about a data loader whose memory grows over
several hours.</p>
<h2 id="tensorboard--other-dashboards">TensorBoard &amp; Other Dashboards</h2>
<p>A dashboard runs as a server inside the container and is reached from a local
machine over an SSH tunnel. TensorBoard is the usual case. Any other service
that serves a web page is reached the same way.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Start the server in the container</span><p>From a JupyterLab terminal or a <code>kubesh</code> shell:</p>
<figure class="docs-command"><figcaption>In the container</figcaption><pre class="docs-code"><code class="language-bash">tensorboard --logdir &lt;log directory&gt; --bind_all --port &lt;port&gt;</code></pre></figure></li>
<li><span class="docs-step-title">Open a tunnel to it</span><p>From a second terminal on the local machine:</p>
<figure class="docs-command"><figcaption>On the local machine, in a second terminal</figcaption><pre class="docs-code"><code class="language-bash">ssh -N -L localhost:&lt;port&gt;:127.0.0.1:&lt;port&gt; &lt;user&gt;@dsmlp-login.ucsd.edu</code></pre></figure></li>
<li><span class="docs-step-title">Open the dashboard</span><p>Open <code>localhost:&lt;port&gt;</code> in a browser.</p></li>
</ol>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>A working tunnel prints nothing</strong></p><p>A silent terminal indicates success, not a
hang. Keep the tunnel's terminal open for as long as the dashboard is needed.</p></div>
<p><code>Ctrl+C</code> closes the tunnel.
<a href="/docs/access/the-login-node.html#reaching-a-notebook-or-a-service">Reaching a Notebook or a Service</a>
describes the tunnel forms.</p>
<p>Some courses distribute a wrapper script that starts TensorBoard on a course log
directory. These scripts are course-specific, and their paths change every
term. Such a script performs the same three steps.</p>
<h3 id="closing-the-tunnel-and-the-container">Closing the Tunnel and the Container</h3>
<p>Closing a tunnel does not stop the container. Stopping the container does not
close the tunnel. At the end of a session:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Stop the session</span><p>Use <strong>File → Hub Control Panel → Stop My Server</strong> or <code>kubectl delete pod &lt;pod-id&gt;</code>.</p></li>
<li><span class="docs-step-title">Close the tunnel</span><p><code>Ctrl+C</code> in the tunnel's terminal closes it.</p></li>
</ol>
<p>Logging out does not stop the session. See
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p>
<h2 id="checking-on-a-detached-job">Checking On a Detached Job</h2>
<p>Exiting a background pod does not stop the work running inside it. The work
continues after the session that started it has ended. See
<a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a>.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>To find out</th>
<th>Run</th>
</tr>
</thead>
<tbody>
<tr>
<td>Which pods exist, and their status</td>
<td><code>kubectl get pods</code></td>
</tr>
<tr>
<td>What a batch job printed</td>
<td><code>kubectl logs &lt;pod-id&gt;</code></td>
</tr>
<tr>
<td>What is happening inside a background pod</td>
<td><code>kubesh &lt;pod-id&gt;</code>, then <code>htop</code> or <code>nvidia-smi</code></td>
</tr>
<tr>
<td>Which started processes are still running</td>
<td><code>ps</code> inside the pod</td>
</tr>
</tbody>
</table></div>
<p><strong>Checkpoint long runs.</strong> Idle culling, the runtime limit, and the end of a
reservation window each end sessions regardless of the code running in them.
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a> describes
checkpointing.</p>
<h3 id="logging-an-unattended-run">Logging an Unattended Run</h3>
<p>Write the output of an unattended run to a file. Redirecting output, as in
<code>python run.py all &gt; log.txt &amp;</code>, records it without timestamps. Python's
<code>logging</code> module timestamps each line and names the file and function it came
from, so a failure during a run of several hours can be placed in time.</p>
<p>See also: <a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a></p>
<h2 id="listing-and-stopping-sessions">Listing and Stopping Sessions</h2>
<p>These commands and controls list and stop the sessions an account holds:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Task</th>
<th>Command or control</th>
</tr>
</thead>
<tbody>
<tr>
<td>List the pods an account holds</td>
<td><code>kubectl get pods</code>, from a terminal</td>
</tr>
<tr>
<td>Stop a pod</td>
<td><code>kubectl delete pod &lt;pod-id&gt;</code>, from a terminal</td>
</tr>
<tr>
<td>Stop a browser session</td>
<td><strong>File → Hub Control Panel → Stop My Server</strong></td>
</tr>
</tbody>
</table></div>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Logging out or closing a laptop does not stop a session, and closing VS Code
does not release a pod.</p></div>
<p><a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>
describes stopping a browser session.</p>
<p>A GPU session spends Service Units while it runs, whether or not it is doing any
work. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.
A GPU session that stops using its GPU is eventually reclaimed by idle culling
and is charged until it is reclaimed. See
<a href="/docs/gpu-access/what-ends-a-session.html">What Ends a Session</a>.
<a href="/docs/gpu-access/service-units-and-budgets.html#remaining-balance">Remaining Balance</a>
covers the balance.</p>
<p>Several jobs may run at once, so <code>kubectl get pods</code> can list more than one pod.
Resource limits apply to the total across them. See
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>.</p>
