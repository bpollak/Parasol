---
title: "Running Jobs"
path: /docs/running-jobs/index.html
description: "Use launch.sh on the login node for work the browser does not cover: more CPU or memory than the course menu offers, a GPU class the menu does not include…"
eyebrow: "Running Jobs"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/running-jobs/), preview build of 2026-09-29"
canonicalUrl: /docs/running-jobs/index.html
legacyUrl: https://dsmlp-docs.ucsd.edu/running-jobs/
format: html
---
<p>Use <code>launch.sh</code> on the login node for work the browser does not cover: more CPU
or memory than the course menu offers, a GPU class the menu does not include,
or a job that keeps running after you disconnect. Start here to launch a
container, watch it while it runs, and make a long run resumable after an
interruption.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Page</th>
<th>Covers</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a></td>
<td>Invocation and wrapper scripts, default resources and resource tiers, resource requests and limits, and the resource, GPU, image, workspace, placement, and job execution flags.</td>
</tr>
<tr>
<td><a href="/docs/running-jobs/job-modes-and-limits.html">Job Modes, Runtime Limits &amp; Configuration</a></td>
<td>Interactive, background, and batch job modes; running several jobs at once; the runtime limit and raising it; and configuring a launch with environment variables.</td>
</tr>
<tr>
<td><a href="/docs/running-jobs/watching-your-job.html">Watching a Running Job</a></td>
<td>Monitoring CPU, memory, and GPU use from the browser, from a shell inside the container, and from TensorBoard or another dashboard; memory limits and <code>OOMKilled</code>; checking on a detached job; and listing and stopping sessions.</td>
</tr>
<tr>
<td><a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a></td>
<td>Causes of an interrupted run, resumable and atomic checkpoints, checkpoint frequency, the termination warning, resuming, and logging for unattended jobs.</td>
</tr>
<tr>
<td><a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a></td>
<td>Scope of support, the namespace and <code>kubectl</code>, running a service from a manifest, multi-pod topologies, and the pod and reservation events a session emits.</td>
</tr>
</tbody>
</table></div>
<hr>
