// var React = require("react");
// var ListOfCats = require('./listOfCats');

// var Joke  = React.createClass ({
//   getInitialState: function() {
//     return {liked: false, joke: []};
//   },

//     loadJokesFromServer: function() {
//       var url = '/api/jokes/cat/justone/';
//       var url2 = '66748a010879dab25ba6064';
// 		$.ajax({
//           url: url + url2,
//           dataType: 'json',
//           cache: false,

//           success:function(data){
//             console.log("joke success");
//             this.setState({joke:data});
//             this.setState({liked: !this.state.liked});
//           }.bind(this),

//           error: function(xhr, status, err){
//             console.log("broken ")
//             console.error(status, err.toString());
//           }.bind(this)
//         });
//     },
    
//   render: function() {
//     var text = this.state.liked ? 'Hide Jokes' : 'Show Jokes';
//     return (
     
//       <div>
//         <div className="ball"  onClick= {this.loadJokesFromServer}
//                 type="button">
//           <div className="8Ball">      
//             <img src="img/8ball.png" />
//             <MainJoke joke={this.state.joke} jokeDisplay={this.state.liked}/>
//           </div>
//         </div>
//       </div>
//     );
//   }
// })

// var MainJoke = React.createClass({
	
//   render: function() {
//     var jokeList = this.props.joke;

//     return !this.props.jokeDisplay ? <div/> : (
//       <div className="col-sm-12"id="mainJoke">
//         <h3 className="returnTitles"></h3>
//           {jokeList}
//       </div>
//     );
//   }
// });

// module.exports = Joke;