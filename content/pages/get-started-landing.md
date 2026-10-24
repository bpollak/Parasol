---
title: Get Started
path: /get-started/index.html
description: Find the PARASOL guide for your role, whether you take a course, teach one, run a student project, or do research, and learn how access is granted.
eyebrow: Get started
heroDescription: Each guide is written for one kind of reader and says up front what it assumes you already know.
lastReviewed: 2026-10-24
audiences: [students, instructors, teaching-assistants, researchers, faculty]
source: DSMLP documentation overview "Where to Begin" (2026-09-29 build) and each audience guide
canonicalUrl: /get-started/index.html
landingHub: true
bannerImage: /_images/hero-abstract/learn.webp
bannerPosition: center
bannerMode: abstract
---

<section class="hub-section hub-section-intro" aria-labelledby="start-coursework-heading">
<div class="hub-heading"><p class="home-kicker">Coursework</p><h2 id="start-coursework-heading">Taking or teaching a course</h2><p>Course access comes from the roster. Students do not request anything. Instructors request the course workspace before the term starts.</p></div>
<div class="row hub-action-grid hub-action-grid-three">
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-education" aria-hidden="true"></span><h3>Using Datahub in a Course</h3><p>For students enrolled in a course that uses Datahub. Assumes a web browser and nothing else.</p><a href="/get-started/student-in-a-course.html">Start in the browser <span aria-hidden="true">→</span></a></article></div>
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-console" aria-hidden="true"></span><h3>Working from the Command Line</h3><p>For students whose course needs SSH, launch.sh, batch jobs, VS Code, or a GPU class the course menu lacks. Assumes a terminal.</p><a href="/get-started/working-from-the-command-line.html">Start in a terminal <span aria-hidden="true">→</span></a></article></div>
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-blackboard" aria-hidden="true"></span><h3>Teaching with PARASOL</h3><p>For instructors and TAs, from requesting a course to grading its notebooks. Assumes a browser for most tasks.</p><a href="/get-started/instructor-or-ta.html">Set up a course <span aria-hidden="true">→</span></a></article></div>
</div>
</section>

<!-- AGENT_SECTION: ux-get-started-projects -->
<section class="hub-section hub-section-dark hub-full-bleed" id="research-and-projects" aria-labelledby="start-projects-heading">
<div class="container">
<div class="hub-heading"><p class="home-kicker">Projects and research</p><h2 id="start-projects-heading">Working outside a scheduled course</h2><p>A project or research workspace is separate from any course workspace. It has its own eligibility, resources, and access dates. These guides assume you are comfortable in a shell.</p></div>
<div class="row hub-action-grid hub-action-grid-three">
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-flash" aria-hidden="true"></span><h3>Projects and Independent Study</h3><p>For independent study, capstones, and club or team projects. Explains eligibility and the request form.</p><a href="/get-started/student-project.html">Request project access <span aria-hidden="true">→</span></a></article></div>
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-search" aria-hidden="true"></span><h3>Research on PARASOL</h3><p>For graduate students, postdocs, undergraduates, and staff researchers working without a lab workspace.</p><a href="/get-started/individual-researcher.html">Start your research <span aria-hidden="true">→</span></a></article></div>
<div class="col-md-4"><article class="panel panel-default hub-action-card"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><h3>Setting Up a Research Lab</h3><p>For faculty arranging access for a group. IT Services staff carry out some of the steps.</p><a href="/get-started/faculty-research-lab.html">Set up a lab <span aria-hidden="true">→</span></a></article></div>
</div>
</div>
</section>
<!-- END_AGENT_SECTION -->

<section class="hub-section" aria-labelledby="start-access-heading">
<div class="dsmlp-access-pathway" aria-labelledby="start-access-heading">
<div class="dsmlp-access-pathway-heading"><p class="home-kicker">Eligibility and access</p><h2 id="start-access-heading">How each group gets access</h2></div>
<ol>
<li><span aria-hidden="true">1</span><div><strong>Students in a course</strong><p>Access arrives through the course roster. Enrollment changes reach PARASOL by 10 a.m. the day after the change. See <a href="/docs/access/when-access-starts-and-ends.html">When Access Starts and Ends</a>.</p></div></li>
<li><span aria-hidden="true">2</span><div><strong>Instructors</strong><p>Request the course through the <a href="https://support.ucsd.edu/its?id=sc_cat_item_guide&amp;sys_id=dc1afcd51b152910484f968f034bcb8b&amp;sysparm_category=90e152651b19a910484f968f034bcbf0">Specialized Instructional Computing Course Request</a>. See <a href="/get-started/instructor-or-ta.html#requesting-a-course">Requesting a Course</a>.</p></div></li>
<li><span aria-hidden="true">3</span><div><strong>Student projects and independent study</strong><p>Submit the <a href="https://go.ucsd.edu/2wc5gH0">Independent Study Request</a> with the project scope and what it needs to run. See <a href="/get-started/student-project.html#eligibility--requesting-access">Eligibility and Requesting Access</a>.</p></div></li>
<li><span aria-hidden="true">4</span><div><strong>Researchers and labs</strong><p>Ask <a href="https://research-it.ucsd.edu/computing/index.html">Research IT</a> whether PARASOL fits the project, then follow the research guides above.</p></div></li>
</ol>
<p class="dsmlp-access-pathway-note"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Not sure which applies? Email <a href="mailto:datahub@ucsd.edu">datahub@ucsd.edu</a>.</p>
</div>
</section>

<section class="hub-section hub-section-sand hub-full-bleed" aria-labelledby="start-first-heading">
<div class="container">
<div class="hub-heading"><p class="home-kicker">Before your first session</p><h2 id="start-first-heading">Rules that apply to everyone</h2></div>
<div class="row hub-number-grid hub-number-grid-light">
<div class="col-sm-6 col-md-3"><article><span>01</span><h3>No root access</h3><p>Containers run as you, without sudo. Install packages in your own environment. <a href="/docs/environments/customizing-your-environment.html">How to customize</a></p></article></div>
<div class="col-sm-6 col-md-3"><article><span>02</span><h3>Launch, then compute</h3><p>The login node only launches jobs and moves files. Run your work in a session. <a href="/docs/access/the-login-node.html">About the login node</a></p></article></div>
<div class="col-sm-6 col-md-3"><article><span>03</span><h3>GPUs cost Service Units</h3><p>Booked or on demand, a GPU session draws on your budget. <a href="/docs/gpu-access/service-units-and-budgets.html">How budgets work</a></p></article></div>
<div class="col-sm-6 col-md-3"><article><span>04</span><h3>Idle GPUs are reclaimed</h3><p>A session that sits idle long enough is stopped. Save work as you go. <a href="/docs/gpu-access/what-ends-a-session.html">What ends a session</a></p></article></div>
</div>
</div>
</section>
