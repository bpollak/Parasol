---
title: "The Login Node"
path: /docs/access/the-login-node.html
description: "dsmlp-login.ucsd.edu is a login node for launching jobs and transferring files. Running computation on it is prohibited."
eyebrow: "Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/access/the-login-node/), preview build of 2026-09-29"
canonicalUrl: /docs/access/the-login-node.html
legacyUrl: https://dsmlp-docs.ucsd.edu/access/the-login-node/
format: html
---
<p><code>dsmlp-login.ucsd.edu</code> is a login node for launching jobs and transferring
files. Running computation on it is prohibited.</p>
<h2 id="connecting-over-ssh">Connecting over SSH</h2>
<p>Launching containers, requesting GPUs, running jobs that outlive a connection,
and attaching an editor all begin with an SSH connection to the login node:</p>
<pre class="docs-code"><code class="language-bash">ssh &lt;username&gt;@dsmlp-login.ucsd.edu</code></pre>
<p>The username is the Active Directory (AD) username, which is the part of the
address before <code>@ucsd.edu</code>. The full address is not accepted. The password is
the AD password.</p>
<h3 id="duo-authentication">Duo Authentication</h3>
<p>Duo follows the password and is challenged once every 8 hours. A second
connection within that window does not prompt again.</p>
<p>The challenge arrives as a Duo push. Where a push cannot be approved and a
passcode is needed instead, write to <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>
for a workaround.</p>
<h3 id="vpn-requirement">VPN Requirement</h3>
<p>The VPN is not required for SSH to the login node. <code>ssh</code> to
<code>dsmlp-login.ucsd.edu</code> works from anywhere, on or off campus. An SSH tunnel or
the VPN is needed only to reach a port inside a container, such as a Jupyter
server started by a launch script.</p>
<p>See also: <a href="#reaching-a-notebook-or-a-service">Reaching a Notebook or a Service</a></p>
<h2 id="what-the-login-node-is-for">What the Login Node Is For</h2>
<p><code>dsmlp-login.ucsd.edu</code> is a jumpbox. It is for launching containers on cluster
nodes, moving files, and managing running work. Running work on it is
prohibited.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Use</th>
<th>Tools</th>
</tr>
</thead>
<tbody>
<tr>
<td>Launching containers</td>
<td><code>launch.sh</code> and its wrappers</td>
</tr>
<tr>
<td>Moving files in and out</td>
<td><code>scp</code>, <code>sftp</code>, <code>rsync</code>, <code>git</code></td>
</tr>
<tr>
<td>Managing running work</td>
<td><code>kubectl get pods</code>, <code>kubectl delete pod</code>, and <code>kubesh</code> to enter a running container</td>
</tr>
<tr>
<td>Small housekeeping</td>
<td>Listing directories, checking disk usage, editing a config file, reading a log</td>
</tr>
</tbody>
</table></div>
<p>See also: <a href="#prohibited-uses-of-the-login-node">Prohibited Uses of the Login Node</a></p>
<h2 id="prohibited-uses-of-the-login-node">Prohibited Uses of the Login Node</h2>
<p>Manual job execution on <code>dsmlp-login</code> is prohibited by policy. Prohibited work
includes Python scripts, Java projects, notebooks, training runs, and data
conversions.</p>
<p>Running an editor's server component on <code>dsmlp-login</code> is not permitted. Running
VS Code directly on the login node is specifically prohibited. The supported
configuration places VS Code in a container. See
<a href="/docs/access/remote-editor-setup.html">Remote Editor Setup</a>. Automated jobs find and stop VS
Code and other remote-editor processes on the login node.</p>
<h3 id="cpu-limit-on-the-login-node">CPU Limit on the Login Node</h3>
<p>CPU-intensive work on the login node is throttled to at most 10% of one CPU
core, so it runs slowly. Move work that runs slowly there into a container. Do
data processing, compiling, and debugging in a container. See
<a href="#running-work-in-a-container">Running Work in a Container</a>.</p>
<h2 id="the-login-node--the-cluster-nodes">The Login Node &amp; the Cluster Nodes</h2>
<p>Each container is assigned CPU, RAM, and GPU of its own and is isolated from
other users' processes. The login node is shared: the resources one session
uses there are taken from every other user signed in.</p>
<p>Every user passes through the login node. A loaded login node degrades
launching for everyone signed in, not only for one job.</p>
<p>Many CPU cores, tens of gigabytes of memory, and a GPU are available on the
cluster nodes through a launch script.</p>
<h2 id="running-work-in-a-container">Running Work in a Container</h2>
<p>After connecting, launch a container and run work in it:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;WORKSPACE&gt;     # GPU-capable image
launch.sh -h                          # print the flag summary</code></pre>
<p>Short jobs also run in a container. Starting a container takes seconds.</p>
<p>See also: <a href="/get-started/working-from-the-command-line.html">Working from the Command Line</a></p>
<h3 id="launch-modes">Launch Modes</h3>
<p>A launch runs in one of three modes, depending on whether the session is
attended:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;WORKSPACE&gt;                    # interactive: a shell in a container
launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -b                 # background: keeps running after a disconnect
launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -B -- python train.py   # batch: runs to completion, then exits</code></pre>
<p>See also: <a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a></p>
<h3 id="shared-filesystem">Shared Filesystem</h3>
<p>The login node and the container share a filesystem. A file copied to the
login node with <code>scp</code> is in the container, and a file a job writes is on the
login node once the job is over. No copying step is needed between them.</p>
<p>See also: <a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a></p>
<h2 id="connecting-without-a-password">Connecting Without a Password</h2>
<p>An SSH key pair removes the password prompt from repeated connections. Generate
a pair on the local machine and install the public key on the login node:</p>
<pre class="docs-code"><code class="language-bash">ssh-keygen -t ed25519
cat ~/.ssh/id_ed25519.pub | ssh &lt;username&gt;@dsmlp-login.ucsd.edu \
  "mkdir -p ~/.ssh &amp;&amp; chmod 700 ~/.ssh &amp;&amp; cat &gt;&gt; ~/.ssh/authorized_keys &amp;&amp; chmod 600 ~/.ssh/authorized_keys"</code></pre>
<p>Naming the key type with <code>-t</code> fixes the file name, which the second command
must match. The type a bare <code>ssh-keygen</code> picks has changed between OpenSSH
releases.</p>
<p>To verify the key, connect again. A connection that does not ask for the AD
password is using the key. The key's own passphrase is still requested if one
was set.</p>
<h3 id="key-pair-for-a-remote-editor">Key Pair for a Remote Editor</h3>
<p>A remote editor requires a key pair. VS Code connects through a ProxyCommand
that cannot prompt for a password, and the editor's connection terminates
inside the container rather than on the login node. <code>launch.sh -H</code> carries the
key installed on the login node into the container at launch.
<a href="/docs/access/remote-editor-setup.html#the-key-pair">The Key Pair</a> covers the Windows commands,
the local file permissions, the SSH agent, and the <code>IdentityFile</code> directive.</p>
<h2 id="running-a-launch-script-over-ssh">Running a Launch Script over SSH</h2>
<p>A launch script can be invoked directly over SSH. A job is submitted this way
from a script on a local machine rather than by hand:</p>
<pre class="docs-code"><code class="language-bash">ssh &lt;username&gt;@dsmlp-login.ucsd.edu /opt/launch-sh/bin/launch.sh &lt;flags&gt;</code></pre>
<p>See also: <a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a></p>
<h2 id="a-second-shell-with-kubesh">A Second Shell with <code>kubesh</code></h2>
<p><code>kubesh</code>, run on the login node, opens a second shell in a running container
without starting a second container:</p>
<pre class="docs-code"><code class="language-bash">kubectl get pods          # find the pod
kubesh &lt;pod-id&gt;           # enter it</code></pre>
<p>This is the supported way to watch a job that is already running. A second
launch starts a second container with its own resources rather than attaching
to the first.</p>
<p>See also: <a href="/docs/running-jobs/watching-your-job.html">Watching a Running Job</a></p>
<h2 id="reaching-a-notebook-or-a-service">Reaching a Notebook or a Service</h2>
<p>A Jupyter server or any other service listening inside a container is not
directly reachable from a personal machine. Two SSH tunnel forms reach it, and
they target different ports. The two forms are not interchangeable. Using the
wrong form is the usual reason a tunnel does not work.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>To reach</th>
<th>Use</th>
</tr>
</thead>
<tbody>
<tr>
<td>A port the launcher published on the login node, such as the port in the Jupyter URL</td>
<td><a href="#tunnel-to-a-port-on-the-login-node">Tunnel to a Port on the Login Node</a></td>
</tr>
<tr>
<td>A port a service is listening on inside the container, such as TensorBoard or a web app started there</td>
<td><a href="#tunnel-to-a-port-inside-the-container">Tunnel to a Port Inside the Container</a></td>
</tr>
</tbody>
</table></div>
<h3 id="tunnel-to-a-port-on-the-login-node">Tunnel to a Port on the Login Node</h3>
<p>The output of a launch ends with a URL naming a port on
<code>dsmlp-login.ucsd.edu</code>. Forward that port from a second terminal on the local
machine:</p>
<pre class="docs-code"><code class="language-bash">ssh -N -L 8889:dsmlp-login.ucsd.edu:&lt;port&gt; &lt;user&gt;@dsmlp-login.ucsd.edu</code></pre>
<p><code>http://localhost:8889/user/&lt;username&gt;/tree/</code> then opens the session, and the
token from the launch output authenticates it. Replacing <code>tree</code> with <code>lab</code> in
that URL opens JupyterLab, which adds a terminal and an editor.</p>
<h3 id="tunnel-to-a-port-inside-the-container">Tunnel to a Port Inside the Container</h3>
<p>For a service started by hand inside the container, the tunnel targets the
loopback address:</p>
<pre class="docs-code"><code class="language-bash">ssh -N -L localhost:&lt;port&gt;:127.0.0.1:&lt;port&gt; &lt;user&gt;@dsmlp-login.ucsd.edu</code></pre>
<p><code>localhost:&lt;port&gt;</code> in a browser then reaches the service.</p>
<h3 id="tunnel-terminal-output">Tunnel Terminal Output</h3>
<p><code>-N</code> means "no command", so a working tunnel prints nothing. A silent terminal
indicates success, not a hang. Keep the terminal open for as long as the tunnel
is needed. <code>Ctrl+C</code> closes the tunnel.</p>
<h3 id="closing-the-tunnel-and-the-container">Closing the Tunnel and the Container</h3>
<p>Closing a tunnel does not stop the container. Stopping the container does not
close the tunnel. At the end of a session, quit Jupyter or <code>exit</code> the
container, then press <code>Ctrl+C</code> in the tunnel's terminal.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A container that has only been disconnected from may still be running and
still holding a GPU.</p></div>
<p>See also: <a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a></p>
<h3 id="the-vpn-alternative">The VPN Alternative</h3>
<p>With a connection to the campus VPN, the launch URL works as printed and no
tunnel is required. Either route works. The VPN involves fewer steps to
remember. A tunnel involves less to install and does not route the rest of the
machine's traffic through campus.</p>
<p>A tunnel or the VPN is needed only for container ports, such as a Jupyter
server started by <code>launch.sh</code>. Neither is needed for <code>ssh</code> to the login node or
for Datahub in a browser.</p>
<p>See also: <a href="/docs/access/datahub-in-the-browser.html">Datahub in the Browser</a></p>
<h2 id="reaching-a-port-from-the-login-node">Reaching a Port From the Login Node</h2>
<p><code>kubectl port-forward</code> connects the login node to a port inside a pod. It
covers the case where the container publishes nothing itself, such as a custom
image with an overridden entrypoint:</p>
<pre class="docs-code"><code class="language-bash">kubectl port-forward pods/&lt;pod-name&gt; &lt;port&gt;:8888</code></pre>
<p>Combined with a
<a href="#tunnel-to-a-port-on-the-login-node">Tunnel to a Port on the Login Node</a>, the
port is reachable from a local machine.</p>
<p>See also: <a href="/docs/environments/building-a-custom-image.html">Building &amp; Publishing a Custom Image</a> ·
<a href="/docs/running-jobs/watching-your-job.html#tensorboard--other-dashboards">TensorBoard &amp; Other Dashboards</a></p>
<h2 id="connection-failures">Connection Failures</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Usual cause</th>
</tr>
</thead>
<tbody>
<tr>
<td>Password refused</td>
<td>An incorrect username format. Use <code>username</code>, not <code>username@ucsd.edu</code>, with the AD password.</td>
</tr>
<tr>
<td>The connection hangs after the password</td>
<td>Duo approval is still pending on the phone.</td>
</tr>
<tr>
<td><code>Connection timed out</code> from off campus</td>
<td>A network that blocks outbound SSH, such as a hotel, a conference, or some corporate networks. The VPN is not required for <code>ssh</code>, but connecting to it routes around a block of this kind.</td>
</tr>
<tr>
<td>A host key warning</td>
<td>Do not accept it without checking. Where no change was announced, contact <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a> before removing the stored key.</td>
</tr>
<tr>
<td>It connects, but nothing launched will start</td>
<td>The cause is not the connection. See <a href="/docs/access/sign-in-and-session-problems.html">Sign-In &amp; Session Problems</a>.</td>
</tr>
<tr>
<td><code>channel N: open failed: connect failed: Connection refused</code> on a forwarded port</td>
<td>A wrong remote port number, or a local port already in use. See <a href="#refused-tunnel-connections">Refused Tunnel Connections</a>.</td>
</tr>
</tbody>
</table></div>
<h3 id="refused-tunnel-connections">Refused Tunnel Connections</h3>
<p>A tunnel that refuses the connection, or a browser that does not load the
forwarded page, usually has one of two causes:</p>
<ul>
<li>The local port is already in use, often by a tunnel left open in another
  window. <code>lsof -i :8889</code> names the process. Stop that process or choose a
  different local port.</li>
<li>The remote port is wrong. The port in a Jupyter URL is assigned at launch
  and is unlikely to be the same twice. The current launch output carries the
  current port. A command from an earlier session does not.</li>
</ul>
