const state = {
  enabled: (() => {
    const v =
      (typeof process !== "undefined" &&
        process.env &&
        (process.env.E2E_TESTIDS || process.env.E2E || process.env.NODE_ENV)) ||
      "";
    const s = String(v).toLowerCase();
    if (s === "1" || s === "true" || s === "yes" || s === "on") return true;
    if (s === "test" || s === "e2e") return true;
    return false;
  })(),
  attr: "data-testid",
  sep: ".",
  sanitizer: (x) =>
    String(x)
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w.\-:/]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "")
};

function configure(options = {}) {
  if (Object.prototype.hasOwnProperty.call(options, "enabled")) {
    state.enabled = Boolean(options.enabled);
  }
  if (Object.prototype.hasOwnProperty.call(options, "attr") && options.attr) {
    state.attr = String(options.attr);
  }
  if (Object.prototype.hasOwnProperty.call(options, "sep") && options.sep) {
    state.sep = String(options.sep);
  }
  if (
    Object.prototype.hasOwnProperty.call(options, "sanitizer") &&
    typeof options.sanitizer === "function"
  ) {
    state.sanitizer = options.sanitizer;
  }
  return getConfig();
}

function getConfig() {
  return { enabled: state.enabled, attr: state.attr, sep: state.sep };
}

function isEnabled() {
  return state.enabled;
}

function normalizePart(part) {
  if (part === null || part === undefined) return "";
  const s = state.sanitizer(part);
  return s;
}

function joinParts(parts) {
  const out = [];
  for (const p of parts) {
    const n = normalizePart(p);
    if (n) out.push(n);
  }
  return out.join(state.sep);
}

function ensureId(idOrParts) {
  if (Array.isArray(idOrParts)) return joinParts(idOrParts);
  return normalizePart(idOrParts);
}

function tid(id, extraProps) {
  const props = extraProps && typeof extraProps === "object" ? extraProps : {};
  if (!state.enabled) return props;
  const testId = ensureId(id);
  if (!testId) return props;
  return { ...props, [state.attr]: testId };
}

function tidValue(id) {
  const testId = ensureId(id);
  return testId;
}

function createTid(namespace) {
  const base = normalizePart(namespace);
  const builder = (...parts) => joinParts([base, ...parts]);

  builder.base = () => base;

  builder.of = (...parts) => joinParts([base, ...parts]);

  builder.tid = (...parts) => tid(joinParts([base, ...parts]));

  builder.value = (...parts) => tidValue(joinParts([base, ...parts]));

  builder.with = (parts, extraProps) =>
    tid(
      joinParts([base, ...(Array.isArray(parts) ? parts : [parts])]),
      extraProps
    );

  builder.child = (childNamespace) => createTid(joinParts([base, childNamespace]));

  builder.enable = () => configure({ enabled: true });

  builder.disable = () => configure({ enabled: false });

  return builder;
}

function makeJourneyTid(feature, screen) {
  const f = normalizePart(feature);
  const s = normalizePart(screen);
  const t = createTid(joinParts([f, s]));
  return t;
}

module.exports = {
  configure,
  getConfig,
  isEnabled,
  tid,
  tidValue,
  createTid,
  makeJourneyTid
};
