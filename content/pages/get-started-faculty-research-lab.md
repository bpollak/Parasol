---
title: "Setting Up a Research Lab"
path: /get-started/faculty-research-lab.html
description: "This page is for faculty arranging PARASOL access for a research group."
eyebrow: "Get started"
lastReviewed: 2026-09-29
audiences: [faculty, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/faculty-research-lab/), preview build of 2026-09-29"
canonicalUrl: /get-started/faculty-research-lab.html
legacyUrl: https://dsmlp-docs.ucsd.edu/faculty-research-lab/
format: html
---
<p>This page is for faculty arranging PARASOL access for a research
group. <a href="/get-started/individual-researcher.html">Research on PARASOL</a> covers researchers working
on their own. <a href="/get-started/instructor-or-ta.html">Teaching with PARASOL</a> covers
course setup.</p>
<h2 id="platform-suitability">Platform Suitability</h2>
<h3 id="suitable-workloads">Suitable Workloads</h3>
<p>The platform suits single-node GPU work at every size from a slice of a GPU to
a full H100 or RTX PRO 6000, interactive analysis, long-running batch jobs, and
a shared software environment that an entire group can rely on. Lab members
receive the same tooling that students use.</p>
<h3 id="unsuitable-workloads">Unsuitable Workloads</h3>
<p>The platform has no Slurm scheduler, no MPI, and no multi-node parallelism.
<a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> can direct
workloads of that shape to a more appropriate platform. See
<a href="/docs/reference/getting-help.html#platform-selection">Platform Selection</a>.</p>
<h3 id="priority-of-instruction">Priority of Instruction</h3>
<p>During 10th and Finals Weeks and at major assignment deadlines, coursework is
served ahead of research. A lab workspace with its own quota insulates a group
from most of this effect. A lab working from the shared research pool is
subject to it.</p>
<h2 id="routes-to-capacity">Routes to Capacity</h2>
<p>A lab may combine the three routes to capacity.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Route</th>
<th>Provides</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>The shared research pool</td>
<td>A baseline allocation, with boosts when capacity frees up, most notably over Summer</td>
<td>None. Access is by request.</td>
</tr>
<tr>
<td>A lab workspace with its own quota</td>
<td>Guaranteed access up to the group's quota, date-aware so that it can flex around the group's deadlines</td>
<td>None for compute. <a href="#cost">Cost</a> describes storage charges.</td>
</tr>
<tr>
<td>Contributing hardware (pilot)</td>
<td>Exclusive reservation rights over the contributed capacity</td>
<td>Purchase of the hardware. See <a href="#contributing-hardware-pilot">Contributing Hardware (Pilot)</a></td>
</tr>
</tbody>
</table></div>
<h3 id="cost">Cost</h3>
<p>Compute is provided at no charge, and there is no compute recharge or
chargeback mechanism.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
sets out storage charges.
<a href="/docs/reference/policy.html#self-supporting-programs">Self-Supporting Programs</a> covers
cost recovery for work within a self-supporting program.</p>
<h2 id="establishing-a-lab-workspace">Establishing a Lab Workspace</h2>
<p>A workspace anchors a group's roster, storage, container images, GPU access,
and storage and GPU quotas. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>.
Research IT curates lab and research workspaces manually rather than populating
them from a course roster.</p>
<h3 id="requesting-a-lab-workspace">Requesting a Lab Workspace</h3>
<p>Request a lab workspace from
<a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> or at
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>. Include:</p>
<ul>
<li>The members of the group, and who besides the PI should be able to manage it</li>
<li>What the group runs: frameworks, model sizes, and whether GPU memory or GPU
  count is the binding constraint</li>
<li>The data: how much, where it currently resides, and its classification</li>
<li>Any recurring deadline patterns</li>
</ul>
<h3 id="workspace-manager-permissions">Workspace Manager Permissions</h3>
<p>A workspace manager may view the group's reservations, book on a member's
behalf, cancel members' bookings, and waive a cancellation charge, and may
arrange GPU loans with another group in the same cohort where the cohort allows
them. A booking made on a member's behalf is charged to the member's budget. A
manager may not edit Service Unit budgets, group limits, or the workspace length
cap from the application. Those are administrative actions, requested
by ticket. See
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>.
<a href="/docs/reference/managing-a-group.html">Managing a Group</a> describes privilege tiers.</p>
<h2 id="storage">Storage</h2>
<h3 id="home-directories">Home Directories</h3>
<p>Each member's research home directory is established at provisioning, alongside
group shared space and any external mounts.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>
describes the directories.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
gives home directory sizes.</p>
<h3 id="shared-lab-space">Shared Lab Space</h3>
<p>Shared lab space holds the datasets that every member works from, in place of a
personal copy for each member. Personal copies of a shared dataset exhaust a
group's allocation. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#personal-copies-of-shared-datasets">Personal Copies of Shared Datasets</a>.</p>
<h3 id="external-storage">External Storage</h3>
<p>SDSC Universal Scale Storage and similar storage may be mounted into a group's
containers. Capacity thresholds govern what is mounted where. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a>.</p>
<h3 id="sharing-with-collaborators">Sharing with Collaborators</h3>
<p><a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#inside-the-workspace">Inside the Workspace</a>
and
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#sharing-with-people-who-have-no-cluster-account">Sharing with People Who Have No Cluster Account</a>
describe sharing with collaborators inside and outside UC San Diego, through
group permissions and public access.</p>
<h3 id="data-classification">Data Classification</h3>
<p>Data classified P4, such as clinical records or export-controlled information,
may not be used on PARASOL. Data classified P3 may be permitted after review.
<a href="/docs/reference/policy.html#data-classification">Data Classification</a> describes the
review and gives the vetting period. Raise either classification in the initial
workspace request rather than later.</p>
<h2 id="compute-allocation">Compute Allocation</h2>
<p>From Fall 2026, a reservation system manages GPU access. See
<a href="/docs/gpu-access/index.html">GPU Access</a>.</p>
<h3 id="gpu-classes">GPU Classes</h3>
<p>GPUs are allocated in five size classes. See
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a>. Each workspace is given access to one
or more classes, matching its anticipated work.
<a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a> gives examples of
research work at each class.</p>
<h3 id="group-quota">Group Quota</h3>
<p>The group quota sets the maximum number of GPUs of each class that a lab may
hold at once. See
<a href="/docs/gpu-access/quotas-and-availability.html#what-a-quota-is">What a Quota Is</a>.
Quotas are date-aware and can be set week by week or day by day, so a lab's
share can rise for a conference deadline and drop back afterward without a
permanent allocation. See
<a href="/docs/gpu-access/quotas-and-availability.html#date-based-quota-changes">Date-Based Quota Changes</a>.</p>
<h3 id="borrowing-and-seniority">Borrowing and Seniority</h3>
<p>Last-minute work may use idle capacity beyond the group's quota, so a group that
has exhausted its share can still obtain GPUs that would otherwise be idle.
<a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a>
describes borrowing, including how far ahead it applies.</p>
<p>Borrowing carries a seniority. Course workspaces always hold senior borrowing
rights. Hardware contributors are granted junior borrowing rights. A junior
borrower may borrow only the idle capacity above a deeper reserve floor, so it
reaches idle capacity later than a senior borrower does. Seniority applies only
when a reservation is made. Once admitted, a junior borrower's reservation is
protected like any other for its full length.</p>
<h3 id="service-unit-budgets">Service Unit Budgets</h3>
<p>Service Unit budgets divide a group's capacity among its members by the same
mechanism that courses use to divide capacity across a roster. See
<a href="/docs/gpu-access/service-units-and-budgets.html">Service Units &amp; Budgets</a>. A lab's
budget and length cap start at the same defaults as a course's, and are changed
on the PI's request. See
<a href="/docs/gpu-access/service-units-and-budgets.html#budget-windows--cadences">Budget Windows &amp; Cadences</a>.
Budgets are set administratively, and changes are requested by ticket. See
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>.</p>
<h3 id="cohorts">Cohorts</h3>
<p>A cohort is a collection of groups whose quotas may sum to more than the
physical capacity allocated to it, so availability can read zero while a group
still has headroom. See
<a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a>.</p>
<h3 id="manager-reports">Manager Reports</h3>
<p>Manager reports cover reservations by group, peak simultaneous use by class,
reserved hours, and effective limits. See
<a href="/docs/reference/managing-a-group.html#what-the-reports-cover">What the Reports Cover</a>.
Three of the four reports display cluster-wide data rather than data for the
group alone.</p>
<h3 id="reservation-events">Reservation Events</h3>
<p>The reservation system reports on each GPU session with Kubernetes events,
shown by <code>kubectl describe pod</code>, and by <code>kubectl get events</code> after the pod is
gone. <a href="/docs/reference/reservation-events.html">Reservation Events</a> defines each event:</p>
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
<h2 id="contributing-hardware-pilot">Contributing Hardware (Pilot)</h2>
<p>A pilot is evaluating the placement of researcher-contributed GPUs or servers
into the cluster. The pilot is expected to continue through Spring 2027, when
ITS will determine whether the capability can be made available to a broader
audience.</p>
<h3 id="contributor-entitlements">Contributor Entitlements</h3>
<p>Contributors receive:</p>
<ul>
<li>Exclusive reservation rights over their contributed capacity. The lab's group
  GPU limits match its contribution, and the cohort holding contributor groups
  is not overcommitted, so the lab can always book its own GPUs ahead whenever
  it needs them.</li>
<li>Access to the school-wide shared pool, like any other research group.</li>
<li>Access to near-term, otherwise idle capacity across the cluster through
  junior borrowing. See
  <a href="#borrowing-and-seniority">Borrowing and Seniority</a>. Borrowing is the route
  by which a lab reaches beyond its own contribution when GPUs would otherwise
  be idle.</li>
<li>The ability to loan capacity and privileges to other groups temporarily.</li>
</ul>
<h3 id="idle-contributed-capacity">Idle Contributed Capacity</h3>
<p>Contributed GPUs that are idle become available to other groups for last-minute
and on-demand use. The reservation system guarantees the contributing lab first
claim on its own capacity.</p>
<h3 id="requirements-for-contributors">Requirements for Contributors</h3>
<p>Contributed hardware must conform to the cluster's supported configurations.
Discuss a planned contribution with ITS at the specification stage, well before
purchase and not after delivery.</p>
<h2 id="software--environments">Software &amp; Environments</h2>
<h3 id="standard-images">Standard Images</h3>
<p>The standard software images suffice for most groups.
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a> describes
them.</p>
<h3 id="lab-images">Lab Images</h3>
<p>A lab may build its environment into a custom image so that every member,
including a new arrival, receives the same stack. Derive a lab image from a
standard image where possible, which is the supported path. See
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>.</p>
<h3 id="image-pinning">Image Pinning</h3>
<p>A workspace may pin an image so that members are not moved by an image update
partway through a project. See
<a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a>.</p>
<h3 id="unprivileged-containers">Unprivileged Containers</h3>
<p>Containers run unprivileged, under each user's own UID, with no root or sudo
inside the container, which constrains how dependencies are installed. See
<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>.</p>
<h2 id="operating-a-lab">Operating a Lab</h2>
<h3 id="onboarding">Onboarding</h3>
<p>Direct new members to <a href="/get-started/individual-researcher.html">Research on PARASOL</a>, which
assumes a shell and covers launching, storage, and the GPU model. Brief new
members on three points: the group's storage conventions, the GPU class its work
requires, and the reclaiming of an idle GPU session. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
<h3 id="recommended-practices">Recommended Practices</h3>
<ul>
<li>Checkpoint long-running work. Runtime limits, idle culling, and preemption all
  end containers for reasons unrelated to the code they run. See
  <a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a>.</li>
<li>Book the smallest class that fits. A larger class is not faster for a model
  that fits in a smaller one. It is scarcer and more expensive.</li>
<li>Shut down containers that nobody is using. An idle container continues to
  hold its CPU, memory, and GPU against the group's quota.</li>
<li>Cancel unused windows. Canceling at least 24 hours ahead costs nothing. A
  later cancellation, or a missed booking, is charged. See
  <a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>.</li>
</ul>
<h3 id="off-peak-discounts">Off-Peak Discounts</h3>
<p>Off-peak discounts make work that can run at midday or overnight both cheaper
and faster to obtain. See
<a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>.</p>
<h3 id="scheduled-maintenance">Scheduled Maintenance</h3>
<p>Datahub may be unavailable during scheduled instructional maintenance for
time-sensitive updates or security patches. Research Cluster maintenance
terminates all running jobs, and long-running work must be checkpointed or
completed before that window.
<a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a> gives both
schedules.
<a href="/docs/gpu-access/what-ends-a-session.html#maintenance-closures">Maintenance Closures</a>
describes the effect on sessions.</p>
<h3 id="membership-changes">Membership Changes</h3>
<p>Members join and leave a lab, and access has an end. Files do not leave with a
departing member. Establish what becomes of a departing member's files.
<a href="/docs/access/when-access-starts-and-ends.html">When Access Starts &amp; Ends</a> describes the
end of access.</p>
<h2 id="policy">Policy</h2>
<p><a href="/docs/reference/policy.html">Policy</a> sets out conditions of use, including data
classification, appropriate use, hosting of externally available services, and
availability and reliability.</p>
<h2 id="support">Support</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Service</th>
<th>Contact</th>
</tr>
</thead>
<tbody>
<tr>
<td>Research IT and the Research Cluster</td>
<td><a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>, <a href="https://research-it.ucsd.edu/computing/index.html">research-it.ucsd.edu</a></td>
</tr>
<tr>
<td>PARASOL</td>
<td><a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
<tr>
<td>IT Service Desk</td>
<td><a href="https://support.ucsd.edu/">support.ucsd.edu</a></td>
</tr>
</tbody>
</table></div>
<p><a href="/docs/reference/getting-help.html#response-targets">Response Targets</a> gives ITS
response targets. <a href="/docs/reference/getting-help.html">Getting Help</a> lists all support
routes.</p>
