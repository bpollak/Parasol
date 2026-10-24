---
title: "Glossary"
path: /docs/reference/glossary.html
description: "Look up a term used in the PARASOL documentation. Entries are in alphabetical order, and each links to the page that covers the term in full."
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/glossary/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/glossary.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/glossary/
format: html
---
<p>Look up a term used in the PARASOL documentation. Entries are in
alphabetical order, and each links to the page that covers the term in full.</p>
<h2 id="a-c">A-C</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>Active Directory (AD)</td>
<td>The campus credential set, whose username and password, with Duo, authenticate to both Datahub and the login node.</td>
<td><a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a></td>
</tr>
<tr>
<td>Anchor mode</td>
<td>The rule that fixes a Service Unit budget window to the calendar, setting the point from which the window is measured.</td>
<td><a href="/docs/gpu-access/service-units-and-budgets.html#anchor-modes">Anchor Modes</a></td>
</tr>
<tr>
<td>Auditor</td>
<td>A read-only privilege tier held by staff.</td>
<td><a href="/docs/reference/managing-a-group.html">Managing a Group</a></td>
</tr>
<tr>
<td>Background pod (<code>-b</code>)</td>
<td>A pod created and left running while the shell returns to the login node.</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#background-pods">Background Pods</a></td>
</tr>
<tr>
<td>Batch job (<code>-B</code>)</td>
<td>A job run to completion unattended.</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#batch-jobs">Batch Jobs</a></td>
</tr>
<tr>
<td>Best-effort reservation</td>
<td>A session admitted with no runtime guarantee and no charge. Not enabled on PARASOL.</td>
<td><a href="/docs/gpu-access/reservations.html#best-effort-reservations">Best-Effort Reservations</a></td>
</tr>
<tr>
<td>Borrowing</td>
<td>The use of idle GPU capacity beyond a workspace's quota.</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a></td>
</tr>
<tr>
<td>Budget window</td>
<td>The period a Service Unit budget covers before it renews.</td>
<td><a href="/docs/gpu-access/service-units-and-budgets.html#budget-windows--cadences">Budget Windows &amp; Cadences</a></td>
</tr>
<tr>
<td>Claim window</td>
<td>The period at the start of a booked window by which a matching session must be waiting or running, or the booking is cancelled as a no-show.</td>
<td><a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a></td>
</tr>
<tr>
<td>Cluster status page</td>
<td>The page at <a href="https://datahub.ucsd.edu/hub/status"><code>datahub.ucsd.edu/hub/status</code></a> that lists the GPU models on each node and how many are free.</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#the-status-page">The Status Page</a></td>
</tr>
<tr>
<td>Cohort</td>
<td>A group of workspaces whose quotas may sum to more than the physical capacity behind them, so that availability can read zero while a workspace has headroom.</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a></td>
</tr>
<tr>
<td>Container</td>
<td>The isolated environment one job runs in, built from an image and run under the member's own UID without root.</td>
<td><a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a></td>
</tr>
<tr>
<td>Course workspace</td>
<td>A workspace covering one course: its lecture timeslots and the discussion sections associated with them.</td>
<td><a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a></td>
</tr>
<tr>
<td>Cull</td>
<td>Short form of idle culling.</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
</tbody>
</table></div>
<h2 id="d-g">D-G</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>Datahub</td>
<td>The browser interface at <a href="https://datahub.ucsd.edu"><code>datahub.ucsd.edu</code></a>, comprising JupyterHub, the environment menu, and the services attached to it.</td>
<td><a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a></td>
</tr>
<tr>
<td><code>datahub-base-notebook</code></td>
<td>A former base image, no longer built or updated. Derive from <code>datascience-notebook</code> instead.</td>
<td><a href="/docs/environments/standard-images.html#legacy-image-names">Legacy Image Names</a></td>
</tr>
<tr>
<td><code>datascience-notebook</code></td>
<td>The standard CPU image, containing widely used data analysis libraries from the Python, R, and Julia communities, and the base of the other standard images.</td>
<td><a href="/docs/environments/standard-images.html#image-inheritance">Image Inheritance</a></td>
</tr>
<tr>
<td><code>/datasets</code></td>
<td>The cluster-wide directory tree where shared corpora are staged, to be read in place rather than copied.</td>
<td><a href="/docs/workspaces-and-storage/datasets.html">Datasets</a></td>
</tr>
<tr>
<td><code>DeadlineExceeded</code></td>
<td>The pod status reported when a container reaches the runtime limit, which does not indicate an error in the code.</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-deadlineexceeded-status">The <code>DeadlineExceeded</code> Status</a></td>
</tr>
<tr>
<td>disk-quota-service</td>
<td>The service under the <strong>Services</strong> tab at <a href="https://datahub.ucsd.edu/hub/spawn"><code>datahub.ucsd.edu/hub/spawn</code></a> that reports usage against quota and displays the workspace ID.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a></td>
</tr>
<tr>
<td>DSMLP</td>
<td>The Data Science / Machine Learning Platform, the former name of PARASOL. Hostnames, container labels, and system messages still use it.</td>
<td><a href="/about/from-dsmlp-to-parasol.html">From DSMLP to PARASOL</a></td>
</tr>
<tr>
<td><code>dsmlp-login.ucsd.edu</code></td>
<td>The hostname of the login node.</td>
<td><a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a></td>
</tr>
<tr>
<td>Duo</td>
<td>The campus two-factor prompt, which applies to both web and SSH access.</td>
<td><a href="/docs/access/the-login-node.html#duo-authentication">Duo Authentication</a></td>
</tr>
<tr>
<td>Eviction</td>
<td>The deletion of a running session because its reservation was cancelled or given to another user, with no warning beforehand.</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#eviction">Eviction</a></td>
</tr>
<tr>
<td>Extend</td>
<td>The reservation app's action that adds time to a running job's guarantee: it starts a new booking now, ending later than the job's current reservation, and moves the job onto it; called "continue" in the reservation system's interface.</td>
<td><a href="/docs/gpu-access/reservations.html#extend">Extend</a></td>
</tr>
<tr>
<td>GHCR</td>
<td>The GitHub Container Registry, where the standard images are published as <code>ghcr.io/ucsd-ets/&lt;image&gt;:&lt;tag&gt;</code>.</td>
<td><a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a></td>
</tr>
<tr>
<td><code>git-pull</code> link</td>
<td>A URL that fetches a repository into an environment, commonly used to distribute course materials.</td>
<td><a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a></td>
</tr>
<tr>
<td>Globus</td>
<td>A transfer service for moving large volumes of data in and out of the platform.</td>
<td><a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a></td>
</tr>
<tr>
<td>GPU class</td>
<td>A GPU size band, rather than a hardware model, requested with <code>-l gpu-class=&lt;class&gt;</code>; each workspace is granted access to one or more classes.</td>
<td><a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a></td>
</tr>
<tr>
<td>Grader account</td>
<td>The single shared account each course receives for nbgrader and formgrader, which, unlike an instructor's own account, holds write permission on the workspace's <code>public/</code> directory.</td>
<td><a href="/docs/grading/notebook-grading-workflow.html#grader-account">Grader Account</a></td>
</tr>
<tr>
<td>Group manager</td>
<td>Another name for workspace manager.</td>
<td><a href="/docs/reference/managing-a-group.html">Managing a Group</a></td>
</tr>
</tbody>
</table></div>
<h2 id="h-l">H-L</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>Home directory</td>
<td>Per-user, per-workspace storage, of which a member holds a separate one in every workspace they belong to.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a></td>
</tr>
<tr>
<td>Idle culling</td>
<td>The reclaiming of a GPU from a session that has stopped using it.</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
<tr>
<td>Image</td>
<td>The packaged filesystem a container starts from.</td>
<td><a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a></td>
</tr>
<tr>
<td>Jumpbox</td>
<td>Another name for the login node: a machine for launching jobs and moving files, on which running computation is prohibited.</td>
<td><a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a></td>
</tr>
<tr>
<td>JupyterHub / JupyterLab</td>
<td>The hub that spawns a session, and the notebook interface it spawns; replacing <code>lab</code> with <code>tree</code> in the URL reaches the older Notebook interface.</td>
<td><a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a></td>
</tr>
<tr>
<td>Kubernetes</td>
<td>The orchestration system on which the platform runs, in which every job is a pod in a per-user namespace.</td>
<td><a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a></td>
</tr>
<tr>
<td><code>kubesh &lt;pod-id&gt;</code></td>
<td>The command that enters one of an account's own running pods from the login node.</td>
<td><a href="/docs/access/the-login-node.html#a-second-shell-with-kubesh">A Second Shell with <code>kubesh</code></a></td>
</tr>
<tr>
<td><code>launch.sh</code></td>
<td>The launcher at <code>/opt/launch-sh/bin/launch.sh</code>, which maps command-line parameters into a Kubernetes pod definition.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a></td>
</tr>
<tr>
<td>Launch wrapper</td>
<td>A script such as <code>launch-scipy-ml.sh</code> or <code>launch-datascience.sh</code> that sets environment variables and then hands off to <code>launch.sh</code>.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#default-resources">Default Resources</a></td>
</tr>
<tr>
<td>Limit and request</td>
<td>The two values Kubernetes holds for CPU and memory: the limit is the value passed at launch, and the request is the amount actually reserved.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a></td>
</tr>
<tr>
<td>Login node</td>
<td>The host <code>dsmlp-login.ucsd.edu</code>, reached by SSH with AD credentials and Duo, whose home directory <code>~</code> is the personal area rather than a course home.</td>
<td><a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a></td>
</tr>
</tbody>
</table></div>
<h2 id="m-p">M-P</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>Manual resetter</td>
<td>A service under the <strong>services</strong> dropdown at <code>datahub.ucsd.edu</code> that stops an account's servers, signs it out, and resets its profile while preserving files.</td>
<td><a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a></td>
</tr>
<tr>
<td>Member</td>
<td>The ordinary privilege tier, held by a student in a course or a member of a lab.</td>
<td><a href="/docs/reference/managing-a-group.html">Managing a Group</a></td>
</tr>
<tr>
<td>MIG slice</td>
<td>An isolated share of one GPU card's memory and compute, created with NVIDIA Multi-Instance GPU (MIG). A session on a slice can use only that slice.</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#mig-slices">MIG Slices</a></td>
</tr>
<tr>
<td>Namespace</td>
<td>The per-user Kubernetes namespace that pods run in, and the unit against which one of the resource tiers applies across everything running at once.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a></td>
</tr>
<tr>
<td>nbgrader</td>
<td>The in-platform tool for distributing, collecting, and grading assignments, from which grade export to Canvas is manual.</td>
<td><a href="/docs/grading/index.html">Grading</a></td>
</tr>
<tr>
<td>No-show</td>
<td>A booking cancelled and charged because no matching session was waiting or running when its claim window closed, or soon after the last session under it ended.</td>
<td><a href="/docs/gpu-access/reservations.html#the-claim-window">The Claim Window</a></td>
</tr>
<tr>
<td>Off-peak</td>
<td>The discounted hours outside the peak evening period.</td>
<td><a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a></td>
</tr>
<tr>
<td>On-demand lease</td>
<td>The reservation the system creates when a GPU session is launched without a booking, which draws on the Service Unit budget as a booked window does.</td>
<td><a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a></td>
</tr>
<tr>
<td><code>ORG_ON_DEMAND</code></td>
<td>The default workspace, for on-demand leases only, that a GPU session naming no course is charged to, such as a launch without <code>-W</code>.</td>
<td><a href="/docs/gpu-access/reservations.html#the-default-workspace">The Default Workspace</a></td>
</tr>
<tr>
<td><code>OOMKilled</code></td>
<td>The pod status reported when a container reaches its memory limit.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a></td>
</tr>
<tr>
<td>Otter-Grader, Gradescope</td>
<td>Grading tools used on the platform alongside nbgrader.</td>
<td><a href="/docs/grading/choosing-a-grading-tool.html">Choosing a Grading Tool &amp; Interface</a></td>
</tr>
<tr>
<td>Overstay</td>
<td>Running a session past the end of its runtime guarantee, unprotected but not charged.</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#overstay">Overstay</a></td>
</tr>
<tr>
<td>PARASOL</td>
<td>The Platform for Applied Research, Analytics, Science and Open Learning, the on-premises cluster of CPU and GPU nodes on which Datahub sessions and command-line jobs run. Formerly named DSMLP.</td>
<td><a href="/about/how-parasol-works.html">How PARASOL Works</a></td>
</tr>
<tr>
<td>Pinning</td>
<td>Fixing a workspace to a dated image tag so that its members are not moved by an image update mid-term.</td>
<td><a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a></td>
</tr>
<tr>
<td>Pod</td>
<td>One running container as Kubernetes represents it; <code>kubectl get pods</code> lists the pods in an account's own namespace.</td>
<td><a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a></td>
</tr>
<tr>
<td>Pod label (<code>-l key=value</code>)</td>
<td>A repeatable attribute attached to a pod at launch, and the means by which <code>gpu-class</code> is set.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#resource-and-gpu-selection-flags">Resource and GPU Selection Flags</a></td>
</tr>
<tr>
<td>Preemption</td>
<td>The ending of a session past its runtime guarantee because its GPU is needed, for a booking or to keep a share of the class free.</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#preemption">Preemption</a></td>
</tr>
<tr>
<td><code>private/</code></td>
<td>A per-user, cluster-wide directory that appears unchanged in every workspace and draws on the personal quota rather than any workspace's.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a></td>
</tr>
<tr>
<td><code>public/</code></td>
<td>The workspace's shared area, readable by every member, written by the grader account in a course, and drawing on the workspace quota.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a></td>
</tr>
<tr>
<td>P3 / P4</td>
<td>University of California data protection levels: P4 data is prohibited on the platform, and P3 data may be permitted after review.</td>
<td><a href="/docs/reference/policy.html#data-classification">Data Classification</a></td>
</tr>
</tbody>
</table></div>
<h2 id="q-s">Q-S</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>Quota, GPU</td>
<td>The ceiling on how many GPUs of each class a workspace may hold at one time, separate from a Service Unit budget.</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#what-a-quota-is">What a Quota Is</a></td>
</tr>
<tr>
<td>Quota, storage</td>
<td>Two separate pools: the workspace pool, covering the workspace home, <code>public/</code>, and <code>teams/</code>, and the personal pool, covering <code>private/</code> and following the member into every workspace.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a></td>
</tr>
<tr>
<td>Research Cluster</td>
<td>The research-facing service supported by Research IT at <code>rcd-support@ucsd.edu</code>, whose scheduled maintenance terminates all running jobs.</td>
<td><a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a></td>
</tr>
<tr>
<td>Reservation</td>
<td>A booked window during which GPU capacity is held and a session is admitted ahead of the walk-up queue; the session is still launched as usual.</td>
<td><a href="/docs/gpu-access/reservations.html">Reservations</a></td>
</tr>
<tr>
<td>Reservation app</td>
<td>The web app at <a href="https://reserve.dsmlp.ucsd.edu/"><code>reserve.dsmlp.ucsd.edu</code></a> where GPU windows are booked, cancelled, and extended.</td>
<td><a href="/docs/gpu-access/reservations.html#the-reservation-app">The Reservation App</a></td>
</tr>
<tr>
<td>Reservation event</td>
<td>A Kubernetes event the reservation system writes on a GPU pod, such as <code>OnDemandLeaseDenied</code> or <code>Preempted</code>.</td>
<td><a href="/docs/reference/reservation-events.html">Reservation Events</a></td>
</tr>
<tr>
<td>Reserve floor</td>
<td>Capacity that ITS keeps unborrowable in each GPU class, so that idle capacity is not always available.</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#the-reserve-floor">The Reserve Floor</a></td>
</tr>
<tr>
<td>Resource tiers</td>
<td>The three levels at which resource limits apply to a job: a single pod, the namespace in total, and what is available on request.</td>
<td><a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a></td>
</tr>
<tr>
<td><code>rstudio-notebook</code></td>
<td>The standard image that adds the RStudio environment to <code>datascience-notebook</code>; it derives from the CPU image and is not GPU-enabled.</td>
<td><a href="/docs/environments/standard-images.html#standard-images">Standard Images</a></td>
</tr>
<tr>
<td>Runtime guarantee</td>
<td>The period in which a session cannot be preempted: to the end of its reservation, and through any booking that directly follows it.</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#end-of-a-reservation-window">End of a Reservation Window</a></td>
</tr>
<tr>
<td>Runtime limit</td>
<td>The deadline on how long a container may run.</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td><code>scipy-ml-notebook</code></td>
<td>The standard image that adds CUDA/GPU tooling, TensorFlow, and PyTorch to <code>datascience-notebook</code>, and the default image for bare <code>launch.sh</code>.</td>
<td><a href="/docs/environments/standard-images.html#standard-images">Standard Images</a></td>
</tr>
<tr>
<td>Senior and junior borrowing</td>
<td>The two borrowing tiers. A junior borrower may borrow only the idle capacity above a deeper reserve floor; the tier applies only when a reservation is made.</td>
<td><a href="/docs/gpu-access/quotas-and-availability.html#borrowing-beyond-quota">Borrowing Beyond Quota</a></td>
</tr>
<tr>
<td>Service Unit (SU)</td>
<td>A usage credit for GPU time, spent at an hourly rate that each GPU class carries.</td>
<td><a href="/docs/gpu-access/service-units-and-budgets.html#what-a-service-unit-is">What a Service Unit Is</a></td>
</tr>
<tr>
<td>Slurm compatibility wrappers</td>
<td>The commands <code>sbatch</code>, <code>srun</code>, <code>squeue</code>, and <code>scancel</code>, which translate into <code>launch.sh</code> and have no Slurm scheduler behind them.</td>
<td><a href="/docs/reference/coming-from-hpc.html#slurm-compatibility-wrappers">Slurm Compatibility Wrappers</a></td>
</tr>
<tr>
<td>Spawn</td>
<td>Starting a browser session from a course's environment menu; a spawn failure is the message returned when the session does not start, and it does not state the cause.</td>
<td><a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a></td>
</tr>
<tr>
<td>Standard image</td>
<td>One of the images ITS maintains, which receive priority support.</td>
<td><a href="/docs/environments/standard-images.html#standard-images">Standard Images</a></td>
</tr>
</tbody>
</table></div>
<h2 id="t-z">T-Z</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Term</th>
<th>Definition</th>
<th>Reference</th>
</tr>
</thead>
<tbody>
<tr>
<td>Team</td>
<td>A group within a workspace, such as a project group, a lab bench, or a capstone team, holding data scoped to some of its members.</td>
<td><a href="/docs/workspaces-and-storage/what-a-workspace-is.html#sections-teams-and-group-data">Sections, Teams and Group Data</a></td>
</tr>
<tr>
<td>Team mode</td>
<td>A reservation feature in which a team shares one Service Unit budget, and teammates can see, cancel, and adopt one another's bookings.</td>
<td><a href="/docs/gpu-access/reservations.html#team-mode">Team Mode</a></td>
</tr>
<tr>
<td><code>teams/</code></td>
<td>The directory where team-scoped data appears, drawing on the workspace quota.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a></td>
</tr>
<tr>
<td>TPOC (Technical Point of Contact)</td>
<td>The person a course nominates to lead its customization work, a designation for support purposes rather than a privilege tier.</td>
<td><a href="/docs/reference/managing-a-group.html">Managing a Group</a></td>
</tr>
<tr>
<td>TritonLink / TSS</td>
<td>The registration systems from which course rosters populate automatically; auditors and observers are not on them and are added through Canvas.</td>
<td><a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a></td>
</tr>
<tr>
<td>Universal Scale Storage (USS)</td>
<td>SDSC storage that can be mounted onto the cluster, supported by Research IT.</td>
<td><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a></td>
</tr>
<tr>
<td>Unprivileged container</td>
<td>A container running under the member's own UID, without root or <code>sudo</code>, in a per-user Kubernetes namespace.</td>
<td><a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a></td>
</tr>
<tr>
<td>Workspace</td>
<td>The unit for one course, lab, or catch-all population, which anchors its roster, storage, container images, GPU class access, quotas, and budgets.</td>
<td><a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a></td>
</tr>
<tr>
<td>Workspace manager</td>
<td>The privilege tier held by an instructor, a TA, or a PI.</td>
<td><a href="/docs/reference/managing-a-group.html">Managing a Group</a></td>
</tr>
</tbody>
</table></div>
