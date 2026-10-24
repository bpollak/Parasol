---
title: "Research on PARASOL"
path: /get-started/individual-researcher.html
description: "This page is for researchers working without a lab workspace: graduate students, postdocs, undergraduate researchers, staff researchers, and faculty who…"
eyebrow: "Get started"
lastReviewed: 2026-09-29
audiences: [researchers, graduate-students]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/individual-researcher/), preview build of 2026-09-29"
canonicalUrl: /get-started/individual-researcher.html
legacyUrl: https://dsmlp-docs.ucsd.edu/individual-researcher/
format: html
---
<p>This page is for researchers working without a lab workspace: graduate
students, postdocs, undergraduate researchers, staff researchers, and faculty
who have not yet established a group. It assumes familiarity with a shell.</p>
<p><a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a> covers provisioning for a
group. <a href="/get-started/student-project.html">Projects &amp; Independent Study</a> covers for-credit
coursework and capstones.</p>
<h2 id="what-the-platform-is-suited-to">What the Platform Is Suited To</h2>
<p>PARASOL, Datahub, and the Research Cluster are the same cluster. The work does not
change with the name an article uses.</p>
<h3 id="suitable-work">Suitable Work</h3>
<p>The cluster suits interactive analysis, single-node GPU work at every GPU class
size, fine-tuning, long-running batch jobs, and the broad
range of research computing that does not require a supercomputer. It has
operated since 2017 and carries both instruction and research.</p>
<h3 id="unsupported-hpc-features">Unsupported HPC Features</h3>
<p>PARASOL is not a high-performance computing (HPC) system. It has no Slurm
scheduler and no MPI or multi-node support. The <code>sbatch</code>-style wrappers are a
compatibility layer rather than a scheduler. See
<a href="/docs/reference/coming-from-hpc.html#slurm-compatibility-wrappers">Slurm Compatibility Wrappers</a>.
<a href="/docs/reference/coming-from-hpc.html">Coming from HPC</a> covers HPC vocabulary and Slurm
compatibility. Routing for work that requires
these features is in <a href="#beyond-dsmlp">Beyond PARASOL</a>.</p>
<h2 id="obtaining-access">Obtaining Access</h2>
<p>Request access through
<a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a>, or through
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a> for the Research Cluster.
Describe the work, its approximate resource requirements, and the timeframe.</p>
<h2 id="the-working-environment">The Working Environment</h2>
<h3 id="signing-in">Signing In</h3>
<p>Connect with <code>ssh</code> to the login node using Active Directory (AD) credentials.
Duo applies. The VPN is not required for <code>ssh</code>, only for reaching a port inside
a container. <a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a>
describes both.</p>
<p>The browser route at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> is also
available and is often the quickest way to inspect something.
<a href="/docs/access/index.html">Access</a> describes the routes onto the cluster.</p>
<h3 id="the-login-node">The Login Node</h3>
<p>The login node is for launching jobs and moving files, not for computation. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.
It is the one host every user passes through.</p>
<h3 id="launching-a-job">Launching a Job</h3>
<p>A GPU job is launched with a wrapper script, for example:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -c 8 -m 32 -g 1 -l gpu-class=large</code></pre>
<p><code>workspace --list</code> prints the ID to use for <code>&lt;WORKSPACE&gt;</code>; see
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#listing-workspace-ids">Listing Workspace IDs</a>.</p>
<p>Bare <code>launch.sh</code> and the wrapper scripts start with different default resources.
See <a href="/docs/running-jobs/launch-sh-reference.html#default-resources">Default Resources</a>.
Limits apply per pod and per namespace, and larger allocations are available on
request. See
<a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a> and
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>.
<a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a>
describes how the memory requested with <code>-m</code> relates to the amount guaranteed.
<a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a> describes the
launcher.</p>
<h3 id="storage">Storage</h3>
<p>Research home directories are substantially larger than course ones and are
set up when access is provisioned.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
gives the sizes. Shared space is also available, as are optional mounts of
external storage such as SDSC Universal Scale Storage. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a>.
<a href="/docs/workspaces-and-storage/index.html">Workspaces &amp; Storage</a> describes the storage
layout.</p>
<h3 id="software">Software</h3>
<p>The standard software images cover most requirements. Where they do not, a
custom image may be built. Deriving it from a standard image, rather than
starting from nothing, is the supported path.
<a href="/docs/environments/index.html">Environments</a> covers images.</p>
<h3 id="root-access">Root Access</h3>
<p>Containers run unprivileged, with no root or sudo access, and dependency
installation has to work within that constraint. See
<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>.</p>
<h2 id="running-substantial-work">Running Substantial Work</h2>
<h3 id="job-modes">Job Modes</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Mode</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td>Interactive</td>
<td>Exploration</td>
</tr>
<tr>
<td>Background (<code>-b</code>)</td>
<td>Work that must survive a disconnect</td>
</tr>
<tr>
<td>Batch (<code>-B</code>)</td>
<td>Runs that should run to completion</td>
</tr>
</tbody>
</table></div>
<p><a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a> describes the modes.</p>
<h3 id="runtime-limit">Runtime Limit</h3>
<p>Jobs default to 6 hours, and up to 12 hours may be set at launch. A booking
does not lift the limit. See
<a href="/docs/gpu-access/reservations.html#reservation-length-and-session-runtime">Reservation Length and Session Runtime</a>.
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>
describes the limit.</p>
<h3 id="checkpointing">Checkpointing</h3>
<p>Checkpoint long-running work. The runtime limit, idle culling, the end of a
reservation window, and preemption can each stop a container independently of
the code it is running.
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a> describes the
methods.</p>
<h3 id="monitoring-and-session-events">Monitoring and Session Events</h3>
<p><a href="/docs/running-jobs/watching-your-job.html">Watching a Running Job</a> covers observing a
running job.</p>
<p>The reservation system reports on a GPU session with Kubernetes events, shown by
<code>kubectl describe pod</code>, and by <code>kubectl get events</code> after the pod is gone.
<a href="/docs/reference/reservation-events.html">Reservation Events</a> defines each:</p>
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
<p>Direct use of Kubernetes is available to advanced users. See
<a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a>.</p>
<h2 id="obtaining-gpu-time">Obtaining GPU Time</h2>
<p><a href="/docs/gpu-access/index.html">GPU Access</a> describes the GPU allocation model in effect
from Fall 2026.</p>
<h3 id="the-shared-research-gpu-pool">The Shared Research GPU Pool</h3>
<p>Researchers without a lab workspace draw on a school-wide shared research GPU
pool. The pool provides a baseline allocation, with occasional boosts when
capacity frees up, most notably over the summer, when instructional hardware
would otherwise be idle. Service Unit (SU) budgets divide the shared pool
equitably among the researchers drawing on it.</p>
<h3 id="choosing-a-gpu-class">Choosing a GPU Class</h3>
<p>Select the smallest GPU class the model fits within. Five classes are available. A larger class is not faster for a
model that fits in a smaller one. It is scarcer and more expensive.
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> describes the classes.
<a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> gives examples of
research work at each class, and the cards and slices behind it.</p>
<h3 id="multi-day-reservations">Multi-Day Reservations</h3>
<p>A research workspace starts with the same length cap as a course workspace.
Cluster administrators can raise it on the researcher's request, so that a
multi-day fine-tuning run can be booked against guaranteed hardware. A member's
own booking caps at 48 hours unless the workspace is in researcher mode. See
<a href="/docs/gpu-access/reservations.html#reservation-length-caps">Reservation Length Caps</a>.</p>
<h3 id="borrowing">Borrowing</h3>
<p>When a baseline allocation is exhausted, idle capacity may still be available
through borrowing. See
<a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a>.</p>
<h3 id="launching-without-a-reservation">Launching Without a Reservation</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Launching a GPU session without a reservation creates one and draws on the
researcher's SU budget. A script that relaunches in a loop can exhaust a
budget window quickly, and nothing intervenes.</p></div>
<p><a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>
describes the charges.
A launch holds a lease of 1 hour 10 minutes; for longer, use
<a href="/docs/gpu-access/reservations.html#extend">Extend</a> in the reservation app at
<a href="https://reserve.dsmlp.ucsd.edu/">reserve.dsmlp.ucsd.edu</a>.</p>
<h3 id="budget-windows">Budget Windows</h3>
<p>A research SU budget starts with the same size and weekly window as a course
budget, and either can be changed on the researcher's request. See
<a href="/docs/gpu-access/service-units-and-budgets.html#budget-windows--cadences">Budget Windows &amp; Cadences</a>.
See <a href="/docs/gpu-access/service-units-and-budgets.html#remaining-balance">Remaining Balance</a>.</p>
<h3 id="cancellations-and-missed-windows">Cancellations and Missed Windows</h3>
<p>Releasing a window at least 24 hours in advance costs nothing. A later
cancellation, or handing back the end of a session, keeps the time used and
usually part of the unused time. A window missed without cancelling is charged, and an
individual researcher has no instructor from whom to request a waiver.
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>
describes the charge.</p>
<h3 id="off-peak-hours">Off-Peak Hours</h3>
<p>Off-peak discounts apply outside the peak evening hours. Work that can run at
midday or overnight costs less and waits less.
<a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>
describes peak and off-peak pricing.</p>
<h3 id="idle-culling">Idle Culling</h3>
<p>Idle culling reclaims a GPU session that stops using its GPU, on every GPU class
and for research sessions as for any other. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
<h2 id="data">Data</h2>
<h3 id="moving-data">Moving Data</h3>
<p>Browser upload suits small files. <code>scp</code>, <code>sftp</code>, <code>rsync</code>, <code>git</code>, and Globus
handle substantial volumes. For the transfer routes, see
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a>.</p>
<h3 id="sharing-data">Sharing Data</h3>
<p><a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#inside-the-workspace">Inside the Workspace</a>
describes sharing data with collaborators, with a group, or publicly, and the
permission model beneath it.</p>
<h3 id="restricted-and-licensed-datasets">Restricted and Licensed Datasets</h3>
<p>Some data available on the cluster carries usage terms. See
<a href="/docs/workspaces-and-storage/datasets.html#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a>.</p>
<h3 id="data-classification">Data Classification</h3>
<p>P4 data, such as clinical records and export-controlled information, must not be
used on PARASOL. P3 data, which is legally or contractually protected information,
may be permitted after review.
<a href="/docs/reference/policy.html#data-classification">Data Classification</a> describes the
classification levels and the review.</p>
<h2 id="publishing--reproducibility">Publishing &amp; Reproducibility</h2>
<h3 id="reproducible-artifacts">Reproducible Artifacts</h3>
<p>An image tag, the code, and a checkpoint make a better reproducibility artifact
than a home directory. See
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>.</p>
<h3 id="end-of-access">End of Access</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Access does not last indefinitely, and files do not survive its lapse.
Retrieve required files before access ends.</p></div>
<p><a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#retrieving-work-before-access-ends">Retrieving Work Before Access Ends</a>
describes retrieval.</p>
<h2 id="support">Support</h2>
<p>Support for research users is routed by subject.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Subject of the question</th>
<th>Contact</th>
</tr>
</thead>
<tbody>
<tr>
<td>The Research Cluster, Universal Scale Storage, research allocations</td>
<td><a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a></td>
</tr>
<tr>
<td>PARASOL itself: the platform, images, launching</td>
<td><a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
<tr>
<td>Which platform is appropriate for a given body of work</td>
<td><a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a></td>
</tr>
</tbody>
</table></div>
<p>Urgent or broadly scoped problems may be escalated through the
<a href="https://support.ucsd.edu/">ITS Service Desk</a>, with a plain statement of what is
affected. See <a href="/docs/reference/getting-help.html#response-targets">Response Targets</a>.
<a href="/docs/reference/getting-help.html">Getting Help</a> describes support routing in full.</p>
<h2 id="beyond-dsmlp">Beyond PARASOL</h2>
<p>Work requiring tightly coupled multi-node computation, MPI, a batch scheduler, or
capacity at a scale the cluster does not carry belongs on another platform.
<a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> can connect
researchers with campus and national resources. A group large enough to warrant
its own guaranteed capacity is a matter for its PI. See
<a href="/get-started/faculty-research-lab.html">Setting Up a Research Lab</a>.</p>
