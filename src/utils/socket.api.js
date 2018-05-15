import io from "socket.io-client";

module.exports = {
  socket: null,
  listeners: {},
  init: function() {
    if(this.socket) return;
    this.socket = io("http://192.168.1.102:3000", {
      transports: ["websocket"]
    });
  },
  // emit event
  emitEvent: function(eventTopic, dataOptions) {
    this.socket.emit(eventTopic, dataOptions);
  },

  // add listener for topic
  addListener: function(eventTopic, cb) {
    this.removeListener(eventTopic);

    this.listeners[eventTopic] = cb;
    this.socket.on(eventTopic, data => {
      // console.log(data);
      this.listeners[eventTopic](data);
    });
  },

  removeListener: function(eventTopic) {
    if (this.listeners[eventTopic]) {
      this.socket.removeListener(eventTopic, this.listeners[eventTopic]);
    }
    this.listeners[eventTopic] = null;
  }
};
