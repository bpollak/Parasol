---
title: "launch.sh Reference"
path: /docs/running-jobs/launch-sh-reference.html
description: "Look up a launch.sh option, the resources a container gets by default, or how it applies the CPU, memory, and GPU values you pass."
eyebrow: "Running Jobs"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/running-jobs/launch-sh-reference/), preview build of 2026-09-29"
canonicalUrl: /docs/running-jobs/launch-sh-reference.html
legacyUrl: https://dsmlp-docs.ucsd.edu/running-jobs/launch-sh-reference/
format: html
---
<p>Look up a <code>launch.sh</code> option, the resources a container gets by default, or how
it applies the CPU, memory, and GPU values you pass.
<a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a> covers work that continues after
a terminal session ends.
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a> covers how long
a container may run.</p>
<h2 id="location-and-invocation">Location and Invocation</h2>
<p><code>launch.sh</code> is on the path once a connection to the login node is established.
Its absolute path is <code>/opt/launch-sh/bin/launch.sh</code>. Containers run unprivileged
under the member's own UID, and no flag grants root or sudo
(<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>).</p>
<h3 id="wrapper-scripts">Wrapper Scripts</h3>
<p>Most work goes through a wrapper. <code>launch-scipy-ml.sh</code> starts the GPU-capable
image and <code>launch-datascience.sh</code> starts the CPU image.
<a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a>
describes the images. Each
wrapper sets environment variables and then hands off to <code>launch.sh</code>, so every
<code>launch.sh</code> flag behaves identically through a wrapper.</p>
<p>Every flag also has an environment-variable equivalent, which is the mechanism
the wrappers use.
<a href="/docs/running-jobs/job-modes-and-limits.html#configuring-without-flags">Configuring Without Flags</a>
covers the equivalents.</p>
<h3 id="non-interactive-submission">Non-Interactive Submission</h3>
<p>A job submitted in one line from a personal machine names the launcher by its
absolute path, because <code>ssh</code> runs a non-login shell in which the launcher is not
necessarily on the path.</p>
<pre class="docs-code"><code class="language-bash">ssh &lt;user&gt;@dsmlp-login.ucsd.edu /opt/launch-sh/bin/launch.sh -W DSC40_FA26_001 \
    -c 8 -m 16 -g 1 -l gpu-class=medium \
    -i &lt;image&gt; -f ${HOME}/myproject/run-commands.sh</code></pre>
<p>The VS Code <code>ProxyCommand</code> in
<a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a> uses the same form.</p>
<h2 id="defaults-and-resource-tiers">Defaults and Resource Tiers</h2>
<h3 id="default-resources">Default Resources</h3>
<p>Bare <code>launch.sh</code> and the wrappers start containers with different defaults.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Invocation</th>
<th>CPU</th>
<th>RAM</th>
<th>GPU</th>
<th>Image</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>launch.sh</code></td>
<td>1</td>
<td>1 GB</td>
<td>0</td>
<td><code>ghcr.io/ucsd-ets/scipy-ml-notebook:stable</code></td>
</tr>
<tr>
<td><code>launch-scipy-ml.sh</code>, <code>launch-datascience.sh</code></td>
<td>2</td>
<td>8 GB</td>
<td>0</td>
<td>the wrapper's own image</td>
</tr>
</tbody>
</table></div>
<p>Calling <code>launch.sh</code> directly instead of a wrapper halves the CPU and leaves one
eighth of the memory. The usual symptom is a process that dies without an error
that explains the cause.</p>
<p>A browser session starts at 2 CPU / 4 GB by default. That figure is a course's
spawn configuration, not a command-line default. See
<a href="/docs/access/datahub-in-the-browser.html#the-browser-session">The Browser Session</a>.
The three sets of figures describe three different things.</p>
<h3 id="resource-tiers">Resource Tiers</h3>
<p>Limits apply at three tiers. Confusing the tiers is the usual cause of a job
that does not schedule.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Tier</th>
<th>Default</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td>A single pod</td>
<td>8 CPU / 32 GB / 1 GPU</td>
<td>The most any one container receives</td>
</tr>
<tr>
<td>A namespace, in total</td>
<td>8 CPU / 64 GB / 1 GPU</td>
<td>Across everything running at once</td>
</tr>
<tr>
<td>Available on request</td>
<td>up to 32 CPU / 128 GB</td>
<td>On request, with the purpose stated</td>
</tr>
</tbody>
</table></div>
<p><code>-m 64</code> is not a valid request for a single container, although 64 GB is the
namespace total. The namespace allowance may be spent across several
containers, not in one.
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>
covers requests for the third tier.</p>
<p>The GPU default is a limit per account: 1 GPU at a time, across every pod the
account runs. It applies on top of the reservation system's limits, so a booking
for several GPUs, or several overlapping bookings, does not raise it. For
multi-GPU work, the member, or a TA for a course, asks ITS to raise the
account's limit, by ticket to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<p>An older article or course README that describes 8 CPU / 64 GB / 1 GPU or
8 CPU / 16 GB / 1 GPU as the platform maximum is describing a default. The
8 CPU / 16 GB / 1 GPU figure is out of date.</p>
<h2 id="resource-requests-and-limits">Resource Requests and Limits</h2>
<p>The value passed to <code>-c</code> or <code>-m</code> is the <strong>limit</strong>, the most the container may
use. <code>launch.sh</code> sets the Kubernetes <strong>request</strong>, the amount the scheduler
reserves and the only amount guaranteed, to half the limit. <code>-m 32</code> reserves
16 GB and permits 32 GB. The second 16 GB is available only if the node the pod
runs on has it spare. The same halving applies to CPU.</p>
<p>The halving causes many <code>OOMKilled</code> (out-of-memory) reports. It also explains a
job that succeeds on one run and fails on a later run, on a busier node, with no
change to its code. Size a job for the guarantee, not the limit: to guarantee a
model 16 GB, launch it with <code>-m 32</code>.</p>
<p>GPUs are not halved. A GPU is assigned to one container exclusively, so its
request and limit are the same number.</p>
<h2 id="resource-and-gpu-selection-flags">Resource and GPU Selection Flags</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Flag</th>
<th>Effect</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-c &lt;n&gt;</code></td>
<td>CPU cores</td>
<td><code>-c 8</code></td>
</tr>
<tr>
<td><code>-m &lt;n&gt;</code></td>
<td>RAM in GB</td>
<td><code>-m 32</code></td>
</tr>
<tr>
<td><code>-g &lt;n&gt;</code></td>
<td>GPU count</td>
<td><code>-g 1</code></td>
</tr>
<tr>
<td><code>-l &lt;key=value&gt;</code></td>
<td>Apply a pod label. Repeatable</td>
<td><code>-l gpu-class=medium</code></td>
</tr>
<tr>
<td><code>-v &lt;model&gt;</code></td>
<td>GPU model, within the class <code>-l gpu-class=</code> names. Use it only for a session launched without a booking</td>
<td><code>-v l40s</code></td>
</tr>
</tbody>
</table></div>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Launching a GPU session draws on the workspace's Service Unit budget whether
or not the session was booked ahead, and there is no free exploratory launch.
See <a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<h3 id="gpu-class">GPU Class</h3>
<p><code>-l gpu-class=&lt;class&gt;</code> requests a GPU size band, and every GPU request needs it.
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> lists the classes. <code>-v</code> narrows a
class to one GPU model and does not replace the label; see
<a href="#node-selection">Node Selection</a>.</p>
<p>Every GPU class is managed by the reservation system, which admits only pods
that carry the <code>gpu-class</code> label. A GPU request that omits the label waits in
<code>Pending</code> with no event from the reservation system
(<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>).</p>
<h3 id="workspace-and-gpu-charges">Workspace and GPU Charges</h3>
<p><code>-W &lt;workspace&gt;</code> also sets the pod's <code>dsmlp/course</code> and <code>dsmlp/user</code> labels.
<code>dsmlp/course</code> decides which workspace's Service Unit budget a GPU session is
charged to, and which bookings it can claim. The cluster mounts the workspace
home directory, <code>public/</code>, and <code>private/</code> only into a pod that carries both
labels; see
<a href="/docs/running-jobs/kubernetes.html#home-directories-in-manifest-pods">Home Directories in Manifest Pods</a>.
A GPU launch without <code>-W</code> is charged to <code>ORG_ON_DEMAND</code>, the default workspace,
and never claims a course booking. See
<a href="/docs/gpu-access/reservations.html#claiming-a-booking">Claiming a Booking</a> and
<a href="/docs/gpu-access/reservations.html#the-default-workspace">The Default Workspace</a>.</p>
<h3 id="team-selection">Team Selection</h3>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><code>-g</code> is the GPU count and <code>-G</code> is the group flag. <code>-g 1</code> requests a GPU and
<code>-G 1</code> does not, and the failure that follows does not point to the
capitalization.<p></p></div>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Flag</th>
<th>Effect</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-G list</code></td>
<td>List the teams the account belongs to, with their team IDs. Launches nothing</td>
</tr>
<tr>
<td><code>-G &lt;teamid&gt;</code></td>
<td>Launch with that team as the primary group, so its data is visible</td>
</tr>
<tr>
<td><code>-T</code></td>
<td>Mount <code>/teams</code></td>
</tr>
</tbody>
</table></div>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC180A_FA25_A00 -G list       # find the team ID
launch-scipy-ml.sh -W DSC180A_FA25_A00 -G &lt;teamid&gt;   # then launch with it</code></pre>
<p><code>-G list</code> is the only way to discover a team ID. Team directory names often
contain brackets, which must be quoted in a <code>cd</code> command.</p>
<p>See also: <a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a></p>
<h2 id="image-workspace-and-placement-flags">Image, Workspace, and Placement Flags</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Flag</th>
<th>Effect</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-i &lt;image&gt;</code></td>
<td>Alternate container image</td>
<td><code>-i ghcr.io/ucsd-ets/scipy-ml-notebook:2024.4-stable</code></td>
</tr>
<tr>
<td><code>-P &lt;policy&gt;</code></td>
<td>Image pull policy: <code>Always</code>, <code>IfNotPresent</code>, or <code>Never</code></td>
<td><code>-P Always</code></td>
</tr>
<tr>
<td><code>-E</code></td>
<td>Add image pull secrets, for a private image. Use with <code>-i</code></td>
<td></td>
</tr>
<tr>
<td><code>-W &lt;workspace&gt;</code></td>
<td>Launch into a workspace, which becomes <code>$HOME</code>, and charge GPU time to it</td>
<td><code>-W DSC10_FA26_A00</code></td>
</tr>
<tr>
<td><code>-M &lt;mntspec&gt;</code></td>
<td>Subpath-mount an existing filesystem elsewhere in the pod</td>
<td></td>
</tr>
<tr>
<td><code>-F &lt;mntspec&gt;</code></td>
<td>NFS-mount additional filesystems, as <code>/mnt:server_fqdn:/path</code></td>
<td></td>
</tr>
<tr>
<td><code>-x</code></td>
<td>Patch a writeable directory onto the conda package cache</td>
<td></td>
</tr>
<tr>
<td><code>-n &lt;node&gt;</code></td>
<td>Run on a specific node, by number or hostname. Use it only for a session launched without a booking</td>
<td><code>-n 30</code></td>
</tr>
<tr>
<td><code>-N &lt;name&gt;</code></td>
<td>Give the pod a chosen name</td>
<td><code>-N vscode-dsmlp</code></td>
</tr>
<tr>
<td><code>-t &lt;toleration&gt;</code></td>
<td>Apply a <code>NoSchedule</code> toleration. Repeatable</td>
<td></td>
</tr>
<tr>
<td><code>-A &lt;key=value&gt;</code></td>
<td>Apply a pod annotation. Repeatable</td>
<td></td>
</tr>
</tbody>
</table></div>
<h3 id="image-pull-policy">Image Pull Policy</h3>
<p>For an image under development, pass <code>-i &lt;image&gt; -P Always</code>. See
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>.
Without <code>-P Always</code>, a node already holding that
tag keeps using its copy.</p>
<p><code>-P</code> passes its value to Kubernetes, which accepts only <code>Always</code>,
<code>IfNotPresent</code>, and <code>Never</code>, with that capitalization. A lowercase value such as
<code>always</code> is rejected.</p>
<h3 id="mounts-and-package-cache">Mounts and Package Cache</h3>
<p><code>-x</code> is used only at the request of ITS. Describe the data to ITS before using
<code>-M</code> or <code>-F</code>.</p>
<h3 id="node-selection">Node Selection</h3>
<p><code>-n</code> and <code>-v</code> each limit the nodes a session can run on. <code>-n</code> names one node.
<code>-v</code> names a GPU model, and limits the session to the nodes that carry it.</p>
<p><code>-n</code> takes a bare number: <code>-n 30</code>, not <code>-n n30</code>. The leading <code>n</code> shown on
<a href="/docs/gpu-access/quotas-and-availability.html#the-status-page">The Status Page</a> is
not part of the value. A pod whose named node is full waits for that node and
does not take the same GPU elsewhere. To choose a GPU size, use
<code>-l gpu-class=</code>.</p>
<p><code>-v</code> narrows a GPU class and does not replace it. Pass the class label as well,
and name a model that backs that class in
<a href="/docs/gpu-access/gpu-classes.html#gpu-class-sizes">GPU Class Sizes</a>:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=large -v l40s</code></pre>
<p>The <code>-h</code> summary lists the model names. A pod whose model has no free GPU waits
for one and does not take another model of its class. A GPU launch with <code>-v</code>
and no class label waits in <code>Pending</code> with no event from the reservation
system; see
<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Use <code>-n</code> or <code>-v</code> only for a session launched without a booking. A booking is
charged when it is made, and a session limited to a node or a GPU model
claims its booking while it waits for that node or model. A busy node or
model can therefore use up the whole window before the session starts. See
<a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a>.</p></div>
<p>Without a booking, a session limited with <code>-n</code> or <code>-v</code> is given no on-demand
lease, and is not charged, until a node it allows has a free GPU. It records a
<a href="/docs/reference/reservation-events.html#waitingfornode"><code>WaitingForNode</code></a> event
while it waits. A session whose <code>-n</code> or <code>-v</code> matches no node of its GPU class
records a <a href="/docs/reference/reservation-events.html#nomatchingnode"><code>NoMatchingNode</code></a>
event and is given no lease. The usual causes are a node that does not exist,
is out of service, or belongs to another class, and a model that does not back
the class.</p>
<p>The launch output names the node the pod was assigned to, in a line such as
<code>INFO pod assigned to node: its-dsmlp-n04.ucsd.edu</code>. Include that line in a
problem report.</p>
<h3 id="pod-names">Pod Names</h3>
<p><code>-N</code> gives the pod a name by which it can be deleted later. Give a name to any
pod left running unattended.</p>
<h2 id="job-execution-flags">Job Execution Flags</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Flag</th>
<th>Effect</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-b</code></td>
<td>Background pod: created and left running, with the session returned to the login node</td>
</tr>
<tr>
<td><code>-B</code></td>
<td>Batch: queue the job and do not wait for it</td>
</tr>
<tr>
<td><code>-f &lt;script&gt;</code></td>
<td>Run a script inside the container non-interactively, then exit</td>
</tr>
<tr>
<td><code>-s</code></td>
<td>CLI shell only; do not start Jupyter</td>
</tr>
<tr>
<td><code>-S</code></td>
<td>Do not start a container shell</td>
</tr>
<tr>
<td><code>-j</code> / <code>-J</code></td>
<td>Start / inhibit Jupyter. Starting is the default</td>
</tr>
<tr>
<td><code>-H</code></td>
<td>Start an SSH server inside the container, for <code>ProxyCommand</code> use</td>
</tr>
<tr>
<td><code>-u</code></td>
<td>Send email when the job begins running</td>
</tr>
<tr>
<td><code>-q</code> / <code>-Q</code></td>
<td>Quiet / verbose</td>
</tr>
<tr>
<td><code>-d</code></td>
<td>Dump the pod spec as JSON and do not execute</td>
</tr>
<tr>
<td><code>-h</code></td>
<td>Flag summary</td>
</tr>
<tr>
<td><code>--</code></td>
<td>End of launcher options</td>
</tr>
</tbody>
</table></div>
<p><a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a> describes when to use
each of <code>-b</code>, <code>-B</code>, and <code>-f</code>. <code>-d</code> prints the specification the cluster would
have received and consumes nothing. Its output shows what a set of flags
actually requests.</p>
<h3 id="option-separator">Option Separator</h3>
<p><code>--</code> separates the launcher's options from the command's own. Everything after
it is passed into the container untouched.</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- python train.py --epochs 50 --lr 0.01</code></pre>
<p>Without the separator, <code>launch.sh</code> reads <code>--epochs</code> as one of its own options
and fails with a message about a launcher flag, not about the program being run.</p>
<h3 id="help-output-and-undocumented-options">Help Output and Undocumented Options</h3>
<p>The <code>-h</code> summary is generated from comments in the launcher's source and does
not list exactly the same flags as this page. It includes options that are not
documented on this page: some are legacy, and some interact with scheduling.
Consult ITS before using an undocumented option.</p>
