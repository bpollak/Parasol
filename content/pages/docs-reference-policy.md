---
title: "Policy"
path: /docs/reference/policy.html
description: "Check the conditions for using PARASOL before you put data on the platform, host a service that people outside it can reach, or set a deadline that could…"
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/policy/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/policy.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/policy/
format: html
---
<p class="lead">Check the conditions for using PARASOL before you put data on the
platform, host a service that people outside it can reach, or set a deadline
that could fall in a maintenance window.</p>
<dl class="docs-glance">
<div><dt>P4 data</dt><dd>Prohibited, with no review path and no exception</dd></div>
<div><dt>P3 data</dt><dd>May be permitted after review</dd></div>
<div><dt>Login node</dt><dd>Running computation on it is prohibited</dd></div>
<div><dt>Instructional maintenance</dt><dd>Tuesdays, 6-8 AM</dd></div>
</dl>
<h2 id="data-classification">Data Classification</h2>
<p>P3 and P4 are University
<a href="https://security.ucop.edu/policies/institutional-information-and-it-resource-classification.html">classification levels</a>.
The University's classification is the authority on which level applies to a
dataset.</p>
<h3 id="p4-data">P4 Data</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>P4 data is prohibited</strong></p><p>P4 data is prohibited. Highly sensitive information, such as clinical records or
export-controlled material, must not be placed on PARASOL. There is no
review path and no exception.</p></div>
<h3 id="p3-data">P3 Data</h3>
<p>P3 data may be permitted after review. Legally or contractually protected
information is not categorically excluded, but it must be raised with the
contacts in
<a href="#contacts-for-classification-questions">Contacts for Classification Questions</a>
before any of it reaches the cluster.</p>
<p>Depending on the nature of the data, vetting may take <strong>4-6 weeks or longer</strong>.</p>
<h3 id="examples-by-kind-of-data">Examples by Kind of Data</h3>
<p>ITS documentation gives these examples:</p>
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
<h3 id="contacts-for-classification-questions">Contacts for Classification Questions</h3>
<ul>
<li>For instruction and coursework, email
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</li>
<li>For research, email Research IT at
<a href="mailto:rcd-support@ucsd.edu">rcd-support@ucsd.edu</a>.</li>
</ul>
<p>See
<a href="/docs/workspaces-and-storage/datasets.html#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a>.
<a href="/docs/reference/getting-help.html">Getting Help</a> lists other support routes.</p>
<h2 id="appropriate-use">Appropriate Use</h2>
<h3 id="it-acceptable-use-policy">IT Acceptable Use Policy</h3>
<p>The campus-wide
<a href="https://adminrecords.ucsd.edu/ppm/docs/135-9.html">IT Acceptable Use Policy</a>
applies to PARASOL as it does to any campus IT resource, including its
prohibitions on commercial or political activity, hacking or cyberstalking, and
other types of unwelcome behavior. The platform's academic purpose does not
relax it.</p>
<h3 id="individual-access-and-sharing">Individual Access and Sharing</h3>
<p>Access is granted to an individual, not to that individual's collaborators. An
account, its home directory, and any dataset granted with it are for the account
holder's own use and are not passed on. The workspace's <code>public/</code> and <code>teams/</code>
areas are the sanctioned route for sharing. See
<a href="/docs/workspaces-and-storage/moving-and-sharing-data.html#inside-the-workspace">Inside the Workspace</a>.</p>
<h2 id="hosting-externally-available-services">Hosting Externally Available Services</h2>
<p>PARASOL should not be used to host externally available services or
applications, except as required for coursework or projects.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-ok-circle"></span><p class="docs-card-title">In scope</p><p>A class demo, a
project web application, or a service an assignment requires is in scope.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-ban-circle"></span><p class="docs-card-title">Out of scope</p><p>A
production service, a persistent public endpoint, or anything whose outage
someone outside the University would notice is out of scope.</p></article>
</div>
<p><a href="/docs/access/the-login-node.html#reaching-a-notebook-or-a-service">Reaching a Notebook or a Service</a>
describes access to a service running in a container.</p>
<h3 id="availability-and-reliability">Availability and Reliability</h3>
<p>A compute node can be drained for patching, a pod can be preempted, and a
session has a deadline. These conditions apply primarily to the compute nodes
that execute user jobs.</p>
<p>Critical components such as networking, file storage,
and backups are maintained to Enterprise IT standards.</p>
<h2 id="use-of-shared-resources">Use of Shared Resources</h2>
<p>The practices in this section are requests rather than rules, with the exception
of the prohibition in
<a href="#computation-on-the-login-node">Computation on the Login Node</a>.</p>
<h3 id="stopping-unused-sessions">Stopping Unused Sessions</h3>
<p>Sessions that are not in use are expected to be stopped. GPU cards are assigned
to containers exclusively, and a card attached to an idle session is unusable by
any other user.</p>
<p>Logging out, closing the tab, or closing a laptop leaves a
session running; stop it with <strong>File → Hub Control Panel → Stop My Server</strong>, or
delete the pod from the login node. See
<a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a>.</p>
<p>Idle culling is not a substitute for stopping a session. On a quiet cluster, the
delay before it acts is measured in hours.
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>
describes the idle criteria.</p>
<h3 id="debugging-on-cpu">Debugging on CPU</h3>
<p>Code is expected to be debugged on CPU before a GPU is requested. PyTorch and
TensorFlow both switch easily between CPU and GPU. <a href="/docs/access/index.html">Access</a>
describes the ways to start a session.</p>
<h3 id="sizing-resource-requests">Sizing Resource Requests</h3>
<p>Requests are expected to name the smallest resources that work: the smallest GPU
class a model fits in, the memory a job needs rather than the maximum permitted,
and the hours the job actually takes. A larger GPU class is not faster for a
model that already fits in a smaller one.
<a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a> describes the classes.</p>
<h3 id="computation-on-the-login-node">Computation on the Login Node</h3>
<p>Running computation on the login node, such as a training script, a build, or a
long analysis, is prohibited; the login node is for launching jobs and moving
files. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.</p>
<h3 id="personal-copies-of-shared-datasets">Personal Copies of Shared Datasets</h3>
<p>A shared dataset is expected to be read where it lives rather than copied. A
per-student copy of a large corpus exhausts a home quota.
<a href="/docs/workspaces-and-storage/datasets.html">Datasets</a> describes shared datasets.</p>
<h3 id="canceling-unused-bookings">Canceling Unused Bookings</h3>
<p>A booking that will not be used is expected to be canceled. Canceling at least
24 hours ahead costs nothing, and the capacity returns to the pool.
<a href="/docs/gpu-access/service-units-and-budgets.html#the-cancellation-penalty">The Cancellation Penalty</a>
describes penalties.</p>
<h3 id="peak-gpu-demand">Peak GPU Demand</h3>
<p>Demand for GPUs may exceed capacity at peak hours during 10th and Finals Weeks,
or at assignment deadlines. Work shifted to a daytime or off-peak hour costs
less. See
<a href="/docs/gpu-access/service-units-and-budgets.html#peak--off-peak-hours">Peak &amp; Off-Peak Hours</a>.</p>
<h2 id="self-supporting-programs">Self-Supporting Programs</h2>
<p><a href="https://blink.ucsd.edu/instructors/academic-info/majors/selfsupport-codes.html">Self-supporting programs</a>
such as MAS and MBA may use PARASOL for coursework or projects.
<a href="https://www.ucop.edu/institutional-research-academic-planning/content-analysis/academic-planning/self-supporting-programs.html">UC policy</a>
requires ITS to recover the associated direct and indirect costs. To discuss
cost recovery, email <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<p><a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
sets out charges for storage.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#mounting-external-storage">Mounting External Storage</a></p>
<h2 id="scheduled-maintenance">Scheduled Maintenance</h2>
<h3 id="instructional-maintenance">Instructional Maintenance</h3>
<p>Maintenance on the instructional side runs <strong>Tuesdays, 6-8 AM</strong>. The work is usually
limited to a subset of worker nodes, in which case running jobs are unaffected.
Do not plan a deadline within this window.</p>
<p>Infrequent 'Critical' updates may
require downtime outside the window; ITS notifies instructors of such downtime
as soon as is practical.</p>
<h3 id="research-cluster-maintenance">Research Cluster Maintenance</h3>
<p>The Research Cluster maintenance window is quarterly, at the break between
terms, with about 7 days' notice. <strong>All running jobs are terminated.</strong>
<a href="/docs/gpu-access/what-ends-a-session.html#maintenance-closures">Maintenance Closures</a>
describes the effect on sessions.</p>
