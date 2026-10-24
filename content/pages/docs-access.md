---
title: "Access"
path: /docs/access/index.html
description: "PARASOL has three access routes: the browser, the shell, and a remote editor."
eyebrow: "Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/access/), preview build of 2026-09-29"
canonicalUrl: /docs/access/index.html
legacyUrl: https://dsmlp-docs.ucsd.edu/access/
format: html
---
<p class="lead">PARASOL has three access routes: the browser, the shell, and a
remote editor. Start here to choose a route, to fix a sign-in or startup
failure, or to find out when your access starts and ends. Moving between the
routes has no eligibility requirement and requires no request.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><p class="docs-card-title"><a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a></p><p>Signing in, selecting a course and environment, the browser session, concurrent Datahub sessions, stopping a session, and the status and quota pages.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-console"></span><p class="docs-card-title"><a href="/docs/access/the-login-node.html">The Login Node</a></p><p>Connecting over SSH, the permitted and prohibited uses of <code>dsmlp-login</code>, connecting without a password, tunnels to a notebook or service, and connection failures.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span><p class="docs-card-title"><a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a></p><p>Connecting VS Code to a container over Remote-SSH, the key pair and host entry, pod lifetime, ending the session, and editor connection failures.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-log-in"></span><p class="docs-card-title"><a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a></p><p>Campus sign-in failures, a missing course, spawn failures, links clicked before sign-in, launches refused by the cluster, the end of course access, and reporting a problem.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-calendar"></span><p class="docs-card-title"><a href="/docs/access/when-access-starts-and-ends.html">When Access Starts &amp; Ends</a></p><p>When access opens for each population, extensions, the duration of research access, the retention timeline, and archiving on request.</p></article>
</div>
<h2 id="access-routes">Access Routes</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Route</th>
<th>Interface</th>
<th>Typical use</th>
</tr>
</thead>
<tbody>
<tr>
<td>Browser</td>
<td>Jupyter in a browser tab at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a></td>
<td>Coursework, assignments, and work that finishes in one sitting</td>
</tr>
<tr>
<td>Shell</td>
<td><code>ssh</code> to the login node, then a launch script</td>
<td>Work that must continue after disconnection, resource requests beyond the course menu, and batch jobs</td>
</tr>
<tr>
<td>Remote editor</td>
<td>VS Code, attached over SSH</td>
<td>Editing a codebase with local extensions on cluster hardware</td>
</tr>
</tbody>
</table></div>
<h3 id="browser-access">Browser Access</h3>
<p>The browser route covers most coursework. It requires no local installation, no
configuration, and no knowledge of Linux. Signing in and selecting a course and
an environment starts a Jupyter session that contains the account's files.</p>
<p>A session started from <code>datahub.ucsd.edu</code> expects the browser window to remain
open while its work runs, and is not the route for work that continues
unattended for hours. <a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a>
describes signing in and stopping a session.</p>
<h3 id="shell-access">Shell Access</h3>
<p>The shell is the route for work that the course menu does not cover. None of
the following uses requires permission.</p>
<ul>
<li>Background and batch jobs started from a terminal keep running after a
  disconnect. See
  <a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a>.</li>
<li>Resources beyond the course menu, such as more CPU or RAM or a GPU class that
  the course's environments do not include, are requested from the shell. See
  <a href="/docs/gpu-access/index.html">GPU Access</a>.</li>
<li>Large data transfers use <code>scp</code>, <code>sftp</code>, <code>rsync</code>, and <code>git</code>, which all run from
  the login node. See
  <a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a>.</li>
<li>A session that will not start because a disk quota is full or a pod is stuck
  is cleared from the shell rather than from the browser. See
  <a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a>.</li>
</ul>
<p>Shell access begins at the login node, which is for launching jobs and moving
files rather than for running work. See <a href="/docs/access/the-login-node.html">The Login Node</a>.</p>
<h3 id="remote-editor-access">Remote Editor Access</h3>
<p>VS Code attached over Remote-SSH runs a local editor, with local extensions and
a debugger, against cluster hardware. It serves editing across many files and
requires the most setup of the three routes.</p>
<p><strong>Closing the editor does not release the container.</strong>
<a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a> describes the setup.</p>
<h2 id="files-entitlements-and-concurrency-across-routes">Files, Entitlements, and Concurrency Across Routes</h2>
<h3 id="files">Files</h3>
<p>The login node and the container share a filesystem, and a home directory
follows the account between routes. A file uploaded in the browser is on the
login node, and a file transferred with <code>scp</code> is in the notebook.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>
describes the directories.</p>
<h3 id="entitlements">Entitlements</h3>
<p>Every route draws on the same workspace, the same quotas, and the same GPU
classes. The shell exposes more of them directly but grants nothing additional.</p>
<h3 id="concurrency">Concurrency</h3>
<p>A member may have <strong>one Datahub session</strong> running, alongside any number of shell,
VS Code, and batch jobs. See
<a href="/docs/access/datahub-in-the-browser.html#concurrent-datahub-sessions">Concurrent Datahub Sessions</a>.</p>
<p>The limit that applies is the total CPU, memory, and GPU across everything
running at once. See
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>.</p>
