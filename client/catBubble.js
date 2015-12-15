// bubbleData: [],

// this.loadBubblesFromServer();

// loadBubblesFromServer: function() {
//       console.log("going to get a single response for the cat bubble")
//          var url = '/api/catBubble/catBubble';
//           $.ajax({
//             url: url,
//             dataType: 'json',
//             cache: false,
//           success:function(data){
//             console.log("catsnark success");
//             this.setState({bubbleData: data});
//           }.bind(this),
//           error: function(xhr, status, err){
//             console.log("broken ")
//             console.error(status, err.toString());
//           }.bind(this)
//         });
//     }, 

//  <div className="col-md-3">
//                  <div>
//                    <div id="catWords"> 
//                      <JokeWithCat data={this.state.bubbleData} />
//                    </div>
//                    <div>
//                      <img className="resize" id="chatBubble" src="img/chatBubble.png" />
//                    </div>
//                  </div>
//                </div>


// var JokeWithCat = React.createClass({

//     render: function() {
//         return (
//         <div>         

//           <h3>Click on the ball to reveal the answer to your question.</h3>

          
//           <h3>{this.props.data}</h3>
//         </div>
//         );
//     }
// });