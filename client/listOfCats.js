var React = require("react");
var Cats = require('./cat');

var ListOfCats = React.createClass({
    render: function() {
        return (
        <div>
          <Cats />
          
        </div>
        );
    }
});

module.exports = ListOfCats;