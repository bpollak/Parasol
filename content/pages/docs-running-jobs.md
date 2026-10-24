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
<p class="lead">Use <code>launch.sh</code> on the login node for work the browser does not cover: more CPU
or memory than the course menu offers, a GPU class the menu does not include,
or a job that keeps running after you disconnect. Start here to launch a
container, watch it while it runs, and make a long run resumable after an
interruption.</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-console"></span><p class="docs-card-title"><a href="/docs/running-jobs/launch-sh-reference.html"><code>launch.sh</code> Reference</a></p><p>Invocation and wrapper scripts, default resources and resource tiers, and resource requests and limits.</p><p>The flags for resources and GPUs, images and workspaces, placement, and job execution.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-time"></span><p class="docs-card-title"><a href="/docs/running-jobs/job-modes-and-limits.html">Job Modes, Runtime Limits &amp; Configuration</a></p><p>Interactive, background, and batch job modes; running several jobs at once; the runtime limit and raising it; and configuring a launch with environment variables.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-eye-open"></span><p class="docs-card-title"><a href="/docs/running-jobs/watching-your-job.html">Watching a Running Job</a></p><p>Monitoring CPU, memory, and GPU use from the browser, from a shell inside the container, and from TensorBoard or another dashboard.</p><p>Memory limits and <code>OOMKilled</code>; checking on a detached job; and listing and stopping sessions.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-floppy-disk"></span><p class="docs-card-title"><a href="/docs/running-jobs/checkpointing.html">Checkpointing &amp; Logging Long Runs</a></p><p>Causes of an interrupted run, resumable and atomic checkpoints, checkpoint frequency, the termination warning, resuming, and logging for unattended jobs.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-cloud"></span><p class="docs-card-title"><a href="/docs/running-jobs/kubernetes.html">Direct Kubernetes Use and Session Events</a></p><p>Scope of support, the namespace and <code>kubectl</code>, running a service from a manifest, multi-pod topologies, and the pod and reservation events a session emits.</p></article>
</div>
