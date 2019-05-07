import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

class Film extends Component {

  constructor(props) {
   super(props);
   this.likeClick = this.likeClick.bind(this);
   this.state = {
     like : this.props.movieLiked,
   }
  }

  likeClick(){
    var baseUrl = 'http://localhost:3000/mymovies/'
   console.log("love click détécté", this.props);
   this.props.handleClickApp(this.state.like, this.props.movieName)
   if (!this.state.like) {
     this.setState({
       like : true
     })
     fetch('http://localhost:3000/mymovies', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `poster_path=${this.props.movieImg}&overview=${this.props.movieDesc}&title=${this.props.movieName}&idMovieDB=${this.props.movieId}`
     });
   } else {
     this.setState({
       like : false
     })
     fetch(baseUrl + this.props.movieId, {
       method: 'DELETE'
      });
    }
  }

 render() {
   var displayFilm;
   if (!this.props.displayOnlyLike) {
     displayFilm = true
   } else if (this.props.displayOnlyLike && this.state.like){
     displayFilm = true
   } else {
     displayFilm = false
   }
   var heart
   if (this.state.like) {
     heart = <FontAwesomeIcon icon={faHeartSolid} style={styles.styleHeartActive} onClick={this.likeClick} />
   } else {
     heart = <FontAwesomeIcon icon={faHeart} style={styles.styleHeart} onClick={this.likeClick} />
   }
  return (
    <Col xs='12' sm='6' lg='3' style={{display : (displayFilm) ? 'block' : 'none'}}>
      <div style={styles.film}>
        <Card>
          {heart}
          <CardImg top width="100%" src={this.props.movieImg} alt={this.props.movieName} />
          <CardBody style={styles.cardBody}>
            <CardTitle style={styles.filmTitle}>{this.props.movieName}</CardTitle>
            <CardSubtitle style={styles.filmText}>{this.props.movieDesc}</CardSubtitle>
          </CardBody>
        </Card>
      </div>
    </Col>
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

export default Film;
