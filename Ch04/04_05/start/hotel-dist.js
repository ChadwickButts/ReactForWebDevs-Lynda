"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
  "use strict";

  var CONFIG = {
    apiUrl: "http://localhost/reactjs/status_api"
  };

  function PostForm(props) {
    var typeOptions = Object.keys(props.messageTypes).map(function (key) {
      if (props.messageTypes.hasOwnProperty(key)) {
        return React.createElement(
          "option",
          { key: key, value: key },
          props.messageTypes[key]
        );
      }
    });

    // so we don't have to type this over and over
    var defaultType = typeOptions[0].key;

    return React.createElement(
      "form",
      null,
      React.createElement(
        "h3",
        null,
        "Post an Update"
      ),
      React.createElement(
        "div",
        { className: "field-group" },
        React.createElement(
          "label",
          { htmlFor: "txt-message" },
          "Message"
        ),
        React.createElement("textarea", { id: "txt-message", rows: "2" })
      ),
      React.createElement(
        "div",
        { className: "field-group" },
        React.createElement(
          "label",
          { htmlFor: "txt-type" },
          "Type"
        ),
        React.createElement(
          "select",
          { id: "txt-type" },
          typeOptions
        )
      ),
      React.createElement(
        "div",
        { className: "field-group action" },
        React.createElement("input", { type: "submit", value: "Post Update" })
      )
    );
  }

  function StatusMessage(props) {
    var statusDate = date.parse(props.time, "YYYY-MM-DD, HH:mm"),
        dateFormat = "M/D/Y, h:mm A";

    return React.createElement(
      "div",
      { className: "status-message" },
      props.msg,
      React.createElement(
        "span",
        { className: "name" },
        "\u2014\xA0",
        props.type
      ),
      React.createElement(
        "span",
        { className: "time" },
        date.format(statusDate, dateFormat)
      )
    );
  }

  function StatusMessageList(props) {
    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        statuses = _React$useState2[0],
        setStatuses = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        loaded = _React$useState4[0],
        setLoaded = _React$useState4[1];

    React.useEffect(function () {
      retrieveStatusMessages();
    }, []);

    function retrieveStatusMessages() {
      axios.get(CONFIG.apiUrl + "/get.php?delay=5").then(function (response) {
        setStatuses(response.data);
        setLoaded(true);
      });
    }

    function displayStatusMessages() {
      return statuses.map(function (status) {
        return React.createElement(
          "li",
          { key: status.id },
          React.createElement(StatusMessage, {
            msg: status.msg,
            type: props.messageTypes[status.type],
            time: status.time
          })
        );
      });
    }

    if (loaded) {
      return React.createElement(
        "ul",
        { id: "status-list" },
        displayStatusMessages()
      );
    } else {
      return React.createElement(
        "div",
        { id: "status-list", className: "loading" },
        "Loading...",
        React.createElement(
          "div",
          { className: "spinner" },
          React.createElement("div", { className: "bounce1" }),
          React.createElement("div", { className: "bounce2" }),
          React.createElement("div", { className: "bounce3" })
        )
      );
    }
  }

  function StatusMessageManager(props) {
    var messageTypes = {
      management: "Management",
      dining: "Dining Services",
      ops: "Operations",
      plumbing: "Plumbing",
      pool: "Pool"
    };

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "div",
        { id: "post-status" },
        React.createElement(PostForm, { messageTypes: messageTypes })
      ),
      React.createElement(StatusMessageList, { messageTypes: messageTypes })
    );
  }

  ReactDOM.render(React.createElement(StatusMessageManager, null), document.getElementById("react-statusmanager"));
})();
//# sourceMappingURL=hotel-dist.js.map