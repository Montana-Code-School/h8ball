var React = require('react')

var CatBub = React.createClass({


    render: function() {
    if(this.props.name){
		var name = this.props.name
	} else {
		var name = "Click on the ball to reveal the Answer"
	}
        return (
				<div id="whiteBub">
					{name}		
				</div>
        );
    }
});

module.exports = CatBub

