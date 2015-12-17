var React = require('react')

var CatBub = React.createClass({


    render: function() {
    if(this.props.name){
		var name = this.props.name
	} else {
		var name = "Select a category then click on the ball."
	}
        return (
				<div id="whiteBub">
					{name}		
				</div>
        );
    }
});

module.exports = CatBub

