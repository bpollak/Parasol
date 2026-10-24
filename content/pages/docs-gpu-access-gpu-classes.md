---
title: "GPU Classes"
path: /docs/gpu-access/gpu-classes.html
description: "A GPU class is a size band of GPU memory. Request the amount of memory your work needs, and the platform picks hardware that fits."
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/gpu-classes/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/gpu-classes.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/gpu-classes/
format: html
---
<p>A <strong>GPU class</strong> is a size band of GPU memory rather than a hardware model: a
request names the amount of GPU memory the work needs, and the platform selects
the physical card that provides it.</p>
<h2 id="gpu-class-sizes">GPU Class Sizes</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Class</th>
<th>Memory</th>
<th>Typically backed by</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>xsmall</code></td>
<td>~6 GB</td>
<td>A slice of an A30</td>
</tr>
<tr>
<td><code>small</code></td>
<td>10-12 GB</td>
<td>RTX 2080 Ti, or a slice of an A30 or H100</td>
</tr>
<tr>
<td><code>medium</code></td>
<td>20-24 GB</td>
<td>A30, A5000, Titan RTX, or a slice of an H100 or RTX PRO 6000</td>
</tr>
<tr>
<td><code>large</code></td>
<td>40-48 GB</td>
<td>L40S, or a slice of an H100 or RTX PRO 6000</td>
</tr>
<tr>
<td><code>xlarge</code></td>
<td>80-96 GB</td>
<td>A full H100 or RTX PRO 6000 Blackwell</td>
</tr>
</tbody>
</table></div>
<p><img alt="Bar chart of GPU memory by class, on a scale of 0 to 100 GB: xsmall about 6 GB, small 10 to 12 GB, medium 20 to 24 GB, large 40 to 48 GB, and xlarge 80 to 96 GB." src="/_images/docs/gpu-class-sizes.svg" class="img-responsive docs-figure"></p>
<p>Plan against the memory column. The hardware column is context. Both columns
are approximate and subject to change. A class specifies roughly how much GPU
memory a session has, not which card it runs on, and two sessions in the same
class on the same afternoon may run on different hardware.
<a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> lists every card and slice
that can back each class, and <a href="/docs/gpu-access/gpu-hardware.html">GPU Hardware &amp; CUDA</a> gives their
specifications.</p>
<h2 id="choosing-a-class">Choosing a Class</h2>
<p>Request the smallest class the work fits within. A larger class is not faster
for a model that already fits in a smaller one. A larger class is scarcer, so
the wait for it is longer, and it draws more heavily on the Service Unit budget
for every hour it is held. See
<a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>.</p>
<p>GPU memory, not speed, determines the class. A model's parameters, its
optimizer state, and the activations for one batch must all fit on the card at
once. A run that fails with a CUDA out-of-memory error has two usual remedies,
applied in this order: a smaller batch size, then the next class up.</p>
<p><a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> gives examples of course and
research work that fits each class, with approximate memory figures.</p>
<h3 id="multiple-gpus">Multiple GPUs</h3>
<p>One GPU is the normal case. Single-GPU work mostly consists of moving a model
and its batches onto the device. Using several GPUs at once is a substantial
code change rather than a launch flag. In PyTorch, this means
<code>nn.parallel.DistributedDataParallel</code> or a library such as Hugging Face
Accelerate.</p>
<p>An account can hold 1 GPU at a time by default, whatever it has booked; see
<a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a>. For
multi-GPU work, the member, or a TA for a course, asks ITS to raise the
account's limit. Requests go to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> and
state what the work is.</p>
<h2 id="requesting-a-class">Requesting a Class</h2>
<p>A GPU launch requests two things: the number of GPUs and the class.</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium</code></pre>
<p><code>-g</code> sets the GPU count and <code>-l gpu-class=</code> sets the class. The five values are
<code>xsmall</code>, <code>small</code>, <code>medium</code>, <code>large</code>, and <code>xlarge</code>. Always pass the
class label on a GPU request. A GPU request without it cannot be scheduled. See
<a href="#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><code>-g</code> is the GPU count and <code>-G</code> is the group flag. Typing <code>-G</code> in place of
<code>-g</code> produces an error that does not clearly indicate the capitalization
mistake. See <a href="/docs/running-jobs/launch-sh-reference.html#resource-and-gpu-selection-flags">Resource and GPU Selection Flags</a>.<p></p></div>
<h3 id="service-unit-charges-at-launch">Service Unit Charges at Launch</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Launching a GPU session without a booking creates a reservation on the
member's behalf and draws Service Units in the same way as a booked window.
There is no free exploratory launch. See
<a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<p>A launch without a booking holds an on-demand lease of 1 hour 10 minutes, and
is charged for the time the session uses within it. A longer guarantee comes
from <a href="/docs/gpu-access/reservations.html#extend">Extend</a> in the reservation app. A session must be
stopped explicitly. Logging out does not stop it. See
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p>
<h3 id="workspace-class-grants">Workspace Class Grants</h3>
<p>Each workspace is granted access to one or more classes, chosen when the
workspace was provisioned to match the work it was expected to do. An
introductory course may see <code>small</code> or <code>medium</code>. A lab fine-tuning large models
may see <code>xlarge</code>. A request for a class the workspace was not granted is
refused, however idle the hardware is. Access to a further class is requested
by the instructor or PI. The grant is part of the workspace. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>.</p>
<p>A member who belongs to several workspaces selects the one a launch goes into
with <code>-W</code>. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>.
The launch uses that workspace's class grant and Service Unit budget. A GPU
launch without <code>-W</code> is charged to <code>ORG_ON_DEMAND</code>; see
<a href="/docs/gpu-access/reservations.html#the-default-workspace">The Default Workspace</a>.</p>
<h3 id="requesting-a-gpu-model">Requesting a GPU Model</h3>
<p><code>-v &lt;model&gt;</code> limits a GPU session to one model within its class, for example
<code>-l gpu-class=large -v l40s</code>. The class label is still needed, and the model
must be one that backs the class in <a href="#gpu-class-sizes">GPU Class Sizes</a>. Use
<code>-v</code> only for a session launched without a booking; see
<a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</p>
<h3 id="slurm-partition-mapping">Slurm Partition Mapping</h3>
<p><code>--partition</code> is not a scheduling partition on this platform. It is forwarded
as a <code>gpu-class</code> label, so <code>--partition medium</code> requests the <code>medium</code> class.
The mapping of Slurm options is under
<a href="/docs/reference/coming-from-hpc.html#option-mapping">Option Mapping</a>.</p>
<h2 id="preset-classes-on-datahub">Preset Classes on Datahub</h2>
<p>A browser session has no GPU class to choose. The class is set on the
environment a workspace publishes and is fixed in whichever profile is selected
from the spawn menu. There is no control to change it.</p>
<p>Where a course offers both a CPU option and a GPU option, selecting the GPU
option also selects its class. Work that needs a different class from the one a
course publishes is arranged with the instructor or TA. Where a course does not
publish a GPU environment, the same access can be used from the command line.
See <a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a>.</p>
<h2 id="missing-or-misspelled-class-label">Missing or Misspelled Class Label</h2>
<p>Every GPU class is managed by the reservation system, and a GPU pod waits in
<code>Pending</code> until the reservation system admits it. While it waits,
<code>kubectl describe pod</code> shows a <code>FailedScheduling</code> event from the Kubernetes
scheduler that begins <code>0/N nodes are available</code>. That event is normal for every
GPU pod that has not been admitted yet. It does not by itself mean that
the label is wrong or that the cluster is full.</p>
<p>Read the events from <code>gpu-reservation-controller</code> beside it:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>What <code>kubectl describe pod</code> shows</th>
<th>Cause</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td>An <code>UnknownGpuClass</code> event, which lists the known classes</td>
<td>The class name is misspelled. Class names are case-sensitive</td>
<td>Delete the pod and launch again with the correct name</td>
</tr>
<tr>
<td>No event from <code>gpu-reservation-controller</code> after a minute or two, and no <code>gpu-class</code> under <strong>Labels</strong></td>
<td>The label is missing. The reservation system never sees the pod</td>
<td>Delete the pod and launch again with <code>-l gpu-class=&lt;class&gt;</code></td>
</tr>
<tr>
<td>Any other reservation event</td>
<td>The reservation system is handling the pod</td>
<td>See <a href="/docs/reference/reservation-events.html">Reservation Events</a></td>
</tr>
</tbody>
</table></div>
<p><a href="/docs/gpu-access/quotas-and-availability.html#when-the-cluster-is-full">When the Cluster Is Full</a>
covers a full cluster. <a href="/docs/reference/error-messages.html">Error Messages</a> also
lists the messages.</p>
<h2 id="confirming-the-allocation">Confirming the Allocation</h2>
<p>Two commands, run inside the running container, confirm what was allocated.</p>
<pre class="docs-code"><code class="language-bash">python -c "import torch; print(torch.cuda.get_device_name(0));"
nvidia-smi</code></pre>
<p>Run the first command when code reports that no device was found. That symptom
is more often an environment problem than a scheduling one. For example, an
image without CUDA tooling cannot see a card that is attached. The
<code>rstudio-notebook</code> image derives from the CPU image and is not GPU-enabled. See
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a>.
<a href="/docs/reference/error-messages.html#pytorch-gpu-detection">PyTorch GPU Detection</a>
lists the usual causes.</p>
<p>The second command, <code>nvidia-smi</code>, names the GPU model and how much memory it
has. This confirms that the session is on the expected class rather than an
adjacent one. A session on a Multi-Instance GPU (MIG) slice can use only the
slice's memory, which is less than the card's; see
<a href="/docs/gpu-access/gpu-hardware.html#mig-slices">MIG Slices</a>.</p>
<p>The status page lists the GPU models present on each node, and how many are
free. See <a href="/docs/gpu-access/quotas-and-availability.html#the-status-page">The Status Page</a>.</p>
<h3 id="checking-gpu-utilization">Checking GPU Utilization</h3>
<p><code>nvidia-smi</code> also reports what is currently using the card. This shows whether
a training run is on the GPU or running on the CPU instead. Check it once at
the start of a long run. A GPU that is not in use is reclaimed by idle culling,
which applies to every class, with or without a reservation. The criteria are
under <a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
<h2 id="from-reservation-to-running-session">From Reservation to Running Session</h2>
<p>A reservation guarantees access, not a running job. Booking a window does not
start anything. When the window opens, a session is launched the usual way. The
booking ensures that the capacity is available and that the session is
admitted ahead of the walk-up queue.</p>
<p>There is no control that selects a booking. A session that matches the booking,
by user, class, workspace, and GPU count, claims it; see
<a href="/docs/gpu-access/reservations.html#claiming-a-booking">Claiming a Booking</a>. A session of a
different class does not claim the booking, and is given an on-demand lease
instead.</p>
<p>A booked window that is not claimed in time is cancelled. The deadline is under
<a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a>.</p>
