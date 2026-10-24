---
title: "Coming from HPC"
path: /docs/reference/coming-from-hpc.html
description: "If you have worked on a high-performance computing (HPC) cluster that runs Slurm, find the PARASOL equivalent of what you know, where PARASOL behaves…"
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/coming-from-hpc/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/coming-from-hpc.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/coming-from-hpc/
format: html
---
<p>If you have worked on a high-performance computing (HPC) cluster that runs
Slurm, find the PARASOL equivalent of what you know, where PARASOL behaves
differently, and whether your existing submission scripts run unchanged.</p>
<h2 id="hpc-terms-and-their-equivalents">HPC Terms and Their Equivalents</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>On an HPC cluster</th>
<th>The nearest equivalent</th>
<th>Where it differs</th>
</tr>
</thead>
<tbody>
<tr>
<td>Account / project</td>
<td><a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a></td>
<td>A workspace covers a course, a lab, or a catch-all population. It controls the roster, storage, images, GPU classes, quota, and budget. It is named with <code>launch.sh -W</code>.</td>
</tr>
<tr>
<td>Allocation</td>
<td>Group quota and Service Unit budget</td>
<td>A group quota caps how many GPUs of a class a workspace may hold at once. A Service Unit budget caps how much GPU time may be spent. Neither alone is an allocation.</td>
</tr>
<tr>
<td>Service units / core-hours</td>
<td><a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a></td>
<td>Service Units are similar to core-hours. Each GPU class has an hourly rate, drawn against a budget that renews weekly by default.</td>
</tr>
<tr>
<td>Partition / queue</td>
<td><a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a></td>
<td>A GPU class is a size band, requested as a pod label: <code>-l gpu-class=medium</code>. It is not a queue and not a nameable set of nodes.</td>
</tr>
<tr>
<td>The scheduler</td>
<td>Kubernetes admission</td>
<td>There is no queue position, no backfill, and no observable priority ordering.</td>
</tr>
<tr>
<td><code>sbatch</code>, <code>srun</code>, <code>squeue</code>, <code>scancel</code></td>
<td><a href="#slurm-compatibility-wrappers">Slurm Compatibility Wrappers</a></td>
<td>The commands are installed and working. They translate into <code>launch.sh</code>, with no Slurm scheduler behind them.</td>
</tr>
<tr>
<td><code>sacct</code>, <code>sinfo</code>, <code>scontrol</code></td>
<td>No equivalent</td>
<td>Use <code>kubectl get pods</code> and <code>kubectl describe pod</code>.</td>
</tr>
<tr>
<td><code>module load</code></td>
<td>Container images</td>
<td>The environment is the container image, chosen with <code>-i</code> or set by the workspace. See <a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a>.</td>
</tr>
<tr>
<td>Walltime (<code>--time</code>)</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
<td>The runtime limit is 6 hours by default, up to 12 hours if set at launch. Idle culling and the end of a reservation window can also end a job. See <a href="#runtime-limit-idle-culling-and-reservation-window">Runtime Limit, Idle Culling, and Reservation Window</a>.</td>
</tr>
<tr>
<td><code>--mem</code>, <code>--cpus-per-task</code></td>
<td><code>-m</code>, <code>-c</code></td>
<td>The number passed is the limit, not the amount reserved. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a>.</td>
</tr>
<tr>
<td><code>--gres=gpu:N</code></td>
<td><code>-g N</code></td>
<td><code>-g</code> is the GPU count and <code>-G</code> is the group flag. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-and-gpu-selection-flags">Resource and GPU Selection Flags</a>.</td>
</tr>
<tr>
<td><code>--exclusive</code>, whole-node jobs</td>
<td>No equivalent</td>
<td><code>-n</code> can place a pod on a named node, but the container is still sized by the resource tiers and runs on a node shared with other users. Use <code>-n</code> only for a session launched without a booking; see <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</td>
</tr>
<tr>
<td>MPI, <code>--nodes</code>, multi-node</td>
<td>No equivalent</td>
<td>Every job runs in one container on one node.</td>
</tr>
<tr>
<td>Job arrays</td>
<td><code>--array</code></td>
<td><code>--array</code> submits multiple jobs. A concurrency limit such as <code>%4</code> is parsed and ignored.</td>
</tr>
<tr>
<td>Reservation</td>
<td><a href="/docs/gpu-access/reservations.html">Reservations</a></td>
<td>A reservation guarantees access, not a running job. The session is still launched as usual.</td>
</tr>
<tr>
<td>Fairshare</td>
<td>Service Units and borrowing seniority</td>
<td>The mechanism differs. Service Units and borrowing seniority divide a contested cluster between workspaces and between members of a workspace. See <a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a> and <a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a>.</td>
</tr>
<tr>
<td>Login node</td>
<td><a href="/docs/access/the-login-node.html">The Login Node</a></td>
<td>The same rule applies. The login node is a jumpbox for launching jobs and moving files, and running computation on it is prohibited.</td>
</tr>
<tr>
<td>Scratch</td>
<td>The container's <code>/tmp</code></td>
<td>No shared scratch filesystem. <code>/tmp</code> is local to the node, fast, and erased when the pod ends.</td>
</tr>
</tbody>
</table></div>
<h2 id="differences-from-slurm-behavior">Differences from Slurm Behavior</h2>
<p>Three Slurm conventions behave differently on PARASOL.</p>
<h3 id="the---partition-option">The <code>--partition</code> Option</h3>
<p><code>--partition</code> is not a scheduling partition. It is forwarded as a <code>gpu-class</code>
pod label, so <code>--partition medium</code> requests the <code>medium</code> GPU class rather than
a queue named "medium". A partition name that is not a GPU class requests
nothing that exists. The option is accepted either way, and the failure appears
later as a pod that does not schedule.
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> describes the classes.</p>
<h3 id="memory-and-cpu-limits">Memory and CPU Limits</h3>
<p>The value passed to <code>-m</code> or <code>-c</code>, or to <code>--mem</code> or <code>--cpus-per-task</code> through
the wrappers, is the limit, not the amount the scheduler guarantees.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a>
describes the guaranteed request and how to size a job for it.</p>
<h3 id="pending-pods">Pending Pods</h3>
<p>A pending CPU pod is not queued. With no scheduler arbitrating between
submissions, it stays pending while nothing can take it. A pending GPU pod waits
for the reservation system, which serves waiting on-demand requests in the order
the pods were created. See
<a href="/docs/gpu-access/quotas-and-availability.html#waiting-for-an-on-demand-lease">Waiting for an On-Demand Lease</a>.
Until it is admitted, a GPU pod shows a <code>FailedScheduling</code> event, and the
reservation event beside it gives the reason; see
<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.
<a href="/docs/reference/error-messages.html">Error Messages</a> also lists the messages.</p>
<h2 id="runtime-limit-idle-culling-and-reservation-window">Runtime Limit, Idle Culling, and Reservation Window</h2>
<p>Three separate limits can end a job: the runtime limit, idle culling, and the
end of a reservation window.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Limit</th>
<th>What it measures</th>
<th>Where it is documented</th>
</tr>
</thead>
<tbody>
<tr>
<td>Runtime limit</td>
<td>Wall-clock time since the pod started</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
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
<p>Idle culling has no HPC equivalent. A GPU session that stops using its GPU is
reclaimed regardless of its runtime limit.</p>
<h2 id="slurm-compatibility-wrappers">Slurm Compatibility Wrappers</h2>
<p><code>sbatch</code>, <code>srun</code>, <code>squeue</code>, and <code>scancel</code> are installed as translation wrappers
around <code>launch.sh</code>. There is no Slurm scheduler behind them.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Slurm feature</th>
<th>Behavior of the wrappers</th>
</tr>
</thead>
<tbody>
<tr>
<td>Queue and scheduling</td>
<td>A job is submitted to Kubernetes, which places it when the resources exist. There is no queue position, no backfill, and no observable priority ordering.</td>
</tr>
<tr>
<td>Multi-node jobs and MPI</td>
<td>Not supported. Every job runs in one container on one node, and <code>--nodes</code> has no equivalent.</td>
</tr>
<tr>
<td>Accounting commands</td>
<td>There is no <code>sacct</code>, <code>sinfo</code>, or <code>scontrol</code>.</td>
</tr>
<tr>
<td>Job state</td>
<td>The wrappers record what they submitted in <code>~/.slurm-compat/jobs.tsv</code>, which is how <code>squeue</code> knows about submitted jobs. The file is in a home directory and is not a cluster database.</td>
</tr>
</tbody>
</table></div>
<h2 id="option-mapping">Option Mapping</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Slurm option</th>
<th>Equivalent</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--job-name</code></td>
<td>The job's name</td>
</tr>
<tr>
<td><code>--partition</code></td>
<td><code>-l gpu-class=&lt;value&gt;</code>, a GPU class rather than a queue</td>
</tr>
<tr>
<td><code>--cpus-per-task</code></td>
<td><code>-c</code></td>
</tr>
<tr>
<td><code>--mem</code></td>
<td><code>-m</code>, rounded up to whole GB</td>
</tr>
<tr>
<td><code>--gres=gpu:N</code></td>
<td><code>-g N</code></td>
</tr>
<tr>
<td><code>--gres=gpu:&lt;model&gt;:N</code></td>
<td><code>-g N</code> plus <code>-v &lt;model&gt;</code>, which also needs <code>--partition</code> for the class. Use it only for a job launched without a booking; see <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a></td>
</tr>
<tr>
<td><code>--time</code></td>
<td><code>K8S_TIMEOUT_SECONDS</code>, the container's runtime deadline</td>
</tr>
<tr>
<td><code>--output</code>, <code>--error</code></td>
<td>Output files, with <code>%j</code>, <code>%A</code>, <code>%u</code>, <code>%x</code> and <code>%a</code> substitutions</td>
</tr>
<tr>
<td><code>--array</code></td>
<td>Multiple submissions</td>
</tr>
</tbody>
</table></div>
<h3 id="platform-specific-options">Platform-Specific Options</h3>
<p>The wrappers accept two options that Slurm does not have.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Option</th>
<th>Effect</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--image &lt;image&gt;</code></td>
<td>The container image, as <code>launch.sh -i</code></td>
</tr>
<tr>
<td><code>--course &lt;workspace&gt;</code></td>
<td>The workspace to launch into, as <code>launch.sh -W</code></td>
</tr>
</tbody>
</table></div>
<h3 id="requested-runtime">Requested Runtime</h3>
<p><code>--time</code> is subject to the platform's runtime limits. A batch script that asks
for 72 hours does not receive 72 hours.
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>
describes the limits.</p>
<h2 id="limitations-of-the-slurm-wrappers">Limitations of the Slurm Wrappers</h2>
<h3 id="array-concurrency-limits">Array Concurrency Limits</h3>
<p>Array concurrency limits are parsed but not enforced. <code>--array=1-100%4</code> submits
all 100 jobs, and the <code>%4</code> is accepted and ignored. Concurrency must be limited
by other means.</p>
<h3 id="exit-status">Exit Status</h3>
<p><code>sbatch</code> does not propagate a job's exit status. A pipeline that checks the
return code of a submission does not learn whether the work succeeded. The
job's own output shows that.</p>
<h3 id="diagnostic-commands">Diagnostic Commands</h3>
<p>The wrappers translate into <code>launch.sh</code> and do not translate back. Diagnose a
failed job with the Kubernetes commands <code>kubectl get pods</code>,
<code>kubectl describe pod</code>, and <code>kubectl logs</code>, not with Slurm commands.
<a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a>
describes direct use of Kubernetes.</p>
<h2 id="choosing-between-the-slurm-wrappers-and-launchsh">Choosing Between the Slurm Wrappers and <code>launch.sh</code></h2>
<p>Use the Slurm wrappers to run existing submission scripts unchanged. Write new
work against <code>launch.sh</code>, using workspaces, GPU classes, and background and
batch modes directly. See
<a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a>.</p>
<h2 id="unsupported-hpc-features">Unsupported HPC Features</h2>
<p>MPI, multi-node jobs, a job scheduler, and accounting commands are not
available. See
<a href="#slurm-compatibility-wrappers">Slurm Compatibility Wrappers</a>. Nothing reports
historical usage the way <code>sacct</code> does. Work that is tightly coupled across
nodes belongs on another platform.</p>
<p>Where any of these is a requirement, contact
<a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> first.
Research IT can compare the work against the other platforms the campus runs
and against national resources.</p>
<p>See also: <a href="/docs/reference/getting-help.html#platform-selection">Platform Selection</a></p>
<h2 id="features-uncommon-on-hpc-clusters">Features Uncommon on HPC Clusters</h2>
<p>PARASOL provides a browser-based notebook environment that shares one filesystem
with the login node, per-user containers that members build themselves, and
Kubernetes underneath for direct use. Most HPC clusters do not provide these.
<a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a>
describes direct use of Kubernetes.</p>
