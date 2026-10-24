---
title: "GPU Hardware & CUDA"
path: /docs/gpu-access/gpu-hardware.html
description: "The GPU cards and Multi-Instance GPU (MIG) slices that can back each GPU class, with their memory, performance, and supported CUDA versions."
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/gpu-hardware/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/gpu-hardware.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/gpu-hardware/
format: html
---
<p>The cards and Multi-Instance GPU (MIG) slices listed here cover the many
configurations that can back a GPU class, and not every configuration is in
service in every quarter. A session requests a class, not a card; see
<a href="/docs/gpu-access/gpu-classes.html#gpu-class-sizes">GPU Class Sizes</a>.</p>
<h2 id="specifications">Specifications</h2>
<p>The tables group cards by architecture, oldest first, and list the MIG slices
cut from a card after it. <a href="/docs/gpu-access/workloads-by-gpu-class.html">Workloads by GPU Class</a>
lists the cards and slices behind each class.</p>
<p>Bandwidth is peak memory bandwidth. A slice's bandwidth is its share of the
card's and is nominal; see <a href="#mig-slices">MIG Slices</a>. The chip column gives the
GPU chip and its compute capability, written as the <code>sm_</code> target that CUDA
builds and error messages use.</p>
<h3 id="turing">Turing</h3>
<p>Turing cards have second-generation tensor cores, which run FP16 and INT8 but
not BF16. FlashAttention 2 does not support Turing.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Bandwidth</th>
<th>Chip</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>RTX 2080 Ti</td>
<td>11 GB GDDR6</td>
<td>616 GB/s</td>
<td>TU102, <code>sm_75</code></td>
<td>Slower for training than the A30 and H100 slices with similar memory</td>
</tr>
<tr>
<td>Titan RTX</td>
<td>24 GB GDDR6</td>
<td>672 GB/s</td>
<td>TU102, <code>sm_75</code></td>
<td>Less bandwidth than the 24 GB Ampere cards</td>
</tr>
</tbody>
</table></div>
<h3 id="ampere">Ampere</h3>
<p>Ampere cards have third-generation tensor cores, which add BF16 and TF32.
FlashAttention 2 supports Ampere.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Bandwidth</th>
<th>Chip</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>RTX A5000</td>
<td>24 GB GDDR6</td>
<td>768 GB/s</td>
<td>GA102, <code>sm_86</code></td>
<td>Workstation card. No MIG</td>
</tr>
<tr>
<td>A30</td>
<td>24 GB HBM2</td>
<td>933 GB/s</td>
<td>GA100, <code>sm_80</code></td>
<td>FP64 tensor cores. Supports MIG, up to 4 slices. The most bandwidth of the 24 GB cards listed here</td>
</tr>
<tr>
<td>A30 MIG 2g.12gb</td>
<td>12 GB HBM2</td>
<td>~466 GB/s</td>
<td>GA100, <code>sm_80</code></td>
<td>Half of an A30</td>
</tr>
<tr>
<td>A30 MIG 1g.6gb</td>
<td>6 GB HBM2</td>
<td>~233 GB/s</td>
<td>GA100, <code>sm_80</code></td>
<td>A quarter of an A30</td>
</tr>
</tbody>
</table></div>
<h3 id="ada-lovelace">Ada Lovelace</h3>
<p>Ada Lovelace cards have fourth-generation tensor cores, which add FP8.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Bandwidth</th>
<th>Chip</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>L40S</td>
<td>48 GB GDDR6</td>
<td>864 GB/s</td>
<td>AD102, <code>sm_89</code></td>
<td>91.6 TFLOPS FP32. No NVLink and no MIG. Less bandwidth than the H100</td>
</tr>
</tbody>
</table></div>
<h3 id="hopper">Hopper</h3>
<p>Hopper cards have fourth-generation tensor cores and the Transformer Engine,
which runs FP8. The H100s on PARASOL are the PCIe variant, with HBM2e memory at
2,000 GB/s. The SXM variant has HBM3 at 3,350 GB/s, so a PCIe H100 has about 60
percent of an SXM H100's bandwidth.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Bandwidth</th>
<th>Chip</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>H100 PCIe</td>
<td>80 GB HBM2e</td>
<td>2,000 GB/s</td>
<td>GH100, <code>sm_90</code></td>
<td>Supports MIG, up to 7 slices</td>
</tr>
<tr>
<td>H100 MIG 4g.40gb</td>
<td>40 GB HBM2e</td>
<td>~1,000 GB/s</td>
<td>GH100, <code>sm_90</code></td>
<td>Four-sevenths of the card's compute and half its memory. More bandwidth than the 48 GB cards listed here, and 8 GB less memory</td>
</tr>
<tr>
<td>H100 MIG 2g.20gb</td>
<td>20 GB HBM2e</td>
<td>~500 GB/s</td>
<td>GH100, <code>sm_90</code></td>
<td>Two-sevenths of the compute and a quarter of the memory. Less bandwidth than a full A30, with newer tensor cores</td>
</tr>
<tr>
<td>H100 MIG 1g.10gb</td>
<td>10 GB HBM2e</td>
<td>~250 GB/s</td>
<td>GH100, <code>sm_90</code></td>
<td>One-seventh of the compute and an eighth of the memory. Less bandwidth than an RTX 2080 Ti, but faster for compute-bound training</td>
</tr>
</tbody>
</table></div>
<h3 id="blackwell">Blackwell</h3>
<p>Blackwell cards have fifth-generation tensor cores, which add FP4 (NVFP4) to
FP8.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Bandwidth</th>
<th>Chip</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>RTX PRO 6000 Blackwell</td>
<td>96 GB GDDR7</td>
<td>1,792 GB/s</td>
<td>GB202, <code>sm_120</code></td>
<td>188 streaming multiprocessors. Supports MIG, up to 4 slices. The most memory of any card listed here, and about 90 percent of the H100 PCIe's bandwidth</td>
</tr>
<tr>
<td>RTX PRO 6000 MIG 2g.48gb</td>
<td>48 GB GDDR7</td>
<td>~896 GB/s</td>
<td>GB202, <code>sm_120</code></td>
<td>Half of the card. 8 GB more memory than the H100 MIG 4g.40gb slice, with slightly less bandwidth</td>
</tr>
<tr>
<td>RTX PRO 6000 MIG 1g.24gb</td>
<td>24 GB GDDR7</td>
<td>~448 GB/s</td>
<td>GB202, <code>sm_120</code></td>
<td>A quarter of the card. Its tensor cores speed up INT8 and FP8 work, which offsets its lower bandwidth</td>
</tr>
</tbody>
</table></div>
<h2 id="mig-slices">MIG Slices</h2>
<p>Multi-Instance GPU (MIG) divides one card into isolated slices. Each slice has
its own memory, cache and compute, and a session on a slice can use only that
slice. Sessions on different slices of one card do not share memory or
bandwidth.</p>
<p>A slice's name gives its compute and its memory: <code>2g.20gb</code> is two compute units
and 20 GB. A compute unit is a seventh of an H100's compute, or a quarter of an
A30's or an RTX PRO 6000's. A slice's bandwidth follows its share of the card's
memory rather than its compute. MIG divides an H100's memory into eighths, so
the <code>2g.20gb</code> slice has two-eighths of the card's bandwidth.</p>
<p>Inside a session, <code>nvidia-smi -L</code> lists the card and, on a slice, the slice's
profile.</p>
<h2 id="cuda-versions">CUDA Versions</h2>
<p>As of Fall 2026, PARASOL supports CUDA 12 and CUDA 13. The standard GPU image,
<code>scipy-ml-notebook</code>, includes CUDA 12. The image's Dockerfile records its exact
toolkit version; see
<a href="/docs/environments/standard-images.html#finding-the-package-list">Finding the Package List</a>.
For a custom image that carries its own toolkit, see
<a href="/docs/environments/building-a-custom-image.html#custom-cuda-toolkits">Custom CUDA Toolkits</a>.</p>
<h2 id="cuda-profiling">CUDA Profiling</h2>
<p>Three profilers work on PARASOL. GPU performance counters are open to users
inside the container, so each can collect hardware metrics.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Profiler</th>
<th>Shows</th>
<th>Output</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nsight Systems, <code>nsys</code></td>
<td>A timeline of CPU threads, CUDA API calls, kernels, and memory copies, including where the GPU sits idle</td>
<td>A <code>.nsys-rep</code> report</td>
</tr>
<tr>
<td>Nsight Compute, <code>ncu</code></td>
<td>Per-kernel metrics read from the GPU's performance counters</td>
<td>A <code>.ncu-rep</code> report</td>
</tr>
<tr>
<td>PyTorch profiler, <code>torch.profiler</code></td>
<td>Time and memory by PyTorch operator</td>
<td>A printed table or a trace file</td>
</tr>
</tbody>
</table></div>
<p>The standard images do not include Nsight Systems or Nsight Compute. NVIDIA's
container images at <code>nvcr.io</code> are fully supported on PARASOL and include both.
The PyTorch profiler is part of PyTorch, which <code>scipy-ml-notebook</code> includes.</p>
<h3 id="nsight-systems-and-nsight-compute">Nsight Systems and Nsight Compute</h3>
<p>Launch an NVIDIA image, such as <code>nvcr.io/nvidia/pytorch</code>, with <code>-i</code>. <code>-s</code> starts
a shell and no notebook server, because these images are not built on the
standard images:</p>
<pre class="docs-code"><code class="language-bash">launch-scipy-ml.sh -W &lt;WORKSPACE&gt; -g 1 -l gpu-class=medium -i nvcr.io/nvidia/pytorch:&lt;tag&gt; -s</code></pre>
<p>These images are large, so the first launch on a node is slow. See
<a href="/docs/environments/building-a-custom-image.html#pulling-a-large-image-ahead-of-a-session">Pulling a Large Image Ahead of a Session</a>.</p>
<p>Profile the whole run with Nsight Systems to find where the time goes, then
profile the kernels that dominate with Nsight Compute:</p>
<pre class="docs-code"><code class="language-bash">nsys profile -o timeline python train.py
ncu --launch-count 20 -o kernels python train.py</code></pre>
<p>Nsight Compute replays each kernel many times to read its counters, so a run
under <code>ncu</code> is far slower than a normal one. <code>--launch-count</code> limits it to the
first kernels launched. Both reports open in NVIDIA's desktop applications of
the same names.</p>
<h3 id="pytorch-profiler">PyTorch Profiler</h3>
<p>In a PyTorch script, wrap a few training steps:</p>
<pre class="docs-code"><code class="language-python">import itertools

from torch.profiler import ProfilerActivity, profile

with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA]) as prof:
    for batch in itertools.islice(loader, 10):
        train_step(batch)

print(prof.key_averages().table(sort_by="cuda_time_total", row_limit=10))</code></pre>
