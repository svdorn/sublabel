// return true if the value is white or undefined
function isWhiteOrUndefined(color) {
  return (
      !color ||
      color.toLowerCase() === "#ffffff" ||
      color.toLowerCase() === "#fff" ||
      color.toLowerCase() === "white"
  );
}
// return true if the color is white
function isWhite(color) {
  return (
      typeof color === "string" &&
      (color.toLowerCase() === "#ffffff" ||
          color.toLowerCase() === "#fff" ||
          color.toLowerCase() === "white")
  );
}

// goes to a different page within the site
function goTo(route) {
    // scroll to the top of the new page
    window.scrollTo(0, 0);
}

function noop() {}

// returns whether the thing has a truthy value (defined, not null, not empty string)
function truthy(thing) {
  return !!thing;
}

function propertyExists(object, propertyTree, type) {
  let parent = object;
  // if the parent does not exist, property can't exist
  if (!parent) {
      return false;
  }
  // if no properties given, property can't exist
  if (!Array.isArray(propertyTree) || propertyTree.length === 0) {
      return false;
  }

  // start with the first property in the tree
  let treePropIndex = 0;
  // go through each property in the tree
  while (treePropIndex < propertyTree.length) {
      // make sure the parent is an object so it can have given properties
      if (typeof parent !== "object") {
          return false;
      }
      // name of the object property
      const propName = propertyTree[treePropIndex];
      // if the property does not exist, fail
      if (parent[propName] === undefined) {
          return false;
      }
      // the property is legit, so set the parent to be the value of the child prop
      parent = parent[propName];
      // move to the next property
      treePropIndex++;
  }
  // at this point, parent is the value we wanted to check
  // if there is a defined wanted type, check for it
  if (truthy(type)) {
      return typeof parent === type;
  }
  // otherwise return that the property is valid
  else {
      return true;
  }
}

// decrease the shade of a color by a certain amount (default 20)
function darken(color, difference) {
  if (typeof color !== "string") return color;
  if (color.length === 7) color = color.substring(1);
  if (color.length !== 6) return color;
  if (typeof difference !== "number") difference = 20;
  let r = parseInt(color.substring(0, 2), 16) - difference;
  let g = parseInt(color.substring(2, 4), 16) - difference;
  let b = parseInt(color.substring(4, 6), 16) - difference;
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) g = 0;
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  return "#" + r + g + b;
}

export {
    isWhiteOrUndefined
    , isWhite
    , goTo
    , noop
    , propertyExists
    , darken
};
