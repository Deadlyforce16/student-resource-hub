"use strict";

const WIKI_API = "https://en.wikipedia.org/w/api.php";
const FAVORITES_KEY = "studentResourceHub.favorites";
const SAVED = "Saved";
const ALL = "All";
const WIKI_DEBOUNCE_MS = 500;
const WIKI_MIN_LENGTH = 2;

const state = {
  category: ALL,
  query: "",
  favorites: loadFavorites(),
  wikiController: null,
  wikiTimer: null
};

const els = {
  form: document.getElementById("search-form"),
  input: document.getElementById("search-input"),
  filters: document.getElementById("filters"),
  curatedResults: document.getElementById("curated-results"),
  curatedStatus: document.getElementById("curated-status"),
  curatedCount: document.getElementById("curated-count"),
  wikiResults: document.getElementById("wiki-results"),
  wikiStatus: document.getElementById("wiki-status")
};

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored : []);
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...state.favorites]));
  } catch {
    // Storage can be blocked by browser settings; favorites then last for this visit only.
  }
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function matchesQuery(resource, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = [resource.title, resource.description, resource.category, ...resource.tags]
    .join(" ")
    .toLowerCase();
  return words.every((word) => haystack.includes(word));
}

function matchesCategory(resource) {
  if (state.category === ALL) return true;
  if (state.category === SAVED) return state.favorites.has(resource.url);
  return resource.category === state.category;
}

function renderFilters() {
  els.filters.replaceChildren();
  const names = [ALL, ...CATEGORIES, SAVED];
  for (const name of names) {
    const label = name === SAVED ? `\u2605 Saved (${state.favorites.size})` : name;
    const button = element("button", "chip", label);
    button.type = "button";
    button.setAttribute("aria-pressed", String(state.category === name));
    button.addEventListener("click", () => {
      state.category = name;
      renderFilters();
      renderCurated();
    });
    els.filters.append(button);
  }
}

function createResourceCard(resource) {
  const card = element("article", "card");
  card.append(element("span", "tag", resource.category));

  const heading = element("h3");
  const link = element("a", "", resource.title);
  link.href = resource.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  heading.append(link);
  card.append(heading, element("p", "", resource.description));

  const saved = state.favorites.has(resource.url);
  const save = element("button", "save", saved ? "\u2605 Saved" : "\u2606 Save");
  save.type = "button";
  save.setAttribute("aria-pressed", String(saved));
  save.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${resource.title}`);
  save.addEventListener("click", () => {
    if (state.favorites.has(resource.url)) {
      state.favorites.delete(resource.url);
    } else {
      state.favorites.add(resource.url);
    }
    saveFavorites();
    renderFilters();
    renderCurated();
  });
  card.append(save);
  return card;
}

function renderCurated() {
  const matches = RESOURCES.filter((resource) => matchesCategory(resource) && matchesQuery(resource, state.query));
  els.curatedResults.replaceChildren(...matches.map(createResourceCard));
  els.curatedCount.textContent = `(${matches.length})`;

  if (matches.length > 0) {
    els.curatedStatus.textContent = "";
  } else if (state.category === SAVED && !state.query) {
    els.curatedStatus.textContent = "You have not saved any resources yet. Use the Save button on a card.";
  } else {
    els.curatedStatus.textContent = "No curated resources match your search. Try another word or category.";
  }
}

function plainText(html) {
  return new DOMParser().parseFromString(html, "text/html").body.textContent.trim();
}

function createWikiCard(result) {
  const card = element("article", "card");
  card.append(element("span", "tag tag-wiki", "Wikipedia"));

  const heading = element("h3");
  const link = element("a", "", result.title);
  link.href = `https://en.wikipedia.org/?curid=${encodeURIComponent(result.pageid)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  heading.append(link);

  card.append(heading, element("p", "", `${plainText(result.snippet)}\u2026`));
  return card;
}

function clearWikipedia(message) {
  if (state.wikiController) state.wikiController.abort();
  els.wikiResults.replaceChildren();
  els.wikiStatus.textContent = message;
}

async function searchWikipedia(query) {
  const trimmed = query.trim();
  if (trimmed.length < WIKI_MIN_LENGTH) {
    clearWikipedia("Type at least two characters to search Wikipedia.");
    return;
  }

  if (state.wikiController) state.wikiController.abort();
  const controller = new AbortController();
  state.wikiController = controller;
  els.wikiResults.replaceChildren();
  els.wikiStatus.textContent = "Searching Wikipedia\u2026";

  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: trimmed,
    srlimit: "8",
    srprop: "snippet",
    format: "json",
    formatversion: "2",
    origin: "*"
  });

  try {
    const response = await fetch(`${WIKI_API}?${params}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Wikipedia returned status ${response.status}`);
    const data = await response.json();
    const results = data.query && Array.isArray(data.query.search) ? data.query.search : [];

    if (results.length === 0) {
      els.wikiStatus.textContent = `No Wikipedia articles found for "${trimmed}".`;
      return;
    }
    els.wikiStatus.textContent = "";
    els.wikiResults.replaceChildren(...results.map(createWikiCard));
  } catch (error) {
    if (error.name === "AbortError") return;
    els.wikiStatus.textContent = "Wikipedia search is unavailable right now. Check your internet connection and try again.";
  }
}

function onQueryChanged() {
  state.query = els.input.value;
  renderCurated();

  window.clearTimeout(state.wikiTimer);
  if (!state.query.trim()) {
    clearWikipedia("Type a topic above to also search Wikipedia.");
    return;
  }
  state.wikiTimer = window.setTimeout(() => searchWikipedia(state.query), WIKI_DEBOUNCE_MS);
}

els.input.addEventListener("input", onQueryChanged);
els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = els.input.value;
  renderCurated();
  window.clearTimeout(state.wikiTimer);
  searchWikipedia(state.query);
});

renderFilters();
renderCurated();
clearWikipedia("Type a topic above to also search Wikipedia.");
