(async () => {
  const messages = document.querySelector("ul[data-js=messages]");
  const res = await fetch("http://localhost:3000/messages");
  const json = await res.json();

  json.forEach(msg => {
    const className = msg.isViewed ? "messages__li" : "messages__li--unviewed";
    const attr = {
      class: className,
      "data-js-id": msg.id,
      "data-js-viewed": msg.isViewed
    };

    messages.appendChild(li(attr, msg.message));
  });

  const handleScroll = elements => {
    const idArray = elements
      .map(e => {
        return {
          id: parseInt(e.getAttribute("data-js-id")),
          isViewed: e.getAttribute("data-js-viewed") === "true",
          isInView: e.getBoundingClientRect().y < window.innerHeight
        };
      })
      .filter(obj => !obj.isViewed && obj.isInView)
      .map(obj => obj.id);

    if (idArray.length > 0) {
      fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          viewedMessages: idArray
        })
      });
    }
  };

  const liArray = Array.from(document.querySelectorAll("li"));

  document.addEventListener("scroll", () => {
    handleScroll(liArray);
  });
})();
