---
title: "Building & Publishing a Custom Image"
path: /docs/environments/building-a-custom-image.html
description: "Build and publish a custom container image when a standard image cannot meet a course's needs, such as an operating-system package that needs root."
eyebrow: "Environments"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/environments/building-a-custom-image/), preview build of 2026-09-29"
canonicalUrl: /docs/environments/building-a-custom-image.html
legacyUrl: https://dsmlp-docs.ucsd.edu/environments/building-a-custom-image/
format: html
---
<p class="lead">A course builds a <strong>custom image</strong> when a standard image does not meet its needs,
most often because the course requires an operating-system package that cannot
be installed from inside a running container
(<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>).
A Python or R package for personal use does not require a custom image. See
<a href="/docs/environments/customizing-your-environment.html">Customizing an Environment</a>.</p>
<dl class="docs-glance">
<div><dt>Derive from</dt><dd>A standard image; <code>datascience-notebook</code> is the smallest</dd></div>
<div><dt>Publish to</dt><dd>The GitHub Container Registry, with GitHub Actions</dd></div>
<div><dt>Visibility</dt><dd>The published image must be public</dd></div>
<div><dt>Image size</dt><dd>Unwieldy above about 15 GB; hard limit 30 GB</dd></div>
</dl>
<ol class="docs-flow" aria-label="From base image to a tested course image">
<li><span class="docs-flow-label">Base</span><strong>Choose a standard image</strong><p>A derived image inherits a working Jupyter installation.</p></li>
<li><span class="docs-flow-label">Write</span><strong>Write the Dockerfile</strong><p>Root is available only under <code>USER root</code>.</p></li>
<li><span class="docs-flow-label">Publish</span><strong>Build with GitHub Actions</strong><p>Each push builds the image and tags it with the branch name.</p></li>
<li><span class="docs-flow-label">Test</span><strong>Test on PARASOL, then Datahub</strong><p>Launch from the login node, then from the spawn page students use.</p></li>
</ol>
<h2 id="choosing-a-base-image">Choosing a Base Image</h2>
<p><strong>Derive a custom image from a standard image.</strong> A derived image inherits a working
Jupyter installation, a working kernel set, and the platform's conventions.
<a href="/docs/environments/standard-images.html#standard-images">Standard Images</a> lists the contents of each
standard image.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-stats"></span><p class="docs-card-title">Start from <code>datascience-notebook</code></p><p>The custom image needs neither CUDA nor RStudio. This base is the smallest standard image and the fastest to build, with the standard Python, R, and Julia analysis stack.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-flash"></span><p class="docs-card-title">Start from <code>scipy-ml-notebook</code></p><p>The custom image needs CUDA, TensorFlow, or PyTorch.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-blackboard"></span><p class="docs-card-title">Start from <code>rstudio-notebook</code></p><p>The custom image needs RStudio. This base is not GPU-enabled (<a href="/docs/environments/standard-images.html#rstudio-and-gpu-support">RStudio and GPU Support</a>).</p></article>
</div>
<h3 id="base-image-and-build-time">Base Image and Build Time</h3>
<p>Where build time matters, derive from <code>datascience-notebook</code> rather than
<code>scipy-ml-notebook</code>. An image built on <code>scipy-ml-notebook</code> inherits the entire
CUDA stack, which adds to the time of every build during development. See
<a href="/docs/environments/standard-images.html#image-inheritance">Image Inheritance</a>.</p>
<h3 id="custom-cuda-toolkits">Custom CUDA Toolkits</h3>
<p><code>scipy-ml-notebook</code> already carries a CUDA toolkit with a matching PyTorch and
TensorFlow. A custom CUDA toolkit must be kept compatible with the driver on the
node indefinitely.</p>
<p>The <code>scipy-ml-notebook</code> Dockerfile records the toolkit
version that image carries, and
<a href="/docs/gpu-access/gpu-hardware.html#cuda-versions">CUDA Versions</a> gives the versions
PARASOL supports.</p>
<h3 id="experimental-images">Experimental Images</h3>
<p>An image not derived from a standard image is an experimental case, as is a
student-built container of any derivation. Such images run on the platform, but
they require substantially more of the builder's time and are outside the
standard support tier.</p>
<p>Contact ITS through
<a href="/docs/reference/getting-help.html">Getting Help</a> <strong>at least a quarter in advance</strong>.</p>
<h2 id="the-dockerfile">The Dockerfile</h2>
<p>The example repository contains an annotated Dockerfile that serves as the
model for a custom image:</p>
<figure class="docs-command"><figcaption>Dockerfile from the example repository</figcaption><pre class="docs-code"><code class="language-dockerfile">ARG BASE_CONTAINER=ghcr.io/ucsd-ets/datascience-notebook:stable
FROM $BASE_CONTAINER

# become root to install system packages
USER root

# the base image ships without apt package lists, so update them in the same step
RUN apt-get update &amp;&amp; \
    apt-get -y install htop &amp;&amp; \
    rm -rf /var/lib/apt/lists/*

# drop back to the notebook user for everything else
USER jovyan

RUN pip install --no-cache-dir networkx scipy</code></pre></figure>
<h3 id="root-access-during-the-build">Root Access During the Build</h3>
<p>Root is available only under <code>USER root</code> in the Dockerfile. Switch back to the
notebook user after the root steps, as the example does with <code>USER jovyan</code>.</p>
<p>A container started from the image runs as the member who launched it, not as
root
(<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>).</p>
<h3 id="system-packages">System Packages</h3>
<p>Install system packages with <code>apt-get</code> under <code>USER root</code>, in a <code>RUN</code> step that:</p>
<ul class="docs-checklist">
<li>Starts with <code>apt-get update</code>, before <code>apt-get install</code>. The standard images
ship without apt package lists, so <code>apt-get install</code> alone fails with
<code>E: Unable to locate package</code> for any package not already installed.</li>
<li>Ends by removing <code>/var/lib/apt/lists/*</code>, which keeps the lists out of the image.</li>
</ul>
<h3 id="python-packages">Python Packages</h3>
<p><strong>Prefer <code>pip</code> to <code>conda</code>.</strong> pip resolves dependency conflicts more leniently and is
substantially faster. Where a conda package is unavoidable, install conda
packages first and pip packages after them.</p>
<p>To install a list of packages from a
file, use <code>pip install --no-cache-dir -r requirements.txt</code>.</p>
<h3 id="r-packages">R Packages</h3>
<p><strong>Prefer <code>install.packages()</code> to conda for R packages.</strong> Conda packages increase
build time sharply. For a package not on CRAN, fall back to
<code>conda install -c conda-forge ...</code>.</p>
<h3 id="image-size-and-install-time">Image Size and Install Time</h3>
<p>Each <code>RUN</code> step becomes a layer. Concatenate <code>RUN</code> steps to keep the image
small. If a conda install takes an unreasonable amount of time, <code>mamba</code> performs
the same installation faster.</p>
<p>An image larger than about 15 GB becomes unwieldy to pull and run. <strong>The hard
limit is 30 GB.</strong></p>
<h3 id="additional-kernels">Additional Kernels</h3>
<p>To offer a second environment as its own notebook kernel, create it as a conda
environment and expose it with <code>nb_conda_kernels</code>.</p>
<h2 id="building--publishing">Building &amp; Publishing</h2>
<p>Publish the image to the GitHub Container Registry with GitHub Actions. The
workflow in the example repository, <code>.github/workflows/docker.yml</code>, builds the
image on each push and tags it with the branch name. A push to <code>main</code> produces
<code>...:main</code>.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Push the changes</span><p>Commit the changes and push them.</p></li>
<li><span class="docs-step-title">Follow the workflow run</span><p>Follow the workflow run under the repository's <strong>Actions</strong> tab.</p></li>
<li><span class="docs-step-title">Find the image</span><p>After a successful run, find the image under <strong>Packages</strong>.</p></li>
</ol>
<h3 id="public-images">Public Images</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>The image must be public</strong></p><p>The published image must be public. ITS does not manage credentials for
pulling a private custom image.</p></div>
<p>Publishing from a public GitHub repository is
the simplest way to get a public image, but the repository itself does not have
to be public if the image is.</p>
<h3 id="local-builds">Local Builds</h3>
<p>Where possible, also build the image locally. A local build and shell give a far
shorter debugging cycle than waiting for a hosted build:</p>
<figure class="docs-command"><figcaption>Build locally, then open a shell in the image</figcaption><pre class="docs-code"><code class="language-bash">docker build -t &lt;image-fullname&gt; .
docker run --rm -it &lt;image-fullname&gt; /bin/bash</code></pre></figure>
<h3 id="failed-builds">Failed Builds</h3>
<p>Debug a failed build from the last step Docker completed. The build output
prints an intermediate image ID after each successful step. A shell in that
image shows the state the failing command started from.</p>
<p>Two mistakes account for most build failures:</p>
<ul>
<li>An install command without <code>-y</code>, which waits indefinitely at a prompt.</li>
<li>Windows CRLF line endings in a file the build reads. <code>dos2unix</code> corrects the
  line endings.</li>
</ul>
<p><code>E: Unable to locate package</code> appears when the <code>RUN</code> step does not start with
<code>apt-get update</code>, and when the package name is wrong. See
<a href="#system-packages">System Packages</a>.</p>
<h2 id="course-images">Course Images</h2>
<p>ITS configures the repository and build process for a course image.</p>
<h3 id="requesting-a-course-image">Requesting a Course Image</h3>
<p>Request a course image in the Specialized Instructional Computing Course Request
form, or by updating the course's support ticket. Include:</p>
<ul class="docs-checklist">
<li>The packages to be added</li>
<li>The email addresses of everyone who should be able to maintain the repository</li>
</ul>
<p>See <a href="/get-started/instructor-or-ta.html#requesting-a-course">Requesting a Course</a>.</p>
<h3 id="branches-and-docker-tags">Branches and Docker Tags</h3>
<p>Branches correspond to Docker tags. A push to a <code>wi24</code> branch updates
<code>{image}:wi24</code>. Updating to a newer base image is a one-line change:</p>
<figure class="docs-command"><figcaption>The base image line in the Dockerfile</figcaption><pre class="docs-code"><code class="language-dockerfile">FROM ghcr.io/ucsd-ets/datascience-notebook:2024.4-stable</code></pre></figure>
<h3 id="development-branches">Development Branches</h3>
<ol class="docs-steps">
<li><span class="docs-step-title">Commit to a development branch</span><p>Create a <code>dev</code> or <code>test</code> branch and commit to it. The build publishes the
branch's tag, such as <code>{image}:test</code>.</p></li>
<li><span class="docs-step-title">Test the branch image</span><p>See
<a href="#testing-a-custom-image-on-dsmlp">Testing a Custom Image on PARASOL</a>.</p></li>
<li><span class="docs-step-title">Open a pull request</span><p>When the image works, open a pull request into the branch the course uses.</p></li>
<li><span class="docs-step-title">Have it reviewed</span><p>Have a team member review the pull request.</p></li>
<li><span class="docs-step-title">Merge</span><p>Merge the pull request. The merge rebuilds the production tag.</p></li>
</ol>
<h3 id="preserving-a-build-with-a-git-tag">Preserving a Build with a Git Tag</h3>
<p>A branch tag is overwritten on every push. A git tag such as <code>fa24</code> freezes that
build, and the course can then be pointed at it. See
<a href="/docs/environments/standard-images.html#pinning-a-workspace">Pinning a Workspace</a>.</p>
<h3 id="instructor-and-its-responsibilities">Instructor and ITS Responsibilities</h3>
<p>For course-specific customization, the instructor or a designated Technical
Point of Contact leads installation, configuration, and student use. ITS staff
support this work through 1:1 Consultation rather than by building the image.
See
<a href="/get-started/instructor-or-ta.html#support--technical-consultation">Support &amp; Technical Consultation</a>.</p>
<h2 id="testing-a-custom-image-on-dsmlp">Testing a Custom Image on PARASOL</h2>
<p>From the login node, launch the custom image into the course workspace:</p>
<figure class="docs-command"><figcaption>Run on the login node</figcaption><pre class="docs-code"><code class="language-bash">launch.sh -i &lt;image&gt;:&lt;tag&gt; -P Always -W &lt;workspace-id&gt;</code></pre></figure>
<p>Take the workspace ID from <code>workspace --list</code> rather than constructing it
(<a href="/docs/workspaces-and-storage/what-a-workspace-is.html#listing-workspace-ids">Listing Workspace IDs</a>).</p>
<p>The launch prints a URL. Open it and exercise the features the course depends
on. When a launch times out or fails, <code>kubectl logs &lt;pod-name&gt;</code> is the first
place to look
(<a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a>).</p>
<h3 id="forcing-a-fresh-pull">Forcing a Fresh Pull</h3>
<p><code>-P Always</code> forces a fresh pull. Without it, the node may run a cached copy of
an older build. <strong>Remove the flag once development is finished.</strong></p>
<p><code>-P</code> takes
<code>Always</code>, <code>IfNotPresent</code>, or <code>Never</code>, spelled exactly so. See
<a href="/docs/running-jobs/launch-sh-reference.html#image-pull-policy">Image Pull Policy</a>.</p>
<h3 id="first-pull-and-node-reuse">First Pull and Node Reuse</h3>
<p>A large image must be downloaded to the node a session is placed on before
anything in the session starts, so the first launch on a node is slow. A second
launch on the same node does not download the image again.</p>
<p>While iterating,
reuse one node with <code>-n</code> and a bare node number, for example <code>-n 30</code>, in a
session launched without a booking. Do not pin a node for a session that runs
under a booking; see <a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</p>
<p>GitHub often throttles the first download of a new image into the UCSD image
cache. If a launch reports an error pulling the image, try again in an hour or
two.</p>
<h3 id="pulling-a-large-image-ahead-of-a-session">Pulling a Large Image Ahead of a Session</h3>
<p>A Datahub session or an interactive launch can time out while a large image is
still downloading. A batch job that only runs <code>sleep 10</code> lets the download
finish without either timeout. <code>-B</code> queues the job and returns without waiting
for it:</p>
<figure class="docs-command"><figcaption>A batch job that only pulls the image</figcaption><pre class="docs-code"><code class="language-bash">launch.sh -i &lt;image&gt;:&lt;tag&gt; -W &lt;workspace-id&gt; -B -- sleep 10</code></pre></figure>
<p>The pull has finished when <code>kubectl get pods</code> shows the job as <code>Completed</code>. The
pull also fills the UCSD image cache, so a session placed on any node then
downloads the image from campus rather than from GitHub. That download is
faster but not instant. Then launch the session as usual.</p>
<h3 id="replacing-the-notebook-server-with-a-shell">Replacing the Notebook Server with a Shell</h3>
<p>A final <code>CMD ["/bin/bash"]</code> in the Dockerfile suppresses the notebook server
and starts a plain shell instead. A service in the pod is still reachable with
<code>kubectl port-forward pods/&lt;POD_NAME&gt; &lt;PORT&gt;:8888</code>. See
<a href="/docs/access/the-login-node.html#reaching-a-notebook-or-a-service">Reaching a Notebook or a Service</a>.</p>
<h3 id="final-test-from-datahub">Final Test from Datahub</h3>
<p>After the production tag is rebuilt, test the image once more from the
<strong>Launch your Environment</strong> spawn page on Datahub, which is the route students
use.</p>
