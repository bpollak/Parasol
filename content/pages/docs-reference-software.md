---
title: "Software"
path: /docs/reference/software.html
description: "Find out how to run RStudio, MATLAB, and Stata on PARASOL, how licensed software gets installed, and which software you can install yourself."
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/software/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/software.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/software/
format: html
---
<p>Find out how to run RStudio, MATLAB, and Stata on PARASOL, how
licensed software gets installed, and which software you can install yourself.
The standard images cover most courses and projects and receive priority
support. See
<a href="/docs/environments/standard-images.html">Standard Images, Tags, and Pinning</a>.</p>
<h2 id="r-and-rstudio">R and RStudio</h2>
<p>R is included in every standard image, alongside Python and Julia, and runs as a
Jupyter kernel. Entering <code>?command_name</code> in a cell displays the documentation for
a function.</p>
<h3 id="opening-rstudio">Opening RStudio</h3>
<p>RStudio does not require a separate sign-in.</p>
<ol>
<li>Start the course environment that includes RStudio.</li>
<li>Wait for the JupyterLab launcher to load.</li>
<li>Click the RStudio shortcut. RStudio opens in a new tab.</li>
</ol>
<h3 id="personal-r-package-library">Personal R Package Library</h3>
<p>In a new account, <code>install.packages()</code> does not work until a personal package
library exists. Create the library once, in the RStudio Console, during the
first RStudio session:</p>
<pre class="docs-code"><code class="language-r">dir.create("~/R")
dir.create("~/R/library")
.libPaths("~/R/library")</code></pre>
<p>The library is stored in the home directory and counts against its quota. See
<a href="/docs/environments/customizing-your-environment.html#storage-quota">Storage Quota</a>.</p>
<h3 id="rstudio-and-gpus">RStudio and GPUs</h3>
<p><code>rstudio-notebook</code> derives from <code>datascience-notebook</code>, the CPU image, rather
than from <code>scipy-ml-notebook</code>, and is therefore not GPU-enabled. See
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a>.
A course that needs both RStudio and a GPU requires a custom image or a second
environment.</p>
<p>See also: <a href="/docs/reference/getting-help.html">Getting Help</a></p>
<h2 id="matlab-octave--other-complex-applications">MATLAB, Octave &amp; Other Complex Applications</h2>
<p>MATLAB can be used on the platform but is not a standard feature. The ITS scope
of support classes MATLAB, as Jupyter kernels or as the Web UI, and GNU Octave
among the capabilities in
<a href="#complex--experimental-capabilities">Complex &amp; Experimental Capabilities</a>.
These capabilities are regularly used on the platform but fall outside the
normal bounds of ITS support, and their use in a course is led by the instructor
or the Technical Point of Contact (TPOC).</p>
<h3 id="matlab-on-the-research-cluster">MATLAB on the Research Cluster</h3>
<p>On the Research Cluster, Research IT documents running MATLAB from a small shell
script that sets a license-file environment variable. The script exports
<code>MLM_LICENSE_FILE</code>, points to a MATLAB installation held on the cluster, and runs
MATLAB headless: with <code>-nojvm -nodisplay -nosplash</code> for interactive use, and
with <code>-batch</code> for a script.</p>
<p>MATLAB runs inside a job and never on the login node, where running computation
is prohibited. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.
Scripts are made executable with <code>chmod</code> before they are run.</p>
<p>Research IT maintains the MATLAB release, the installation directory, and the
license file. Confirm the current paths with Research IT at
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a> before building a course
around them.</p>
<h2 id="stata">Stata</h2>
<p>Stata runs in the <code>scipy-ml</code> container for users with provisioned licensing.
Research IT Services installs Stata into the member's home directory, and the
member then runs it from inside a container as <code>~/stata-se</code>.</p>
<p>The platform does not provide Stata licenses, and a license is required before
installation. A holder of a Stata license through a department or project
arranges the installation by writing to
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>.</p>
<h2 id="licensed-software">Licensed Software</h2>
<p>Installing licensed software is permitted. Purchasing the license is the
responsibility of the user or the user's sponsoring department. Research IT
Services can assist with the installation. Some versions of some products are
not compatible with a containerized cluster environment.</p>
<p>Before purchasing a license, confirm the following with the relevant contact:</p>
<ul>
<li>whether the product can run unprivileged in a container</li>
<li>whether its license permits that use</li>
<li>whether a network license server is reachable from the cluster</li>
</ul>
<p>For research use, the contact is
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>. For a course, the contact
is <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<p>Licensed data is subject to separate rules. See
<a href="/docs/workspaces-and-storage/datasets.html#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a>.</p>
<h2 id="complex--experimental-capabilities">Complex &amp; Experimental Capabilities</h2>
<p>The ITS scope of support names the following capabilities as available on the
cluster but outside normal support.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Capability</th>
<th>Documentation</th>
</tr>
</thead>
<tbody>
<tr>
<td>MATLAB (Jupyter kernels or Web UI), GNU Octave</td>
<td><a href="#matlab-octave--other-complex-applications">MATLAB, Octave &amp; Other Complex Applications</a></td>
</tr>
<tr>
<td>Spark clusters</td>
<td>ITS publishes no documentation. The only description of a multi-node Spark topology on this platform is a DSC 102 assignment, which is course material rather than documentation.</td>
</tr>
<tr>
<td>ArcGIS integration</td>
<td>ITS publishes no documentation.</td>
</tr>
<tr>
<td>Postgres and other persistent services</td>
<td>Launched from Kubernetes manifests and reached by in-cluster service name. See <a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a>.</td>
</tr>
<tr>
<td>Background batch processing and analysis pipelines</td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a></td>
</tr>
<tr>
<td>Visual Studio Code integration</td>
<td><a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a></td>
</tr>
<tr>
<td>Containers not derived from a standard image, and student-built containers</td>
<td><a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a></td>
</tr>
</tbody>
</table></div>
<h3 id="support-responsibilities">Support Responsibilities</h3>
<p>The complex or experimental classification concerns support, not capability.
These capabilities work, and courses use them. Incorporating one into a course
requires the instructor or TPOC to become independently familiar with the
underlying technology and then to serve as primary support for students' use of
it. ITS gives technical guidance but, without an advance agreement, does not
take on implementation or front-line support. The scope of support is published
in
<a href="/get-started/instructor-or-ta.html#complex-customizations--experimental-features">Complex Customizations &amp; Experimental Features</a>.</p>
<h3 id="feasibility-consultation">Feasibility Consultation</h3>
<p>Book a 1:1 Consultation at least one full quarter before any planned use of one
of these capabilities, to discuss feasibility.
<a href="/get-started/instructor-or-ta.html#support--technical-consultation">Support &amp; Technical Consultation</a>
describes consultations.</p>
<h2 id="adding-software-without-a-ticket">Adding Software Without a Ticket</h2>
<h3 id="home-directory-installations">Home Directory Installations</h3>
<p>A member can install anything that installs into the member's own home
directory: Python packages into a virtual environment with its own Jupyter
kernel, R packages into a personal library, and a custom kernel. The procedures
are in
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a>.</p>
<h3 id="operating-system-packages">Operating System Packages</h3>
<p>Software that installs into the operating system requires a custom image. A
container has no <code>sudo</code> and no flag that grants it, and root is available at
image build time instead, on a different machine. See
<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>.
<a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a>
covers building an image.</p>
<h3 id="package-lists">Package Lists</h3>
<p>Package lists change with every image build. The current contents of
each image are published from the image repository. See
<a href="/docs/environments/standard-images.html#finding-the-package-list">Finding the Package List</a>.</p>
