---
title: "Datasets"
path: /docs/workspaces-and-storage/datasets.html
description: "Find the shared datasets on the cluster and read them where they are stored, rather than copying them into your home directory."
eyebrow: "Workspaces & Storage"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/workspaces-and-storage/datasets/), preview build of 2026-09-29"
canonicalUrl: /docs/workspaces-and-storage/datasets.html
legacyUrl: https://dsmlp-docs.ucsd.edu/workspaces-and-storage/datasets/
format: html
---
<p class="lead">Find the shared datasets on the cluster and read them where they are stored,
rather than copying them into your home directory. Request staging for a large
dataset that several people need.</p>
<dl class="docs-glance">
<div><dt>Shared locations</dt><dd><code>/datasets</code> and the workspace <code>public/</code> area</dd></div>
<div><dt>Catalog</dt><dd><a href="https://datahub.ucsd.edu/hub/datasets">datahub.ucsd.edu/hub/datasets</a></dd></div>
<div><dt>Request staging</dt><dd><a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></dd></div>
<div><dt>Course distribution</dt><dd>Up to 500 GB as a matter of course</dd></div>
</dl>
<p>Data classification decides whether protected
data can go on the cluster at all, and license terms limit what you can do with
licensed data.</p>
<h2 id="where-shared-data-lives">Where Shared Data Lives</h2>
<p>Shared datasets are stored in one of two locations. The location determines
what a dataset's size counts against.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><h3 id="the-datasets-tree">The <code>/datasets</code> Tree</h3>
<p><code>/datasets</code> is the cluster-wide dataset tree. It is present in the container
and on the login node. It holds common training corpora, including MNIST,
CIFAR-10, Tiny-ImageNet, ImageNet, Caltech256, and ShapeNet, alongside data
staged for particular courses. ITS places data there on request. Data under
<code>/datasets</code> sits outside both the workspace and personal quotas.</p>
<dl class="docs-card-facts"><div><dt>Placed by</dt><dd>ITS, on request</dd></div><div><dt>Quota</dt><dd>Outside both</dd></div></dl></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-folder-open"></span><h3 id="the-workspace-public-area">The Workspace <code>public/</code> Area</h3>
<p><code>public/</code> is the workspace's own shared area and the most common location for
course datasets. The instructor or the course grader account stages data there,
and every member of the workspace can read it.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#the-shared-workspace-area">The Shared Workspace Area</a>
describes the area.</p>
<dl class="docs-card-facts"><div><dt>Staged by</dt><dd>Instructor or grader account</dd></div><div><dt>Readable by</dt><dd>Every workspace member</dd></div></dl></article>
</div>
<h3 id="choice-of-location">Choice of Location</h3>
<p>The instructor chooses which of the two locations a course uses. Data that
several courses use, or that is too large for a workspace, is usually staged
under <code>/datasets</code>. Data specific to one course usually sits in <code>public/</code>.</p>
<h2 id="finding-what-is-available">Finding What Is Available</h2>
<p>The catalog of cluster-wide datasets is published at
<a href="https://datahub.ucsd.edu/hub/datasets">datahub.ucsd.edu/hub/datasets</a>. The
tree itself can be browsed from a running environment or from the login node:</p>
<figure class="docs-command"><figcaption>Browse the tree from an environment or the login node</figcaption><pre class="docs-code"><code class="language-bash">cd /datasets
ls</code></pre></figure>
<p>Course data staged under <code>/datasets</code> is placed in a directory named for the
workspace ID, <code>/datasets/&lt;workspace-id&gt;-public/</code>, and can be located without a
catalog entry.</p>
<h2 id="reading-shared-data-in-place">Reading Shared Data in Place</h2>
<p><strong>Do not copy a shared dataset into a home directory.</strong> Copying a shared dataset is
the fastest way to exhaust a quota, and the copy is no closer to the job than
the original, because the same filesystem is visible from the container and
from the login node. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#common-causes-of-a-full-quota">Common Causes of a Full Quota</a>.</p>
<p>Point code at the shared path instead. A notebook written against a local
machine usually needs one change, to the dataset path, and no other.</p>
<p>Where a run needs a derived subset, store the subset in the home directory, not
the source corpus.</p>
<h2 id="asking-for-a-dataset-to-be-staged">Asking for a Dataset to Be Staged</h2>
<p>Request staging for a large dataset that several people need, rather than
downloading it into each home directory. Email
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> with:</p>
<ul class="docs-checklist">
<li>What the data is</li>
<li>Its approximate size</li>
<li>Who needs to read it</li>
</ul>
<p>Course dataset distribution of <strong>up to 500 GB</strong> is accommodated as a matter of
course. Larger corpora are accepted on a space-available basis.</p>
<p>A dataset may be published cluster-wide or scoped to one course. State which in
the request.</p>
<p>Research datasets are handled by Research IT at
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>Raise confidential or licensed data, and data subject to a data use
agreement, before it is uploaded.
<a href="#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a> describes the
restrictions.</p></div>
<h3 id="small-downloads">Small Downloads</h3>
<p>Small downloads need no request. <code>wget</code> and <code>curl</code> are available on the login
node and in the container. <a href="/docs/workspaces-and-storage/moving-and-sharing-data.html">Moving &amp; Sharing Data</a>
covers larger transfers.</p>
<h2 id="restricted--licensed-datasets">Restricted &amp; Licensed Datasets</h2>
<p>Two separate restrictions apply to datasets.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-lock"></span><p class="docs-card-title"><a href="#p3-and-p4-data">Data classification</a></p><p>Data classification determines
whether data may be placed on the cluster at all.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-file"></span><p class="docs-card-title"><a href="#licensed-and-subscription-data">License terms</a></p><p>License terms govern what may
be done with data the campus has already acquired.</p></article>
</div>
<h3 id="p3-and-p4-data">P3 and P4 Data</h3>
<p>P3 and P4 are protection levels in the University's data classification. P4
data, such as clinical records or export-controlled material, is prohibited on
PARASOL without review or exception, and P3 data may be permitted
after review. See
<a href="/docs/reference/policy.html#data-classification">Data Classification</a>.</p>
<p><strong>Where either level may apply, raise the dataset before any of it reaches the
cluster.</strong></p>
<ul>
<li>For instruction and coursework, email
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</li>
<li>For research, email Research IT at
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>.</li>
</ul>
<h3 id="examples-of-restricted-data">Examples of Restricted Data</h3>
<p>The University's <a href="https://security.ucop.edu/policies/institutional-information-and-it-resource-classification.html">classification
levels</a>
are the authority. ITS documentation gives these examples:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Kind of data</th>
<th>Examples</th>
</tr>
</thead>
<tbody>
<tr>
<td>Government classified or controlled</td>
<td>CUI, CTI, ITAR, FISMA</td>
</tr>
<tr>
<td>Health and personal information</td>
<td>PHI/HIPAA, IRB-controlled data, statutory PII</td>
</tr>
<tr>
<td>Student records</td>
<td>Other students' grades or academic records (FERPA)</td>
</tr>
<tr>
<td>Contractually protected</td>
<td>Information subject to certain Data Use Agreements</td>
</tr>
</tbody>
</table></div>
<p>A TA or grader working with identifiable grades is handling protected data. The
grading tools are built to hold that material. See
<a href="/docs/grading/index.html">Grading</a>.</p>
<h3 id="licensed-and-subscription-data">Licensed and Subscription Data</h3>
<p>Some data on the cluster is licensed rather than open. It was acquired under
terms that limit who may read it and what may be done with the results.
Licensed corpora are staged read-only and released to an authorized group
rather than to all users. The Nielsen subscription datasets held for the
Chicago Booth Kilts Center are an example. They are mounted read-only outside
the general <code>/datasets</code> tree. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a>.</p>
<p>License terms usually impose the following conditions:</p>
<ul>
<li><strong>Read the data in place.</strong> A copy in a home directory is a second copy under the
  same terms, and it consumes quota.</li>
<li><strong>Do not pass the data on.</strong> Access is granted to an individual, not to that
  person's collaborators. Moving the data into a shared or outward-facing
  location is a licensing decision, not a file operation.
  <a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#sharing-with-people-who-have-no-cluster-account">Sharing with People Who Have No Cluster Account</a>
  covers sharing outside the cluster.</li>
<li><strong>Delete derived subsets and intermediate files that are no longer needed.</strong> They
  inherit the terms of their source.</li>
</ul>
<p>Where a course or lab has acquired data under license terms, state so in the
request, so that the data is scoped correctly from the start. See
<a href="#asking-for-a-dataset-to-be-staged">Asking for a Dataset to Be Staged</a>.</p>
<h3 id="publishing-restricted-data-externally">Publishing Restricted Data Externally</h3>
<p>PARASOL is not for publishing restricted data outward. The platform
is not for externally available services or applications except as required for
coursework or projects, and the limit applies in particular to data held under
license terms.
<a href="/docs/reference/policy.html#hosting-externally-available-services">Hosting Externally Available Services</a>
sets out the hosting rule.</p>
<h2 id="dataset-retention-after-a-course">Dataset Retention After a Course</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Large datasets cannot be archived when a course environment is purged.</p></div>
<p>Raise the retention of any corpus that must be kept before the term ends.
<a href="/docs/access/when-access-starts-and-ends.html#archiving-on-request">Archiving on Request</a>
describes archiving.</p>
