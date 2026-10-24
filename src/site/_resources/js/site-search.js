/*
 * PARASOL site search.
 *
 * The shell's search forms post to /search/index.html with `search-term` and
 * `search-scope`, and the hosted campus search (search-api.js) answers every
 * scope it knows. "This Site" has no hosted collection for PARASOL yet, so that
 * scope is answered here from /_data/search-index.json, which the build writes
 * from the same content the pages render. Other scopes go to the hosted search
 * untouched.
 *
 * search-api.js assigns a global `search` function. A property accessor
 * installed before it loads lets this file wrap that function without editing
 * the hosted script.
 */
(function () {
  "use strict";

  var container = document.querySelector("[data-parasol-search]");
  if (!container) return;

  var SITE_SCOPE = container.getAttribute("data-site-scope") || "parasol";
  var INDEX_URL = container.getAttribute("data-search-index");
  var PAGE_SIZE = 20;
  var indexPromise = null;
  var hostedSearch = null;

  function parameter(name) {
    var value = new URLSearchParams(window.location.search).get(name);
    return value === null ? null : value.trim();
  }

  function isSiteScope(scope) {
    return !scope || scope === SITE_SCOPE;
  }

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { credentials: "same-origin" }).then(function (response) {
        if (!response.ok) throw new Error("Search index unavailable");
        return response.json();
      });
    }
    return indexPromise;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function terms(query) {
    return query
      .toLowerCase()
      .split(/\s+/)
      .map(function (term) { return term.replace(/^[^\w.-]+|[^\w.-]+$/g, ""); })
      .filter(function (term) { return term.length > 1; });
  }

  function score(entry, words, phrase) {
    var title = entry.title.toLowerCase();
    var section = entry.section.toLowerCase();
    var text = entry.text.toLowerCase();
    var total = 0;
    for (var index = 0; index < words.length; index += 1) {
      var word = words[index];
      var inTitle = title.indexOf(word) !== -1;
      var inSection = section.indexOf(word) !== -1;
      var inText = text.indexOf(word) !== -1;
      if (!inTitle && !inSection && !inText) return 0;
      if (inTitle) total += 8;
      if (inSection) total += 5;
      if (inText) total += Math.min(text.split(word).length - 1, 6);
    }
    if (phrase.length > 3 && (section + " " + text).indexOf(phrase) !== -1) total += 10;
    return total;
  }

  function snippet(text, words) {
    var lower = text.toLowerCase();
    var position = -1;
    for (var index = 0; index < words.length && position === -1; index += 1) position = lower.indexOf(words[index]);
    var start = Math.max(0, position - 80);
    var excerpt = (start > 0 ? "… " : "") + text.slice(start, start + 240) + (start + 240 < text.length ? " …" : "");
    var html = escapeHtml(excerpt);
    words.forEach(function (word) {
      html = html.replace(new RegExp("(" + escapeRegExp(escapeHtml(word)) + ")", "gi"), "<mark>$1</mark>");
    });
    return html;
  }

  function render(query, results) {
    var count = document.getElementById("result-count-placeholder");
    var list = document.getElementById("result-list-placeholder");
    var pagination = document.getElementById("result-pagination-placeholder");
    if (pagination) pagination.innerHTML = "";
    if (!query) {
      count.innerHTML = "<p>Type a word or phrase in the search box above.</p>";
      list.innerHTML = "";
      return;
    }
    var shown = results.slice(0, PAGE_SIZE);
    count.innerHTML =
      "<p><strong>" + results.length + "</strong> " + (results.length === 1 ? "result" : "results") +
      " for <strong>" + escapeHtml(query) + "</strong> on this site" +
      (results.length > PAGE_SIZE ? ", showing the first " + PAGE_SIZE : "") + ".</p>";
    if (!results.length) {
      list.innerHTML =
        '<p>Try fewer or different words, browse the <a href="' + escapeHtml(container.getAttribute("data-docs-url") || "../docs/index.html") +
        '">documentation</a>, or choose All UCSD Sites in the search box.</p>';
      return;
    }
    list.innerHTML =
      '<ol class="parasol-search-results">' +
      shown
        .map(function (result) {
          var entry = result.entry;
          var heading = entry.section && entry.section !== entry.title ? entry.title + ": " + entry.section : entry.title;
          return (
            '<li><h2><a href="' + escapeHtml(result.url) + '">' + escapeHtml(heading) + "</a></h2>" +
            (entry.eyebrow ? '<p class="parasol-search-path">' + escapeHtml(entry.eyebrow) + "</p>" : "") +
            "<p>" + snippet(entry.text || entry.title, result.words) + "</p></li>"
          );
        })
        .join("") +
      "</ol>";
  }

  // Index URLs are site-absolute routes. On the GitHub Pages review build the
  // site lives under a base path, which the index URL itself carries.
  function routeUrl(route) {
    var base = INDEX_URL.replace(/\/_data\/search-index\.json$/, "");
    return base + route;
  }

  function runLocalSearch(query) {
    var input = document.querySelectorAll('input[name="search-term"], input[name="search-term-m"]');
    for (var index = 0; index < input.length; index += 1) input[index].value = query || "";
    var words = terms(query || "");
    if (!words.length) {
      render(query, []);
      return Promise.resolve();
    }
    return loadIndex()
      .then(function (entries) {
        var phrase = query.toLowerCase().trim();
        var results = entries
          .map(function (entry) { return { entry: entry, score: score(entry, words, phrase), words: words, url: routeUrl(entry.url) }; })
          .filter(function (result) { return result.score > 0; })
          .sort(function (a, b) { return b.score - a.score; });
        render(query, results);
      })
      .catch(function () {
        document.getElementById("result-count-placeholder").innerHTML =
          "<p>Search is unavailable right now. Browse the documentation from the menu instead.</p>";
      });
  }

  Object.defineProperty(window, "search", {
    configurable: true,
    get: function () {
      return function (formData, isBackNavigation) {
        if (formData && isSiteScope(formData.scope)) {
          runLocalSearch(formData.q || "");
          if (!isBackNavigation && window.history && window.history.pushState) {
            var url = "?search-scope=" + encodeURIComponent(SITE_SCOPE) + "&search-term=" + encodeURIComponent(formData.q || "");
            window.history.pushState({ scope: SITE_SCOPE, q: formData.q || "" }, "Search", url);
          }
          return false;
        }
        return hostedSearch ? hostedSearch(formData, isBackNavigation) : false;
      };
    },
    set: function (value) {
      hostedSearch = value;
    },
  });

  var scope = parameter("search-scope") || parameter("scope");
  var query = parameter("search-term") || parameter("search-term-m") || parameter("q") || "";
  if (isSiteScope(scope)) runLocalSearch(query);
})();
