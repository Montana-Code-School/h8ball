var React = require("react");
var ListOfCats = require('./listOfCats');
var Cats = require('./cat');

var AllCats = React.createClass({

    
    getInitialState: function(){
      return {data: []}
  },

  loadCatsFromServer: function() {
    var url = "/api/ball/cats";
    $.ajax({
      url: url,
      dataType: 'json',
      cache:false,
      success:function(data){
        console.log("inside success" + JSON.stringify(data[0]))
        this.setState({data:data});
      }.bind(this),
      error: function(xhr,status, err){
        console.log("broken url is " + this.props.url)
        console.error(this.props.url, status,err.toString());
      }.bind(this)
    });
  },

  
  componentDidMount: function() {
    this.loadCatsFromServer();
  },

    render: function() {
     return (
        <div>
        <ListOfCats data={this.props.data} />
        
          
          
        </div>
        );
    }
});

module.exports = AllCats;