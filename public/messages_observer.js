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

  const handleIntersection = (entries, observer) => {
    console.log(entries);
    console.log("--------------------------");
    const idArray = entries
      .filter(e => e.isIntersecting)
      .map(e => {
        return {
          id: parseInt(e.target.getAttribute("data-js-id")),
          isViewed: e.target.getAttribute("data-js-viewed") === "true"
        };
      })
      .filter(obj => !obj.isViewed)
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

  const options = {
    rootMargin: "0px",
    threshold: 1.0
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  const liArray = document.querySelectorAll("li");
  liArray.forEach(li => {
    observer.observe(li);
  });
})();
