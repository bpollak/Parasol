---
title: "Directories, Quotas & Cleaning Up"
path: /docs/workspaces-and-storage/your-files-and-quotas.html
description: "Find where your files are in a session, check your storage quotas, and free space when a full quota stops a session from starting."
eyebrow: "Workspaces & Storage"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/workspaces-and-storage/your-files-and-quotas/), preview build of 2026-09-29"
canonicalUrl: /docs/workspaces-and-storage/your-files-and-quotas.html
legacyUrl: https://dsmlp-docs.ucsd.edu/workspaces-and-storage/your-files-and-quotas/
format: html
---
<p class="lead">Find where your files are in a session, check your storage quotas, and free
space when a full quota stops a session from starting. Files that seem to be
missing are usually intact in another directory. Data too large for a home
directory goes on external storage.</p>
<dl class="docs-glance">
<div><dt>Personal quota</dt><dd>5 GB instructional, 100 GB research</dd></div>
<div><dt>Course home directories</dt><dd>5-10 GB, set per workspace</dd></div>
<div><dt>Check usage</dt><dd><strong>disk-quota-service</strong> under <strong>Services</strong></dd></div>
<div><dt>Chargeable</dt><dd>Storage above 1 TB</dd></div>
</dl>
<h2 id="where-files-live">Where Files Live</h2>
<p>The directory in view depends on the route into the session, browser or
terminal, and on the workspace. <strong>Files that appear to be missing are usually
intact in a directory other than the one on screen.</strong></p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Directory</th>
<th>In the notebook file browser</th>
<th>Inside the container</th>
<th>Visible to</th>
</tr>
</thead>
<tbody>
<tr>
<td>Workspace home</td>
<td>the top of the browser</td>
<td><code>/home/&lt;username&gt;</code></td>
<td>The member</td>
</tr>
<tr>
<td>Shared workspace area</td>
<td><code>/public</code></td>
<td><code>/home/&lt;username&gt;/public</code></td>
<td>Everyone in the workspace</td>
</tr>
<tr>
<td>Personal area</td>
<td><code>/private</code></td>
<td><code>/home/&lt;username&gt;/private</code></td>
<td>The member, in every workspace</td>
</tr>
<tr>
<td>Team area</td>
<td><code>/teams</code></td>
<td><code>/home/&lt;username&gt;/teams/&lt;team&gt;</code></td>
<td>Members of that team</td>
</tr>
</tbody>
</table></div>
<p>The workspace home, <code>public/</code>, and <code>teams/</code> draw on the workspace quota.
<code>private/</code> draws on a separate personal quota.
<a href="#workspace-and-personal-quotas">Workspace and Personal Quotas</a> describes both
pools.</p>
<h2 id="workspace-home-directories">Workspace Home Directories</h2>
<p>A home directory is specific to one workspace. A workspace is a course, a lab,
or a catch-all population. See
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>. Each member
has a separate home directory in every workspace the member belongs to.</p>
<p>One account therefore holds several home directories. Notebooks that appear to
be missing are usually in the home directory of another workspace, such as a
different course.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>
describes membership of more than one workspace.</p>
<p><a href="#workspace-and-personal-quotas">Workspace and Personal Quotas</a> lists home
directory sizes.</p>
<h2 id="the-shared-workspace-area">The Shared Workspace Area</h2>
<p><code>public/</code> is readable by every member of the workspace. Course datasets,
starter notebooks, and reference material normally appear there.</p>
<p>In a course, the shared grader account holds write permission on <code>public/</code>, and
all other members have read access. Files staged there by an instructor or TA
can be unreadable.
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#inside-the-workspace">Inside the Workspace</a>
describes the fix.</p>
<h2 id="the-personal-area">The Personal Area</h2>
<p><code>private/</code> is the one directory that appears unchanged in every workspace in
which a session starts. Its contents count against the personal quota rather
than against any course's quota. It holds tooling, credentials, notes, and
projects that extend beyond a single course.</p>
<h2 id="team-directories">Team Directories</h2>
<p><code>teams/</code> holds data scoped to a group within a workspace, such as a lab bench, a
project team, or a capstone group. Course teams are created from Canvas group
sets. Membership changes take a few hours to reach the cluster.</p>
<h3 id="mounting-team-data-from-the-command-line">Mounting Team Data from the Command Line</h3>
<p>From the command line, teams are mounted only when requested:</p>
<figure class="docs-command"><figcaption>List your teams, then launch with one</figcaption><pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -G list      # list the teams the account belongs to
launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -G &lt;teamid&gt;  # launch with that team's data</code></pre></figure>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p><code>-G</code> is the group flag and <code>-g</code> is the GPU count. See
<a href="/docs/running-jobs/launch-sh-reference.html#team-selection">Team Selection</a>.</p></div>
<h3 id="team-directory-names">Team Directory Names</h3>
<p>Team directory names are generated, not chosen, and can contain spaces and
brackets. For example, a capstone team directory can be named
<code>dsc-180a---a14-[88137]</code>. Quote such a name in a <code>cd</code> command and in any path
written into a script.</p>
<h2 id="filesystem-shared-with-the-login-node">Filesystem Shared with the Login Node</h2>
<p>The container a job runs in and the login node, <code>dsmlp-login</code>, mount the same
storage. <strong>A file written in one is visible in the other.</strong></p>
<p>A repository cloned on
the login node is present when the container starts, and output written inside
the container remains available to copy with <code>scp</code> after the job ends. No
staging or copy step is required.</p>
<h3 id="starting-directory-on-the-login-node">Starting Directory on the Login Node</h3>
<p>On <code>dsmlp-login</code>, <code>~</code> is the personal area, the same directory that appears as
<code>private/</code> inside a container. A course home directory is in a different
location and does not appear in <code>~</code>. The <code>workspace</code> command locates it:</p>
<figure class="docs-command"><figcaption>Run on dsmlp-login</figcaption><pre class="docs-code"><code class="language-bash">workspace -l               # list available workspaces and the path to each home
workspace -c &lt;WORKSPACE&gt;   # change to that workspace's home directory</code></pre></figure>
<p>The paths have the form <code>/dsmlp/workspaces-fs0*/&lt;WORKSPACE&gt;/home/&lt;username&gt;</code>.
Team files are under the same prefix, with <code>/teams</code> in place of <code>/home</code>. The
directory may not appear in a listing until it is entered with <code>cd</code>.</p>
<h2 id="workspace-and-personal-quotas">Workspace and Personal Quotas</h2>
<p>Storage draws on two separate quota pools. The state of one pool does not
indicate the state of the other.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-th-large"></span><p class="docs-card-title">Workspace pool</p><p>The workspace home, plus <code>public/</code> and <code>teams/</code></p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-user"></span><p class="docs-card-title">Personal pool</p><p><code>private/</code>, in every workspace</p>
<dl class="docs-card-facts"><div><dt>Instructional account</dt><dd>5 GB</dd></div><div><dt>Research account</dt><dd>100 GB</dd></div></dl></article>
</div>
<p>The personal quota belongs to the account rather than to any course. It is
5 GB on an instructional account and 100 GB on a research account.</p>
<p>Course home directories are 5-10 GB, toward the lower end for very large
classes. Research home directories are on the order of 100 GB, set when the
account is provisioned. Both values are set per workspace rather than per
person. The value that applies to a given account is the one the disk quota
service reports. See <a href="#checking-usage">Checking Usage</a>.</p>
<p><strong>Storage above 1 TB is chargeable.</strong> Compute is not.</p>
<h2 id="checking-usage">Checking Usage</h2>
<p>The disk quota service reports usage against quota and displays the workspace
ID that terminal commands require. It is reachable from a browser even when the
notebook does not start:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Go to <a href="https://datahub.ucsd.edu/hub/spawn">datahub.ucsd.edu/hub/spawn</a></span></li>
<li><span class="docs-step-title">Open the Services tab</span></li>
<li><span class="docs-step-title">Choose disk-quota-service</span></li>
</ol>
<p>Once an environment is running, the same service is available from the
<strong>Services</strong> menu in the navigation bar.</p>
<p>In a terminal, <code>du</code> reports where the space is used:</p>
<figure class="docs-command"><figcaption>Run in a terminal</figcaption><pre class="docs-code"><code class="language-bash">du -h --max-depth 1</code></pre></figure>
<p>Run it in the workspace home first, then in the largest directory it reports.</p>
<p>A "disk quota exceeded" message is sent by email. <strong>When that message has
arrived, the full disk is the cause of any other failure in the environment.</strong></p>
<h2 id="common-causes-of-a-full-quota">Common Causes of a Full Quota</h2>
<h3 id="jupyter-trash">Jupyter Trash</h3>
<p>Deleting a file in the Jupyter interface moves it to <code>.local/share/Trash</code>,
where it continues to count against the quota. Trash is purged automatically
after 7 days. To reclaim the space sooner:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Open a terminal</span></li>
<li><span class="docs-step-title">Change to <code>.local/share/Trash</code> with <code>cd</code></span></li>
<li><span class="docs-step-title">Delete the files there with <code>rm</code></span></li>
</ol>
<h3 id="vscode-server"><code>.vscode-server</code></h3>
<p>Remote editing installs a server into <code>.vscode-server</code> in the home directory.
The directory grows past 1 GB, a substantial fraction of a course-sized quota,
and does not appear in the file browser.
<a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a> describes remote
editing.</p>
<h3 id="packages-in-local">Packages in <code>.local</code></h3>
<p>Every <code>pip install</code> run without a virtual environment installs into <code>.local</code> in
the home directory, and the packages remain there across sessions. A broken
package there can also stop the environment from starting.
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a>
describes package installation.</p>
<h3 id="personal-copies-of-shared-datasets">Personal Copies of Shared Datasets</h3>
<p>A personal copy of a shared dataset counts against the quota. Large inputs
belong in the workspace's <code>public/</code> area or under <code>/datasets</code>, where every
member reads them in place. See
<a href="/docs/workspaces-and-storage/datasets.html#where-shared-data-lives">Where Shared Data Lives</a>.</p>
<h2 id="recovering-from-a-full-quota">Recovering from a Full Quota</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A full quota can prevent the environment from starting, which also removes
the file browser that would otherwise be used to clear it.</p></div>
<p>Files can then be removed from the login node:</p>
<figure class="docs-command"><figcaption>Free space from the login node</figcaption><pre class="docs-code"><code class="language-bash">ssh &lt;user&gt;@dsmlp-login.ucsd.edu
workspace -l                 # find the workspace ID and its path
workspace -c &lt;WORKSPACE&gt;     # change to that workspace's home
du -h --max-depth 1          # find what is large
rm &lt;files&gt;                   # remove it</code></pre></figure>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>On the login node, <code>~</code> is the personal area, not a course home. Removing files
there frees space in the personal pool and has no effect on a full workspace
pool.</p></div>
<p>Once usage drops below the quota, environments start normally again.
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>
describes the login node.</p>
<h2 id="asking-for-more-space">Asking for More Space</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Requester</th>
<th>Route</th>
</tr>
</thead>
<tbody>
<tr>
<td>Students in a course</td>
<td>The instructor or TA, who raises the request on the course's existing Service Desk ticket</td>
</tr>
<tr>
<td>Independent study and project users</td>
<td>A ticket submitted directly. See <a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a></td>
</tr>
<tr>
<td>Research accounts</td>
<td>Research IT, at <a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>. Temporary increases are possible where the need is bounded</td>
</tr>
<tr>
<td>Group and team space</td>
<td><a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
</tbody>
</table></div>
<p><strong>Before requesting an increase, confirm that the space is in use.</strong> Empty the Trash
and remove any personal copy of a shared dataset. See
<a href="#common-causes-of-a-full-quota">Common Causes of a Full Quota</a>.</p>
<h2 id="storage-outside-the-quota-pools">Storage Outside the Quota Pools</h2>
<p><code>/datasets</code> is a shared, staged directory tree, present in containers and on the
login node. It holds common corpora and course-specific data. It counts against
neither quota and is not writable by members. Data is placed there on request.
See <a href="/docs/workspaces-and-storage/datasets.html">Datasets</a>.</p>
<h2 id="mounting-external-storage">Mounting External Storage</h2>
<p>Home directories are sized for code and working files. Larger data goes on
storage hosted elsewhere and mounted into the workspace's containers, rather
than into a larger home directory.</p>
<p><strong>External storage</strong> is storage the cluster does not own, attached to a
workspace so that it appears as an ordinary directory to jobs running there.
SDSC Universal Scale Storage is the usual example. Other shares are handled the
same way.</p>
<p>External storage is a research and lab arrangement. A course's data belongs in
the workspace's shared area or in <code>/datasets</code>.</p>
<h3 id="universal-scale-storage">Universal Scale Storage</h3>
<p>Two access paths are documented for Universal Scale Storage shares:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>From</th>
<th>Path</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sftp</code> to the login node, when uploading</td>
<td><code>/uss/&lt;sharename&gt;</code></td>
</tr>
<tr>
<td>A shell after logging in</td>
<td><code>/dsmlp/teams</code></td>
</tr>
</tbody>
</table></div>
<p>Licensed corpora are sometimes staged on the same storage and mounted
read-only. The Nielsen subscription datasets are an example. See
<a href="/docs/workspaces-and-storage/datasets.html#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a>.</p>
<h3 id="capacity-thresholds">Capacity Thresholds</h3>
<p>Above a certain volume, data belongs on external storage and is mounted rather
than copied. Users do not set this boundary. State the expected volume and its
growth rate in the request. See
<a href="#requesting-external-storage">Requesting External Storage</a>. The reply states
what fits where.</p>
<h3 id="requesting-external-storage">Requesting External Storage</h3>
<p>Research IT provisions and mounts external storage. Requests go to
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>, which is also the address
for the Research Cluster and for Universal Scale Storage generally. Include in
the request:</p>
<ul class="docs-checklist">
<li>What the data is, and any licensing or classification that applies to it. See
  <a href="/docs/workspaces-and-storage/datasets.html#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a>.</li>
<li>How much data exists now, and how fast it grows.</li>
<li>Which workspace should see it, and which members of that workspace need to
  write as opposed to read.</li>
<li>Whether it already exists on a campus or SDSC service, or is to be acquired.</li>
</ul>
<p>Where the question is which platform to use rather than how to provision on this
one, Research IT advises on where the work belongs.</p>
<h2 id="cloud-storage-and-backups">Cloud Storage and Backups</h2>
<h3 id="campus-and-commercial-cloud-storage">Campus and Commercial Cloud Storage</h3>
<p>Campus and commercial cloud storage are not mounted into containers. Google
Drive, OneDrive, and commercial object storage under the University's billing
arrangements can hold data, but a job reaches them by transfer, not by mount.
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a> describes transfer methods.</p>
<h3 id="backups">Backups</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A mount is not a backup, and neither is a home directory. Keep the authoritative
copy of anything irreplaceable on storage whose backup terms are known.</p></div>
