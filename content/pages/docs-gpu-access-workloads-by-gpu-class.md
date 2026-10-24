---
title: "Workloads by GPU Class"
path: /docs/gpu-access/workloads-by-gpu-class.html
description: "Estimate the GPU memory your work needs, then request the smallest GPU class it fits within, among the classes your workspace can use."
eyebrow: "GPU Access"
lastReviewed: 2026-09-29
audiences: [students, instructors, researchers]
source: "Ported from the DSMLP documentation (https://dsmlp-docs.ucsd.edu/gpu-access/workloads-by-gpu-class/), preview build of 2026-09-29"
canonicalUrl: /docs/gpu-access/workloads-by-gpu-class.html
legacyUrl: https://dsmlp-docs.ucsd.edu/gpu-access/workloads-by-gpu-class/
format: html
---
<p class="lead">Estimate the GPU memory your work needs, then request the smallest GPU class it
fits within, among the classes your workspace can use. See
<a href="/docs/gpu-access/gpu-classes.html#choosing-a-class">Choosing a Class</a> and
<a href="/docs/gpu-access/gpu-classes.html#workspace-class-grants">Workspace Class Grants</a>. Not every card
or slice listed here backs its class in every quarter.</p>
<dl class="docs-glance">
<div><dt>Weights at BF16 or FP16</dt><dd>About 2 GB per billion parameters</dd></div>
<div><dt>Full fine-tuning</dt><dd>About 16 bytes per parameter with Adam, before activations</dd></div>
<div><dt>Size for</dt><dd>The smallest device listed for the class</dd></div>
<div><dt>Measure with</dt><dd><code>nvidia-smi</code> or <code>torch.cuda.memory_summary()</code></dd></div>
</dl>
<h2 id="estimating-gpu-memory">Estimating GPU Memory</h2>
<p>A model's weights take a fixed amount of GPU memory for each billion
parameters, set by their precision.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Precision of the weights</th>
<th>GPU memory per billion parameters</th>
</tr>
</thead>
<tbody>
<tr>
<td>BF16 or FP16</td>
<td>About 2 GB</td>
</tr>
<tr>
<td>INT8 or FP8</td>
<td>About 1 GB</td>
</tr>
<tr>
<td>4-bit</td>
<td>About 0.5 GB</td>
</tr>
</tbody>
</table></div>
<p>Beyond the weights, what else must fit depends on the work:</p>
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-flash"></span><p class="docs-card-title">Inference</p><p>Inference needs the weights plus a cache that grows with the length of the
context.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-stats"></span><p class="docs-card-title">Training</p><p>Training needs the weights plus gradients, optimizer state, and the activations
for one batch. Full fine-tuning with the Adam optimizer takes about 16 bytes per
parameter before activations, so a 650M-parameter model needs about 10 GB.</p></article>
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-adjust"></span><p class="docs-card-title">LoRA and QLoRA</p><p>LoRA (low-rank adaptation) freezes the base weights and trains small adapter
matrices, and QLoRA does the same on a base quantized to 4 bits, so both need
far less.</p></article>
</div>
<p>The memory figures in the examples are approximate peaks. They vary with batch
size, sequence length and LoRA rank.</p>
<div class="alert alert-success docs-callout" role="note"><p class="docs-callout-label"><strong>Measure before a long run</strong></p><p>Measure a short trial run with
<code>nvidia-smi</code> or <code>torch.cuda.memory_summary()</code> before sizing a long one.</p></div>
<h2 id="differences-within-a-class">Differences Within a Class</h2>
<p>The cards and slices behind one class differ in memory, speed and supported
number formats. A <code>medium</code> session can run on a 20 GB slice or a 24 GB card, and
a <code>large</code> session on a 40 GB slice or a 48 GB card.</p>
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Size for the smallest device</strong></p><p>A run that fits only the
larger device fails with a CUDA out-of-memory error whenever the session lands
on the smaller one. Size work for the smallest device listed for the class.</p></div>
<p>The Turing cards, the RTX 2080 Ti in <code>small</code> and the Titan RTX in <code>medium</code>, have
neither BF16 nor FlashAttention 2. Code that requires either fails or runs
slower on those cards. FP16 mixed precision runs on every device listed. See
<a href="/docs/gpu-access/gpu-hardware.html">GPU Hardware &amp; CUDA</a>.</p>
<h2 id="xsmall"><code>xsmall</code></h2>
<p><code>xsmall</code> suits encoder fine-tuning, QLoRA of models up to about 3 billion
parameters, and small vision and graph models.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Example</th>
<th>Setting</th>
<th>Method and approximate memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>Sentiment or topic classification with BERT-base or DistilBERT</td>
<td>Course</td>
<td>Full fine-tuning</td>
</tr>
<tr>
<td>A first instruction-tuning lab with Llama 3.2 3B and a small dataset</td>
<td>Course</td>
<td>QLoRA, about 3.5 GB</td>
</tr>
<tr>
<td>Image classification by transfer learning from ResNet-50 or EfficientNet</td>
<td>Course</td>
<td>Full fine-tuning</td>
</tr>
<tr>
<td>Named-entity recognition on PubMed abstracts with BioBERT or PubMedBERT</td>
<td>Research</td>
<td>Full fine-tuning</td>
</tr>
<tr>
<td>Node or link prediction with a graph neural network on Open Graph Benchmark datasets</td>
<td>Research</td>
<td>Under 2 GB for most architectures</td>
</tr>
</tbody>
</table></div>
<p>A 3B model at FP16 needs about 6.5 GB for inference, more than an <code>xsmall</code>
slice has. At 8-bit precision it needs about 3.5 GB.</p>
<h3 id="xsmall-hardware"><code>xsmall</code> Hardware</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Specifications</th>
</tr>
</thead>
<tbody>
<tr>
<td>A30 MIG 1g.6gb</td>
<td>6 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#ampere">Ampere</a></td>
</tr>
</tbody>
</table></div>
<h2 id="small"><code>small</code></h2>
<p><code>small</code> suits QLoRA of 7B to 9B language models, larger vision models, and
image-generation LoRA training.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Example</th>
<th>Setting</th>
<th>Method and approximate memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>Instruction-tuning an 8B or 9B model, such as Llama 3.1 8B or Gemma 2 9B</td>
<td>Course</td>
<td>QLoRA, about 9 to 10 GB</td>
</tr>
<tr>
<td>Zero-shot image retrieval by fine-tuning CLIP</td>
<td>Course</td>
<td>Full fine-tuning</td>
</tr>
<tr>
<td>Adapters for a low-resource language on mBERT or XLM-R</td>
<td>Research</td>
<td>Adapter training</td>
</tr>
<tr>
<td>Image-generation LoRA training on Flux</td>
<td>Research</td>
<td>QLoRA, about 9 GB</td>
</tr>
</tbody>
</table></div>
<p>A QLoRA run of an 8B or 9B model is close to the 10 GB of the H100 slice, the
smallest <code>small</code> device.</p>
<h3 id="small-hardware"><code>small</code> Hardware</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Specifications</th>
</tr>
</thead>
<tbody>
<tr>
<td>H100 MIG 1g.10gb</td>
<td>10 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#hopper">Hopper</a></td>
</tr>
<tr>
<td>RTX 2080 Ti</td>
<td>11 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#turing">Turing</a></td>
</tr>
<tr>
<td>A30 MIG 2g.12gb</td>
<td>12 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#ampere">Ampere</a></td>
</tr>
</tbody>
</table></div>
<h2 id="medium"><code>medium</code></h2>
<p><code>medium</code> suits LoRA of 7B and 8B models without quantization, INT8 LoRA of 13B
and 14B models, and vision-language models.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Example</th>
<th>Setting</th>
<th>Method and approximate memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>LoRA of a 7B model, such as Qwen2.5 7B, without quantization</td>
<td>Course</td>
<td>BF16 LoRA, about 18 GB</td>
</tr>
<tr>
<td>Visual question answering or chart reading with Qwen2-VL 7B or LLaVA 1.6</td>
<td>Course</td>
<td>LoRA</td>
</tr>
<tr>
<td>Adapting a 14B model, such as Qwen2.5 14B, to a field's literature</td>
<td>Research</td>
<td>INT8 LoRA, about 16 GB</td>
</tr>
<tr>
<td>Protein function prediction with the 3B-parameter ESM-2 model</td>
<td>Research</td>
<td>Fine-tuning</td>
</tr>
</tbody>
</table></div>
<p>A 14B model at BF16 needs about 28 GB for its weights alone, more than any
<code>medium</code> device has.</p>
<h3 id="medium-hardware"><code>medium</code> Hardware</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Specifications</th>
</tr>
</thead>
<tbody>
<tr>
<td>H100 MIG 2g.20gb</td>
<td>20 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#hopper">Hopper</a></td>
</tr>
<tr>
<td>A30</td>
<td>24 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#ampere">Ampere</a></td>
</tr>
<tr>
<td>RTX A5000</td>
<td>24 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#ampere">Ampere</a></td>
</tr>
<tr>
<td>Titan RTX</td>
<td>24 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#turing">Turing</a></td>
</tr>
<tr>
<td>RTX PRO 6000 MIG 1g.24gb</td>
<td>24 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#blackwell">Blackwell</a></td>
</tr>
</tbody>
</table></div>
<h2 id="large"><code>large</code></h2>
<p><code>large</code> suits QLoRA of 30B to 34B models, video generation, and protein
structure work.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Example</th>
<th>Setting</th>
<th>Method and approximate memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>A graduate fine-tuning practicum on Qwen3 32B</td>
<td>Course</td>
<td>QLoRA, about 22 GB</td>
</tr>
<tr>
<td>Video generation at 720p with Wan2.1 or CogVideoX-5B</td>
<td>Course</td>
<td>Inference</td>
</tr>
<tr>
<td>Fine-tuning Qwen2.5-Coder 32B on a lab's bioinformatics pipelines</td>
<td>Research</td>
<td>QLoRA, about 22 GB</td>
</tr>
<tr>
<td>Protein structure prediction with ESMFold, or fine-tuning ESM-2 15B</td>
<td>Research</td>
<td>Fine-tuning</td>
</tr>
</tbody>
</table></div>
<p>QLoRA of a 70B model, such as Llama 3.1 70B, needs about 38 to 42 GB. It fits
the 48 GB devices, but not reliably the 40 GB slice. A 32B model at BF16 needs
about 66 GB for its weights, more than any <code>large</code> device has.</p>
<h3 id="large-hardware"><code>large</code> Hardware</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Specifications</th>
</tr>
</thead>
<tbody>
<tr>
<td>H100 MIG 4g.40gb</td>
<td>40 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#hopper">Hopper</a></td>
</tr>
<tr>
<td>L40S</td>
<td>48 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#ada-lovelace">Ada Lovelace</a></td>
</tr>
<tr>
<td>RTX PRO 6000 MIG 2g.48gb</td>
<td>48 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#blackwell">Blackwell</a></td>
</tr>
</tbody>
</table></div>
<h2 id="xlarge"><code>xlarge</code></h2>
<p><code>xlarge</code> suits fine-tuning 70B models, long-context work, and pretraining
experiments.</p>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Example</th>
<th>Setting</th>
<th>Method and approximate memory</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fine-tuning Llama 3.1 70B or Qwen2.5 72B for an advanced seminar or a thesis</td>
<td>Course</td>
<td>FP8 LoRA, about 72 GB</td>
</tr>
<tr>
<td>Fine-tuning on long documents, with contexts of 128,000 tokens or more</td>
<td>Course</td>
<td>LoRA</td>
</tr>
<tr>
<td>Genomic language models, such as Nucleotide Transformer or HyenaDNA, on sequences of 100,000 bases or more</td>
<td>Research</td>
<td>Fine-tuning</td>
</tr>
<tr>
<td>Continued pretraining of a small model on a domain corpus</td>
<td>Research</td>
<td>Pretraining</td>
</tr>
<tr>
<td>Neural-operator training on fluid-dynamics or climate data with large batches</td>
<td>Research</td>
<td>Full training</td>
</tr>
</tbody>
</table></div>
<p>A 70B model at BF16 needs about 140 GB for its weights, more than any single
card has. Work across several GPUs is a separate request; see
<a href="/docs/gpu-access/gpu-classes.html#multiple-gpus">Multiple GPUs</a>.</p>
<h3 id="xlarge-hardware"><code>xlarge</code> Hardware</h3>
<div class="table-responsive"><table class="table table-striped">
<thead>
<tr>
<th>Card or slice</th>
<th>Memory</th>
<th>Specifications</th>
</tr>
</thead>
<tbody>
<tr>
<td>H100 PCIe</td>
<td>80 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#hopper">Hopper</a></td>
</tr>
<tr>
<td>RTX PRO 6000 Blackwell</td>
<td>96 GB</td>
<td><a href="/docs/gpu-access/gpu-hardware.html#blackwell">Blackwell</a></td>
</tr>
</tbody>
</table></div>
