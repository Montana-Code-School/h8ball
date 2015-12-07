var React = require("react");
// var Cats = require('./cat');

var ListOfCats = React.createClass({
	alertt: function(c){
		alert(c)
	},
	render: function() {
    	var catFilter = this.props.data.map(function(c){
    		console.log(c.name)
        	return (
        		<div>
        			<li><button onClick={this.alertt.bind(this,c._id)}>{c.name}</button></l1>
        		</div>
        		)
      		})
        return (
        <div>
        	{catFilter} 
        </div>
        );
    }
});

module.exports = ListOfCats;

