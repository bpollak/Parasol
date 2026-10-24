---
title: "Reservation Events"
path: /docs/reference/reservation-events.html
description: "The reservation system reports what it is doing with a GPU pod through Kubernetes events on the pod."
eyebrow: "Reference"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/reference/reservation-events/), preview build of 2026-09-29"
canonicalUrl: /docs/reference/reservation-events.html
legacyUrl: https://dsmlp-docs.ucsd.edu/reference/reservation-events/
format: html
---
<p class="lead">The reservation system reports what it is doing with a GPU pod through
Kubernetes events on the pod. Each event is a full sentence that says what
happened and what to do.</p>
<dl class="docs-glance">
<div><dt>Read with</dt><dd><code>kubectl describe pod</code> and <code>kubectl get events</code></dd></div>
<div><dt>From column</dt><dd><code>gpu-reservation-controller</code></dd></div>
<div><dt>Times</dt><dd>Pacific in event messages, UTC in pod annotations</dd></div>
<div><dt>Events kept</dt><dd>About an hour by default</dd></div>
</dl>
<h2 id="reading-the-events">Reading the Events</h2>
<figure class="docs-command"><figcaption>Run on the login node</figcaption><pre class="docs-code"><code class="language-bash">kubectl describe pod &lt;pod-name&gt;      # the events at the bottom of the output
kubectl get events                   # every recent event in the namespace
kubectl get events --field-selector involvedObject.name=&lt;pod-name&gt;</code></pre></figure>
<p>In <code>kubectl describe pod</code>, the <strong>From</strong> column reads <code>gpu-reservation-controller</code>
for these events. Datahub shows the same events while a session is starting.</p>
<p>Times in event messages are Pacific time, for example
<code>2026-09-23 17:00:00 PDT</code>. Timestamps in pod annotations are UTC.</p>
<h3 id="events-for-a-deleted-pod">Events for a Deleted Pod</h3>
<p><code>Preempted</code>, <code>ReservationCancelled</code>, and <code>ReservationReassigned</code> are written
just before the pod is deleted, so <code>kubectl describe pod</code> no longer finds the
pod. Read them with <code>kubectl get events</code>. Kubernetes keeps events for about an
hour by default. All three are type <code>Normal</code>, so
<code>kubectl get events --field-selector type=Warning</code> does not show them.</p>
<h3 id="repeated-events">Repeated Events</h3>
<p>An event about a pod that is still waiting is repeated every 30 minutes while
its message stays the same, and written again at once when the message changes.
Each repeat is a separate line.</p>
<p>An <code>OnDemandLeaseDenied</code> for lack of capacity
names the current time, so its message changes on every retry and it is written
at every retry, usually every 2 to 5 minutes.</p>
<p>An event that suggests contacting
support names
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<h2 id="events-at-a-glance">Events at a Glance</h2>
<ol class="docs-flow" aria-label="The stages of a GPU pod's events">
<li><span class="docs-flow-label">Waiting</span><strong>The pod waits in <code>Pending</code></strong><p>Events such as <code>WaitingForReservation</code> and <code>OnDemandLeaseDenied</code> say why. See <a href="#events-while-a-pod-waits">Events While a Pod Waits</a>.</p></li>
<li><span class="docs-flow-label">Admitted</span><strong>The reservation system admits the pod</strong><p><code>RuntimeGuaranteed</code> gives the time its GPU is guaranteed until. See <a href="#events-when-a-pod-is-admitted">Events When a Pod Is Admitted</a>.</p></li>
<li><span class="docs-flow-label">Stopped</span><strong>The pod is deleted</strong><p><code>Preempted</code>, <code>ReservationCancelled</code>, and <code>ReservationReassigned</code> are written just before. See <a href="#events-when-a-pod-is-stopped">Events When a Pod Is Stopped</a>.</p></li>
</ol>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Event</th>
<th>Type</th>
<th>Stage</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#waitingforreservation"><code>WaitingForReservation</code></a></td>
<td>Normal</td>
<td>Waiting</td>
<td>The pod is waiting for its owner's booking to open</td>
</tr>
<tr>
<td><a href="#reservationfull"><code>ReservationFull</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>The booking is open, but the owner's other pods hold its GPUs</td>
</tr>
<tr>
<td><a href="#reservationtoosmall"><code>ReservationTooSmall</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>The pod asks for more GPUs than the booking holds</td>
</tr>
<tr>
<td><a href="#ondemandleasedenied"><code>OnDemandLeaseDenied</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>The reservation app refused an on-demand lease for the pod</td>
</tr>
<tr>
<td><a href="#ondemandleaserejected"><code>OnDemandLeaseRejected</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>The reservation app does not recognize the user, workspace, or class the pod named</td>
</tr>
<tr>
<td><a href="#ondemandadmissionpaused"><code>OnDemandAdmissionPaused</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>On-demand admission is paused for the whole GPU class</td>
</tr>
<tr>
<td><a href="#unknowngpuclass"><code>UnknownGpuClass</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>The pod's <code>gpu-class</code> label is not a known class</td>
</tr>
<tr>
<td><a href="#noreservation"><code>NoReservation</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>Nothing matches the pod, and it cannot have an on-demand lease</td>
</tr>
<tr>
<td><a href="#annotationignored"><code>AnnotationIgnored</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>An annotation on the pod was ignored, which changed the outcome</td>
</tr>
<tr>
<td><a href="#nomatchingnode"><code>NoMatchingNode</code></a></td>
<td>Warning</td>
<td>Waiting</td>
<td>The node or GPU model the pod names is not in its GPU class, so it cannot have an on-demand lease</td>
</tr>
<tr>
<td><a href="#waitingfornode"><code>WaitingForNode</code></a></td>
<td>Normal</td>
<td>Waiting</td>
<td>The node or GPU model the pod names has no free GPU, so no on-demand lease is requested yet</td>
</tr>
<tr>
<td><a href="#runtimeguaranteed"><code>RuntimeGuaranteed</code></a></td>
<td>Normal</td>
<td>Admitted</td>
<td>The pod was admitted, and its GPU is guaranteed until the time shown</td>
</tr>
<tr>
<td><a href="#reservationrelinked"><code>ReservationRelinked</code></a></td>
<td>Normal</td>
<td>Admitted</td>
<td>The running pod was moved onto another reservation, because its lease merged into a booking or its reservation was replaced</td>
</tr>
<tr>
<td><a href="#overstayrelinked"><code>OverstayRelinked</code></a></td>
<td>Normal</td>
<td>Admitted</td>
<td>The pod was running past its guarantee, and was moved onto a newer booking and is guaranteed again</td>
</tr>
<tr>
<td><a href="#besteffortadmitted"><code>BestEffortAdmitted</code></a></td>
<td>Normal</td>
<td>Admitted</td>
<td>The pod was admitted with no guarantee and no charge</td>
</tr>
<tr>
<td><a href="#preempted"><code>Preempted</code></a></td>
<td>Normal</td>
<td>Stopped</td>
<td>The pod was past its guarantee and was stopped to free its GPU</td>
</tr>
<tr>
<td><a href="#reservationcancelled"><code>ReservationCancelled</code></a></td>
<td>Normal</td>
<td>Stopped</td>
<td>The reservation the pod ran under was cancelled, and the pod was deleted</td>
</tr>
<tr>
<td><a href="#reservationreassigned"><code>ReservationReassigned</code></a></td>
<td>Normal</td>
<td>Stopped</td>
<td>The booking was given to another user, and the pod was deleted</td>
</tr>
</tbody>
</table></div>
<h2 id="events-while-a-pod-waits">Events While a Pod Waits</h2>
<p>A GPU pod waits in <code>Pending</code> until the reservation system admits it. While it
waits, <code>kubectl describe pod</code> also shows a <code>FailedScheduling</code> event from the
Kubernetes scheduler. That scheduler event is normal for every GPU pod that has
not been admitted yet, and does not mean the label is wrong or the cluster is
full. See
<a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a>.</p>
<h3 id="waitingforreservation"><code>WaitingForReservation</code></h3>
<p>Type <code>Normal</code>. The pod matches one of its owner's bookings, and the booking has
not opened yet. The pod is admitted within about 5 minutes of the opening.
Nothing needs to change.</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">Waiting for your GPU reservation #4127 (1 x medium, 2026-09-23 09:00:00 PDT to 2026-09-23 17:00:00 PDT) to open; this pod will be admitted shortly after it does.</code></pre></figure>
<p><a href="/docs/gpu-access/reservations.html#launching-before-the-window-opens">Launching Before the Window Opens</a>
gives how far before a booking a pod waits for it, rather than starting on an
on-demand lease.</p>
<h3 id="reservationfull"><code>ReservationFull</code></h3>
<p>Type <code>Warning</code>. The pod was waiting for its booking, but when the booking opened
the owner's other pods held its GPUs. The message names those pods when they
are in the same namespace. The pod is admitted if a GPU frees up.</p>
<p>On PARASOL, the
reservation system re-checks a waiting pod within about 10 minutes, and a pod
that still does not fit its booking is then given an on-demand lease, charged
separately. <strong>Stop one of the named pods</strong> with <code>kubectl delete pod &lt;pod-name&gt;</code> to
free a GPU for the booking.</p>
<p>An account can hold 1 GPU at a time by default, across all its pods, and a
launch that would take it past that is refused. This event therefore arises
only where ITS has raised the account's GPU limit. See
<a href="/docs/running-jobs/launch-sh-reference.html#resource-tiers">Resource Tiers</a>.</p>
<h3 id="reservationtoosmall"><code>ReservationTooSmall</code></h3>
<p>Type <code>Warning</code>. The pod requests more GPUs than its booking holds, so the
booking can never admit it. Two bookings are never combined for one pod. On
PARASOL this event is not expected: a pod that asks for more GPUs than its booking
holds is given an on-demand lease, charged separately, instead of waiting. See
<a href="/docs/gpu-access/reservations.html#claiming-a-booking">Claiming a Booking</a>.</p>
<h3 id="ondemandleasedenied"><code>OnDemandLeaseDenied</code></h3>
<p>Type <code>Warning</code>. The pod has no booking open, so the reservation system asked
the reservation app for an on-demand lease, and the app refused. The message
quotes the app's reason word for word, then says whether waiting can help:</p>
<figure class="docs-command"><figcaption>Refused for capacity</figcaption><pre class="docs-code"><code class="language-text">On-demand GPU lease for 1 x medium was denied by the reservation service: Only 0 GPU(s) available at 2026-09-23 19:07. The pod stays Pending; the controller will keep retrying.</code></pre></figure>
<figure class="docs-command"><figcaption>Refused for budget</figcaption><pre class="docs-code"><code class="language-text">On-demand GPU lease for 1 x medium was denied by the reservation service: This lease costs 1.16667 SU but user 'jsmith' has only 0.5 of 10 SU remaining (currently using 9.5). The pod stays Pending; the controller will keep retrying, and the reservation service expects this to clear by 2026-09-28 00:00:00 PDT.</code></pre></figure>
<figure class="docs-command"><figcaption>Refused for the class grant</figcaption><pre class="docs-code"><code class="language-text">On-demand GPU lease for 1 x medium was denied by the reservation service: GPU class not accessible under this group. Waiting will not change this: the pod stays Pending until its request changes or an administrator changes what refused it. If the reason looks wrong, contact support: datahub@ucsd.edu</code></pre></figure>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Message ends</th>
<th>Meaning</th>
<th>The request is retried</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>will keep retrying.</code></td>
<td>The refusal can clear by itself, as GPUs or budget free up</td>
<td>Every 2 to 5 minutes</td>
</tr>
<tr>
<td><code>expects this to clear by &lt;time&gt;.</code></td>
<td>The refusal clears at a known time, such as the start of the next budget window</td>
<td>At that time, or every 30 minutes until then</td>
</tr>
<tr>
<td><code>Waiting will not change this: …</code></td>
<td>The request itself is refused, whatever else is running</td>
<td>At lengthening intervals, up to every 30 minutes</td>
</tr>
</tbody>
</table></div>
<p>In every case the pod stays <code>Pending</code>. Nothing fails the pod or deletes it.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Reason quoted</th>
<th>Meaning</th>
<th>Waiting helps</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Only N GPU(s) available at …</code></td>
<td>The class has too few free GPUs at that time</td>
<td>Yes, unless the pod asks for more GPUs than the class has</td>
</tr>
<tr>
<td><code>Only N GPU(s) available for this group at … (group ceiling: …)</code></td>
<td>The workspace already holds its GPU limit for the class. Figures such as <code>borrowed</code> and <code>buffer</code> in the brackets describe idle capacity the workspace could borrow</td>
<td>Yes, as other members' jobs end, unless the pod asks for more GPUs than the limit and the idle capacity together</td>
</tr>
<tr>
<td><code>Only N GPU(s) available for this cohort at … (cohort ceiling: …)</code></td>
<td>The workspaces that share capacity with this one hold all of it. See <a href="/docs/gpu-access/quotas-and-availability.html#cohorts">Cohorts</a></td>
<td>Yes, unless the pod asks for more GPUs than the ceiling and the idle capacity together</td>
</tr>
<tr>
<td><code>This lease costs X SU but user '…' has only Y of Z SU remaining …</code></td>
<td>The Service Unit (SU) budget cannot cover the lease</td>
<td>Yes, when the budget window renews, unless X is more than Z</td>
</tr>
<tr>
<td><code>This lease costs X SU but the group pool only has …</code></td>
<td>The workspace's shared SU pool is spent</td>
<td>Yes, when the budget window renews, unless the lease costs more than the whole pool</td>
</tr>
<tr>
<td><code>User '…' is not a member of group '…'</code></td>
<td>The user is not enrolled in the workspace the pod named</td>
<td>No. Launch with <code>-W</code> naming a workspace the user belongs to, or ask the instructor or TA to check the roster</td>
</tr>
<tr>
<td><code>GPU class not accessible under this group</code></td>
<td>The workspace was not granted this class</td>
<td>No. Use a class the workspace was granted</td>
</tr>
<tr>
<td><code>Exceeds limit of N GPU(s) per reservation</code></td>
<td>The pod asks for more GPUs than the class allows in one reservation</td>
<td>No. Launch with fewer GPUs</td>
</tr>
<tr>
<td><code>This lease runs H hours but group '…' limits a single reservation to N hours.</code></td>
<td>The lease would be longer than the workspace's length cap</td>
<td>No</td>
</tr>
<tr>
<td><code>Group '…' is not active on …</code></td>
<td>The workspace named is outside its active dates on the date named</td>
<td>Only if the workspace's dates have not started yet. The message then names when the refusal clears</td>
</tr>
</tbody>
</table></div>
<p>Where the message says waiting will not change the outcome, delete the pod with
<code>kubectl delete pod &lt;pod-name&gt;</code> and launch again with the request corrected, for
example with <code>-W</code> naming the right workspace, another class, or fewer GPUs.
Where the refusal comes from a workspace setting, such as its class grant or its
length cap, an administrator can change the setting instead. The waiting pod is
then checked again within 30 minutes, and can start without a new launch.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A pod left <code>Pending</code> keeps being retried, whatever its message says. When the
lease is granted, the pod starts and Service Units are charged, even if nobody
is waiting for it any more. Delete a pending GPU pod that is no longer wanted.</p></div>
<p>See also: <a href="/docs/gpu-access/quotas-and-availability.html#waiting-for-an-on-demand-lease">Waiting for an On-Demand Lease</a></p>
<h3 id="ondemandleaserejected"><code>OnDemandLeaseRejected</code></h3>
<p>Type <code>Warning</code>. The reservation app does not recognize the user, the workspace,
or the GPU class the lease request named. The user is the pod's namespace, and
the workspace comes from the pod's <code>dsmlp/course</code> label, which <code>launch.sh</code> sets
from <code>-W</code>, or is <code>ORG_ON_DEMAND</code> when the pod names no course. The message
states both, and names any booking the user holds under a different workspace.
Waiting does not fix this. Launch again with the correct <code>-W</code> workspace, or
correct the label in a manifest. If the values look right, contact
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<h3 id="ondemandadmissionpaused"><code>OnDemandAdmissionPaused</code></h3>
<p>Type <code>Warning</code>. On-demand admission is paused for the whole GPU class, so no
lease is requested. The message gives one of three causes:</p>
<ul>
<li>No nodes of the class are available, for example during maintenance.</li>
<li>The class has fewer GPUs online than the reservation app expects, for example
  when a node is down.</li>
<li>Pods that already hold a reservation for the class are still waiting to be
  placed. Pods with a reservation go first. A pod waiting only for a node or
  GPU model it named, while other nodes of the class have room, does not cause
  this pause.</li>
</ul>
<p>Nothing about the pod needs to change. Leave it in place. The on-demand queue is
ordered by pod creation time, so deleting and recreating the pod moves it to the
back. If the pause lasts, contact
<a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<h3 id="unknowngpuclass"><code>UnknownGpuClass</code></h3>
<p>Type <code>Warning</code>. The pod's <code>gpu-class</code> label names no class the reservation app
knows, so nothing can admit the pod. The message lists the known classes.
Labels are case-sensitive. Correct the label and recreate the pod.</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">This pod's gpu-class label is Medium, which is not a GPU class the reservation service knows, so no reservation can match it and it cannot be admitted on demand. Known classes: large, medium, small, xlarge, xsmall. Correct the label and recreate the pod; if it is right, contact support: datahub@ucsd.edu</code></pre></figure>
<h3 id="noreservation"><code>NoReservation</code></h3>
<p>Type <code>Warning</code>. No booking matches the pod, and the pod does not qualify for an
on-demand lease. The message lists why, and names any booking the user holds for
another class or another workspace. Correct the pod and recreate it, or book a
window for the class. See
<a href="/docs/gpu-access/reservations.html#claiming-a-booking">Claiming a Booking</a>. On
PARASOL, where every pod with a class label qualifies for an on-demand lease, this
event is not expected.</p>
<h3 id="annotationignored"><code>AnnotationIgnored</code></h3>
<p>Type <code>Warning</code>. An annotation on the pod was invalid or asked for something
PARASOL does not offer, and ignoring it changed what happens. The common case is a
request for best-effort admission, which is not enabled on PARASOL: the pod is
admitted on an ordinary on-demand lease and charged for it. See
<a href="/docs/gpu-access/reservations.html#best-effort-reservations">Best-Effort Reservations</a>.</p>
<h3 id="nomatchingnode"><code>NoMatchingNode</code></h3>
<p>Type <code>Warning</code>. The pod has no booking and names a node or a GPU model, with
<code>-n</code>, <code>-v</code>, or a node selector in a manifest, and no node of its GPU class
matches. No on-demand lease is requested. The usual causes are:</p>
<ul>
<li>a node number that does not exist</li>
<li>a node that belongs to another GPU class</li>
<li>a node that is out of service</li>
<li>a GPU model that does not back the class</li>
</ul>
<p>The message quotes the node selection and names any other GPU class whose nodes
it matches. Correct the node, the model, or the <code>gpu-class</code> label, and recreate the pod. The
reservation system checks the pod again about every 5 minutes, so a pod that
names a node out of service starts once the node returns. If the node selection
is right, contact <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
<p>A <code>medium</code> pod launched with <code>-n 30</code>, when node 30 is a <code>large</code> node, records:</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">This pod's node selector kubernetes.io/hostname=its-dsmlp-n30.ucsd.edu matches none of the N schedulable node(s) of GPU class medium, so it could not start on any of them and no on-demand lease is being requested for it. It does match nodes of GPU class large, so the pod's gpu-class label may be what is wrong. Correct the node selector or affinity and recreate the pod; if it is right, the nodes it names may be cordoned or out of service, so contact support: datahub@ucsd.edu</code></pre></figure>
<h3 id="waitingfornode"><code>WaitingForNode</code></h3>
<p>Type <code>Normal</code>. The pod has no booking and was launched with <code>-n</code> or <code>-v</code>, or
with a node selector in a manifest, and no node it allows has the GPUs it asks
for free. No on-demand lease is requested until one does, so <strong>nothing is charged
while the pod waits</strong>. The reservation system checks the pod again about every 5
minutes.</p>
<p>Other nodes of the class may be free: launching without <code>-n</code> or <code>-v</code>
lets the pod use them. A pod that names a node or a GPU model and runs under a
booking gets no such event. It holds the booking while it waits. See
<a href="/docs/running-jobs/launch-sh-reference.html#node-selection">Node Selection</a>.</p>
<p>A 1-GPU <code>medium</code> pod launched with <code>-n 30</code>, while node 30 has no free GPU,
records:</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">No node of GPU class medium that this pod's node selector kubernetes.io/hostname=its-dsmlp-n30.ucsd.edu allows has 1 GPU(s) free, so no on-demand lease is being requested yet: one would be charged while the pod waited. It is retried until one of those nodes has room. Widening or removing the node selector or affinity would let it use the class's other nodes.</code></pre></figure>
<h2 id="events-when-a-pod-is-admitted">Events When a Pod Is Admitted</h2>
<h3 id="runtimeguaranteed"><code>RuntimeGuaranteed</code></h3>
<p>Type <code>Normal</code>. The pod was admitted. Its GPU is guaranteed until the time shown,
which is the end of its reservation, extended through any booking that directly
follows it.</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">GPU access guaranteed for 1h09m59s, until 2026-09-23 10:15:11 PDT. The pod may keep running after that, but can be preempted if reserved capacity is needed.</code></pre></figure>
<p>For an on-demand lease, the guaranteed time is the requested runtime plus 10
minutes: a launch with the default 1-hour runtime reads about <code>1h10m</code>. The event
is written again each time the pod moves onto another reservation. After the
time shown, the pod keeps running unless its GPU is needed. See
<a href="/docs/gpu-access/what-ends-a-session.html#overstay">Overstay</a>.</p>
<h3 id="reservationrelinked"><code>ReservationRelinked</code></h3>
<p>Type <code>Normal</code>. The running pod was moved onto another of its owner's
reservations, and is guaranteed until the time shown. The pod was not past its
guarantee. The message gives one of two causes:</p>
<ul>
<li>An on-demand lease merged into the owner's booking when the booking opened,
  and the lease was released. This usually follows a launch made more than 30
  minutes before a booked window. See
  <a href="/docs/gpu-access/reservations.html#launching-before-the-window-opens">Launching Before the Window Opens</a>.</li>
<li>The pod's reservation was cancelled or replaced while its window was open,
  usually by an <strong>Extend</strong> in the reservation app, and the pod was carried onto
  another open booking of the same owner instead of being deleted.</li>
</ul>
<figure class="docs-command"><figcaption>A lease merged into a booking</figcaption><pre class="docs-code"><code class="language-text">Pod re-linked to GPU reservation #4213: the on-demand lease #4198 it started under was merged into it now that the reservation's window has opened, and the lease released. GPU access guaranteed until 2026-09-23 17:00:00 PDT.</code></pre></figure>
<figure class="docs-command"><figcaption>A reservation cancelled or replaced</figcaption><pre class="docs-code"><code class="language-text">Pod re-linked to GPU reservation #4213: its previous reservation #4127 was cancelled or replaced. GPU access guaranteed until 2026-09-23 17:00:00 PDT.</code></pre></figure>
<p>A new <code>RuntimeGuaranteed</code> event comes with it. Nothing needs to change.</p>
<h3 id="overstayrelinked"><code>OverstayRelinked</code></h3>
<p>Type <code>Normal</code>. The pod was running past its guarantee, and has been moved onto
an open booking of the same owner, class, and workspace. It is guaranteed again
until the time shown. The booking is usually one that opened while the pod was
overstaying, or one made by an <strong>Extend</strong> of an on-demand lease whose window
had already ended. A new <code>RuntimeGuaranteed</code> event comes with it.</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">Pod re-linked to GPU reservation #4213; no longer overstay. GPU access guaranteed until 2026-09-23 17:00:00 PDT.</code></pre></figure>
<h3 id="besteffortadmitted"><code>BestEffortAdmitted</code></h3>
<p>Type <code>Normal</code>. The pod was admitted with no runtime guarantee and no charge.
Best-effort admission is not enabled on PARASOL.</p>
<h2 id="events-when-a-pod-is-stopped">Events When a Pod Is Stopped</h2>
<h3 id="preempted"><code>Preempted</code></h3>
<p>Type <code>Normal</code>. The pod was running past its guarantee, and its GPU was needed.
The pod was deleted: <code>SIGTERM</code>, then a grace period, then a forced stop. A pod
inside its guarantee is never preempted.</p>
<figure class="docs-command"><figcaption>Preempted for a booking</figcaption><pre class="docs-code"><code class="language-text">Pod preempted to free capacity for reservation(s) starting 2026-09-23 12:00:00 PDT: overstayed its runtime guarantee by 45m03s.</code></pre></figure>
<p>The time named is when the booking that needed the GPU starts. The pod can be
stopped up to 15 minutes before that. A second form names headroom instead of a
booking:</p>
<figure class="docs-command"><figcaption>Preempted for headroom</figcaption><pre class="docs-code"><code class="language-text">Pod preempted to maintain 15% free on-demand capacity headroom for gpu class medium: overstayed its runtime guarantee by 45m03s.</code></pre></figure>
<p>Where the message ends "its runtime guarantee could no longer be resolved", the
pod's reservation had already ended or been cancelled. Warning annotations
usually appear on the pod before a preemption. See
<a href="/docs/gpu-access/what-ends-a-session.html#preemption">Preemption</a> and
<a href="/docs/running-jobs/checkpointing.html#the-termination-warning">The Termination Warning</a>.</p>
<h3 id="reservationcancelled"><code>ReservationCancelled</code></h3>
<p>Type <code>Normal</code>. The reservation the pod ran under was cancelled while its window
was open, and the pod was deleted. There is no warning beforehand.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Message</th>
<th>Who cancelled</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Pod evicted: GPU reservation cancelled by user.</code></td>
<td>The reservation's owner</td>
</tr>
<tr>
<td><code>Pod evicted: GPU reservation cancelled by another user.</code></td>
<td>A workspace manager, an administrator, or a teammate in team mode</td>
</tr>
<tr>
<td><code>Pod evicted: GPU reservation cancelled by user (reason: superseded).</code></td>
<td>An <strong>Extend</strong> replaced the reservation, and the pod could not be moved onto the new one</td>
</tr>
</tbody>
</table></div>
<p>Before deleting the pod, the reservation system moves it onto another open
booking of the same owner, where one matches and has room. A pod moved that way
keeps running and records <a href="#reservationrelinked"><code>ReservationRelinked</code></a> instead.
After an <strong>Extend</strong>, that is the usual outcome, and the <code>superseded</code> form above
is the exception.</p>
<p>Cancelling an in-progress booking in the reservation app deletes its pods. The
reservation shows as cancelled in <strong>My Reservations</strong>. For a cancellation that
was not expected, ask the workspace manager.</p>
<h3 id="reservationreassigned"><code>ReservationReassigned</code></h3>
<p>Type <code>Normal</code>. The booking was given to another user while its window was open,
usually because a teammate adopted it in team mode. The pod was deleted so that
the new owner can use the window. The message names the new owner.</p>
<figure class="docs-command"><figcaption>Example message</figcaption><pre class="docs-code"><code class="language-text">Pod evicted: GPU reservation reassigned to mlee.</code></pre></figure>
<p>See <a href="/docs/gpu-access/reservations.html#team-mode">Team Mode</a>.</p>
<h2 id="waiting-with-no-event">Waiting With No Event</h2>
<p>The reservation system writes no event in these cases. Only the scheduler's
<code>FailedScheduling</code> event appears, if any.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Situation</th>
<th>What to do</th>
</tr>
</thead>
<tbody>
<tr>
<td>The pod has no <code>gpu-class</code> label. The reservation system never sees it</td>
<td>Recreate the pod with the label. See <a href="/docs/gpu-access/gpu-classes.html#missing-or-misspelled-class-label">Missing or Misspelled Class Label</a></td>
</tr>
<tr>
<td>The pod is seconds old, and the scheduler has not yet ruled on it</td>
<td>Wait a minute</td>
</tr>
<tr>
<td>The scheduler reports a shortage the reservation system cannot fix, such as <code>Insufficient memory</code></td>
<td>Launch with smaller CPU or memory requests</td>
</tr>
<tr>
<td>The pod asks for 2 or more GPUs, which needs a raised GPU limit, and no single node has that many free</td>
<td>Wait, or ask for fewer GPUs. A pod runs on one node</td>
</tr>
<tr>
<td>The reservation app cannot be reached</td>
<td>Wait. If it lasts, contact <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a></td>
</tr>
</tbody>
</table></div>
<p>A termination warning is not an event. It is a set of annotations on the pod.
See
<a href="/docs/running-jobs/checkpointing.html#the-termination-warning">The Termination Warning</a>.</p>
