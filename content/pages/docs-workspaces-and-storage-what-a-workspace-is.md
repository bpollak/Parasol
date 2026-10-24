---
title: "What a Workspace Is and What It Controls"
path: /docs/workspaces-and-storage/what-a-workspace-is.html
description: "Users are divided into workspaces: one per course, one per lab, or one catch-all population such as \"Campus Researcher\"."
eyebrow: "Workspaces & Storage"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/workspaces-and-storage/what-a-workspace-is/), preview build of 2026-09-29"
canonicalUrl: /docs/workspaces-and-storage/what-a-workspace-is.html
legacyUrl: https://dsmlp-docs.ucsd.edu/workspaces-and-storage/what-a-workspace-is/
format: html
---
<p class="lead">Users are divided into <strong>workspaces</strong>: one per course, one per lab, or one
catch-all population such as "Campus Researcher". A workspace anchors the
roster, the storage, the container images on offer, the GPU classes that may be
requested, and the quotas and budgets its members draw against.</p>
<dl class="docs-glance">
<div><dt>One workspace per</dt><dd>Course, lab, or catch-all population</dd></div>
<div><dt>Choose it</dt><dd>At every launch, from the environment list or with <code>-W</code></dd></div>
<div><dt>Find your IDs</dt><dd><code>workspace --list</code></dd></div>
<div><dt>Datahub sessions</dt><dd>One at a time per member</dd></div>
</dl>
<h2 id="what-one-workspace-covers">What One Workspace Covers</h2>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-education"></span><p class="docs-card-title">Course</p><p>The whole course: its lecture timeslots and the discussion sections associated with them</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-tasks"></span><p class="docs-card-title">Lab or research</p><p>A research group</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><p class="docs-card-title">Catch-all</p><p>A population that has no course or lab of its own</p></article>
</div>
<p>A course is not split across several workspaces, and a discussion section does
not have a workspace of its own.</p>
<p>Access that only some students in a course need, such as a mentor's dataset for
one section or a project group's shared files, is given through teams inside the
single course workspace. See
<a href="#sections-teams-and-group-data">Sections, Teams and Group Data</a>.</p>
<h2 id="what-the-workspace-controls">What the Workspace Controls</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Resource</th>
<th>How the workspace governs it</th>
</tr>
</thead>
<tbody>
<tr>
<td>Roster</td>
<td>Course rosters auto-populate from TSS (formerly TritonLink) and Canvas. Lab and research workspace rosters are curated by Research IT Services and have the potential to auto-populate from departmental staff affiliation.</td>
</tr>
<tr>
<td>Storage</td>
<td>Home directories are per-user and per-workspace. The workspace also holds its shared <code>public/</code> area and any <code>teams/</code> directories. <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a> lists home directory quotas.</td>
</tr>
<tr>
<td>Container images</td>
<td>Each workspace defines one or more Jupyter configurations, each an image plus CPU, RAM, and GPU quantities, and members pick one from a menu. For example, a course might offer a CPU-only environment for most of the quarter and a 1-GPU environment for its projects.</td>
</tr>
<tr>
<td>GPU class access</td>
<td>Each workspace is granted access to one or more <a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> matching the work it was provisioned for. A request for a class the workspace was not granted is refused.</td>
</tr>
<tr>
<td>Quotas and budgets</td>
<td>Group quotas cap how much of each GPU class the workspace can hold at once. Per-workspace Service Unit budgets divide that capacity between its members, and renew weekly by default.</td>
</tr>
</tbody>
</table></div>
<p>The resources in this table stop at the workspace boundary. <strong>The <code>private/</code>
directory is the exception:</strong> it is per-user and cluster-wide, and it appears in
every workspace an account belongs to.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a> lists directory
scopes.</p>
<h2 id="workspace-provisioning">Workspace Provisioning</h2>
<p>Course workspaces are provisioned from a course request.
<a href="/get-started/instructor-or-ta.html#course-timeline">Course Timeline</a> gives the submission
deadline.
A quarterly survey asks instructors and TAs about assignment scope, GPU sizes,
and deadlines. From the answers, ITS provisions the workspace, its Datahub
environments, and its GPU class access before the quarter starts.
<a href="/docs/access/when-access-starts-and-ends.html#instructors-tas--course-staff">Instructors, TAs &amp; Course Staff</a>
describes the course staff timeline.</p>
<ol class="docs-flow" aria-label="From course request to provisioned workspace">
<li><span class="docs-flow-label">Request</span><strong>Submit a course request</strong><p>By the deadline in Course Timeline.</p></li>
<li><span class="docs-flow-label">Survey</span><strong>Answer the quarterly survey</strong><p>Instructors and TAs cover assignment scope, GPU sizes, and deadlines.</p></li>
<li><span class="docs-flow-label">Provision</span><strong>ITS provisions the workspace</strong><p>With its Datahub environments and GPU class access, before the quarter starts.</p></li>
</ol>
<p>Research IT Services curates lab and research workspaces manually rather than
generating them from a roster.</p>
<h3 id="image-pinning">Image Pinning</h3>
<p>A workspace may <strong>pin</strong> a container image. Pinning keeps the workspace's
members from being moved by an image update mid-quarter.
<a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a>
describes the request.</p>
<h2 id="who-manages-a-workspace">Who Manages a Workspace</h2>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-user"></span><p class="docs-card-title">Members</p><p>A workspace's <strong>members</strong> are its students or lab members.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-cog"></span><p class="docs-card-title">Workspace managers</p><p>A workspace's <strong>workspace managers</strong> are its instructors, TAs, or PI.</p>
<p>A workspace manager may view the group calendar, book on a member's behalf, and
waive a cancellation charge.</p>
<p>A workspace manager may not edit Service Unit budgets or group limits, but may
request a change by ticket to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p></article>
</div>
<p><a href="/docs/reference/managing-a-group.html">Managing a Group</a> describes the privilege
tiers.</p>
<h2 id="belonging-to-several-workspaces">Belonging to Several Workspaces</h2>
<p>An account can belong to several workspaces at once, for example as a TA in one
course, a student in another, and a member of a lab. Each workspace is a
separate context with its own files. See
<a href="#per-workspace-home-directories">Per-Workspace Home Directories</a>.</p>
<p><strong>The workspace a session runs in is chosen at every launch.</strong></p>
<ul>
<li>In the browser, it is chosen from the environment list
(<a href="#choosing-a-workspace-in-the-browser">Choosing a Workspace in the Browser</a>).</li>
<li>On the command line, it is named with <code>-W</code>
(<a href="#naming-a-workspace-on-the-command-line">Naming a Workspace on the Command Line</a>).</li>
</ul>
<h2 id="per-workspace-home-directories">Per-Workspace Home Directories</h2>
<p>Home directories are per-user and per-workspace. A file saved while working in
one course is not visible from another course's environment or from a lab
environment.</p>
<p>Two locations follow an account across every workspace:</p>
<ul>
<li><code>private/</code> is per-user and cluster-wide. It appears in every workspace the
  account belongs to, and it draws on the personal quota rather than the
  workspace's. A file needed in every environment belongs in <code>private/</code>.</li>
<li>The login-node home directory is personal and is not a course home. Files
  placed there by <code>scp</code> are not in a course home until they are moved.</li>
</ul>
<p><code>public/</code> and <code>teams/</code> belong to the workspace and count against its quota.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a> lists directory
locations and quotas.</p>
<h2 id="choosing-a-workspace-in-the-browser">Choosing a Workspace in the Browser</h2>
<p>Signing in at <code>datahub.ucsd.edu</code> leads to a page listing the environments the
account is entitled to, each named for the course it belongs to.</p>
<p>A course that is not listed may be an enrollment change that has not yet
propagated. See <a href="#missing-workspaces">Missing Workspaces</a>.</p>
<h3 id="courses-with-several-environments">Courses with Several Environments</h3>
<p>Some courses offer more than one environment, commonly a CPU-only configuration
for ordinary work and a GPU configuration for projects. Which environment to use
is a course decision. Ask the instructor or TA which one to use.</p>
<h3 id="datahub-session-limit">Datahub Session Limit</h3>
<p>A member may run <strong>one Datahub session at a time</strong>, and starting another means
stopping the first. Shell, VS Code, and batch jobs are not subject to this
limit, in this workspace or another
(<a href="/docs/access/datahub-in-the-browser.html#concurrent-datahub-sessions">Concurrent Datahub Sessions</a>).</p>
<h2 id="naming-a-workspace-on-the-command-line">Naming a Workspace on the Command Line</h2>
<p>From the login node, name the workspace with <code>-W</code>:</p>
<figure class="docs-command"><figcaption>Run on the login node</figcaption><pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;workspace-id&gt;</code></pre></figure>
<h3 id="launching-without--w">Launching Without <code>-W</code></h3>
<p>A launch without <code>-W</code> selects no course and starts in the personal home
directory. This suits independent study and research work, but not work on a
course's files.</p>
<h3 id="listing-workspace-ids">Listing Workspace IDs</h3>
<p>The available IDs come from the listing command:</p>
<figure class="docs-command"><figcaption>List your workspaces and their home paths</figcaption><pre class="docs-code"><code class="language-bash">workspace --list</code></pre></figure>
<p>The listing prints each workspace the account belongs to alongside the full path
to its home directory inside that workspace. The listing may include courses
that have ended.</p>
<p>The disk-quota-service page under <strong>Services</strong> on
<code>datahub.ucsd.edu</code> also displays the ID.</p>
<h3 id="workspace-ids-and-paths">Workspace IDs and Paths</h3>
<p><strong>Do not construct a workspace ID or a workspace path by hand.</strong> Both are printed by
<code>workspace --list</code>. Workspace filesystem paths are not predictable from the
workspace name, they differ between workspaces, and a workspace directory may be
invisible until it is entered with <code>cd</code>.</p>
<p>Older articles show worked examples with an ID built from a subject code, a
term, and a section suffix. Those examples illustrate the flag and are not a
method for deriving an ID.</p>
<h2 id="sections-teams-and-group-data">Sections, Teams and Group Data</h2>
<p>Section-specific and group-specific files in a course workspace are handled
within that workspace by teams:</p>
<figure class="docs-command"><figcaption>List your teams, then launch with one</figcaption><pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;workspace-id&gt; -G list
launch-scipy-ml.sh -W &lt;workspace-id&gt; -G &lt;teamid&gt;</code></pre></figure>
<ul>
<li><code>-G list</code> prints the teams the account belongs to.</li>
<li><code>-G &lt;teamid&gt;</code> launches with that team's data visible under <code>teams/</code>.</li>
</ul>
<p><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#team-directories">Team Directories</a> describes the
<code>teams/</code> directory.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p><code>-g</code> is the GPU count and <code>-G</code> is the group flag: <code>-g 1</code> asks for one GPU, and
<code>-G 1</code> is read as a team ID
(<a href="/docs/running-jobs/launch-sh-reference.html#resource-and-gpu-selection-flags">Resource and GPU Selection Flags</a>).</p></div>
<h2 id="missing-workspaces">Missing Workspaces</h2>
<h3 id="pending-roster-updates">Pending Roster Updates</h3>
<p>A course that <strong>does not appear</strong> may still be waiting on a roster update. An
enrolled course that is missing is not a fault until the roster timing in
<a href="/docs/access/when-access-starts-and-ends.html#students-enrolled-in-a-course">Students Enrolled in a Course</a>
has passed.</p>
<p>Auditors and observers are not on the TSS roster and are added through Canvas by
the instructor or TA.</p>
<h3 id="ended-courses">Ended Courses</h3>
<p>A course that <strong>has disappeared</strong>, rather than never appeared, has most likely
reached the end of its retention period. See
<a href="/docs/access/when-access-starts-and-ends.html#one-additional-quarter">One Additional Quarter</a>.
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#retrieving-work-before-access-ends">Retrieving Work Before Access Ends</a>
describes copying work out.</p>
