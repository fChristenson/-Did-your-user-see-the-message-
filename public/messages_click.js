const API = (() => {
  const viewed = el => {
    const idString = el.getAttribute("data-js");
    const id = parseInt(idString);

    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        viewedMessages: [id]
      })
    });
  };

  return {
    viewed
  };
})();

(async () => {
  const messages = document.querySelector("ul[data-js=messages]");
  const res = await fetch("http://localhost:3000/messages");
  const json = await res.json();

  json.forEach(msg => {
    const className = msg.isViewed ? "messages__li" : "messages__li--unviewed";
    const attr = {
      class: className,
      onclick: "API.viewed(this);",
      "data-js": msg.id
    };

    messages.appendChild(li(attr, msg.message));
  });
})();
