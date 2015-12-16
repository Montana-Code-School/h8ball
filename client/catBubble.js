var React = require('react')

var CatBub = React.createClass({


    render: function() {
    if(this.props.name){
		var name = this.props.name
	} else {
		var name = "nothing "
	}
        return (
				<div>
					{name}		
				</div>
        );
    }
});

module.exports = CatBub

