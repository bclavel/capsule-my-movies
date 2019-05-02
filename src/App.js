import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'


class App extends Component {

  constructor(props) {
  super(props);

  this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
  this.handleClickLikeOff = this.handleClickLikeOff.bind(this);

  this.state = {
    viewOnlyLike : false
  };
}

handleClickLikeOn() {
  console.log('light lights ON');
  this.setState({
    viewOnlyLike : true
  })
}

handleClickLikeOff() {
  console.log('light lights OFF');
  this.setState({
    viewOnlyLike : false
  })
}

 render() {
   console.log('log de this app', this);

   var moviesData = [{
     name: 'L\'Odyssée sans but de Kóstas Mítroglou',
     desc: 'Après que leur club ait été victime d\'une violente tempête au mercato, un adolescent et un attaquant grec en mal d\'efficacité …',
     img: './images/pi.jpg',
   },{
     name: 'Jean-Michel le maléfique',
     desc: 'Poussée par la vengeance et une volonté farouche de protéger son club de marde qu\'il préside, Jean-Michel place ...',
     img: './images/malefique.jpg',
   },{
     name: 'Tintin au pays des gilets jaunes',
     desc: 'Après avoir regardé les infos sur le MediaTV, Tintin, un jeune reporter, se retrouve entraîné dans une bien triste aventure...',
     img: './images/tintin.jpg',
   }]

  var moviesList = moviesData.map((movie, i) => {
    return <Film movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} key={i} displayOnlyLike={this.state.viewOnlyLike} />
  })
  console.log('state de viewOnlyLike ->', this.state.viewOnlyLike);
  return (
    <div style={styles.background}>
       <Container>
        <Row style={styles.header}>
          <Col><Header handleClickLikeOn={this.handleClickLikeOn} handleClickLikeOff={this.handleClickLikeOff} displayOnlyLike={this.state.viewOnlyLike} /></Col>
        </Row>
        <Row>
          {moviesList}
        </Row>
      </Container>
    </div>
    );
  }
}


class Header extends Component {
  constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
    isOpen: false,
  };
}

toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}
 render() {
   var moviesNameList = ['Titre1', 'Titre2', 'Titre3', 'Titre4', 'Titre5']
   var moviesLast = []
   var moviesCount = ''

   if (moviesNameList.length == 0) {
     moviesLast = 'Aucun film sélectionné'
     moviesCount = '0 film'
   } else if (moviesNameList.length == 1){
     moviesLast = moviesNameList
     moviesCount = `${moviesNameList.length} film`
   } else if (moviesNameList.length == 2 || moviesNameList.length == 3) {
     moviesLast = moviesNameList.join(', ')
     moviesCount = `${moviesNameList.length} films`
   } else {
     moviesLast = moviesNameList.slice(moviesNameList.length - 3).join(', ') + '...'
     moviesCount = `${moviesNameList.length} films`
   }

    return (
    <div>
        <Navbar color="#161d23" light expand="md">
          <NavbarBrand href="/"><img style={styles.headerLogo} src="../images/logo.png"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-1" navbar>
              <NavItem>
                <NavLink href="#" style={(this.props.displayOnlyLike) ? styles.navLinksOn : styles.navLinksOff} onClick={this.props.handleClickLikeOff}>Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={(this.props.displayOnlyLike) ? styles.navLinksOff : styles.navLinksOn} onClick={this.props.handleClickLikeOn}>My Movies</NavLink>
              </NavItem>
              <Button id="UncontrolledPopover" type="button" style={styles.navLinksLikes}>{moviesCount}</Button>
              <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
                <PopoverHeader>Derniers films ajoutés</PopoverHeader>
                <PopoverBody>{moviesLast}</PopoverBody>
              </UncontrolledPopover>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
  );
 }
}


class Film extends Component {

  constructor() {
   super();
   this.likeClick = this.likeClick.bind(this);
   this.state = {
     like : false,
   }
  }

  likeClick(){
   console.log("love click détécté");
   if (!this.state.like) {
     this.setState({
       like : true
     })
   } else {
     this.setState({
       like : false
   })
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

export default App;
