---
title: PARASOL
path: /index.html
description: PARASOL is UC San Diego's shared GPU and data science computing platform for coursework, student projects, and research. It was formerly called DSMLP.
lastReviewed: 2026-10-24
audiences: [students, instructors, teaching-assistants, researchers, faculty]
source: DSMLP documentation (dsmlp-docs-preview.ucsd.edu, build of 2026-09-29) and the Halıcıoğlu School PARASOL announcement draft of 2026-10-28
canonicalUrl: /index.html
landingHub: true
---

<section class="hub-section hub-section-intro dsmlp-intro" aria-labelledby="home-intro-heading">
<div class="row hub-split hub-split-align-center">
<div class="col-md-6 hub-split-copy">
<p class="home-kicker">For students, instructors, and researchers</p>
<h1 id="home-intro-heading">Computing for every course that needs it</h1>
<p class="hub-lede">PARASOL gives UC San Diego students and instructors Jupyter, RStudio, and GPUs for scheduled classes, independent study, and student projects. Researchers use the same cluster for work outside a course.</p>
<p>PARASOL, the Platform for Applied Research, Analytics, Science and Open Learning, is the new name for the Data Science and Machine Learning Platform (DSMLP). Your account, your files, and the Datahub address are the same as before.</p>
<p class="dsmlp-intro-actions"><a class="btn btn-primary" href="https://datahub.ucsd.edu">Open Datahub</a> <a class="btn btn-default" href="https://reserve.dsmlp.ucsd.edu/">Reserve a GPU</a> <a class="btn btn-default" href="/get-started/index.html">Find your starting page</a></p>
</div>
<div class="col-md-6 hub-split-media">
<figure class="dsmlp-platform-map" aria-describedby="home-platform-caption">
<p class="dsmlp-map-label">How you reach PARASOL</p>
<div class="dsmlp-map-entry">
<article><span class="glyphicon glyphicon-blackboard" aria-hidden="true"></span><strong>Datahub</strong><small>Jupyter and RStudio in the browser at datahub.ucsd.edu</small></article>
<article><span class="glyphicon glyphicon-console" aria-hidden="true"></span><strong>Command line</strong><small>SSH, launch.sh, batch jobs, and VS Code</small></article>
</div>
<div class="dsmlp-map-connector" aria-hidden="true"><span>Launch a session</span><i></i></div>
<div class="dsmlp-map-core"><span class="glyphicon glyphicon-tasks" aria-hidden="true"></span><div><p>Shared cluster</p><strong class="dsmlp-map-core-name">PARASOL</strong><ul><li>Containers</li><li>CPU and GPU</li><li>Storage</li><li>Datasets</li></ul></div></div>
<div class="dsmlp-map-connector" aria-hidden="true"><span>Supports</span><i></i></div>
<div class="dsmlp-map-outcomes"><span>Courses and student projects</span><span>Approved research</span></div>
<figcaption id="home-platform-caption">People reach PARASOL through Datahub in a browser or from a terminal. Each session runs in its own container on the shared cluster, with CPU, GPU, storage, and datasets for coursework, student projects, and approved research.</figcaption>
</figure>
</div>
</div>
</section>

<section class="hub-section" aria-labelledby="home-usage-heading">
<div class="hub-heading"><p class="home-kicker">2025-26 academic year</p><h2 id="home-usage-heading">More than 140 classes ran on the platform last year</h2></div>
<ul class="row agent-metric-grid" aria-label="Platform use in the 2025-26 academic year">
<li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">140+</strong><span class="agent-metric-label">Classes</span><span class="agent-metric-note">From introductory data science to graduate machine learning</span></div></li>
<li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">18,000</strong><span class="agent-metric-label">Student enrollments</span><span class="agent-metric-note">Across every course that used the platform</span></div></li>
<li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">75</strong><span class="agent-metric-label">Instructors</span><span class="agent-metric-note">Teaching with Datahub and PARASOL</span></div></li>
</ul>
</section>

<!-- AGENT_SECTION: ux-home-starting-points -->
<section class="hub-section hub-section-dark hub-full-bleed" aria-labelledby="home-start-heading">
<div class="container">
<div class="hub-heading"><p class="home-kicker">Get started</p><h2 id="home-start-heading">Pick the page for your role</h2><p>Each guide assumes only what that reader needs and links to the technical detail when you want it.</p></div>
<div class="row hub-action-grid hub-action-grid-three">
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-education" aria-hidden="true"></span><h3>I am taking a course</h3><p>Sign in to Datahub, open your course environment, and save your work where it lasts.</p><a href="/get-started/student-in-a-course.html">Using Datahub in a course <span aria-hidden="true">→</span></a></article></div>
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-blackboard" aria-hidden="true"></span><h3>I teach or assist a course</h3><p>Request a course, choose its software and GPUs, manage the roster, and grade notebooks.</p><a href="/get-started/instructor-or-ta.html">Teaching with PARASOL <span aria-hidden="true">→</span></a></article></div>
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-flash" aria-hidden="true"></span><h3>I have a project or do research</h3><p>Request access for independent study, a capstone, solo research, or a whole lab.</p><a href="/get-started/index.html#research-and-projects">Projects and research <span aria-hidden="true">→</span></a></article></div>
</div>
</div>
</section>
<!-- END_AGENT_SECTION -->

<section class="hub-section" aria-labelledby="home-gpu-heading">
<div class="row hub-split hub-split-align-center">
<div class="col-md-7 hub-split-copy">
<p class="home-kicker">New for fall 2026</p>
<h2 id="home-gpu-heading">GPUs now run on reservations</h2>
<p>Every GPU session runs under a reservation. Book a window ahead of time in the reservation app, or launch on demand and the system creates a lease for you. Both draw on your workspace's Service Unit budget, so there is no free exploratory launch.</p>
<p>The Halıcıoğlu School of Data Science and Computing added four GPU servers with 32 NVIDIA RTX PRO 6000 Blackwell GPUs this fall, nearly quadrupling peak capacity for instruction.</p>
<p><a class="btn btn-primary" href="/docs/gpu-access/reservations.html">How reservations work</a> <a class="btn btn-default" href="/about/why-parasol.html">Why PARASOL exists</a></p>
</div>
<div class="col-md-5 hub-split-media">
<aside class="dsmlp-resource-panel" aria-labelledby="home-gpu-links-heading"><p class="home-kicker">Before you launch a GPU session</p><h3 id="home-gpu-links-heading">Read these first</h3><ul><li><a href="/docs/gpu-access/gpu-classes.html">GPU classes and their sizes</a></li><li><a href="/docs/gpu-access/service-units-and-budgets.html">Service Units and budgets</a></li><li><a href="/docs/gpu-access/what-ends-a-session.html">What ends a session</a></li><li><a href="/docs/running-jobs/checkpointing.html">Checkpointing long runs</a></li></ul></aside>
</div>
</div>
</section>

<!-- AGENT_SECTION: ux-home-ecosystem -->
<section class="hub-section hub-section-sand hub-full-bleed" aria-labelledby="home-rename-heading">
<div class="container">
<div class="hub-heading"><p class="home-kicker">From DSMLP to PARASOL</p><h2 id="home-rename-heading">What the new name changes</h2><p>The name and the documentation home are new. The platform, its accounts, and its addresses are the ones you already use.</p></div>
<div class="row hub-number-grid hub-number-grid-light">
<div class="col-sm-6 col-md-3"><article><span>01</span><h3>Same sign-in</h3><p>Use your UC San Diego account at datahub.ucsd.edu, as before.</p></article></div>
<div class="col-sm-6 col-md-3"><article><span>02</span><h3>Same files</h3><p>Home directories, shared course space, and datasets did not move.</p></article></div>
<div class="col-sm-6 col-md-3"><article><span>03</span><h3>Same commands</h3><p>dsmlp-login.ucsd.edu and launch.sh still work. Hostnames keep the old name.</p></article></div>
<div class="col-sm-6 col-md-3"><article><span>04</span><h3>One documentation site</h3><p>Every DSMLP documentation page now lives here.</p></article></div>
</div>
<p class="hub-section-cta"><a href="/about/from-dsmlp-to-parasol.html">Read the full list of what changed <span aria-hidden="true">→</span></a></p>
</div>
</section>
<!-- END_AGENT_SECTION -->

<nav class="hub-section hub-link-panel" aria-labelledby="home-docs-heading"><div class="hub-heading"><p class="home-kicker">Documentation</p><h2 id="home-docs-heading">Look something up</h2></div><div class="row hub-link-columns"><div class="col-sm-6 col-md-4"><a href="/docs/access/index.html"><strong>Access</strong><span>Datahub, the login node, and remote editors</span></a></div><div class="col-sm-6 col-md-4"><a href="/docs/workspaces-and-storage/index.html"><strong>Workspaces and storage</strong><span>Directories, quotas, and moving data</span></a></div><div class="col-sm-6 col-md-4"><a href="/docs/running-jobs/index.html"><strong>Running jobs</strong><span>launch.sh, job modes, and monitoring</span></a></div><div class="col-sm-6 col-md-4"><a href="/docs/gpu-access/index.html"><strong>GPU access</strong><span>Classes, reservations, and budgets</span></a></div><div class="col-sm-6 col-md-4"><a href="/docs/environments/index.html"><strong>Environments</strong><span>Standard images and custom containers</span></a></div><div class="col-sm-6 col-md-4"><a href="/docs/reference/error-messages.html"><strong>Error messages</strong><span>What a message means and how to fix it</span></a></div></div></nav>

<section class="hub-section hub-subscribe" aria-labelledby="home-help-heading"><div class="row hub-split hub-split-align-center"><div class="col-md-8"><p class="home-kicker">Support</p><h2 id="home-help-heading">Ask the Datahub team</h2><p>Students in a course should ask their instructor or TA first. For anything about the platform itself, email datahub@ucsd.edu. Instructors and TAs can book a one-on-one consultation.</p></div><div class="col-md-4"><p><a class="btn btn-primary" href="/support/index.html">Get help</a></p></div></div></section>
