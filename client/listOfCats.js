
var React = require("react");
var App = React.createClass({
    getInitialState: function(){
        return { catId: '', jokeData:[], allCats: [], liked: false}
    },
    loadCatsFromServer: function() {
    var url = "/api/ball/cats";
        $.ajax({
          url: url,
          dataType: 'json',
          cache:false,
          success:function(data){
            console.log("inside success" + JSON.stringify(data[0]))
            this.setState({allCats:data});
          }.bind(this),
          error: function(xhr,status, err){
            console.log("broken url is " + this.props.url)
            console.error(this.props.url, status,err.toString());
          }.bind(this)
        });
  },
  loadNewCats: function(id){
    var id = id;
    return this.setState({
        catId: id 
    });
    
  },

    loadJokesFromServer: function(id) {
    console.log("going to get a single joke from server with id")
      var url = '/api/jokes/cat/justone/';
      var catId = this.state.catId;
        $.ajax({
          url: url + catId,
          dataType: 'json',
          cache: false,
          success:function(data){
            console.log("joke success");
            this.setState({jokeData: data});
            this.setState({liked: !this.state.liked});
          }.bind(this),
          error: function(xhr, status, err){
            console.log("broken ")
            console.error(status, err.toString());
          }.bind(this)
        });
    },
    componentDidMount: function(){
        this.loadCatsFromServer();
        this.loadJokesFromServer();
    },
    render: function() {
        return (
        <div>
            <nav className="navbar navbar-default" role="navigation">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" id="brand" href="/">MAGIC 8 BALL</a>
                </div>                
                <div className="collapse navbar-collapse" id="navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                         <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">MAKE YOUR OWN<span className="caret"></span></a>
                          <ul className="dropdown-menu" id="makeYourOwn">
                            <NewBall data={this.state.allCats} />

                          </ul>
                        </li>
                        <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">LOG IN<span className="caret"></span></a>
                          <ul className="dropdown-menu" id="logIn">
                            
                            <li> <a href="/login">LOGIN</a></li>
                            <li> <a href="/profile">PROFILE</a></li>
                            <li> <a href="/signup">SIGNUP</a></li>

                          </ul>
                        </li>
                        <li> <a href="about.html">ABOUT</a></li>
                    </ul>
                </div>
              </div>
            </nav>

            <div>
              <li className="dropdown">
                <h2 className="dropdown-toggle" id="dropDown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SELECT YOUR CATEGORY<span className="caret"></span></h2>
                  <ul className="dropdown-menu" id="preMade">
                    <AllCategories loadNewCats={this.loadNewCats} data={this.state.allCats} />
                  </ul>
              </li>
            </div>

            <div className="row">
                <div onClick={this.loadJokesFromServer} className="ball col-md-12">
                   <div id="jokeDiv"> 
                    <OneJoke jokeDisplay={this.state.like} data={this.state.jokeData}/>
                   </div>
                </div>
            </div>
        </div>
        );
    }
});
var AllCategories = React.createClass({
    render: function() {
        var self = this;
        var cat = this.props.data.map(function(c){
            return (
                <h2> <button onClick={self.props.loadNewCats.bind(this, c._id)}>{c.name}</button> </h2>
                ) 
    })
        return (
            <div>
                {cat}
            </div>
        );
    }
});
var OneJoke = React.createClass({
    render: function() {
        var joke = this.props.data;
           var j =  this.props.jokeDisplay ? <div/> : 
            {joke}
                
    return (
        <div>
            {j}
        </div>
            )
    }
});

var NewBall = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

            var cat = React.findDOMNode(this.refs.cat).value.trim();
            var joke = React.findDOMNode(this.refs.joke).value.trim();
            if(!cat){
                return;
            }
            var data = ({ name: cat }); 
            $.ajax({
                url:'/api/ball/cat',
                dataType: 'json',
                data: data,
                type: 'POST',
                    success:function(response){
                    var data = ({ joke: joke});
                    var id = response._id;
                    console.log(id);
                    $.ajax({
                      url:'/api/jokes/cat/' + id,
                      dataType:'json',
                      data: data,
                      type: 'POST',
                        success:function(data){
                          console.log(data);
                          document.location = 'index.html'
                        }.bind(this),
                        error: function(err){
                          console.log(err);
                        }.bind(this)
                    })
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


var JokeWithCat = React.createClass({
    render: function() {
        return (
        <div>
          <h1>Hello</h1>
          
        </div>
        );
    }
});




module.exports = App;

