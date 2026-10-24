---
title: "Datahub in the Browser"
path: /docs/access/datahub-in-the-browser.html
description: "datahub.ucsd.edu provides browser-based access to course environments."
eyebrow: "Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/access/datahub-in-the-browser/), preview build of 2026-09-29"
canonicalUrl: /docs/access/datahub-in-the-browser.html
legacyUrl: https://dsmlp-docs.ucsd.edu/access/datahub-in-the-browser/
format: html
---
<p class="lead"><a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> provides browser-based access to
course environments. It requires a browser, UCSD campus credentials, and Duo;
no local installation or command-line experience is needed.</p>
<dl class="docs-glance">
<div><dt>Sign in with</dt><dd>UCSD single sign-on and Duo</dd></div>
<div><dt>Default session</dt><dd>2 CPU cores and 4 GB of RAM, set per course</dd></div>
<div><dt>Running at once</dt><dd>One Datahub session per member</dd></div>
<div><dt>Stop with</dt><dd>File → Hub Control Panel → Stop My Server</dd></div>
</dl>
<h2 id="signing-in">Signing In</h2>
<ol class="docs-steps">
<li><span class="docs-step-title">Open Datahub</span><p>Go to <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>.</p></li>
<li><span class="docs-step-title">Sign in with campus credentials</span><p>Sign in through <strong>UCSD single sign-on</strong>. Datahub uses the standard campus sign-on, the same one used by other UCSD
services. Nothing Datahub-specific is entered at sign-in.</p></li>
<li><span class="docs-step-title">Approve the Duo prompt</span></li>
</ol>
<p>An account that cannot get past the campus sign-in page has a credential
problem, not a Datahub problem, and the <a href="https://support.ucsd.edu/">ITS Service Desk</a> handles it.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>The login node takes a different username</strong></p><p>The Active Directory username is required at a different prompt, <code>ssh</code> to the
login node, which does not accept the full address.
<a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a> describes that
prompt.</p></div>
<h2 id="selecting-a-course--environment">Selecting a Course &amp; Environment</h2>
<p>After sign-in, Datahub lists the courses available to the account and, within a
course, the environments configured for it.</p>
<p><img alt="The Select Your Notebook Environment page. Two options are listed, each naming a course, its instructor and its term, with the image and its size below, 2 CPU and 8G RAM. A Launch Environment button sits below the list." src="/_images/docs/datahub-spawn-menu.png" class="img-responsive docs-figure"></p>
<h3 id="course-list">Course List</h3>
<p>Each Datahub course appears separately and holds its own files. Students and
instructors enrolled in more than one course select among them in this list.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#belonging-to-several-workspaces">Belonging to Several Workspaces</a>
describes membership in more than one workspace.</p>
<h3 id="environment-menu">Environment Menu</h3>
<p>The options in the environment menu are set by the course instructor. The menu
commonly holds one CPU option, and a GPU option in courses that use GPUs.
Environments not present in the menu are added by the instructor.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>
describes the settings a course workspace controls.</p>
<h3 id="startup-time">Startup Time</h3>
<p>An environment takes <strong>one to two minutes</strong> to start, and longer while the cluster
is busy. The live state of the cluster is shown on the status page. See
<a href="/docs/gpu-access/quotas-and-availability.html#the-status-page">The Status Page</a>.</p>
<h2 id="the-browser-session">The Browser Session</h2>
<p>By default, a browser session starts with <strong>2 CPU cores and 4 GB of RAM</strong>. This is
the course spawn configuration, set per course, and a course can configure
more. The environment menu shows each option's size.</p>
<p>The defaults applied by the command-line launch scripts are a separate figure
that describes a different object. See
<a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a>.</p>
<p>A session provides JupyterLab, with notebooks, a file browser, a text editor,
and a terminal. Files persist between sessions.
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a>
describes installing software within an environment, and the conditions under
which an installation persists.</p>
<h2 id="concurrent-datahub-sessions">Concurrent Datahub Sessions</h2>
<p>A member may have <strong>one Datahub session running at a time</strong>. The limit applies to
Datahub itself, and it counts sessions, not environments or courses. Working in
a different course environment requires stopping the running session first. See
<a href="#stopping-a-session">Stopping a Session</a>.</p>
<h3 id="shell-vs-code-and-batch-jobs">Shell, VS Code, and Batch Jobs</h3>
<p>The one-session limit does not extend to work launched from a shell. SSH
sessions, VS Code containers, and batch jobs run alongside a Datahub session,
and alongside each other, in any number. Launching a container from
<code>dsmlp-login</code> while a browser session is open is ordinary use and does not
conflict with the session.</p>
<h3 id="aggregate-resource-limits">Aggregate Resource Limits</h3>
<p>Total CPU, memory, and GPU across everything a member has running must fit
within the Kubernetes limits set on the member's namespace and, where GPUs are
involved, within the reservation system's limits. A launch is refused when the
total would exceed them, whatever mix of sessions makes up that total.
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>
describes running several jobs together.</p>
<h2 id="stopping-a-session">Stopping a Session</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Signing out does not stop a session, and neither does closing the browser
tab. The container continues to run and holds its CPU, its memory, and its
GPU where one is attached.</p></div>
<p>To stop a session, use <strong>File → Hub Control Panel → Stop My Server</strong>. The
interface may take a short time to reflect the change.</p>
<h3 id="stopping-an-unreachable-session">Stopping an Unreachable Session</h3>
<p>Where the browser session cannot be reached at all, as with a stale profile or
a page that will not load, use the <strong>manual-resetter</strong> under the services dropdown
at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a>. It stops any running servers and
resets the profile, leaving files untouched. The procedure is in
<a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a>.</p>
<h2 id="status--quota-pages">Status &amp; Quota Pages</h2>
<p>Two pages at datahub.ucsd.edu report storage use and cluster capacity.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Page</th>
<th>Location</th>
<th>Contents</th>
</tr>
</thead>
<tbody>
<tr>
<td>Disk usage</td>
<td><a href="https://datahub.ucsd.edu/hub/spawn">datahub.ucsd.edu/hub/spawn</a> → <strong>Services</strong> tab → <strong>disk-quota-service</strong></td>
<td>Storage in use against the account quota</td>
</tr>
<tr>
<td>Cluster status</td>
<td><a href="https://datahub.ucsd.edu/hub/status">datahub.ucsd.edu/hub/status</a></td>
<td>Cluster nodes, the GPU models on them, and free GPU counts</td>
</tr>
</tbody>
</table></div>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A full quota prevents a session from starting and produces no error message.</p></div>
<p><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
describes the storage pools and their quotas.
See <a href="/docs/gpu-access/quotas-and-availability.html#the-status-page">The Status Page</a>.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#recovering-from-a-full-quota">Recovering from a Full Quota</a></p>
<h2 id="sign-in-failures">Sign-In Failures</h2>
<p>Most failures to reach a session resolve to one of these conditions:</p>
<ul>
<li>The course does not appear in the course list.</li>
<li>The disk quota is full, or a package in <code>.local</code> breaks the environment.</li>
<li>The cluster is busy, or the environment's image is slow to download.</li>
</ul>
<p><a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a> covers each
condition.</p>
