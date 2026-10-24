# Content patterns

How PARASOL documentation and guide pages are laid out. Each pattern is plain
HTML with classes from the Decorator, the shared TritonAI styles, or the
documentation kit in `src/site/_resources/css/parasol.css`. No pattern needs a
`<style>` block, an inline `style`, or page JavaScript.

[GPU Classes](../content/pages/docs-gpu-access-gpu-classes.md) uses most of them
and is the reference page.

## The shape of a page

1. **Summary.** The first element is `<p class="lead">`: one to three sentences
   saying what the page covers and the single fact a reader most needs. The
   build moves it above the draft notice and the "On this page" list.
2. **At a glance** (optional). Two to four key facts the page states, as a
   `docs-glance` row. Only facts the page already gives; never a new claim.
3. **Sections.** `h2` per topic, `h3` beneath it. Keep each heading's text and
   `id` as they are; other pages and the DSMLP redirects link to them.
4. **End.** The build adds the previous and next links and the help line.

## Patterns

### Summary

```html
<p class="lead">A <strong>GPU class</strong> is a size band of GPU memory rather than a hardware model.</p>
```

### At a glance

Use when a page has a few numbers or rules a reader comes back for: limits,
defaults, who the page is for, what to have ready.

```html
<dl class="docs-glance">
<div><dt>Default limit</dt><dd>1 GPU at a time per account</dd></div>
<div><dt>Request with</dt><dd><code>-l gpu-class=</code> on every GPU launch</dd></div>
</dl>
```

### Steps

Use for a procedure a reader follows in order. Each step starts with a short
title, then its detail. A step may hold paragraphs, code, or a list.

```html
<ol class="docs-steps">
<li><span class="docs-step-title">Sign in to Datahub</span><p>Go to datahub.ucsd.edu and sign in with your campus account.</p></li>
<li><span class="docs-step-title">Choose an environment</span><p>...</p></li>
</ol>
```

Keep a plain `<ol>` for short ordered lists that are not a procedure.

### Flow

Use for the stages of a process or a lifecycle, three to five of them: a
booking from reservation to running session, a course from request to the end
of the term, an assignment from release to grade. It shows the shape; the prose
around it keeps the detail.

```html
<ol class="docs-flow" aria-label="From booking to running session">
<li><span class="docs-flow-label">Book</span><strong>Reserve a window</strong><p>The booking holds capacity.</p></li>
<li><span class="docs-flow-label">Launch</span><strong>Start a session as usual</strong><p>...</p></li>
</ol>
```

### Cards

Use to compare two to four options a reader chooses between: job modes, grading
tools, storage locations, ways to connect. Use a table when there are more
options or the reader compares many attributes.

```html
<div class="docs-cards">
<article class="docs-card"><span aria-hidden="true" class="glyphicon glyphicon-hdd"></span><p class="docs-card-title">Home directory</p><p>Private to you, kept across terms.</p>
<dl class="docs-card-facts"><div><dt>Quota</dt><dd>...</dd></div></dl></article>
</div>
```

A card title is `<p class="docs-card-title">`. Use `<h3>` only when the card is
already a section of the page with its own `id`.

### Checklist

Use for prerequisites and requirements: what to have before starting, what a
request must include.

```html
<ul class="docs-checklist"><li>A UC San Diego account</li><li>...</li></ul>
```

### Command

Use for a command or file a reader copies, with a caption saying what it is or
where it runs. Keep the `<pre>` exactly as it was.

```html
<figure class="docs-command"><figcaption>Run on the login node</figcaption><pre class="docs-code"><code class="language-bash">...</code></pre></figure>
```

### Callouts

Decorator alerts. The build adds the matching glyphicon to the label.

| Kind | Class | Use for |
|---|---|---|
| Note | `alert alert-info docs-callout` | Context that prevents a mistake |
| Warning | `alert alert-warning docs-callout` | Something that costs time, data, or Service Units |
| Tip | `alert alert-success docs-callout` | A faster or safer way to do the task |

```html
<div class="alert alert-warning docs-callout" role="note"><p class="docs-callout-label"><strong>Warning</strong></p><p>...</p></div>
```

The label may name the point, such as "Always pass the class label", in place of
the generic word. Every callout body is in `<p>` elements. One or two callouts
per section at most; a page of callouts reads as noise.

### Key numbers

Use the TritonAI metric cards for two to four headline figures.

```html
<ul class="row agent-metric-grid" aria-label="..."><li class="col-sm-4"><div class="agent-metric-card"><strong class="agent-metric-value">18,000</strong><span class="agent-metric-label">Student enrollments</span><span class="agent-metric-note">2025-26 academic year</span></div></li></ul>
```

## Writing

Follow [voice and language](voice-and-language.md). For documentation:

- Lead each paragraph with its point. Split a paragraph that holds more than one.
- Turn a run of parallel items in a sentence into a list.
- Bold the one phrase in a paragraph a scanning reader must not miss, at most.
- Keep every fact: numbers, units, limits, commands, flags, hostnames, links,
  and the qualifiers on them ("by default", "approximately", "within a
  workspace"). Reword around them; never round, drop, or generalize them.
- Add nothing the page did not already say. A pattern rearranges content; it
  does not introduce new claims.
