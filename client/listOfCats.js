var React = require("react");
var CatBub = require('./catBubble');

var App = React.createClass({
    getInitialState: function(){
        return { catId: '567079df8cb57f1b857e2155', user: [], jokeData:[], activeCat: '', allCats: [], myCats: [], liked: false}
    },
    loadCatsFromServer: function(search) {
      var url = "/api/ball/cats";
      if(search){
        url = 'api/ball/search/' + search
      }
      var self = this
        $.ajax({
          url: url,
          dataType: 'json',
          cache:false,
          success:function(data){
            console.log("inside success of loadCatsFromServer" + data)
            this.setState({allCats:data});
          }.bind(this),
          error: function(xhr,status, err){
            console.log("broken url is " + this.props.url)
            console.error(this.props.url, status,err.toString());
          }.bind(this)
        });
  },
  loadmyCatsFromServer: function() {
      var url = "/api/ball/user/jokes";
      var self = this
        $.ajax({
          url: url,
          dataType: 'json',
          cache:false,
          success:function(data){
            console.log("inside success of loadCatsFromServer" + data)
            this.setState({myCats:data});
          }.bind(this),
          error: function(xhr,status, err){
            console.log("broken url is " + this.props.url)
            console.error(this.props.url, status,err.toString());
          }.bind(this)
        });
  },
  findCatName: function(id){
    console.log("find cat name", id)
        var id = id;
        $.ajax({
          url: '/api/jokes/cat/' + id ,
          dataType: 'json',
          cache:false,
          success:function(data){
            console.log("inside success of findCatName" + data)
            this.setState({activeCat: data.name});
          }.bind(this),
          error: function(xhr,status, err){
            console.log("broken url is /api/jokes/cat/ ")
            console.error(this.props.url, status,err.toString());
          }.bind(this)
        });
  },


  // loadUserFromServer
  // ajax to ball/api/currentUser
  // set state of user to user
  loadUserFromServer: function(){
    var url = "/api/ball/current/user";
    var self = this
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        success: function(data){
          console.log('The user is on' + data)
          this.setState({user: data})
        }.bind(this),
        error: function(xhr, status, err){
          console.log("broken url is " + url)
          console.log(url, status,err.toString());
        }.bind(this)
      });
  },

  loadNewCats: function(id){
    var id = id;
    this.setState({
        catId: id 
    });
    this.findCatName(id);
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
            console.log(this.state.jokeData, 'loaded joke data');
            this.setState({liked: !this.state.liked});
          }.bind(this),
          error: function(xhr, status, err){
            console.log("broken ")
            console.error(status, err.toString());
          }.bind(this)
        });
    },



    searchCats: function(){
      var thisCat = document.getElementById('searching').value;
      this.loadCatsFromServer(thisCat);
      document.getElementById('showCats').className = "dropdown open";

    },
    componentDidMount: function(){
        this.loadCatsFromServer();
        this.loadJokesFromServer();
        this.loadmyCatsFromServer();
    },
    render: function() {
        return (
        <div>
          <img src="/img/catlazereyes2.png" id="idx-img" alt="cat lazer eyes"/>
            <nav id="mainPageNav" className="navbar navbar-default navbar-fixed-top" role="navigation">
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
                    <li id="showCats" className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CATEGORIES<span className="caret"></span></a>
                        <ul className="dropdown-menu" id="preMade">
                          <AllCategories searchCats={this.searchCats} loadNewCats={this.loadNewCats} data={this.state.allCats} />
                        </ul>
                    </li>
                    <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">MINE<span className="caret"></span></a>
                      <ul className="dropdown-menu" id="preMade">
                        <MyCategories searchCats={this.searchCats} loadNewCats={this.loadNewCats} data={this.state.myCats} />
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

           <div className="row">
             <div className="col-md-6 col-xs-6" >
               <div className="ball" onClick={this.loadJokesFromServer}>
                 <div id="words">
                   <OneJoke jokeDisplay={this.state.like} data={this.state.jokeData}/>
                   <h3>{name}</h3>
                 </div>
                 <img className="resize" id="8ball" src="img/8ball.png" />
               </div>
             </div>
             <div className="col-xs-3">
              <div className="bub">
                <CatBub name={this.state.activeCat} />
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
                <input type="text" placeholder="Search Categories" id="searching" ref="search"/>
                <button className="button" onClick={self.props.searchCats}>Search</button>
                {cat}
            </div>
        );
    }
});

var MyCategories = React.createClass({


  // if(user){

  // }
  // this.data.user

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

window.hello = document.getElementById('searching');

var OneJoke = React.createClass({
    render: function() {
        var joke = this.props.data;
           var j =  this.props.jokeDisplay ? <div/> : joke
                
    return (
        <div id="one-joke">
          
            <p>{j}</p>
          
        </div>
            )
    }
});
var NewBall = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
            var cat = React.findDOMNode(this.refs.cat).value.trim();
            var joke = React.findDOMNode(this.refs.joke).value.trim();
            console.log(joke)
            var jokeArr = joke.split(',');
  
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
                    var data = ({ joke: jokeArr});
                    var id = response._id;
                    console.log(id);
                    $.ajax({
                      url:'/api/jokes/cat/' + id,
                      dataType:'json',
                      data: data,
                      type: 'POST',
                        success:function(data){
                          console.log(data);
                          document.location = 'main.html'
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

                   <form className="makeJoke" method="POST">
                       <h1 id="formHead" className="rainbow"><strong>Make your own Magic 8 Ball!</strong></h1>
                       <input id="catForm" type="text" ref="cat" className="form-control" placeholder="Add Your Category"/>
                       <textarea id="jokeForm" type="text" ref="joke" rows="7" className="form-control" placeholder="Add your answers, separate them with a comma"></textarea>               
                       <button id="makeBallButton"onClick={this.handleSubmit} type="submit" className="btn btn-block">Submit</button>
                   </form>
               </div>
        );
    }
});

module.exports = App;