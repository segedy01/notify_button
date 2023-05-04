const hubslug = JSON.parse(localStorage.ajs_user_traits).hubSlug;

outOfStockDiv = document.getElementsByClassName("out-of-stock");
if (outOfStockDiv.length == 0) {
  console.log("page not loaded yet");
} else {
  Array.from(outOfStockDiv).forEach((element) => {
    let button = document.createElement("div");
    let urlSplit = element.children[1].children[1].firstElementChild
      .getAttribute("href")
      .split("-");
    let sku = urlSplit[urlSplit.length - 1].replace("/", "");

    button.addEventListener("click", () => {
      console.log(sku);
      chrome.runtime.sendMessage("", {
        type: "send_notification_alert",
        options: {
          sku: sku,
          hub_slug: hubslug,
        },
      });

      items = localStorage.getItem("notified_items");
      if (items == undefined) {
        items = `{}`;
      }
      itemJson = JSON.parse(items)
      itemJson[sku] = true;
      localStorage.setItem("notified_items", JSON.stringify(itemJson));

      button.innerHTML=``
    });

    items = localStorage.getItem("notified_items");
    if (items == undefined) {
      items = `{}`;
    }

    itemJson = JSON.parse(items)
    if (!itemJson[sku]) {
      button.innerHTML = `
        <div data-v-7c863af2="" data-v-3c56a940="" class="quantity-control"
            style="right: 0.5rem; bottom: 0.5rem; left: auto; top: auto;">
            <div data-v-7c863af2="" class="add-product-controls"><!----> <!----> <button data-v-7c863af2="" type="button"
                    title="Add Dr. Oetker Ristorante Pizza Mozzarella 335g"
                    aria-label="Add Dr. Oetker Ristorante Pizza Mozzarella 335g" data-testid="addProduct"
                    class="button flink-btn"><!----> <span data-v-ce5606dc="" data-v-7c863af2="" class="icon quantity-icon"
                    >
                        <img
                            src="data:image/png;base64,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">
                    </span></button></div>
        </div>
      `;
    }
    
    element.firstElementChild.insertAdjacentElement("beforeend", button);
  });
}
