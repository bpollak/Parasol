---
title: "Remote Editor Setup"
path: /docs/access/remote-editor-setup.html
description: "VS Code is supported through one configuration, Remote-SSH over a ProxyCommand, which connects the editor to a container on a cluster node rather than to…"
eyebrow: "Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/access/remote-editor-setup/), preview build of 2026-09-29"
canonicalUrl: /docs/access/remote-editor-setup.html
legacyUrl: https://dsmlp-docs.ucsd.edu/access/remote-editor-setup/
format: html
---
<p class="lead">VS Code is supported through one configuration, Remote-SSH over a ProxyCommand,
which connects the editor to a container on a cluster node rather than to the
login node. Running VS Code directly on <code>dsmlp-login</code> is not permitted. See
<a href="/docs/access/the-login-node.html">The Login Node</a>.</p>
<dl class="docs-glance">
<div><dt>Set up once</dt><dd>An SSH key, an extension, and a config file</dd></div>
<div><dt>Each session</dt><dd>Launch the pod, then connect the editor</dd></div>
<div><dt>Pod lifetime</dt><dd>6 hours by default, up to 12 hours when set at launch</dd></div>
<div><dt>End with</dt><dd><code>kubectl delete pod</code> from the login node</dd></div>
</dl>
<h2 id="what-a-remote-editor-adds">What a Remote Editor Adds</h2>
<p>The browser session is the default route onto the platform and covers most
coursework. Signing in at <a href="https://datahub.ucsd.edu">datahub.ucsd.edu</a> opens a
Jupyter session with nothing to install or configure. <a href="/docs/access/index.html">Access</a>
describes the routes.</p>
<p>A remote editor keeps the editor on the local machine and runs its working
parts in the container. VS Code installs a server component into the container
on first connection. The editor's terminal, debugger, language tooling, and
extensions then operate on the container's files and hardware, while the
window, keybindings, and settings stay local.</p>
<p>A remote editor suits the following work:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Work</th>
<th>Remote editor behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td>A project of many files</td>
<td>A codebase with modules, tests, and configuration is edited as a tree, with search, refactoring, and git integration across the whole of it, rather than one notebook at a time</td>
</tr>
<tr>
<td>A script rather than a notebook</td>
<td>A training run is started from the editor's terminal, watched from the same window, and stepped through under a debugger with a GPU attached</td>
</tr>
<tr>
<td>An existing setup</td>
<td>Extensions, keybindings, themes, and settings carry over unchanged</td>
</tr>
<tr>
<td>A session that outlives the window</td>
<td>The container keeps running when the editor closes. Reopening the editor reconnects to the same container, with the same files and any processes left running in it</td>
</tr>
</tbody>
</table></div>
<p>A remote editor is the route with the most setup: an SSH key, an extension, and
a config file. See <a href="#prerequisites">Prerequisites</a>. Its container keeps running
with nothing on screen and is deleted by hand. See
<a href="#ending-the-session">Ending the Session</a>.</p>
<ol class="docs-flow" aria-label="A remote editor session from launch to deletion">
<li><span class="docs-flow-label">Launch</span><strong>Start the pod on the login node</strong><p>Size, image, and any GPU are chosen here.</p></li>
<li><span class="docs-flow-label">Connect</span><strong>Attach VS Code to the pod</strong><p>The <code>Host</code> entry finds the pod by its <code>-N</code> name.</p></li>
<li><span class="docs-flow-label">Reconnect</span><strong>Reopen to attach again</strong><p>A disconnect leaves the pod running.</p></li>
<li><span class="docs-flow-label">End</span><strong>Delete the pod</strong><p>Closing the editor does not release it.</p></li>
</ol>
<h2 id="launch-and-connection-sequence">Launch and Connection Sequence</h2>
<p>A session has two steps, performed in order: launch the pod, then connect the
editor.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Launch the pod</span><p>From the login node, a launch script starts a container with <code>-H</code>, which
   runs an SSH server inside it, and <code>-N</code>, which gives the pod a fixed name. The
   container's size, image, and any GPU are chosen at this step.</p></li>
<li><span class="docs-step-title">Connect the editor</span><p>From VS Code, the <code>ProxyCommand</code> of a <code>Host</code> entry runs the same launcher on
   the login node with the same <code>-N</code> name. The launcher finds the pod already
   running under that name and attaches to it rather than starting a second
   one. The editor's SSH connection is carried through to the SSH server inside
   the container.</p></li>
</ol>
<p>Without the <code>ProxyCommand</code> line, VS Code attempts to run on <code>dsmlp-login</code>, where
running VS Code is not permitted.</p>
<h3 id="disconnection-and-reconnection">Disconnection and Reconnection</h3>
<p>A pod launched with <code>-H</code> is not ended by a disconnect. Closing the editor or
losing the network leaves the pod running, and the next connection attaches to
it again.</p>
<h3 id="connecting-without-a-running-pod">Connecting Without a Running Pod</h3>
<p>If no pod of that name is running when the editor connects, the
<code>ProxyCommand</code>'s own launch creates one at the launcher's default size and
without a GPU. A session that connects but is unexpectedly small, or has no GPU,
indicates that the launch step was skipped or that the pod had already expired.</p>
<h2 id="prerequisites">Prerequisites</h2>
<ul class="docs-checklist">
<li>An SSH key pair, with the public key installed so that neither the login node
   nor the container asks for a password. The <code>ProxyCommand</code> runs unattended and
   cannot answer a password prompt. <a href="#the-key-pair">The Key Pair</a> covers key
   generation. <a href="/docs/access/the-login-node.html#connecting-over-ssh">Connecting over SSH</a>
   covers the SSH connection to the login node.</li>
<li>The <a href="https://code.visualstudio.com/docs/remote/ssh">Remote-SSH extension</a> in
   VS Code, and an OpenSSH-compatible client on the local machine. VS Code does
   not support PuTTY.</li>
<li>The workspace ID. <code>workspace --list</code> on <code>dsmlp-login</code> prints the workspaces
   the account may enter. Independent study users, who are not members of a
   course, omit <code>-W</code> and land in the personal home directory.</li>
</ul>
<h2 id="the-key-pair">The Key Pair</h2>
<p>The key pair is generated on the local machine. <code>ssh-keygen</code> writes two files: a
private key and a matching <code>.pub</code> public key.</p>
<p><strong>The private key is the equivalent of a password and never leaves the local
machine.</strong> The public key is installed on the login node.</p>
<h3 id="login-node-and-container-authentication">Login Node and Container Authentication</h3>
<p>The <code>ProxyCommand</code> authenticates to <code>dsmlp-login</code>. The editor's own connection
then authenticates to the SSH server that <code>-H</code> starts inside the container. One
key pair serves both connections, and one installation of the public key covers
both, because <code>launch.sh -H</code> carries it from the login node into the container.</p>
<h3 id="ssh-client-on-macos-and-windows">SSH Client on macOS and Windows</h3>
<p>macOS ships an SSH client. On Windows, the OpenSSH client is a Windows optional
feature, and VS Code looks for <code>ssh</code> on the <code>PATH</code> before falling back to the
Git for Windows install path.
<a href="https://code.visualstudio.com/docs/remote/troubleshooting#_installing-a-supported-ssh-client">Installing a supported SSH client</a>
describes client installation.</p>
<h3 id="generating-the-key-pair">Generating the Key Pair</h3>
<p>Generate the pair in a local terminal: <strong>Terminal</strong> on macOS, <strong>PowerShell</strong> on
Windows. The command is the same on both:</p>
<figure class="docs-command"><figcaption>Run in a local terminal on macOS or Windows</figcaption><pre class="docs-code"><code class="language-bash">ssh-keygen -t ed25519</code></pre></figure>
<p><code>ssh-keygen</code> offers a default location, then asks for a passphrase. An empty
passphrase is accepted. The two files are written to the <code>.ssh</code> directory of
the local home directory:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th></th>
<th>Private key</th>
<th>Public key</th>
</tr>
</thead>
<tbody>
<tr>
<td>macOS</td>
<td><code>~/.ssh/id_ed25519</code></td>
<td><code>~/.ssh/id_ed25519.pub</code></td>
</tr>
<tr>
<td>Windows</td>
<td><code>C:\Users\&lt;username&gt;\.ssh\id_ed25519</code></td>
<td><code>C:\Users\&lt;username&gt;\.ssh\id_ed25519.pub</code></td>
</tr>
</tbody>
</table></div>
<p>Naming the type with <code>-t</code> fixes the file name. The type a bare <code>ssh-keygen</code>
picks has changed between OpenSSH releases, and the file name follows the type.
Every command on this page uses the <code>id_ed25519</code> file names.</p>
<h3 id="private-key-file-permissions">Private Key File Permissions</h3>
<p>SSH refuses a private key that other accounts can read, with
<code>WARNING: UNPROTECTED PRIVATE KEY FILE!</code>.</p>
<ul>
<li>On macOS, the fix is <code>chmod 700 ~/.ssh</code>
and <code>chmod 600</code> on the private key and on <code>~/.ssh/config</code>.</li>
<li>On Windows, the <code>.ssh</code> directory must be owned by the account, with no other
user granted access.
<a href="https://code.visualstudio.com/docs/remote/troubleshooting#_fixing-ssh-file-permission-errors">Fixing SSH file permission errors</a>
describes the fix.</li>
</ul>
<h3 id="ssh-agent">SSH Agent</h3>
<p>An SSH agent holds the unlocked key, so a passphrase is entered once per login
rather than at every connection. VS Code adds the key to a running agent by
itself.</p>
<p>On macOS, the agent runs by default, and
<code>ssh-add --apple-use-keychain ~/.ssh/id_ed25519</code> stores the passphrase in the
login keychain. On Windows, start the service from an Administrator PowerShell:</p>
<figure class="docs-command"><figcaption>Windows: run in an Administrator PowerShell</figcaption><pre class="docs-code"><code class="language-powershell">Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent</code></pre></figure>
<p><code>ssh-add -l</code>, run in a local VS Code terminal, lists what the agent holds.
<strong>Restart VS Code after starting the agent</strong>; otherwise VS Code does not find it.
<a href="https://code.visualstudio.com/docs/remote/troubleshooting#_setting-up-the-ssh-agent">Setting up the SSH Agent</a>
describes agent setup.</p>
<h3 id="keys-generated-in-puttygen">Keys Generated in PuTTYGen</h3>
<p>A key made in PuTTYGen does not work as generated. PuTTY is not a supported VS
Code client. Save a <code>.ppk</code> private key out through
<strong>Conversions → Export OpenSSH key</strong> before use. See
<a href="https://code.visualstudio.com/docs/remote/troubleshooting#_reusing-a-key-generated-in-puttygen">Reusing a key generated in PuTTYGen</a>.</p>
<h3 id="microsoft-and-github-guides">Microsoft and GitHub Guides</h3>
<p>Microsoft and GitHub each publish a longer walkthrough of key setup:
<a href="https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement">Key-Based Authentication in OpenSSH for Windows</a>
and
<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent">Generating a New SSH Key and Adding It to the ssh-agent</a>.</p>
<p>The "Deploy the public key" section of the Microsoft article describes a Windows
SSH server and does not apply to <code>dsmlp-login</code>. See
<a href="#installing-the-public-key">Installing the Public Key</a>.</p>
<h2 id="installing-the-public-key">Installing the Public Key</h2>
<p>The public key is installed once, on the login node. <code>launch.sh -H</code> carries it
into the container, so nothing is pasted into a running pod.</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Send the public key to the login node</span>
<figure class="docs-command"><figcaption>From macOS</figcaption><pre class="docs-code"><code class="language-bash">cat ~/.ssh/id_ed25519.pub | ssh &lt;username&gt;@dsmlp-login.ucsd.edu \
  "mkdir -p ~/.ssh &amp;&amp; chmod 700 ~/.ssh &amp;&amp; cat &gt;&gt; ~/.ssh/authorized_keys &amp;&amp; chmod 600 ~/.ssh/authorized_keys"</code></pre></figure>
<figure class="docs-command"><figcaption>From Windows, in PowerShell</figcaption><pre class="docs-code"><code class="language-powershell">$USER_AT_HOST="&lt;username&gt;@dsmlp-login.ucsd.edu"
$PUBKEYPATH="$HOME\.ssh\id_ed25519.pub"
$pubKey=(Get-Content "$PUBKEYPATH" | Out-String); ssh "$USER_AT_HOST" "mkdir -p ~/.ssh &amp;&amp; chmod 700 ~/.ssh &amp;&amp; echo '${pubKey}' &gt;&gt; ~/.ssh/authorized_keys &amp;&amp; chmod 600 ~/.ssh/authorized_keys"</code></pre></figure></li>
<li><span class="docs-step-title">Enter the AD password and approve Duo</span><p>The Active Directory (AD) password and Duo are requested once, for that
connection.</p></li>
<li><span class="docs-step-title">Verify the key before continuing</span>
<figure class="docs-command"><figcaption>Connect with the key</figcaption><pre class="docs-code"><code class="language-bash">ssh -i ~/.ssh/id_ed25519 &lt;username&gt;@dsmlp-login.ucsd.edu</code></pre></figure>
<p>A connection that does not ask for the AD password is using the key. A
passphrase, if one was set, is still requested.</p></li>
</ol>
<h3 id="key-copy-in-the-container">Key Copy in the Container</h3>
<p>Every launch replaces the container's copy of <code>authorized_keys</code> with a fresh
copy of the login node's. <strong>The login node's copy is the only one to edit.</strong> A key
added by hand inside a running container does not survive the next launch.</p>
<p>Only a launch makes the copy. Connecting to a pod that is already running does
not, so a key installed after the pod started is not in it. If the editor does
not authenticate after the key has been installed, delete the pod and launch it
again so that the copy is remade. See <a href="#launching-the-pod">Launching the Pod</a>.</p>
<p>A session launched without <code>-W</code> needs no further step. Its container home
directory is the personal one, the key is already in it, and the copy is
skipped.</p>
<h2 id="the-host-entry">The Host Entry</h2>
<ol class="docs-steps">
<li><span class="docs-step-title">Open the SSH config file</span><p>In VS Code, open <strong>Remote Explorer → SSH targets</strong>, click the gear icon, and
edit the config file in the local home directory: <code>~/.ssh/config</code> on macOS,
<code>C:\Users\USERNAME\.ssh\config</code> on Windows. The Command Palette (<code>F1</code>) opens the
same file through <strong>Remote-SSH: Open Configuration File...</strong>.</p></li>
<li><span class="docs-step-title">Add an entry of this form</span>
<figure class="docs-command"><figcaption>Host entry in the local SSH config file</figcaption><pre class="docs-code"><code>Host MYCOURSE
  User USERNAME
  HostKeyAlias MYCOURSE
  IdentitiesOnly yes
  IdentityFile ~/.ssh/id_ed25519
  ProxyCommand ssh -i ~/.ssh/id_ed25519 USERNAME@dsmlp-login.ucsd.edu /opt/launch-sh/bin/launch.sh -W MYCOURSE -H -N vscode-dsmlp</code></pre></figure></li>
</ol>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Part</th>
<th>What it does</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>HostKeyAlias MYCOURSE</code></td>
<td>Stores the container's host key under the course's own name, so the entries for different courses do not share one stored key</td>
</tr>
<tr>
<td><code>IdentitiesOnly yes</code></td>
<td>Offers only the key the entry names, not every key the local SSH agent holds</td>
</tr>
<tr>
<td><code>-i ~/.ssh/id_ed25519</code></td>
<td>The client-side private key used to authenticate to both the login node and the container</td>
</tr>
<tr>
<td><code>/opt/launch-sh/bin/launch.sh</code></td>
<td>The same launcher run by hand, called by absolute path</td>
</tr>
<tr>
<td><code>-W MYCOURSE</code></td>
<td>The course workspace, so the course files are there</td>
</tr>
<tr>
<td><code>-H</code></td>
<td>Connects to the SSH server inside the container — this is what VS Code attaches to</td>
</tr>
<tr>
<td><code>-N vscode-dsmlp</code></td>
<td>The pod's name. It must match the name used at launch</td>
</tr>
</tbody>
</table></div>
<p>The entry is written once. Size, image, and GPU are not set in it. They are set
at each launch, and the entry attaches to whatever pod carries the name. See
<a href="#launching-the-pod">Launching the Pod</a>.</p>
<h3 id="key-paths-in-the-entry">Key Paths in the Entry</h3>
<p>The entry names the key twice, once for each connection. <code>IdentityFile</code> governs
the connection from VS Code to the container. The <code>ProxyCommand</code> is a separate
<code>ssh</code> invocation that connects the local machine to the login node. The same
key file serves both. See <a href="#the-key-pair">The Key Pair</a>.</p>
<p>On Windows, write the path with forward slashes, as in
<code>IdentityFile C:/Users/USERNAME/.ssh/id_ed25519</code>, or double every backslash.</p>
<h2 id="launching-the-pod">Launching the Pod</h2>
<p>Each session begins on the login node:</p>
<figure class="docs-command"><figcaption>Start of every session: connect, then launch the pod</figcaption><pre class="docs-code"><code class="language-bash">ssh &lt;username&gt;@dsmlp-login.ucsd.edu
launch-scipy-ml.sh -W MYCOURSE -H -N vscode-dsmlp -b</code></pre></figure>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Flag</th>
<th>What it does</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-W MYCOURSE</code></td>
<td>The same workspace as the <code>Host</code> entry</td>
</tr>
<tr>
<td><code>-H</code></td>
<td>Starts an SSH server inside the container</td>
</tr>
<tr>
<td><code>-N vscode-dsmlp</code></td>
<td>Names the pod. The <code>Host</code> entry finds it by this name</td>
</tr>
<tr>
<td><code>-b</code></td>
<td>Returns the prompt once the pod is scheduled; the pod keeps running</td>
</tr>
</tbody>
</table></div>
<p>The launcher reports the pod's progress and the node it lands on, then returns.</p>
<h3 id="resource-flags">Resource Flags</h3>
<p>Resources are set on the launch line. <code>-c</code> and <code>-m</code> set CPU cores and gigabytes
of memory. <code>-c 2 -m 8</code> is a working size for an editor container. <code>-g 1</code>, with a
GPU class the workspace has been granted, adds a GPU:</p>
<figure class="docs-command"><figcaption>Launch lines with more resources</figcaption><pre class="docs-code"><code class="language-bash"># more CPU and memory
launch-scipy-ml.sh -W MYCOURSE -H -N vscode-dsmlp -b -c 4 -m 8

# a GPU
launch-scipy-ml.sh -W MYCOURSE -H -N vscode-dsmlp -b -g 1 -l gpu-class=medium</code></pre></figure>
<p>A connection that drops within a minute of starting a memory-intensive process
indicates a container that is too small. Delete the pod and launch again with a
larger <code>-m</code>.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Starting a GPU session draws on the GPU Service Unit budget, and an editor
container spends for as long as it exists, whether or not the editor is in
use. See <a href="/docs/gpu-access/service-units-and-budgets.html#on-demand-lease-charges">On-Demand Lease Charges</a>.</p></div>
<p><a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a> covers the
launch flags. See <a href="/docs/gpu-access/gpu-classes.html">GPU Classes</a>.</p>
<h2 id="connecting">Connecting</h2>
<p>With the pod running, right-click the SSH target in <strong>Remote Explorer</strong> and
connect. Clicking <strong>details</strong> in the lower right shows the connection progress.</p>
<p>Reconnecting after the editor has been closed or the laptop has slept is the
same action. The pod is still running, and the <code>ProxyCommand</code> attaches to it.</p>
<h2 id="pod-lifetime">Pod Lifetime</h2>
<p>An editor pod has the same runtime limit as any other container, <strong>6 hours by
default and up to 12 hours when set at launch</strong>. See
<a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>.</p>
<p>When the limit is reached, the pod stops, the editor loses its connection, and
any processes running in the container end with it. A 12-hour limit is set by
exporting <code>K8S_TIMEOUT_SECONDS</code> before the launch:</p>
<figure class="docs-command"><figcaption>Launch with a 12-hour limit</figcaption><pre class="docs-code"><code class="language-bash">export K8S_TIMEOUT_SECONDS=$(( 3600 * 12 ))
launch-scipy-ml.sh -W MYCOURSE -H -N vscode-dsmlp -b</code></pre></figure>
<h3 id="reconnecting-after-expiry">Reconnecting After Expiry</h3>
<p>The next connection after the pod expires does not restore it. With nothing
running under the name, the <code>ProxyCommand</code> starts a default-sized pod of its
own. To continue:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Delete that pod</span><p>See <a href="#ending-the-session">Ending the Session</a>.</p></li>
<li><span class="docs-step-title">Launch again by hand before continuing</span><p>A launch that finds the default pod running attaches to it rather than
replacing it.</p></li>
</ol>
<h3 id="idle-culling-of-gpu-editor-pods">Idle Culling of GPU Editor Pods</h3>
<p>A GPU editor pod is subject to idle culling. Editing code does not use the GPU.
A GPU container that stops using its GPU is reclaimed after a warning. See
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>.</p>
<h2 id="host-entries-for-multiple-courses">Host Entries for Multiple Courses</h2>
<p><strong>Create a separate <code>Host</code> entry for each course.</strong> Reusing one entry across
workspaces makes the host keys collide, and the failure presents as a security
warning rather than as a configuration error.</p>
<h3 id="pod-name-scope">Pod Name Scope</h3>
<p>The pod name is chosen at launch and is scoped to the account, not to the
course. Two entries that both specify <code>-N vscode-dsmlp</code> attach to whichever pod
is running under that name, whatever workspace it was launched in.</p>
<p>Give each course a distinct pod name made of lowercase letters, digits, and
hyphens, and use the same name in the entry and on the launch line.</p>
<p>With a distinct name per course, editor sessions for several courses can run at
the same time. Together they must fit the namespace's total CPU, memory, and GPU
limits. See
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>.</p>
<h2 id="ending-the-session">Ending the Session</h2>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Closing the editor does not release the pod. The pod keeps running and holds
its CPU and memory, and its GPU where it has one, spending budget for as long
as it exists.</p></div>
<p>End every session by deleting the pod from the login node:</p>
<figure class="docs-command"><figcaption>Delete the pod from the login node</figcaption><pre class="docs-code"><code class="language-bash">ssh &lt;username&gt;@dsmlp-login.ucsd.edu
kubectl get pods
kubectl delete pod vscode-dsmlp</code></pre></figure>
<p>Idle culling does not replace this step. It applies only to GPU pods, and an
editor container with a stalled process holding the GPU may never qualify. A
CPU-only editor pod is never culled. It runs until its runtime limit is reached
or until it is deleted.
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>
describes the idle conditions.</p>
<p>The running container can also be entered from the login node with
<code>kubesh vscode-dsmlp</code>, without opening the editor.</p>
<h3 id="growth-of-vscode-server">Growth of <code>.vscode-server</code></h3>
<p>VS Code installs a server component into <code>~/.vscode-server</code> in the workspace
home directory the first time it connects, and the directory grows past a
gigabyte. On a course home directory, that is a large fraction of the quota.
When the quota fills, the symptom is a session that does not start, not a VS
Code error.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>
lists home directory quotas.</p>
<p>To reclaim the space:</p>
<ol class="docs-steps">
<li><span class="docs-step-title">Close every VS Code window connected to the container</span></li>
<li><span class="docs-step-title">Enter the container</span><p>Use <code>kubesh vscode-dsmlp</code>.</p></li>
<li><span class="docs-step-title">Delete the directory</span>
<figure class="docs-command"><figcaption>Run inside the container</figcaption><pre class="docs-code"><code class="language-bash">rm -rf ~/.vscode-server</code></pre></figure>
<p>Run the command inside the container, not on the login node, whose home
directory is a different one.</p></li>
</ol>
<p>VS Code installs the server again on the next connection. Deleting the
directory also removes extensions installed in the container. Install them
again after reconnecting.</p>
<h2 id="editor-connection-failures">Editor Connection Failures</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Symptom</th>
<th>Usual cause</th>
</tr>
</thead>
<tbody>
<tr>
<td>A password prompt that VS Code cannot answer</td>
<td>The public key is not installed on the login node, or <code>-i</code> names a key that host does not hold</td>
</tr>
<tr>
<td><code>Permission denied (publickey)</code> once the pod has launched</td>
<td><code>IdentityFile</code> names the wrong key, or the pod's copy of <code>authorized_keys</code> is older than the key. Delete the pod and launch again</td>
</tr>
<tr>
<td><code>WARNING: UNPROTECTED PRIVATE KEY FILE!</code></td>
<td>Local file permissions on the private key</td>
</tr>
<tr>
<td>A passphrase requested at every reconnection</td>
<td>No agent is running locally, or VS Code was not restarted after it was started</td>
</tr>
<tr>
<td>A host key mismatch or security warning</td>
<td>Two courses sharing one <code>Host</code> entry</td>
</tr>
<tr>
<td>It connects, but the session is small or has no GPU</td>
<td>No pod was running under the name, so the ProxyCommand started a default one. Delete it and launch by hand</td>
</tr>
<tr>
<td>It connects, but to another course's files</td>
<td>Two <code>Host</code> entries sharing one pod name</td>
</tr>
<tr>
<td>It connects, but the course files are not there</td>
<td>A missing or misspelled <code>-W</code> on the launch line, so the session is in the personal home</td>
</tr>
<tr>
<td>The connection drops within a minute</td>
<td>The container is too small — delete it and launch again with more <code>-m</code></td>
</tr>
<tr>
<td>The connection ends after hours of use</td>
<td>The runtime limit, or idle culling on a GPU pod. Launch again</td>
</tr>
<tr>
<td>Nothing starts, and several sessions are already running</td>
<td>The aggregate CPU, memory and GPU ceiling → <a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a></td>
</tr>
</tbody>
</table></div>
<p>Where none of these apply, send the connection log from the <strong>details</strong> pane,
the <code>Host</code> entry, and the launch line to
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
