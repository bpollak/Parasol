---
title: "Moving & Sharing Data"
path: /docs/workspaces-and-storage/moving-and-sharing-data.html
description: "Move files between your computer and the cluster by the route that suits their size and how often you repeat the transfer, and share data with your…"
eyebrow: "Workspaces & Storage"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/workspaces-and-storage/moving-and-sharing-data/), preview build of 2026-09-29"
canonicalUrl: /docs/workspaces-and-storage/moving-and-sharing-data.html
legacyUrl: https://dsmlp-docs.ucsd.edu/workspaces-and-storage/moving-and-sharing-data/
format: html
---
<p class="lead">Move files between your computer and the cluster by the route that suits their
size and how often you repeat the transfer, and share data with your workspace,
your team, or people who have no cluster account. <strong>Copy your work out before
your access ends.</strong></p>
<dl class="docs-glance">
<div><dt>Transfers run through</dt><dd>The login node, <code>dsmlp-login</code></dd></div>
<div><dt>Browser upload limit</dt><dd>200 MB per upload</dd></div>
<div><dt>For most transfers</dt><dd><code>scp</code>, <code>sftp</code>, and <code>rsync</code>; no VPN required</dd></div>
<div><dt>Outside the cluster</dt><dd>Globus Project Guest Collections or rdl-share</dd></div>
</dl>
<h2 id="transfer-routes">Transfer Routes</h2>
<p>Files reach the cluster by one of four routes, chosen by size and by how often
the transfer is repeated.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-folder-open"></span><p class="docs-card-title"><a href="#in-the-browser">The Jupyter file browser</a></p><p>A few small files, transferred once</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-random"></span><p class="docs-card-title"><a href="#git"><code>git</code></a></p><p>Code, and anything that will be changed and re-sent</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-transfer"></span><p class="docs-card-title"><a href="#scp-sftp-and-rsync"><code>scp</code>, <code>sftp</code>, <code>rsync</code></a></p><p>Data of any size, scripted or repeated</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><p class="docs-card-title"><a href="#globus">Globus</a></p><p>Large unattended transfers, and transfers between institutions</p></article>
</div>
<p>Transfers run through the login node, <code>dsmlp-login</code>. Moving files and launching
jobs are its two purposes. See
<a href="/docs/access/the-login-node.html#what-the-login-node-is-for">What the Login Node Is For</a>.</p>
<h2 id="in-the-browser">In the Browser</h2>
<p>The JupyterLab file browser uploads files by drag and drop and downloads them
from the right-click menu. It suits a small number of small files, such as a
notebook and a CSV file.</p>
<ul>
<li>The Datahub load balancer refuses a browser upload
larger than <strong>200 MB</strong>.</li>
<li>Beyond a few dozen files, transfers stall.</li>
<li>An interrupted transfer cannot be resumed.</li>
</ul>
<p>Move a larger file with <code>scp</code> or
<code>sftp</code>. See <a href="#scp-sftp-and-rsync">scp, sftp and rsync</a>.</p>
<div class="alert alert-success docs-callout" role="note"><p class="docs-callout-label"><strong>Tip</strong></p><p>Where many small files
must go through the browser, compress them into a zip archive, upload the
archive, and extract it from a terminal.</p></div>
<h2 id="git">Git</h2>
<p><code>git</code> is installed on the login node and in the standard images. It is the
recommended route for code and notebooks and is poorly suited to large data. A
repository cloned on the login node is already present when the container
starts, because the two share a filesystem.</p>
<figure class="docs-command"><figcaption>Clone a repository</figcaption><pre class="docs-code"><code class="language-bash">git clone https://github.com/&lt;owner&gt;/&lt;repo&gt;.git</code></pre></figure>
<p>A private repository requires a personal access token or an SSH key, as on a
local machine. A clone counts against quota like any other files.</p>
<h2 id="scp-sftp-and-rsync">scp, sftp and rsync</h2>
<p><code>scp</code>, <code>sftp</code>, and <code>rsync</code> run from a terminal on the local machine, not from
the cluster. ITS recommends them for most transfers. On Windows,
<a href="https://winscp.net/">WinSCP</a> provides the same function through a graphical
interface.</p>
<figure class="docs-command"><figcaption>scp, run on your local machine</figcaption><pre class="docs-code"><code class="language-bash">scp /local/path &lt;username&gt;@dsmlp-login.ucsd.edu:~/remote/path            # upload
scp &lt;username&gt;@dsmlp-login.ucsd.edu:~/remote/path /local/path            # download
scp -r &lt;username&gt;@dsmlp-login.ucsd.edu:/directory/to/send /local/where   # directory</code></pre></figure>
<p><code>sftp</code> opens an interactive session, which is easier when the location of the
files is not known in advance. <code>rsync</code> sends only what has changed, which suits
a transfer that will be repeated.</p>
<figure class="docs-command"><figcaption>sftp and rsync, run on your local machine</figcaption><pre class="docs-code"><code class="language-bash">sftp &lt;username&gt;@dsmlp-login.ucsd.edu
rsync -avr &lt;directory&gt; &lt;username&gt;@dsmlp-login.ucsd.edu                   # upload
rsync -avr &lt;username&gt;@dsmlp-login.ucsd.edu:&lt;remote-path&gt; &lt;local-path&gt;    # download</code></pre></figure>
<p>These tools run over <code>ssh</code> and <strong>do not require the VPN</strong>. See
<a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a>.</p>
<h3 id="pod-messages-during-a-transfer">Pod Messages During a Transfer</h3>
<p>Messages about a pod being created and deleted appear around the transfer. They
come from the short-lived container the cluster starts to serve the transfer and
do not indicate an error.</p>
<h2 id="landing-files-in-the-right-directory">Landing Files in the Right Directory</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>On <code>dsmlp-login</code>, <code>~</code> is the personal area, which appears as <code>private/</code> inside
a container. It is not a course home directory. Files sent to <code>~</code> with <code>scp</code> do
not appear where a course notebook expects them, and a copy of the login-node
home does not include the coursework.</p></div>
<p>To transfer to or from a workspace home directory, take its path from the
workspace listing:</p>
<figure class="docs-command"><figcaption>Run on dsmlp-login</figcaption><pre class="docs-code"><code class="language-bash">workspace -l     # prints each workspace and the path to its home directory</code></pre></figure>
<p>Workspace home paths have the form
<code>/dsmlp/workspaces-fs0*/&lt;WORKSPACE&gt;/home/&lt;username&gt;</code>. Team directories use the
same prefix, with <code>/teams</code> in place of <code>/home</code>.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a> describes the
directory layout.</p>
<h2 id="globus">Globus</h2>
<p>Globus suits large unattended transfers and transfers between institutions. The
supported method is to run Globus Connect Personal inside the environment, which
makes the environment an endpoint for transfers in either direction.</p>
<h3 id="globus-connect-personal-setup">Globus Connect Personal Setup</h3>
<p>In a terminal inside the environment, download and unpack the client and run its
setup. The directory the archive unpacks into is named for the version
downloaded.</p>
<figure class="docs-command"><figcaption>Run in a terminal inside the environment</figcaption><pre class="docs-code"><code class="language-bash">wget https://downloads.globus.org/globus-connect-personal/linux/stable/globusconnectpersonal-latest.tgz
tar -xvzf globusconnectpersonal-latest.tgz
./globusconnectpersonal-&lt;version&gt;/globusconnectpersonal -setup</code></pre></figure>
<p>Setup prints a login link. Globus authenticates through CILogon.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Open the login link</span><p>Open the login link and choose <strong>University of California-San Diego</strong>.</p></li>
<li><span class="docs-step-title">Sign in</span><p>Sign in with Active Directory (AD) credentials and Duo.</p></li>
<li><span class="docs-step-title">Paste the auth code</span><p>Allow the setup tool, and paste the returned code at the
   <code>Enter the auth code:</code> prompt.</p></li>
<li><span class="docs-step-title">Name the endpoint</span><p>Enter a recognizable endpoint name when setup asks for one.</p></li>
<li><span class="docs-step-title">Start the endpoint</span><p>Start the endpoint with <code>-start &amp;</code>.</p></li>
<li><span class="docs-step-title">Check the endpoint</span><p>Check the endpoint on the Globus
   <a href="https://app.globus.org/collections?scope=administered-by-me">Collections</a>
   page under <strong>Administered By You</strong>. Green indicates that the endpoint is
   running; red indicates that it is stopped.</p></li>
</ol>
<h3 id="endpoint-availability">Endpoint Availability</h3>
<p><strong>The endpoint runs only while the environment runs.</strong> To restart a stopped (red)
endpoint, log back in, launch the environment, and start the endpoint again.
Adding the start command to <code>.bash_profile</code> starts the endpoint with every
terminal opened in the environment.</p>
<h2 id="downloading-from-the-internet">Downloading from the Internet</h2>
<p><code>wget</code> and <code>curl</code> are available on the login node and in the container. They are
the simplest way to download a public dataset directly onto the cluster. Check
the size of a dataset before downloading it. Where the data is large and more
than one person needs it, request that it be staged once instead of each person
keeping a copy. See
<a href="/docs/workspaces-and-storage/datasets.html#asking-for-a-dataset-to-be-staged">Asking for a Dataset to Be Staged</a>.</p>
<h2 id="retrieving-work-before-access-ends">Retrieving Work Before Access Ends</h2>
<p><strong>Files become unreachable when access ends, not when they are purged.</strong> Copy them
out before access ends. Once the environment no longer appears for a member, the
work in it can be retrieved only by request to ITS. See
<a href="/docs/access/when-access-starts-and-ends.html#effects-of-the-end-of-access">Effects of the End of Access</a>.</p>
<ol class="docs-flow" aria-label="From open access to purge">
<li><span class="docs-flow-label">Access open</span><strong>Copy your work out</strong><p>An <code>ssh</code> connection to the login node is enough.</p></li>
<li><span class="docs-flow-label">Access ends</span><strong>The environment no longer appears</strong><p>Work can be retrieved only by request to ITS.</p></li>
<li><span class="docs-flow-label">Until purge</span><strong>ITS may still recover it</strong><p>A request made earlier is more likely to be granted.</p></li>
</ol>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Student home directories are not archived. Archiving covers instructor and
course-wide files, on request. Copy out anything a student needs to keep before
access ends.</p></div>
<h3 id="directories-to-copy">Directories to Copy</h3>
<ul class="docs-checklist">
<li>The course home directory: notebooks, code, results, and figures. No copy of
  it is kept anywhere else.</li>
<li><code>teams/</code>, when a project's shared work is kept there.</li>
</ul>
<p><code>private/</code> follows a member between workspaces and is kept after a course's
access ends, until the account itself is removed. Copy it out before the
account is removed. See
<a href="/docs/access/when-access-starts-and-ends.html#the-personal-area-after-a-course">The Personal Area After a Course</a>.</p>
<p><code>public/</code> usually holds the instructor's course material rather than a member's
own work. Re-obtain large shared datasets from their source rather than copying
them to a laptop.</p>
<p>A running container is not required. The container and the login node share a
filesystem, so an <code>ssh</code> connection to the login node is enough to collect every
directory.</p>
<h3 id="recovery-after-access-ends">Recovery After Access Ends</h3>
<p>Work that is out of reach after access ends is not necessarily lost. <strong>Contact ITS
before treating it as lost.</strong> Until the environment is purged, ITS can:</p>
<ul>
<li>Revive an archived class</li>
<li>Make an archive available for download</li>
<li>Reactivate an individual account at an instructor's request to resolve an
Incomplete, an academic integrity matter, or a hand-off</li>
</ul>
<p>A request made earlier is more likely to be granted.</p>
<h2 id="inside-the-workspace">Inside the Workspace</h2>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-folder-open"></span><p class="docs-card-title"><code>public/</code></p><p>The <code>public/</code> directory is the sanctioned way to share files with a whole
workspace. Every member can read everything in it. In a course, the shared
grader account holds write permission and stages the material. In other
workspaces, the person the workspace was set up around holds write permission.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#the-shared-workspace-area">The Shared Workspace Area</a>
describes the directory.</p>
<dl class="docs-card-facts"><div><dt>Shares with</dt><dd>The whole workspace</dd></div></dl></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-user"></span><p class="docs-card-title"><code>teams/</code></p><p><code>teams/</code> shares files with one group within the workspace instead of the whole
workspace, such as a capstone group, a project team, or a group within a lab.</p>
<dl class="docs-card-facts"><div><dt>Shares with</dt><dd>One group</dd></div></dl></article>
</div>
<h3 id="unreadable-files-in-public">Unreadable Files in <code>public/</code></h3>
<p>Files staged into <code>public/</code> can arrive unreadable, because they keep the
permissions they had at their source. To repair them, run the following as the
account that owns the directory:</p>
<figure class="docs-command"><figcaption>Run as the account that owns the directory</figcaption><pre class="docs-code"><code class="language-bash">chmod -R u+rwX,go+rXs,go-w ~/public</code></pre></figure>
<p>The command removes write permission for everyone other than the owner and adds
the execute bit on directories so that they can be entered. Other permission
changes are made by the Service Desk on request. See
<a href="#ownership-and-permission-changes">Ownership and Permission Changes</a>.</p>
<h2 id="teams-and-canvas-groups">Teams and Canvas Groups</h2>
<p>Course teams are created from Canvas group sets. An instructor either:</p>
<ul>
<li>Creates a self-sign-up group set for students to join, or</li>
<li>Creates the groups and assigns students to them.</li>
</ul>
<p>Changes are not immediate; <strong>they reach the cluster within a few
hours</strong>.</p>
<p>Canvas places only students in groups, so an instructor or TA cannot be added as
a member. Course staff join a group through the course's grader account, which is
enrolled as a student and joins groups in the same way.</p>
<div class="alert alert-info docs-callout" role="note"><p class="docs-callout-label"><strong>Note</strong></p><p>Multiple group sets in one Canvas course may not work correctly. Use one group
set per course.</p></div>
<p>Group storage is provisioned separately from personal storage. Additional space
is requested from ITS. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#asking-for-more-space">Asking for More Space</a>.</p>
<h3 id="team-data-on-the-command-line">Team Data on the Command Line</h3>
<p>From the command line, the team's data is requested at launch:</p>
<figure class="docs-command"><figcaption>List your teams, then launch with one</figcaption><pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -G list      # the teams the account belongs to
launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -G &lt;teamid&gt;  # launch with that team's data</code></pre></figure>
<h2 id="ownership-and-permission-changes">Ownership and Permission Changes</h2>
<p>The Service Desk adjusts file ownership and permissions on request, alongside
resource limits and disk quotas. See
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>.
Submit a ticket when files are owned by the wrong account or are unreadable by
the people who need them.</p>
<h2 id="sharing-with-people-who-have-no-cluster-account">Sharing with People Who Have No Cluster Account</h2>
<p>Two services deliver data to people outside the cluster:</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span><p class="docs-card-title"><a href="#globus-project-guest-collections">Globus Project Guest Collections</a></p><p>For sharing with collaborators and for publication</p>
<dl class="docs-card-facts"><div><dt>Allocation</dt><dd>Starts at 500 GB</dd></div></dl></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-send"></span><p class="docs-card-title"><a href="#one-off-transfers-with-rdl-share">rdl-share</a></p><p>For one-off transfers</p>
<dl class="docs-card-facts"><div><dt>Per message</dt><dd>Up to 500 GB</dd></div></dl></article>
</div>
<h3 id="globus-project-guest-collections">Globus Project Guest Collections</h3>
<p>A <strong>Globus Project Guest Collection</strong> is the campus mechanism for sharing
research data with named collaborators, at UC San Diego or elsewhere, and for
publishing it openly. A PI requests one from Research IT with a short
description of the project and its intended use. The PI is the collection's
Access Manager and may delegate that role.</p>
<p>A collection shares a directory and everything below it. The directory may be
shared with any of the following:</p>
<ul>
<li>One named person, by institutional identity or email address</li>
<li>A Globus group created for the purpose</li>
<li>Every user logged in to Globus</li>
<li>The public, anonymously and with no login</li>
</ul>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Aspect</th>
<th>Rule</th>
</tr>
</thead>
<tbody>
<tr>
<td>Permission scope</td>
<td>Permissions are set on directories, not on files. Child directories inherit from their parent.</td>
</tr>
<tr>
<td>Access levels</td>
<td>Read, or read and write. Write access includes delete.</td>
</tr>
<tr>
<td>Public data</td>
<td>Anything shared publicly belongs in a directory named to indicate that it is public, with write access to it kept narrow.</td>
</tr>
<tr>
<td>HTTPS links</td>
<td>Files can also be distributed over HTTPS, as links of the form <code>https://&lt;collectionid&gt;.data.globus.org/&lt;path&gt;</code> that can be embedded elsewhere.</td>
</tr>
<tr>
<td>Allocation</td>
<td>Allocations run one year at a time, start at 500 GB, and can be expanded somewhat. They are reviewed for renewal, with priority to collections in active use.</td>
</tr>
<tr>
<td>Ownership</td>
<td>A collection cannot change owner. When a project passes to a new PI, a new collection is created and permissions are reassigned.</td>
</tr>
</tbody>
</table></div>
<h3 id="one-off-transfers-with-rdl-share">One-Off Transfers with rdl-share</h3>
<p>For a one-off transfer to a person, the Library's
<a href="https://rdl-share.ucsd.edu">rdl-share</a> service carries up to 500 GB per
message, with no limit on the number of messages. It encrypts data in transit
and can request files from a person as well as send them. It refuses executable
file types.</p>
<h2 id="hosting-and-data-classification-restrictions">Hosting and Data Classification Restrictions</h2>
<p><strong>PARASOL is not a hosting platform.</strong> It should not be used to run
externally available services or applications except as required for coursework
or projects. Sharing data is supported; running a public service is not.</p>
<p><strong>Sharing data requires a classification decision before any technical step.</strong>
Licensed data, protected data, and data under a data use agreement do not become
shareable by being copied into a shared directory.
<a href="/docs/workspaces-and-storage/datasets.html#restricted--licensed-datasets">Restricted &amp; Licensed Datasets</a>
describes these categories.</p>
