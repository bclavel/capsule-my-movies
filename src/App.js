import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import Film from './components/Film'
import Header from './components/Header'


class App extends Component {
  constructor(props) {
  super(props);
  this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
  this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
  this.handleClickHeart = this.handleClickHeart.bind(this);

  this.state = {
    viewOnlyLike : false,
    moviesNameList : [],
    moviesCount : 0,
    movies : [],
    moviesLiked  : []
  };
}

  handleClickLikeOn() {
    this.setState({
      viewOnlyLike : true
    })
  }

  handleClickLikeOff() {
    this.setState({
      viewOnlyLike : false
    })
  }

  handleClickHeart(likeOrNot, movieName) {
    var name = movieName;
    var moviesNameListCopy = [...this.state.moviesNameList]
    if (!moviesNameListCopy.includes(name)) {
      moviesNameListCopy.push(name)
      this.setState({
        moviesNameList : moviesNameListCopy
      })
    } else {
      for (var i = 0; i < moviesNameListCopy.length; i++) {
        if (moviesNameListCopy[i] == name) {
          moviesNameListCopy.splice(i, 1)
        }
      }
      this.setState({
        moviesNameList : moviesNameListCopy
      })
    }

    if (!likeOrNot) {
      this.setState({
        moviesCount : this.state.moviesCount + 1
      })
    } else {
      this.setState({
        moviesCount : this.state.moviesCount - 1
      })
    }
  }

  componentDidMount(){
    var ctx = this
    fetch('http://localhost:3000/movies')
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log('console log de data avant setState >>>', data);
      console.log('console log de movies avant setState >>>', ctx.state.movies);
      ctx.setState({
        movies : data.body.results
      })
      console.log('console log de movies après setState >>>', ctx.state.movies);
    })

    fetch('http://localhost:3000/mymovies')
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      var moviesNameListCopy = data.movies.map((movie) => {
        return movie.title
      })
      ctx.setState({
        moviesLiked : data.movies,
        moviesCount : data.movies.length,
        moviesNameList : moviesNameListCopy
      })
    })
  }

 render() {
  var baseUrl = "http://image.tmdb.org/t/p/w500"
  var moviesList = this.state.movies.map((movie, i) => {
    var isLiked = false;
    if (this.state.moviesLiked.find(movies => movies.title === movie.title)) {
      isLiked = true
      console.log('match trouvé');
    }
    return <Film movieName={movie.title} movieDesc={movie.overview} movieImg={baseUrl + movie.poster_path} movieId={movie.id} key={i} displayOnlyLike={this.state.viewOnlyLike} handleClickApp={this.handleClickHeart} movieLiked={isLiked}  />
  })
  console.log('state de viewOnlyLike ->', this.state.viewOnlyLike);
  return (
    <div style={styles.background}>
       <Container>
        <Row style={styles.header}>
          <Col><Header handleClickLikeOn={this.handleClickLikeOn} handleClickLikeOff={this.handleClickLikeOff} displayOnlyLike={this.state.viewOnlyLike} heartCount={this.state.moviesCount} listeMovies={this.state.moviesNameList}/></Col>
        </Row>
        <Row>
          {moviesList}
        </Row>
      </Container>
    </div>
    );
  }
}

var styles = {
  background : {
    backgroundColor : '#131A20',
    height: '100vh'
  },
  header : {
    marginBottom: '8%',
  },
  headerLogo : {
    width: 35,
  },
  navLinksOff : {
    color : '#ffffff',
    fontSize : 13
  },
  navLinksOn : {
    color : '#6c757c',
    fontSize : 13
  },
  navLinksLikes : {
    color : '#ffffff',
    fontSize : 13,
    marginLeft: 5
  },
  styleHeart : {
    position : 'absolute',
    right: '5%',
    top: '5%',
    fontSize: 24,
    cursor: 'pointer'
  },
  styleHeartActive : {
    position : 'absolute',
    right: '5%',
    top: '5%',
    fontSize: 24,
    color: '#ff6861',
    cursor: 'pointer'
  },
  cardBody : {
    height : 250,
  },
  film : {
    marginBottom : 15,
  },
  filmTitle : {
    color : '#6c757c',
    fontSize: 20,
    lineHeight: 1.2,
  },
  filmText : {
    fontSize: 13
  },
}

export default App;
