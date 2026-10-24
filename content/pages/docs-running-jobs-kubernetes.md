---
title: "Direct Kubernetes Use and Session Events"
path: /docs/running-jobs/kubernetes.html
description: "Direct use of the Kubernetes cluster beneath launch.sh suits cases the launcher does not handle, chiefly running more than one pod at a time and running…"
eyebrow: "Running Jobs"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/running-jobs/kubernetes/), preview build of 2026-09-29"
canonicalUrl: /docs/running-jobs/kubernetes.html
legacyUrl: https://dsmlp-docs.ucsd.edu/running-jobs/kubernetes/
format: html
---
<p>Direct use of the Kubernetes cluster beneath <code>launch.sh</code> suits cases the
launcher does not handle, chiefly running more than one pod at a time and
running something other than a notebook. This page assumes working knowledge of
Kubernetes.</p>
<h2 id="scope-of-support">Scope of Support</h2>
<p><code>launch.sh</code> is the supported path for ordinary work. It sets up the home
directory, the workspace, group membership, and resource limits correctly. A
hand-written manifest gets the workspace's directories only by carrying the
labels in <a href="#home-directories-in-manifest-pods">Home Directories in Manifest Pods</a>,
and gets none of the rest. Use <code>launch.sh</code> wherever it can do the job.</p>
<p>ITS supports the platform, not arbitrary Kubernetes. Before substantial work on
a set of hand-written manifests begins, describe to ITS what the manifests are
meant to do. A supported route often exists.
<a href="/docs/reference/getting-help.html#administrative-requests">Administrative Requests</a>
describes requests to ITS.</p>
<h2 id="the-namespace--kubectl">The Namespace &amp; <code>kubectl</code></h2>
<p>Each account has its own Kubernetes namespace. <code>kubectl</code> on the login node
operates inside that namespace and can see and change its pods and nothing else.</p>
<pre class="docs-code"><code class="language-bash">kubectl get pods                    # list the pods in the namespace
kubectl describe pod &lt;pod-name&gt;     # show why a pod is Pending, or what stopped it
kubectl logs &lt;pod-name&gt;             # print a pod's output
kubectl logs &lt;pod-name&gt; -f          # follow a pod's output
kubectl get events                  # list what the cluster has done to the pods
kubectl delete pod &lt;pod-name&gt;       # stop a pod
kubesh &lt;pod-name&gt;                   # open a shell inside a pod</code></pre>
<h3 id="diagnosing-a-launch">Diagnosing a Launch</h3>
<p><code>kubectl describe pod</code> is the first command to run when a launch misbehaves.
Its output carries the scheduling messages that the launcher's own output
summarizes away, and the events the reservation system writes about a GPU pod.
A GPU pod waiting for the reservation system always shows a <code>FailedScheduling</code>
event; the reservation event beside it gives the reason. See
<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>
and <a href="/docs/reference/reservation-events.html">Reservation Events</a>.</p>
<h3 id="shell-access-to-a-pod">Shell Access to a Pod</h3>
<p><code>kubectl exec -it &lt;pod-name&gt; bash</code> is the general form of <code>kubesh</code>. It is the
form to use for a pod that <code>launch.sh</code> did not create.</p>
<h2 id="running-a-service-from-a-manifest">Running a Service From a Manifest</h2>
<p>Some coursework requires a database rather than a notebook. The database is
launched from a manifest on the login node and reached from a notebook by
service name. The notebook and the service are separate pods in one namespace
and reach each other over the cluster network.</p>
<p>The pattern is the same for each service. For Redis:</p>
<pre class="docs-code"><code class="language-bash">kubectl create -f launch/redis.yaml   # start it
kubectl get pods                      # wait for READY
kubectl delete -f launch/redis.yaml   # stop it when the work is done</code></pre>
<h3 id="service-addresses">Service Addresses</h3>
<p>From a notebook spawned in the usual way, connect to the service by name.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Service</th>
<th>Reached at</th>
</tr>
</thead>
<tbody>
<tr>
<td>Redis</td>
<td><code>my-redis</code>, port <code>6379</code></td>
</tr>
<tr>
<td>PostgreSQL</td>
<td><code>my-postgres</code></td>
</tr>
<tr>
<td>Neo4j</td>
<td><code>bolt://my-neo4j:7687</code></td>
</tr>
<tr>
<td>MongoDB</td>
<td><code>mongodb://my-mongo</code></td>
</tr>
<tr>
<td>Cassandra</td>
<td>A 3-pod StatefulSet that takes 5-10 minutes to reach <code>3/3</code> ready</td>
</tr>
</tbody>
</table></div>
<p>A Redis connection from Python:</p>
<pre class="docs-code"><code class="language-python">import redis
r = redis.Redis(host='my-redis', port=6379, db=0)</code></pre>
<h3 id="service-readiness">Service Readiness</h3>
<p>A pod can exist before it is serving. Connect after the pod reports <code>READY</code>,
not a few seconds after <code>kubectl create</code>. Cassandra takes several minutes to
become ready, and <code>kubectl get statefulset</code> and <code>kubectl logs cassandra-0 -f</code>
report its progress.</p>
<h3 id="stopping-a-service">Stopping a Service</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Nothing created with <code>kubectl create</code> is cleaned up on logout. Anything
started by hand must be stopped by hand.</p></div>
<p><code>kubectl delete -f &lt;manifest&gt;</code> removes what a manifest created. Run
<code>kubectl get pods</code> at the end of a session to see what is still running.</p>
<h3 id="home-directories-in-manifest-pods">Home Directories in Manifest Pods</h3>
<p>The cluster mounts the workspace home directory, <code>public/</code>, and <code>private/</code> into
a pod only when the pod carries two labels:</p>
<pre class="docs-code"><code class="language-yaml">metadata:
  labels:
    dsmlp/course: &lt;WORKSPACE&gt;
    dsmlp/user: &lt;username&gt;</code></pre>
<p>In a Job or Deployment, set them on the pod template, under
<code>spec.template.metadata.labels</code>. The cluster checks both labels against the
namespace: the user name must be the namespace's own, and the workspace must be
one that user belongs to. A pod without both labels gets none of these
directories. <code>launch.sh -W</code> sets both labels; see
<a href="/docs/running-jobs/launch-sh-reference.html#workspace-and-gpu-charges">Workspace and GPU Charges</a>.</p>
<p>Every pod gets <code>/etc/podinfo/annotations</code>, with or without the labels. See
<a href="/docs/running-jobs/checkpointing.html#reading-the-warning-from-inside-a-container">Reading the Warning From Inside a Container</a>.</p>
<h3 id="gpu-pods-from-a-manifest">GPU Pods From a Manifest</h3>
<p>A pod created from a manifest that requests a GPU is admitted, charged, and
ended by the reservation system like a launched one. It needs:</p>
<ul>
<li>An <code>nvidia.com/gpu</code> resource request.</li>
<li>The <code>gpu-class</code> label, naming the class.</li>
<li>The <code>dsmlp/course</code> label, naming the workspace, which <code>launch.sh</code> sets from
  <code>-W</code>. A pod without it is charged to <code>ORG_ON_DEMAND</code> and never claims a course
  booking; see
  <a href="/docs/gpu-access/reservations.html#claiming-a-booking">Claiming a Booking</a>.</li>
</ul>
<p>The manifest sets no node selector for the class. The cluster's admission
controller adds the class's node selection to any pod that carries the
<code>gpu-class</code> label, whether the pod comes from <code>launch.sh</code>, from a hand-written
manifest, or from a Job or Deployment, so a manifest pod with the label is
routed like a launched one.</p>
<h3 id="resource-limits-for-manifest-pods">Resource Limits for Manifest Pods</h3>
<p>Pods created from a manifest draw on the same limits as every other pod in the
namespace. The namespace's totals cover everything running at once, so a
database pod and a notebook pod share one allowance. A shared allowance is the
usual reason the second pod does not schedule.
<a href="/docs/running-jobs/job-modes-and-limits.html#running-several-jobs-at-once">Running Several Jobs at Once</a>
describes limits on concurrent pods.</p>
<h3 id="privileges-in-manifest-pods">Privileges in Manifest Pods</h3>
<p>Containers started from a manifest are unprivileged, like every other container
on the platform, so a manifest that expects to run as root or to mount a host
path does not work
(<a href="/docs/environments/customizing-your-environment.html#root-access-and-system-packages">Root Access and System Packages</a>).</p>
<h3 id="launch-templates">Launch Templates</h3>
<p>ITS maintains the launch templates for the courses that use them. Do not modify
them without first checking with ITS. A locally edited copy is the usual reason
a service that works for the rest of the class fails for one member.</p>
<h2 id="multi-pod-topologies">Multi-Pod Topologies</h2>
<p>A course may provide a cluster rather than a container. Spark is the standard
example. The cluster is spawned by launching the course environment from
<code>datahub.ucsd.edu</code>, not by running a script, and its pods are found with
<code>kubectl</code>:</p>
<pre class="docs-code"><code class="language-bash">kubectl get pods                              # find spark-master-XXX-XXX
kubectl exec -it &lt;spark-master-XXX-XXX&gt; bash  # open a shell in the master pod</code></pre>
<p>Work inside the master pod proceeds as in any other pod. A job is submitted to
the cluster at its in-cluster address, for example
<code>spark://spark-master-svc:7077</code>.</p>
<h3 id="stopping-a-multi-pod-cluster">Stopping a Multi-Pod Cluster</h3>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>Logging out does not stop the cluster. It keeps running and holding its
resources until it is stopped with <strong>File → Hub Control Panel → Stop My Server</strong>.</p></div>
<p>See also: <a href="/docs/access/datahub-in-the-browser.html#stopping-a-session">Stopping a Session</a></p>
<h2 id="reading-events">Reading Events</h2>
<p>Events record what the cluster did to a pod and why.</p>
<pre class="docs-code"><code class="language-bash">kubectl get events                        # everything recent in the namespace
kubectl describe pod &lt;pod-name&gt;           # the events attached to one pod
kubectl get events --field-selector involvedObject.name=&lt;pod-name&gt;</code></pre>
<p><code>kubectl describe pod</code> is usually the most useful of the three. It lists the
events at the bottom of the pod's own description, next to the resource
requests and the node assignment.</p>
<h3 id="event-retention">Event Retention</h3>
<p>Kubernetes keeps events for about an hour by default, so a session that ended
overnight may have no events left to show by morning. For unattended work, a
log file is the durable record, not the event stream.
<a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a> covers logging.</p>
<h2 id="ordinary-pod-events">Ordinary Pod Events</h2>
<p>Most events are unrelated to reservations. The reason strings in this table
are standard Kubernetes vocabulary and mean the same here as on any Kubernetes
cluster.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Reason</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Scheduled</code></td>
<td>The scheduler picked a node. The pod is about to start.</td>
</tr>
<tr>
<td><code>FailedScheduling</code></td>
<td>No node could take the pod. For a GPU pod, this event is normal until the reservation system admits the pod (<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>).</td>
</tr>
<tr>
<td><code>Pulling</code>, <code>Pulled</code></td>
<td>The image is being fetched. A large custom image can spend minutes in this state.</td>
</tr>
<tr>
<td><code>Started</code>, <code>Killing</code></td>
<td><code>Started</code>: the container started. <code>Killing</code>: the container is being stopped.</td>
</tr>
<tr>
<td><code>OOMKilled</code> (pod status)</td>
<td>The memory limit was reached. <a href="/docs/running-jobs/launch-sh-reference.html#resource-requests-and-limits">Resource Requests and Limits</a> describes memory requests and limits.</td>
</tr>
<tr>
<td><code>DeadlineExceeded</code> (pod status)</td>
<td>The runtime limit was reached. See <a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a>.</td>
</tr>
</tbody>
</table></div>
<h2 id="reservation-events">Reservation Events</h2>
<p>The reservation system writes 18 events of its own about GPU pods. Each is a
full sentence that states what happened and what to do, and the <strong>From</strong> column
of <code>kubectl describe pod</code> reads <code>gpu-reservation-controller</code>.
<a href="/docs/reference/reservation-events.html">Reservation Events</a> defines all 18:</p>
<ul>
<li>While a pod waits: <code>WaitingForReservation</code>, <code>ReservationFull</code>,
  <code>ReservationTooSmall</code>, <code>OnDemandLeaseDenied</code>, <code>OnDemandLeaseRejected</code>,
  <code>OnDemandAdmissionPaused</code>, <code>UnknownGpuClass</code>, <code>NoReservation</code>,
  <code>AnnotationIgnored</code>, <code>NoMatchingNode</code>, <code>WaitingForNode</code>.</li>
<li>When a pod is admitted: <code>RuntimeGuaranteed</code>, <code>ReservationRelinked</code>,
  <code>OverstayRelinked</code>, <code>BestEffortAdmitted</code>.</li>
<li>When a pod is stopped: <code>Preempted</code>, <code>ReservationCancelled</code>,
  <code>ReservationReassigned</code>.</li>
</ul>
<p>The three stopping events are type <code>Normal</code> and are written just before the pod
is deleted. Read them with <code>kubectl get events</code>.</p>
<h2 id="reservation-annotations">Reservation Annotations</h2>
<p>The reservation system also writes annotations on each GPU pod it admits.
<code>kubectl describe pod</code> lists them under <strong>Annotations</strong>. They are informational:
the reservation system does not read them back.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Annotation</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>galends/booking-reference</code></td>
<td><code>res-</code> and the ID of the reservation the pod runs under</td>
</tr>
<tr>
<td><code>galends/reservation-kind</code></td>
<td><code>booking</code> or <code>on_demand</code></td>
</tr>
<tr>
<td><code>galends/reservation-start</code>, <code>galends/reservation-end</code></td>
<td>The reservation's own window</td>
</tr>
<tr>
<td><code>galends/reservation-gpu-count</code></td>
<td>The number of GPUs the reservation holds, which can be more than the pod uses</td>
</tr>
<tr>
<td><code>galends/gpu-class-name</code></td>
<td>The class's name in the reservation app</td>
</tr>
<tr>
<td><code>galends/admitted-at</code></td>
<td>When the pod was first admitted</td>
</tr>
<tr>
<td><code>galends/guaranteed-until</code></td>
<td>The end of the runtime guarantee. It moves later when a directly following booking is added</td>
</tr>
<tr>
<td><code>galends/guarantee-status</code></td>
<td><code>guaranteed</code>, or <code>overstay</code> once the guarantee has ended</td>
</tr>
<tr>
<td><code>galends/pod-runtime-limit-seconds</code></td>
<td>The length of the guarantee in seconds, when it was last recorded. Nothing enforces it</td>
</tr>
<tr>
<td><code>galends/termination-warning-at</code>, <code>-risk</code>, <code>-message</code></td>
<td>Present only while the pod is at risk of preemption. See <a href="/docs/running-jobs/checkpointing.html#the-termination-warning">The Termination Warning</a></td>
</tr>
</tbody>
</table></div>
<p>Timestamps are UTC, in the form <code>2026-09-23T17:00:00Z</code>; only the prose of
<code>termination-warning-message</code> is in Pacific time. <code>guaranteed-until</code> and
<code>guarantee-status</code> are refreshed about every 5 minutes. When the pod moves onto
another reservation, the reservation annotations change with it.</p>
<h2 id="reading-an-event-alongside-the-session">Reading an Event Alongside the Session</h2>
<p>Events are read together with the pod's status and the job's own logs.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Observation</th>
<th>Interpretation</th>
</tr>
</thead>
<tbody>
<tr>
<td>The session ended with no event and no error</td>
<td>The session was most likely idle-culled. A warning comes first, saved work survives, and the ending is not a crash. See <a href="/docs/gpu-access/what-ends-a-session.html">What Ends a Session</a>.</td>
</tr>
<tr>
<td>The session never started</td>
<td>The cause is a scheduling problem. The events at the bottom of the <code>kubectl describe pod</code> output show it.</td>
</tr>
<tr>
<td>The session ended mid-run with a reservation event</td>
<td><code>Preempted</code> is a capacity outcome rather than a fault; <code>ReservationCancelled</code> and <code>ReservationReassigned</code> mean the reservation was cancelled or given to someone else. See <a href="/docs/reference/reservation-events.html#events-when-a-pod-is-stopped">Events When a Pod Is Stopped</a>.</td>
</tr>
<tr>
<td>The session ended mid-run with no event or error anywhere</td>
<td>Report it to ITS with the pod name, the node from the launch output, and the approximate time. See <a href="/docs/reference/getting-help.html#support-contacts">Support Contacts</a>.</td>
</tr>
</tbody>
</table></div>
<p><a href="/docs/reference/error-messages.html">Error Messages</a> covers
why a session ended without assuming Kubernetes knowledge.</p>
