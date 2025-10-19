/**
 * formatUtils.js
 * Centralized mapping and utility functions for CSS helper classes
 * Makes dynamic JS styling easier and less error-prone
 */

/* ========================== Helper Class Mappings ========================== */
export const helpers = {
  /* Spacing */
  margin: {
    m0: "m-0",
    mt0: "mt-0",
    mb0: "mb-0",
    ml0: "ml-0",
    mr0: "mr-0",
    mAuto: "m-auto",
    mtXs: "mt-xs",
    mtSm: "mt-sm",
    mtMd: "mt-md",
    mtLg: "mt-lg",
    mtXl: "mt-xl",
    mbXs: "mb-xs",
    mbSm: "mb-sm",
    mbMd: "mb-md",
    mbLg: "mb-lg",
    mbXl: "mb-xl",
    p0: "p-0",
    pXs: "p-xs",
    pSm: "p-sm",
    pMd: "p-md",
    pLg: "p-lg",
    pXl: "p-xl",
  },

  /* Width / Height */
  size: {
    wFull: "w-full",
    hFull: "h-full",
    maxWFull: "max-w-full",
    maxHFull: "max-h-full",
  },

  /* Flex */
  flex: {
    flex: "flex",
    column: "flex-column",
    row: "flex-row",
    center: "flex-center",
    start: "flex-start",
    end: "flex-end",
    spaceBetween: "flex-space-between",
    wrap: "flex-wrap",
  },

  /* Grid */
  grid: {
    grid: "grid",
    cols1: "grid-1",
    cols2: "grid-2",
    cols3: "grid-3",
    gapSm: "grid-gap-sm",
    gapMd: "grid-gap-md",
    gapLg: "grid-gap-lg",
  },

  /* Text */
  text: {
    center: "text-center",
    left: "text-left",
    right: "text-right",
    muted: "text-muted",
    accent: "text-accent",
    highlight: "text-highlight",
    uppercase: "text-uppercase",
    lowercase: "text-lowercase",
  },

  /* Background */
  bg: {
    surface: "bg-surface",
    surfaceAlt: "bg-surface-alt",
    accent: "bg-accent",
    highlight: "bg-highlight",
  },

  /* Border / Radius */
  border: {
    roundedSm: "rounded-sm",
    roundedMd: "rounded-md",
    roundedLg: "rounded-lg",
    border: "border",
    borderNone: "border-none",
  },

  /* Shadow */
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },

  /* Z-index */
  zIndex: {
    z10: "z-10",
    z20: "z-20",
    z50: "z-50",
    z100: "z-100",
  },

  /* Visibility */
  visibility: {
    hidden: "hidden",
    visible: "visible",
    overflowHidden: "overflow-hidden",
    overflowAuto: "overflow-auto",
  },

  /* Position */
  position: {
    relative: "relative",
    absolute: "absolute",
    fixed: "fixed",
    inset0: "inset-0",
    top0: "top-0",
    right0: "right-0",
    bottom0: "bottom-0",
    left0: "left-0",
  },

  /* Transition */
  transition: {
    default: "transition",
    fast: "transition-fast",
    medium: "transition-medium",
  },
};

/* ========================== Utility Functions ========================== */

/**
 * Add one or more helper classes to an element
 * @param {HTMLElement} el
 * @param  {...string} classes
 */
export function addHelpers(el) {
  var classes = Array.prototype.slice.call(arguments, 1);
  classes.forEach(function(cls) {
    el.classList.add(cls);
  });
}

/**
 * Remove one or more helper classes from an element
 * @param {HTMLElement} el
 * @param  {...string} classes
 */
export function removeHelpers(el) {
  var classes = Array.prototype.slice.call(arguments, 1);
  classes.forEach(function(cls) {
    el.classList.remove(cls);
  });
}

/**
 * Toggle a helper class on an element
 * @param {HTMLElement} el
 * @param {string} cls
 * @param {boolean} [force] - if true adds, if false removes
 */
export function toggleHelper(el, cls, force) {
  if (force === undefined) {
    el.classList.toggle(cls);
  } else if (force) {
    el.classList.add(cls);
  } else {
    el.classList.remove(cls);
  }
}

/**
 * Apply multiple helper categories at once
 * Example: applyHelpers(el, helpers.flex.center, helpers.margin.mtMd)
 */
export function applyHelpers(el) {
  var helperValues = Array.prototype.slice.call(arguments, 1);
  helperValues.forEach(function(cls) {
    el.classList.add(cls);
  });
}
