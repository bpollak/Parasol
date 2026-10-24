---
title: "Standard Images, Tags, and Pinning"
path: /docs/environments/standard-images.html
description: "The standard images are the software environments IT Services maintains for PARASOL, and most courses and projects run on one of them."
eyebrow: "Environments"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/environments/standard-images/), preview build of 2026-09-29"
canonicalUrl: /docs/environments/standard-images.html
legacyUrl: https://dsmlp-docs.ucsd.edu/environments/standard-images/
format: html
---
<p>The standard images are the software environments IT Services maintains for
PARASOL, and most courses and projects run on one of them. Find out
which image a session runs, what it contains, and how a course can pin its
workspace to one version of an image for a term.</p>
<h2 id="standard-images">Standard Images</h2>
<p>The canonical list of the images IT Services (ITS) maintains, with their
current tags, is the
<a href="https://github.com/ucsd-ets/datahub-docker-stack"><code>ucsd-ets/datahub-docker-stack</code></a>
repository. Three standard images cover most courses and projects, receive
priority support, and serve as the starting point for a custom image. See
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Image</th>
<th>What it adds</th>
<th>GPU</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>datascience-notebook</code></td>
<td>Widely used data analysis libraries from the Python, R and Julia communities. The default for most courses.</td>
<td>No</td>
</tr>
<tr>
<td><code>scipy-ml-notebook</code></td>
<td>Everything in <code>datascience-notebook</code>, plus CUDA/GPU tooling, TensorFlow and PyTorch.</td>
<td>Yes</td>
</tr>
<tr>
<td><code>rstudio-notebook</code></td>
<td>Everything in <code>datascience-notebook</code>, plus the RStudio development environment.</td>
<td>No</td>
</tr>
</tbody>
</table></div>
<h3 id="rstudio-and-gpu-support">RStudio and GPU Support</h3>
<p><code>rstudio-notebook</code> is not GPU-enabled. It extends the CPU image,
<code>datascience-notebook</code>, not the machine-learning image, <code>scipy-ml-notebook</code>. A
course that needs both RStudio and GPUs cannot meet that need by choosing
<code>rstudio-notebook</code>. It requires a custom image or a second environment.
Instructors of such a course contact ITS through
<a href="/docs/reference/getting-help.html">Getting Help</a>.</p>
<h3 id="opening-rstudio">Opening RStudio</h3>
<p>RStudio opens from the JupyterLab launcher and does not require a separate
sign-in. The first RStudio session in a new account requires a personal package
library before <code>install.packages()</code> works. The procedure is in
<a href="/docs/environments/customizing-your-environment.html#installing-r-packages">Installing R Packages</a>.</p>
<h2 id="image-inheritance">Image Inheritance</h2>
<pre class="docs-code"><code class="language-text">quay.io/jupyter/datascience-notebook   Jupyter's Python, R and Julia image
  └── datascience-notebook             + tools, packages and nbgrader
        ├── scipy-ml-notebook          + CUDA, TensorFlow, PyTorch
        └── rstudio-notebook           + RStudio</code></pre>
<p>A child image contains everything in its parent. A package in
<code>datascience-notebook</code> is also in <code>scipy-ml-notebook</code> and <code>rstudio-notebook</code>.
The reverse does not hold.</p>
<p><code>datascience-notebook</code> is built on the Jupyter project's
<code>quay.io/jupyter/datascience-notebook</code> image, and is the base of the other two
standard images. It is the smallest standard image, and the base to derive
from when build time or image size matters. A custom image built on
<code>scipy-ml-notebook</code> inherits the whole CUDA stack whether or not the course uses
it.</p>
<h3 id="custom-cuda-images">Custom CUDA Images</h3>
<p><code>scipy-ml-notebook</code> already carries CUDA with a matching PyTorch and TensorFlow.
A custom CUDA image is rarely needed. A custom CUDA stack must stay compatible
with the driver on the node.
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a> covers custom
image builds.
<a href="/docs/gpu-access/gpu-hardware.html#cuda-versions">CUDA Versions</a> gives the CUDA
versions PARASOL supports.</p>
<h2 id="image-names-and-tags">Image Names and Tags</h2>
<p>Images are published to the GitHub Container Registry and are named
<code>ghcr.io/ucsd-ets/&lt;image&gt;:&lt;tag&gt;</code>:</p>
<pre class="docs-code"><code class="language-text">ghcr.io/ucsd-ets/datascience-notebook:stable
ghcr.io/ucsd-ets/scipy-ml-notebook:2024.4-stable</code></pre>
<p>The <code>:stable</code> tag follows each update. A dated tag such as <code>:2024.4-stable</code>
does not. A workspace that must not change partway through a term uses the
dated tag. See <a href="#pinning-a-workspace">Pinning a Workspace</a>.</p>
<h3 id="dated-tags">Dated Tags</h3>
<p>A dated tag names the year and the quarter of the build: <code>2024.4-stable</code> is the
Fall 2024 image, and <code>2023.2-stable</code> the Spring 2023 image. The
<a href="https://github.com/ucsd-ets/datahub-docker-stack"><code>datahub-docker-stack</code></a>
repository lists the tags currently published.</p>
<h3 id="legacy-image-names">Legacy Image Names</h3>
<p>The older <code>ucsdets/&lt;image&gt;</code> naming still appears in published articles and in
course repositories. Where a launch command needs a full image name, prefer the
<code>ghcr.io/ucsd-ets/...</code> form.</p>
<p><code>datahub-base-notebook</code>, which some published articles and course repositories
name as a base image, is no longer built or updated. Derive from
<code>datascience-notebook</code> instead.</p>
<h2 id="image-selection-for-a-session">Image Selection for a Session</h2>
<p>The image a session runs depends on how the session is launched.</p>
<h3 id="datahub-sessions">Datahub Sessions</h3>
<p>On Datahub, the workspace determines the image. Its spawn menu offers one or
more configurations, each an image together with CPU, RAM and GPU quantities,
from which students and instructors choose. A course commonly offers a CPU-only
environment for most of the term and a GPU environment for its project.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>
describes workspace settings.</p>
<h3 id="command-line-sessions">Command-Line Sessions</h3>
<p>From the shell, the wrapper script determines the image unless <code>-i</code> overrides
it. Bare <code>launch.sh</code> defaults to <code>ghcr.io/ucsd-ets/scipy-ml-notebook:stable</code>.
<a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a> describes
wrapper scripts and flags.</p>
<h2 id="finding-the-package-list">Finding the Package List</h2>
<p>Package lists change with every image build. The current contents are
published from the image repository:</p>
<ul>
<li>The <a href="https://github.com/ucsd-ets/datahub-docker-stack/wiki/Stable-Tag">Stable Tag wiki page</a>
  lists the maintained images. Each has a manifest linking to its conda and
  system package versions.</li>
<li>The Dockerfile each image was built from is under
  <a href="https://github.com/ucsd-ets/datahub-docker-stack/tree/main/images"><code>datahub-docker-stack/images</code></a>.
  This is also where the CUDA toolkit version in <code>scipy-ml-notebook</code> is
  recorded.</li>
</ul>
<p>For a package or CUDA version that no published image carries, write to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a> covers adding a
package that a standard image lacks.</p>
<h3 id="obsolete-gpu-inventory">Obsolete GPU Inventory</h3>
<p>A <code>cuda.md</code> file in the <code>ucsd-ets/dsc200-notebook</code> repository publishes a table
of GPU models, counts and node names dated Fall 2020. It is not current. Do not
size work from it. GPUs are requested by class label. See
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a>.
<a href="/docs/gpu-access/gpu-hardware.html">GPU Hardware &amp; CUDA</a> gives the specifications of
the cards and slices that can back a class.</p>
<h2 id="image-updates">Image Updates</h2>
<p>ITS generally updates the standard images ahead of Fall quarter, and again as
needed during the academic year. New package versions are added, old ones are
removed, and behavior occasionally changes with them. An assignment validated in
week 2 against one version of a library can fail against the next.</p>
<p>A workspace may pin its image so that an update does not move a class to
different software partway through a term. Members stay on the build the
course tested until a move is requested. A course that needs a fixed environment
for the duration of a term requests a pinned tag rather than relying on
<code>:stable</code>. See <a href="#pinning-a-workspace">Pinning a Workspace</a>.
<a href="/docs/workspaces-and-storage/what-a-workspace-is.html">What a Workspace Is and What It Controls</a>
describes workspace settings.</p>
<h3 id="tag-behavior">Tag Behavior</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Tag form</th>
<th>Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>:stable</code></td>
<td>Follows each update. Always the current build.</td>
</tr>
<tr>
<td>A dated tag, e.g. <code>:2024.4-stable</code></td>
<td>Fixed. That build, until a different one is named.</td>
</tr>
<tr>
<td>A course image branch tag, e.g. <code>:wi24</code></td>
<td>Rebuilt on every push to that branch. Not fixed.</td>
</tr>
<tr>
<td>A course image git tag, e.g. <code>:fa24</code></td>
<td>Fixed at the tagged commit.</td>
</tr>
</tbody>
</table></div>
<h3 id="course-image-branch-tags">Course Image Branch Tags</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A branch tag does not pin an image. The next push overwrites the branch tag,
so an image set to <code>wi24</code> still changes whenever a commit is pushed to <code>wi24</code>.</p></div>
<p>To freeze a course image build, create a git tag and ask that the course use it.
<a href="/docs/environments/building-a-custom-image.html#course-images">Course Images</a> covers course image
branches and tags.</p>
<h2 id="pinning-a-workspace">Pinning a Workspace</h2>
<p>Container tags are a system-side course setting, adjusted by ticket in the same
way as resource limits and disk quotas. ITS staff make the change. Email to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> opens a ticket. To pin a
workspace:</p>
<ol>
<li>Identify the workspace and the exact image and tag it should serve.</li>
<li>Submit a ticket naming both, before instruction begins, during the setup
   window in which assignments are tested and validated.</li>
</ol>
<p><a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>
describes the ticket process.
<a href="/docs/access/when-access-starts-and-ends.html#instructors-tas--course-staff">Instructors, TAs &amp; Course Staff</a>
describes course setup timing.
A pin applied after students have started is possible, but it changes their
environment a second time.</p>
<h3 id="pinning-from-the-command-line">Pinning from the Command Line</h3>
<p>A command-line launch names the image directly, so a fixed tag pins that launch:</p>
<pre class="docs-code"><code class="language-bash">launch.sh -W DSC40_FA26_001 -i ghcr.io/ucsd-ets/datascience-notebook:2024.4-stable</code></pre>
<p>This affects only that account's own launches. It does not change the image the
workspace serves to anyone else, and it does not replace a course pin.</p>
<h3 id="pin-duration-and-security-updates">Pin Duration and Security Updates</h3>
<p>A pinned image stops receiving package updates, including security fixes to the
software inside it. A pin applies for a term, not indefinitely.</p>
<h3 id="platform-maintenance-on-a-pinned-image">Platform Maintenance on a Pinned Image</h3>
<p>A pin fixes the image only. The node, its drivers and the cluster around it
continue to be maintained. For GPU work, the driver on the node is not part of
the image and is not fixed by a pin.</p>
<h3 id="moving-off-a-pin">Moving Off a Pin</h3>
<p>A move to a newer base image requires assignments to be re-validated against
it. Assistance with maintenance following an image update is within
the scope of a 1:1 Consultation. See
<a href="/get-started/instructor-or-ta.html#support--technical-consultation">Support &amp; Technical Consultation</a>.</p>
