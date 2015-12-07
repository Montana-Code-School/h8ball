var React = require("react");
var Cats = require('./cat');

var ListOfCats = React.createClass({
	render: function() {
    	var catFilter = this.props.data.map(function(c){
    		console.log(c.name)
        	return (
        		<div>
        			<li><a href={c.name}></a></li>
        		</div>
        		)
      		})
        return (
        <div>
        	<li></li> 
        </div>
        );
    }
});

module.exports = ListOfCats;

