---
title: "Customizing an Environment"
path: /docs/environments/customizing-your-environment.html
description: "Packages can be added to a standard image without building a custom one."
eyebrow: "Environments"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/environments/customizing-your-environment/), preview build of 2026-09-29"
canonicalUrl: /docs/environments/customizing-your-environment.html
legacyUrl: https://dsmlp-docs.ucsd.edu/environments/customizing-your-environment/
format: html
---
<p>Packages can be added to a standard image without building a custom one.
Anything installed into a member's own home directory, such as Python packages,
an R library, or a private Jupyter kernel, is available to that member; anything
that installs into the operating system requires a custom image.</p>
<h2 id="what-can-be-installed">What Can Be Installed</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Change</th>
<th>Possible without a custom image</th>
</tr>
</thead>
<tbody>
<tr>
<td>Add a Python package for personal use</td>
<td>Yes, into a virtual environment with its own kernel</td>
</tr>
<tr>
<td>Add an R package for personal use</td>
<td>Yes, into a personal R library</td>
</tr>
<tr>
<td>Add a Jupyter kernel</td>
<td>Yes, with <code>ipython kernel install --user</code></td>
</tr>
<tr>
<td>Add a system package (<code>apt-get</code>, a compiler, a system utility)</td>
<td>No. A custom image is required.</td>
</tr>
<tr>
<td>Change the image for a whole course</td>
<td>No. This requires a custom image or a different standard image.</td>
</tr>
</tbody>
</table></div>
<h3 id="storage-quota">Storage Quota</h3>
<p>Personal installs are written to the member's home directory, which is per-user
and per-workspace and is not large. They count against the quota in
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>.</p>
<p>Machine-learning packages in particular can be very large. Build a custom image
rather than installing a private copy of PyTorch, the CUDA libraries, or
similar packages. See
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>.</p>
<h2 id="installing-python-packages-into-a-private-kernel">Installing Python Packages Into a Private Kernel</h2>
<p>Install Python packages into a virtual environment with its own Jupyter kernel,
not into the environment the course ships. Installing into the course
environment can break it. ITS supports virtual environments made with
<code>python3 -m venv</code>.</p>
<ol>
<li>
<p>Open a terminal from the notebook interface (<strong>File → New → Terminal</strong>).</p>
</li>
<li>
<p>Create and activate a virtual environment, then install <code>ipython</code> and
   <code>ipykernel</code> into it:</p>
<pre class="docs-code"><code class="language-bash"># create a directory and a virtual environment inside it
mkdir mykernel
python3 -m venv mykernel

# activate it; pip now refers to the virtual environment's pip
source mykernel/bin/activate
which pip

pip install ipython ipykernel</code></pre>
</li>
<li>
<p>Install the packages into the virtual environment:</p>
<pre class="docs-code"><code class="language-bash">pip install scrapy</code></pre>
</li>
<li>
<p>Register the environment as a Jupyter kernel, then deactivate it:</p>
<pre class="docs-code"><code class="language-bash"># confirm ipython is the virtual environment's copy before registering
which ipython

ipython kernel install --user --name=mykernel
deactivate</code></pre>
</li>
<li>
<p>Refresh the notebook interface. <code>mykernel</code> appears in the launcher, and a
   notebook created with it can import the packages installed into it.</p>
</li>
</ol>
<p>Libraries installed this way are available only to notebooks using that kernel.
A notebook on the course kernel is unaffected by anything installed into a
private one.</p>
<h3 id="conda-environments">Conda Environments</h3>
<p>A member may build a conda environment instead, for example where the course
staff direct it, but ITS does not support conda environments, because they can
conflict with the image's own conda environment. The image's conda environment
is read-only, so <code>conda install</code> into it does not work.</p>
<p>An environment used as a Jupyter kernel, whether built with <code>venv</code> or with
conda, must be compatible with the versions of JupyterLab and
<code>jupyterhub-singleuser</code> that the session runs.</p>
<h2 id="installing-r-packages">Installing R Packages</h2>
<p>On first use of RStudio, create a personal library from the RStudio Console:</p>
<pre class="docs-code"><code class="language-r">dir.create("~/R")
dir.create("~/R/library")
.libPaths("~/R/library")</code></pre>
<p><code>install.packages()</code> then writes to the personal library instead of the system
library, which is not writable.</p>
<h2 id="root-access-and-system-packages">Root Access and System Packages</h2>
<p>Containers run unprivileged, under the member's own UID, in a per-user
Kubernetes namespace, on a node shared with other users' containers. Root access
and <code>sudo</code> are not available. <code>sudo apt-get install ...</code> fails by design, not
through misconfiguration. A <code>sudo</code> command prints:</p>
<pre class="docs-code"><code class="language-text">sudo: The "no new privileges" flag is set, which prevents sudo from running as root.</code></pre>
<h3 id="unavailable-operations-and-alternatives">Unavailable Operations and Alternatives</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Unavailable operation</th>
<th>Alternative</th>
</tr>
</thead>
<tbody>
<tr>
<td>Any <code>sudo</code> command</td>
<td>Work in the member's own home directory, which requires no <code>sudo</code></td>
</tr>
<tr>
<td><code>apt-get install</code> a system package</td>
<td>Install it in a custom image, where root is available at build time</td>
</tr>
<tr>
<td>Writing to system directories</td>
<td>Install into a virtual environment or a personal R library</td>
</tr>
<tr>
<td><code>conda install</code> into the image's conda environment, which is read-only</td>
<td>Install into a virtual environment</td>
</tr>
<tr>
<td>Reaching another user's container or namespace</td>
<td>Share through the workspace's <code>public/</code> or <code>teams/</code> areas</td>
</tr>
</tbody>
</table></div>
<h3 id="operations-available-without-root">Operations Available Without Root</h3>
<p>Members keep full control of their own space. Installing Python packages,
creating a Jupyter kernel, creating an R library, reading and writing anywhere
the member owns, and managing the member's own pods with <code>kubectl</code> all work
normally.
<a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a> covers
direct <code>kubectl</code> use.</p>
<h3 id="system-packages-and-custom-images">System Packages and Custom Images</h3>
<p>A system-level package requires a custom image. Root is available inside a
Dockerfile at build time, which is where <code>USER root</code> and <code>apt-get</code> belong. The
image is built outside the cluster. When the image is later launched on the
cluster, it runs unprivileged under the member's own UID, the same as a standard
image. See
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>.</p>
<h3 id="course-wide-packages">Course-Wide Packages</h3>
<p>A package that a whole course needs belongs in the course image, not in
individual per-user installations.</p>
<h2 id="recovering-a-broken-environment">Recovering a Broken Environment</h2>
<p>Installing packages with pip or conda can break a local environment. Two
recoveries apply, in increasing order of severity: a clean kernel and the manual
resetter.</p>
<h3 id="clean-kernel">Clean Kernel</h3>
<p>Start a notebook on the <strong>Python3 (clean)</strong> kernel, which ignores everything in
<code>.local</code>. If the clean kernel resolves the symptom, the cause is in <code>.local</code>.
Moving or deleting <code>.local/lib</code> resolves many cases. Occasionally <code>.local/jupyter</code>
must be moved or deleted as well.</p>
<h3 id="manual-resetter">Manual Resetter</h3>
<p>The manual resetter stops the account's running servers, signs the account out,
and resets its profile while leaving files intact. See
<a href="/docs/access/sign-in-and-session-problems.html#spawn-failed">"Spawn Failed"</a>.</p>
<h3 id="course-grader-account">Course Grader Account</h3>
<p>Neither recovery applies to the shared course grader account. For that account,
a TA follows up in the course support ticket instead.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>The grader account carries the course's nbgrader state. Clearing its <code>.local</code>
by hand can destroy that state.</p></div>
<p><a href="/docs/grading/grading-failures.html">Common Grading Failures &amp; Recovery</a> covers
grader account failures.</p>
<h3 id="support-for-personal-customizations">Support for Personal Customizations</h3>
<p>Minor customizations within a standard image are a supported feature. ITS staff
cannot debug an arbitrary package tree. Instructors and Technical Points of
Contact (TPOCs) can bring such problems to a 1:1 Consultation. See
<a href="/docs/reference/getting-help.html">Getting Help</a>.</p>
