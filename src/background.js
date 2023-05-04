const socket = new WebSocket("wss://api.staging.goflink.com/item-notifier/item-notifier/ws");

chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "send_notification_alert") {
    console.log("socket ready state", socket.readyState);
    socket.send(JSON.stringify(data.options));
  }

//   items = localStorage.getItem("notified_items");
  
//   if (items == undefined) {
//     items = {}
//   }
//   items[data.options.sku] = true;
//   localStorage.setItem("notified_items", items);
});

// socket.addEventListener("close", (event) => {
//   localStorage.removeItem("notified_items");

//   console.log(" socket close", event);
// });

socket.addEventListener("error", (event) => {
  console.log(" socket error", event);
});

socket.addEventListener("message", (event) => {
  chrome.notifications.create("", {
    title: "Back In Stock Notification",
    message: event.name + " alert received",
    type: "basic",
    iconUrl: "./flink_logo.png",
  });

});
