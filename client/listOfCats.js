var React = require("react");

var App = React.createClass({
    getInitialState: function(){
        return { catId: '567079df8cb57f1b857e2155', jokeData:[], activeCat: [], allCats: [], liked: false}
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
            data.forEach(function(item){
              console.log("inside for each and", item._id.toString(), self.state.catId.toString())
              if(item._id.toString() == self.state.catId.toString()){
                console.log("inside if")
                self.setState({activeCat: item.name});
                console.log("I make STATE", self.state.activeCat)
              }
            })
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
    },
    render: function() {
      if(this.state.activeCat){
        var name = this.state.activeCat
      } else { 
        var name = "NOTHING AT ALL"
      }
        return (
        <div>
          <img src="/img/catlazereyes.png" id="idx-img" alt="cat lazer eyes"/>
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
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
                      <a href="about.html">ABOUT</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

           
             <div className="col-md-6 col-xs-6" >
               <div className="ball" onClick={this.loadJokesFromServer}>
                 <div id="words">
                   <OneJoke jokeDisplay={this.state.like} data={this.state.jokeData}/>
                   <h3>{name}</h3>
                 </div>
                 <img className="resize" id="8ball" src="img/8ball.png" />
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
                <button onClick={self.props.searchCats}>Search</button>
                {cat}
            </div>
        );
    }
});

window.hello = document.getElementById('searching');

var OneJoke = React.createClass({
    render: function() {
        var joke = this.props.data;
           var j =  this.props.jokeDisplay ? <div/> : 
            {joke}
                
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