// var ShowCategory = React.createClass({
//     render: function() {
//         return (
//                 <div>
//                     <h1>Hello</h1>
                    
//                 </div>
//         );
//     }
// });

// var ListAllCategories = React.createClass({
//     render: function() {
//         return (
//                 <div>
//                     <h1>Hello</h1>
//                     <p onClick={this.props.SetCatState}> Category Name </p>
                    
//                 </div>
//         );
//     }
// });


// var AllCats = React.createClass({
//     getInitialState: function(){
//         activeId: ""
//     },
//     loadAllCats(),
//     loadOneCat(){
//         setState of Category ID
//     },
//     render: function() {
//         return (
//                 <div>
//                     <ListAllCategories SetCatState={this.SetCatState} data={this.state.AllCats}/>
//                     <ShowCategory  data={this.state.activeId} />
//                 </div>
//         );
//     }
// });

// React.render(<App/>, document.body);






var React = require("react");
var Joke = require('./magic');

var ListOfCats = React.createClass({
	alertt: function(c){
		alert(c);
	},
	render: function() {
        var self = this;
    	var catFilter = this.props.data.map(function(c){
    		console.log(c.name)
        	return (
        		<div>
                    
        			<li><button onClick={self.alertt.bind(this,c._id)}> {c.name}</button></li>
                    
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

