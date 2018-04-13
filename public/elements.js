const makeElement = name => (attr, children) => {
  const el = document.createElement(name);
  const keys = Object.keys(attr);
  keys.forEach(key => {
    el.setAttribute(key, attr[key]);
  });
  el.innerHTML = children;
  return el;
};

const li = makeElement("li");
