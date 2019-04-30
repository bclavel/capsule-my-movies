import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'


class App extends Component {

 render() {

   var moviesData = [{
     name: 'L\'Odyssée sans but de Kóstas Mítroglou',
     desc: 'Après que leur club ait été victime d\'une violente tempête au mercato, un adolescent et un attaquant grec en mal d\'efficacité …',
     img: './images/pi.jpg'
   },{
     name: 'Jean-Michel le maléfique',
     desc: 'Poussée par la vengeance et une volonté farouche de protéger son club de marde qu\'il préside, Jean-Michel place ...',
     img: './images/malefique.jpg'
   },{
     name: 'Tintin au pays des gilets jaunes',
     desc: 'Après avoir regardé les infos sur le MediaTV, Tintin, un jeune reporter, se retrouve entraîné dans une bien triste aventure...',
     img: './images/tintin.jpg'
   }]

  var moviesList = moviesData.map((movie, i) => {
    return <Film movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} key={i} />
  })

  return (
    <div style={styles.background}>
       <Container>
        <Row style={styles.header}>
          <Col><Header/></Col>
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
    isOpen: false
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

   console.log(moviesNameList);

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
                <NavLink href="#" style={styles.navLinks}>Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" style={styles.navLinksMyMovies}>My Movies</NavLink>
              </NavItem>
              <Button id="UncontrolledPopover" type="button" style={styles.navLinksLikes}>
                      {moviesCount}
              </Button>
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
 render() {
  return (
    <Col xs='12' sm='6' lg='3'>
      <div style={styles.film}>
        <Card>
          <FontAwesomeIcon icon={faHeart} style={styles.styleHeart} />
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


// class FilmHeart extends Component {
//  render() {
//   return (
//     <div style={styles.film}>
//       <Card>
//         <FontAwesomeIcon icon={faHeartSolid} style={styles.styleHeartActive} />
//         <CardImg top width="100%" src="../images/tintin.jpg" alt="Card image cap" />
//         <CardBody style={styles.cardBody}>
//           <CardTitle style={styles.filmTitle}>Tintin au pays des gilets jaunes</CardTitle>
//           <CardSubtitle style={styles.filmText}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CardSubtitle>
//         </CardBody>
//       </Card>
//     </div>
//   );
//  }
// }



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
  navLinks : {
    color : '#ffffff',
    fontSize : 13
  },
  navLinksMyMovies : {
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
