---
title: "Checkpointing & Logging Long Runs"
path: /docs/running-jobs/checkpointing.html
description: "A container can stop for reasons unrelated to faulty code: the runtime limit, idle culling, preemption, and maintenance."
eyebrow: "Running Jobs"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/running-jobs/checkpointing/), preview build of 2026-09-29"
canonicalUrl: /docs/running-jobs/checkpointing.html
legacyUrl: https://dsmlp-docs.ucsd.edu/running-jobs/checkpointing/
format: html
---
<p>A container can stop for reasons unrelated to faulty code: the runtime limit,
idle culling, preemption, and maintenance. Checkpoint and log a long or
unattended run so that it can resume after a stop and so that its logs show
what happened.</p>
<h2 id="what-can-end-a-run">What Can End a Run</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Cause</th>
<th>Warning</th>
<th>Where it is documented</th>
</tr>
</thead>
<tbody>
<tr>
<td>The runtime limit: 6 hours by default, 12 if set at launch</td>
<td>None; the pod reports <code>DeadlineExceeded</code></td>
<td><a href="/docs/running-jobs/job-modes-and-limits.html#the-runtime-limit">The Runtime Limit</a></td>
</tr>
<tr>
<td>Idle culling, once the GPU stops being used</td>
<td>Yes; a warning comes first, and the status is recorded on the pod</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a></td>
</tr>
<tr>
<td>Preemption, once the session is past its runtime guarantee and its GPU is needed</td>
<td>Usually; about 15 minutes of notice, readable by the job itself</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#preemption">Preemption</a></td>
</tr>
<tr>
<td>Eviction, when the reservation is cancelled or given to a teammate</td>
<td>None</td>
<td><a href="/docs/gpu-access/what-ends-a-session.html#eviction">Eviction</a></td>
</tr>
<tr>
<td>Research Cluster maintenance</td>
<td>Notice in advance, not on the pod; all running jobs are terminated</td>
<td><a href="/docs/reference/policy.html#scheduled-maintenance">Scheduled Maintenance</a></td>
</tr>
</tbody>
</table></div>
<p>None of these stops indicates a fault in the code. Instructional maintenance
generally leaves running jobs alone.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>The runtime limit, an eviction, and Research Cluster maintenance are not
announced on the pod. The runtime limit stops the container at its deadline
with no prior warning and no signal to catch. Research Cluster maintenance
terminates every running job. Work that is not on disk before any of them
arrives is lost.</p></div>
<p>Preemption and idle culling are announced on the pod, where a running program
can read them. The reservation controller marks a session it may need to stop
minutes before stopping it. See
<a href="#the-termination-warning">The Termination Warning</a>. The idle culler records a
status and a projected deadline in the same way. See
<a href="#idle-culler-annotations">Idle Culler Annotations</a>.</p>
<h2 id="checkpointing">Checkpointing</h2>
<p>A <strong>checkpoint</strong> is a saved copy of enough state to resume a run, written on a
chosen schedule. For a training run, that usually means the model weights, the
optimizer state, and the epoch or step counter.
<a href="#what-a-resumable-checkpoint-contains">What a Resumable Checkpoint Contains</a>
lists the full set of components.
A job that cannot resume from a checkpoint restarts from the beginning after an
interruption.</p>
<h3 id="checkpoint-location">Checkpoint Location</h3>
<p>Write checkpoints to a home directory. Home persists between containers, and the
container and the login node share a filesystem, so a checkpoint written by a
job is readable from the login node after the pod is gone. A path inside the
container that is not a mounted directory is lost with the pod.
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#where-files-live">Where Files Live</a>
describes directory locations.</p>
<p>Do not write checkpoints into a shared or course-wide directory unintentionally.
Its quota serves the whole class, not one run.</p>
<h3 id="wall-clock-schedule">Wall-Clock Schedule</h3>
<p>Checkpointing on wall-clock time, rather than only at the end of each epoch,
bounds the work an interruption can lose. The runtime limit ends a run
regardless of epoch boundaries, and with per-epoch checkpoints an epoch that
takes 90 minutes loses 90 minutes of work at each interruption. A checkpoint
written every 15 or 30 minutes limits the loss to that interval, at little cost.</p>
<h3 id="automatic-resume">Automatic Resume</h3>
<p>A script that finds the newest checkpoint at startup and continues from it
resumes after an interruption without anyone present. A <code>--resume</code> flag has to
be supplied by hand at each restart.</p>
<h3 id="number-of-checkpoints-kept">Number of Checkpoints Kept</h3>
<p>Checkpoints are large, and home directories have quotas. See
<a href="/docs/workspaces-and-storage/your-files-and-quotas.html#workspace-and-personal-quotas">Workspace and Personal Quotas</a>.
Bound the number of checkpoints kept. The last two and the best one are usually
enough. Delete an old checkpoint only after the new one is complete. A job that
deletes the old checkpoint first can lose all saved progress to one interruption
during the save.</p>
<h2 id="what-a-resumable-checkpoint-contains">What a Resumable Checkpoint Contains</h2>
<p>A checkpoint that holds only the model weights does not resume the same run.
Each component in this table other than the weights is state the optimizer or
the data pipeline carries. Omitting one shows as a jump in the loss curve at the
point of resume.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Component</th>
<th>Call</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Model weights</td>
<td><code>model.state_dict()</code></td>
<td>Under <code>torch.compile</code> the keys gain an <code>_orig_mod.</code> prefix. Saving <code>model._orig_mod.state_dict()</code>, or stripping the prefix on load, keeps the checkpoint loadable by an uncompiled model</td>
</tr>
<tr>
<td>Optimizer</td>
<td><code>optimizer.state_dict()</code></td>
<td>The largest component. Adam and AdamW carry two <code>fp32</code> moments, so optimizer state is commonly 2-3× the model in bytes</td>
</tr>
<tr>
<td>Learning-rate scheduler</td>
<td><code>scheduler.state_dict()</code></td>
<td>Cheap to save. Without it, a warmup or cosine schedule restarts from the beginning</td>
</tr>
<tr>
<td>Mixed-precision scaler</td>
<td><code>scaler.state_dict()</code></td>
<td><code>torch.amp.GradScaler</code> holds an adaptive loss scale. A resume without it re-converges through a few skipped steps</td>
</tr>
<tr>
<td>Step and epoch counters</td>
<td>Kept by the training script</td>
<td>The position a resume is expressed in</td>
</tr>
<tr>
<td>Data position</td>
<td><code>StatefulDataLoader.state_dict()</code></td>
<td><code>torchdata</code>'s drop-in <code>DataLoader</code> replacement, which supports mid-epoch resume without replaying batches. It requires the same <code>num_workers</code> on load as on save</td>
</tr>
<tr>
<td>Random number generator state</td>
<td><code>torch.get_rng_state()</code>, <code>torch.cuda.get_rng_state_all()</code>, <code>random.getstate()</code>, <code>numpy.random.get_state()</code></td>
<td>Needed for a bit-comparable resume of dropout, augmentation, and sampling. It can be omitted where reproducibility does not matter</td>
</tr>
<tr>
<td>Averaged weights and metric state</td>
<td>Kept by the training script</td>
<td>Exponential moving averages, best-so-far metrics, early-stopping counters</td>
</tr>
</tbody>
</table></div>
<p>Store the run's configuration alongside the weights. A checkpoint saved without
its configuration cannot be identified later.</p>
<h2 id="atomic-checkpoint-writes">Atomic Checkpoint Writes</h2>
<p>An interruption can end a process while it is writing a checkpoint. Single-file
and sharded checkpoints are protected against this in different ways.</p>
<h3 id="single-file-checkpoints">Single-File Checkpoints</h3>
<p>Write a single-file checkpoint to a temporary path, flush it, then rename it.
<code>os.replace</code> is atomic within one filesystem, so the visible path always holds
either the complete old checkpoint or the complete new one, never a truncated
file:</p>
<pre class="docs-code"><code class="language-python">import os, torch

def save_atomic(state: dict, path: str) -&gt; None:
    tmp = f"{path}.tmp"
    with open(tmp, "wb") as fh:
        torch.save(state, fh)
        fh.flush()
        os.fsync(fh.fileno())      # the data is durable before the rename
    os.replace(tmp, path)          # atomic, within one filesystem only
    dfd = os.open(os.path.dirname(path) or ".", os.O_RDONLY)
    try:
        os.fsync(dfd)              # and the rename itself is durable
    finally:
        os.close(dfd)</code></pre>
<p>A checkpoint written directly to its final path and interrupted during the write
fails to load with <code>RuntimeError: unexpected EOF</code>.</p>
<h3 id="sharded-checkpoints">Sharded Checkpoints</h3>
<p>A distributed checkpoint is a directory of per-rank shards, and no atomic rename
covers all of them at once. Complete the save, then publish it, in one of two
ways:</p>
<ul>
<li>Write into a scratch directory, and rename the directory once every rank has
  finished.</li>
<li>Write an explicit <code>DONE</code> marker last, and have the resume path ignore any
  directory without one.</li>
</ul>
<p>With <code>torch.distributed.checkpoint</code>, the <code>.metadata</code> file is written after the
shards, so its absence indicates that a directory is incomplete. Depend on an
explicit marker rather than on <code>.metadata</code>.</p>
<h2 id="checkpoint-frequency">Checkpoint Frequency</h2>
<h3 id="the-youngdaly-interval">The Young/Daly Interval</h3>
<p>The Young/Daly interval is <code>sqrt(2 · C · MTBF)</code>, where <code>C</code> is the wall-clock
cost of one checkpoint and <code>MTBF</code> is the mean time between interruptions. It
balances saving so often that the saves dominate the run against saving so
rarely that each interruption costs hours.</p>
<h3 id="interval-from-checkpoint-cost">Interval from Checkpoint Cost</h3>
<p>Under a reservation system that announces its interruptions, the interval can be
set from <code>C</code> alone. A common target is checkpoint overhead below about 5% of step
time, which for a synchronous save means an interval of roughly <code>20 × C</code>. That
interval covers interruptions that are not announced, such as a node failure, an
out-of-memory kill, or a collective that times out. Announced interruptions are
covered by the warning in
<a href="#the-termination-warning">The Termination Warning</a>. A checkpoint written on the
warning limits the loss to one step rather than one interval.</p>
<p>Measure <code>C</code> once on the storage the checkpoint is actually written to, and log
the value. Assumed values of <code>C</code> are consistently optimistic.</p>
<h3 id="asynchronous-checkpoints">Asynchronous Checkpoints</h3>
<p>Where <code>C</code> is large, use asynchronous checkpointing before lengthening the
interval. <code>torch.distributed.checkpoint</code> offers <code>dcp.async_save</code>, which stages
tensors into CPU buffers and writes them from a background thread while training
continues. The blocking part of the save drops to roughly the staging copy.</p>
<p>Asynchronous saves have two costs:</p>
<ul>
<li>Host memory on the order of one checkpoint per rank.</li>
<li>Only one save may be outstanding at a time. Wait on the previous future before
  issuing the next, or the memory use multiplies.</li>
</ul>
<p>An asynchronous save that was never flushed is not a checkpoint. Wait on the
outstanding future before exiting on a preemption.</p>
<h2 id="the-termination-warning">The Termination Warning</h2>
<p>The reservation controller marks a session it may need to stop before stopping
it. The mark is a set of annotations written onto the pod. It appears only while
the session is at risk: a booking is coming due for capacity the session is
holding, or the class has less than its headroom free, and the session is one of
the candidates that could supply it. Every candidate is marked, not only the
sessions that will be stopped. See
<a href="/docs/gpu-access/what-ends-a-session.html#preemption">Preemption</a>.</p>
<h3 id="warning-timings">Warning Timings</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Timing</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>How far ahead the controller looks</td>
<td>Bookings starting in the next 30 minutes</td>
</tr>
<tr>
<td>Earliest stop for a booking</td>
<td>15 minutes before the booking starts, or the end of the session's guarantee if that is later</td>
</tr>
<tr>
<td>Usual notice</td>
<td>About 15 minutes. There is no minimum: a booking made at the last minute gives less</td>
</tr>
<tr>
<td>Earliest stop for headroom</td>
<td>15 minutes after the warning</td>
</tr>
<tr>
<td>Delay before the container can read a warning</td>
<td>About 2 minutes</td>
</tr>
</tbody>
</table></div>
<h3 id="the-runtime-guarantee">The Runtime Guarantee</h3>
<p>A session inside its runtime guarantee is never stopped, however short of
capacity the cluster is. The mark can still appear during the guarantee, when
the booking that needs the capacity starts after the guarantee ends. The warning
then states that the reclaim is queued for the moment the guarantee ends. A
warning of this kind arrives while the guarantee is still running, which leaves
the most time to checkpoint.
<a href="/docs/gpu-access/what-ends-a-session.html#end-of-a-reservation-window">End of a Reservation Window</a>
describes the end of a guaranteed window.</p>
<p>A job is not stopped at <code>guaranteed-until</code>. It keeps running until another
reservation needs the capacity, so exiting at the guarantee gives up run time
that remains available. From <code>guaranteed-until</code> onward, the job can be stopped
on notice it does not control. Shorten the checkpoint interval at that point.</p>
<h3 id="warning-annotations">Warning Annotations</h3>
<p>Four annotations are relevant to a long-running job:</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Annotation</th>
<th>Value</th>
<th>What it says</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>galends/guaranteed-until</code></td>
<td>UTC instant, <code>YYYY-MM-DDTHH:MM:SSZ</code></td>
<td>The end of the protected period. It can move <strong>later</strong> while the session runs, when an abutting follow-on window is booked</td>
</tr>
<tr>
<td><code>galends/termination-warning-at</code></td>
<td>UTC instant, same format</td>
<td>The <strong>earliest</strong> moment the session could be stopped. Never earlier than <code>guaranteed-until</code>. Present only while the session is at risk</td>
</tr>
<tr>
<td><code>galends/termination-warning-risk</code></td>
<td>Decimal between 0 and 1, two places, e.g. <code>0.33</code></td>
<td>The share of the candidates that has to be stopped. <code>1.00</code> means all of them</td>
</tr>
<tr>
<td><code>galends/termination-warning-message</code></td>
<td>A sentence</td>
<td>The same thing in prose, in Pacific time, naming the cause: a reservation starting at a given time, or GPUs kept free for on-demand jobs. Written to be displayed as it stands, and not to be parsed</td>
</tr>
</tbody>
</table></div>
<p>The message takes one of two forms:</p>
<pre class="docs-code"><code class="language-text">At risk of preemption: this pod is at or nearing the end of its GPU runtime guarantee and may be terminated as early as 2026-09-23 11:45:00 PDT to free GPUs for a reservation starting at 2026-09-23 12:00:00 PDT (risk 0.50). Extend or re-book the reservation to retain capacity.</code></pre>
<pre class="docs-code"><code class="language-text">At risk of preemption: this pod is at or nearing the end of its GPU runtime guarantee and may be terminated as early as 2026-09-23 11:45:00 PDT to keep GPUs free for on-demand jobs (risk 1.00). Extend or re-book the reservation to retain capacity.</code></pre>
<p><code>termination-warning-at</code> is the earliest possible stop, not a scheduled one. The
shortfall it was computed from may be gone before that moment arrives, in which
case nothing happens and the annotations are removed. Treat the moment as the
start of a period in which the session may be stopped at any time, not as a
countdown to a certain stop.</p>
<h3 id="best-effort-annotations">Best-Effort Annotations</h3>
<p>Every annotation is optional and best-effort. Any of them can be absent at any
moment. The controller removes the three warning annotations once the risk has
passed, usually within a few minutes. A <code>termination-warning-at</code> in the past, on
a session that is still running, means the session can be stopped at any
moment. The controller does not read any of the annotations back to decide
anything. Each decision is recomputed from live reservation state. Code that
reads the annotations handles each one being missing, ignores a value that does
not parse rather than failing, and re-reads each value instead of caching it at
startup.</p>
<h3 id="canceling-a-pending-termination">Canceling a Pending Termination</h3>
<p><strong>Extend</strong> in the reservation app, if it is granted, cancels a pending
termination at any point until the pod is deleted: the session moves onto a new
booking and is guaranteed again. Extend can be refused when the GPUs are needed
for a booking that follows. The controller re-checks every session's live guarantee before it selects
any session to stop, so an Extend recorded before the selection always takes
precedence. See <a href="/docs/gpu-access/reservations.html#extend">Extend</a>.</p>
<p>A new booking that starts exactly when the current guarantee ends, for the same
class, number of GPUs, and workspace, also cancels it. A booking with a gap
protects the session only once it opens, which can be after the stop. See
<a href="/docs/gpu-access/what-ends-a-session.html#back-to-back-bookings">Back-to-Back Bookings</a>.</p>
<h2 id="reading-the-warning-from-inside-a-container">Reading the Warning From Inside a Container</h2>
<p>Every pod on PARASOL carries its annotations in the file
<code>/etc/podinfo/annotations</code>. The cluster's admission controller adds the
downward-API volume that holds the file to each pod it admits, whether the pod
was started by <code>launch.sh</code>, by Datahub, from a hand-written manifest, or by a
Job or Deployment. The kubelet refreshes the file as the values change.</p>
<p>Do not add a volume at <code>/etc/podinfo</code> to a hand-written manifest. A second mount
at the same path can cause the pod to be refused.</p>
<p>The file carries every annotation the session has, including the reservation
behind it, its GPU class, and when it was admitted. Each annotation is on its
own line as <code>key="value"</code>. The value is quoted, and any quote or backslash
inside it is escaped:</p>
<pre class="docs-code"><code class="language-console">$ grep '^galends/termination-warning' /etc/podinfo/annotations
galends/termination-warning-at="2026-08-21T17:30:16Z"
galends/termination-warning-risk="0.33"</code></pre>
<p>One value can be read with <code>sed</code>:</p>
<pre class="docs-code"><code class="language-bash">sed -n 's|^galends/termination-warning-at="\(.*\)"$|\1|p' /etc/podinfo/annotations</code></pre>
<h3 id="absent-annotations">Absent Annotations</h3>
<p>An annotation that is not set has no line in the file. The file itself exists
from the pod's first second, and the three warning annotations are absent while
the session is not at risk. Test for a warning by looking for the annotation's
line, not for the file.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>A test on the file itself, such as <code>-f</code> or <code>-e</code>, is true from the pod's first
second. A loop guarded on the file exits immediately on every run, and does
so silently.</p></div>
<h3 id="downward-api-environment-variables">Downward-API Environment Variables</h3>
<p>Downward-API environment variables are not suitable for these annotations. An
environment variable is resolved once when the container starts, and the
annotations are written after that, some of them changing during the run. Only
the volume is refreshed.</p>
<h3 id="refresh-delay">Refresh Delay</h3>
<p>The kubelet updates the file on its own sync loop, which adds to the
controller's own cadence. The warning therefore reaches the container some time
into the notice period, not at its start: usually about 2 minutes after the
controller writes it.</p>
<p>Polling every 15 to 30 seconds is sufficient. To watch the file with <code>inotify</code>,
watch the directory rather than the file, because the file is swapped
atomically behind a symlink.</p>
<h3 id="idle-culler-annotations">Idle Culler Annotations</h3>
<p>The idle culler publishes its own status in the same way.
<code>dsmlp/idle-gpu-status</code> and <code>dsmlp/idle-gpu-cull-deadline</code> are annotations on
the same pod, and appear in the same <code>annotations</code> file. A job whose GPU is
unused between phases can be culled on the culler's own timetable,
independently of any reservation.
<a href="/docs/gpu-access/what-ends-a-session.html#what-counts-as-idle">What Counts as Idle</a>
describes idle culling.</p>
<h2 id="acting-on-the-warning">Acting on the Warning</h2>
<h3 id="batch-jobs-processed-in-units">Batch Jobs Processed in Units</h3>
<p>A batch job that processes work in units, such as shards, epochs, or sweeps,
usually needs only to stop starting new units. Check for the warning between
units, never inside one:</p>
<pre class="docs-code"><code class="language-bash">ANNOTATIONS=${ANNOTATIONS:-/etc/podinfo/annotations}

# Prints the value of galends/&lt;name&gt;, or nothing when the annotation is absent.
# The file exists from the start, so test for the line, never for the file.
annotation() { sed -n "s|^galends/$1=\"\(.*\)\"\$|\1|p" "$ANNOTATIONS"; }
warned() { [[ -n "$(annotation termination-warning-at)" ]]; }

for shard in "${SHARDS[@]}"; do
    if warned; then
        annotation termination-warning-message &gt;&amp;2   # escapes left as written
        printf 'stopped before %s; rerun to pick up the rest\n' "$shard" &gt;&amp;2
        exit 75                 # EX_TEMPFAIL, for whatever submitted the job
    fi
    process_shard "$shard"      # each shard commits its own output
done</code></pre>
<p>Re-read the file on every pass through the loop, and do not store the result. A
warning can be withdrawn when the window is extended, the incoming booking never
claims its capacity, or the session is re-linked to another reservation. The
annotation's line then disappears from the file. A job that stored the first
warning it saw would stop for a warning that had already been withdrawn. A job
that is to continue rather than hand back its remaining units can make the same
test and log the result instead of acting on it.</p>
<h3 id="training-loops">Training Loops</h3>
<p>A training loop checkpoints at a step boundary, not from a signal handler. A save
during the backward pass captures inconsistent state, and under distributed
training a save is a collective operation that every rank has to enter in the
same iteration:</p>
<pre class="docs-code"><code class="language-python">import ast
from datetime import datetime, timezone
from pathlib import Path

ANNOTATIONS = Path("/etc/podinfo/annotations")

def _read(name):
    """The value of galends/&lt;name&gt;, or None when the annotation is absent."""
    try:
        lines = ANNOTATIONS.read_text().splitlines()
    except OSError:
        return None
    prefix = f"galends/{name}="
    for line in lines:
        if line.startswith(prefix):
            try:
                return ast.literal_eval(line[len(prefix):]) or None
            except (ValueError, SyntaxError):
                return None
    return None

def _instant(name):
    raw = _read(name)
    try:
        return datetime.fromisoformat(raw) if raw else None
    except ValueError:
        return None            # anything unparseable is ignored, not raised on

def stop_expected(lead_seconds):
    """True when a stop is close enough that a checkpoint should be written."""
    now = datetime.now(timezone.utc)
    for key in ("termination-warning-at", "guaranteed-until"):
        instant = _instant(key)
        if instant is not None and (instant - now).total_seconds() &lt;= lead_seconds:
            return True
    return False</code></pre>
<pre class="docs-code"><code class="language-python">warned = False

for step, batch in enumerate(loader, start=resume_step):
    train_step(batch)

    urgent = stop_expected(lead_seconds=2 * CHECKPOINT_SECONDS + 60)
    if dist.is_initialized():
        urgent = any_rank(urgent)          # OR-reduced across ranks

    if step % CHECKPOINT_EVERY == 0 or (urgent and not warned):
        save_atomic(state(step), CHECKPOINT_PATH)
    warned = urgent                        # re-arms if the warning is withdrawn</code></pre>
<p>The loop depends on four elements:</p>
<ul>
<li><code>lead_seconds</code> is derived from the measured cost of a checkpoint, not guessed.
  A save that starts too late to finish produces no usable checkpoint.</li>
<li><code>any_rank</code> makes the ranks agree. Each pod carries its own annotations, so in
  a multi-pod job only some members may be marked. Losing any one member ends
  the job, and a collective save that only some ranks enter deadlocks. The flag
  is OR-reduced across ranks and acted on as an aggregate.</li>
<li><code>warned</code> debounces the urgent save. Tracking the current value, rather than
  latching the first warning, makes the urgent save fire once per warning
  episode, and again if the warning clears and returns.</li>
<li><code>guaranteed-until</code> is a cue in its own right. Past <code>guaranteed-until</code> a
  session is preemptible, and a session that enters that state with an hour-old
  checkpoint can lose an hour of work.</li>
</ul>
<h3 id="stopping-voluntarily">Stopping Voluntarily</h3>
<p>For a batch job, stopping voluntarily is a legitimate response and usually the
better one. Checkpointing, exiting cleanly, and letting a submission system
resubmit the job hands back the capacity the incoming booking needs, chooses the
stopping point, and avoids depending on the grace period. For an interactive
session, checkpointing and continuing is usually the better response. The risk
figure is not a certainty, the warning is frequently withdrawn, and a notebook
that checkpoints and continues is usually still running afterwards.</p>
<h3 id="the-risk-figure">The Risk Figure</h3>
<p><code>termination-warning-risk</code> is a band, not a probability. It describes the share
of the candidate sessions that has to be stopped, on the assumption that the
choice among them is arbitrary. Where selection follows a policy instead, the
number is only an indication. Use it in coarse thresholds, such as "possible"
and "likely". Where checkpoints are cheap, save on any warning and disregard the
risk figure.</p>
<h3 id="the-grace-period">The Grace Period</h3>
<p>A preempted or evicted pod is deleted in the ordinary way: <code>SIGTERM</code>, then a
grace period, then a forced stop. Pods started by <code>launch.sh</code> have a grace
period of 600 seconds, or 10 minutes. A <code>SIGTERM</code> handler that saves a
checkpoint is a useful fallback where the save finishes well within that time,
and it is the only chance to save before an eviction, which has no warning. The
grace period begins only after the decision to stop the pod has been made, so
for a preemption the warning comes earlier. Checkpoint on the warning first.</p>
<h2 id="resuming">Resuming</h2>
<h3 id="selecting-the-checkpoint-to-load">Selecting the Checkpoint to Load</h3>
<p>Load the newest complete checkpoint, which is not always the newest path. The
marker written by the save path distinguishes the two. See
<a href="#atomic-checkpoint-writes">Atomic Checkpoint Writes</a>. On any load error, fall
back to the previous checkpoint. That fallback is the reason for keeping more
than one checkpoint.</p>
<h3 id="restoring-state">Restoring State</h3>
<p>Restore everything that was saved, in particular the scheduler and the data
position. A resume that restores only the weights is visible in the loss curve.
<a href="#what-a-resumable-checkpoint-contains">What a Resumable Checkpoint Contains</a>
lists the components.</p>
<h3 id="loading-with-torchload">Loading with <code>torch.load</code></h3>
<p><code>torch.load</code> defaults to <code>weights_only=True</code> from PyTorch 2.6. A checkpoint
holding anything beyond plain tensors and containers needs those types
allowlisted through <code>torch.serialization.safe_globals</code>. Use
<code>torch.serialization.safe_globals</code> rather than <code>weights_only=False</code>, which
permits arbitrary code execution on load. Where only weights are needed,
<code>safetensors</code> avoids the issue. <code>safetensors</code> stores tensors only, so optimizer
state still goes through <code>torch.save</code>.</p>
<h3 id="testing-the-resume-path">Testing the Resume Path</h3>
<p>Test the resume path deliberately:</p>
<ol>
<li>Kill a run at a random step.</li>
<li>Restart it.</li>
<li>Check that the loss curve is continuous across the restart.</li>
</ol>
<h2 id="checkpointing-by-job-shape">Checkpointing by Job Shape</h2>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Job</th>
<th>Checkpoint size</th>
<th>Handling</th>
</tr>
</thead>
<tbody>
<tr>
<td>A LoRA or other adapter fine-tune</td>
<td>Tens of MB (the adapter only)</td>
<td>A save takes seconds, so it can be written often and on any warning. Resuming still needs the optimizer, scheduler, and step count alongside the adapter. The base model is referenced by name rather than copied into the checkpoint</td>
</tr>
<tr>
<td>A full fine-tune on one node</td>
<td>Model, plus 2-3× that in optimizer state</td>
<td>Saved from one rank where the replicas are identical. The termination warning is of most value in this case</td>
</tr>
<tr>
<td>From-scratch or large-model training across nodes</td>
<td>Hundreds of GB, sharded</td>
<td><code>torch.distributed.checkpoint</code> handles sharded model and optimizer state together. Asynchronous saves suit the periodic schedule. On a warning, one synchronous save at a step boundary is more reliable than an asynchronous save that may not be flushed</td>
</tr>
<tr>
<td>A run spanning several reservations</td>
<td>Any</td>
<td>Design the run for restart rather than continuity. A run that resumes cleanly from disk can be scheduled across several windows and interrupted between them at almost no cost</td>
</tr>
<tr>
<td>Inference or a service pod</td>
<td>Nothing to checkpoint</td>
<td>Use the warning to drain the pod: stop accepting work, finish work in flight, and exit</td>
</tr>
</tbody>
</table></div>
<h2 id="logging">Logging</h2>
<p>An unattended job can be understood only from its logs, and a job with no log of
its own cannot be debugged after it ends. Output from <code>print</code> statements in a
background run goes nowhere that can be read.</p>
<h3 id="redirecting-output">Redirecting Output</h3>
<p>The simplest form of logging is a shell redirect:</p>
<pre class="docs-code"><code class="language-bash">python run.py all &gt; log.txt 2&gt;&amp;1 &amp;</code></pre>
<p><code>2&gt;&amp;1</code> is needed because <code>&gt;</code> alone captures standard output, and tracebacks
arrive on standard error. Add <code>python -u</code> as well. Python buffers output to a
file, and without <code>-u</code> an interrupted job can lose its last several minutes of
log.</p>
<h3 id="the-logging-module">The <code>logging</code> Module</h3>
<p>The <code>logging</code> module timestamps every line and records which file and function
produced it, which makes the log searchable:</p>
<pre class="docs-code"><code class="language-python"># randdiv.py
import logging
import numpy as np

logging.basicConfig(filename='log.txt',
                    filemode='a',
                    level=logging.INFO,
                    datefmt='%H:%M:%S',
                    format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s')

def myfunc():
    a = np.random.randint(-5, 5)
    b = np.random.randint(-5, 5)
    if b == 0:
        logging.info('zerodivisionerror preempted')
    else:
        return a / b

print([myfunc() for _ in range(100)])</code></pre>
<p>A line in <code>log.txt</code> then reads
<code>2022-10-30 23:37:11,815,815 root INFO zerodivisionerror preempted</code>, which
records when it happened and where it came from. <code>filemode='a'</code> appends, so a
resumed run adds to the existing log instead of erasing it.</p>
<h3 id="logging-interruptions">Logging Interruptions</h3>
<p>Log four values for correlation with an interruption: wall-clock time, the epoch
or step, the path of the last checkpoint written, and whether a termination
warning was present. When a run ends unexpectedly, these values locate the
restart point and show whether the ending was announced.</p>
<h2 id="logs-that-outlive-the-pod">Logs That Outlive the Pod</h2>
<p><code>kubectl logs &lt;pod-name&gt;</code> reads from the pod, so it stops working once the pod
is deleted. That includes a pod that deletes itself at the end of a batch job,
and a preempted pod. Use it to inspect a pod that is running, not to keep a
record.</p>
<p>A file in a home directory persists after the pod is deleted. For unattended
work, redirect output into one:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W DSC40_FA26_001 -g 1 -l gpu-class=medium -B -- bash -c 'python -u ./train.py &gt; run.log 2&gt;&amp;1'</code></pre>
<p><code>run.log</code> is then readable from the login node while the job is still running,
and after it is gone. <a href="/docs/running-jobs/job-modes-and-limits.html#job-modes">Job Modes</a> describes
batch mode. <a href="/docs/running-jobs/watching-your-job.html">Watching a Running Job</a> describes monitoring
a job in progress.</p>
