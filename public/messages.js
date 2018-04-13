(async () => {
  const messages = document.querySelector("ul[data-js=messages]");
  const res = await fetch("http://localhost:3000/messages");
  const json = await res.json();

  json.forEach(msg => {
    const className = msg.isViewed ? "messages__li" : "messages__li--unviewed";
    messages.appendChild(li({ class: className }, msg.message));
  });

  fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      viewedMessages: JSON.stringify(json.map(msg => msg.id))
    })
  });
})();
