var React = require("react");

var App = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();

			var cat = React.findDOMNode(this.refs.cat).value.trim();
			var joke = React.findDOMNode(this.refs.joke).value.trim();

			if(!cat){
				return;
			}
			var data = ({ cat: cat, joke: joke});
			var url2 = '5661c3ffe107044102dd9992' 
			$.ajax({
				url:'/api/jokes/cat/' + url2,
				dataType: 'json',
				data: data,
				type: 'POST',
					success:function(response){
					console.log("Posting data", data, response)
					document.location='/index.html'
					}.bind(this),
					error: function(xhr,status, err){
						console.log("NOT POSTING DATA")
						console.log(data)
						console.error(this.props.url, status, err.toString());
					}.bind(this)
			})
	},
    render: function() {
        return (
				<div>
					<form method="POST">
						<h1 id="formHead">Make your own Magic Ballz</h1>
						<input id="catFrom" type="text" ref="cat" className="form-control" placeholder="Category Please"/>
						<textarea id="jokeForm"type="text" ref="joke" className="form-control" placeholder="Spit yo hot fire"/>
						<button id="makeBallButton"onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
        );
    }
});

module.exports = App;
	












