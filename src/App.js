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
   var listMovies = []
   for (var i = 0; i < 19; i++) {
     listMovies.push(<Col xs='12' sm='6' lg='3'><Film/></Col>)
   }
  return (
    <div style={styles.background}>
       <Container>
        <Row style={styles.header}>
          <Col><Header/></Col>
        </Row>
        <Row>
          <Col xs='12' sm='6' lg='3'><FilmHeart/></Col>
          {listMovies}
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
                      11 films
              </Button>
              <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
                <PopoverHeader>Derniers films ajoutés</PopoverHeader>
                <PopoverBody>Tintin au pays des gilets jaunes</PopoverBody>
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
    <div style={styles.film}>
      <Card>
        <FontAwesomeIcon icon={faHeart} style={styles.styleHeart} />
        <CardImg top width="100%" src="../images/malefique.jpg" alt="Card image cap" />
        <CardBody style={styles.cardBody}>
          <CardTitle style={styles.filmTitle}>Maléfique</CardTitle>
          <CardSubtitle style={styles.filmText}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
 }
}


class FilmHeart extends Component {
 render() {
  return (
    <div style={styles.film}>
      <Card>
        <FontAwesomeIcon icon={faHeartSolid} style={styles.styleHeartActive} />
        <CardImg top width="100%" src="../images/tintin.jpg" alt="Card image cap" />
        <CardBody style={styles.cardBody}>
          <CardTitle style={styles.filmTitle}>Tintin au pays des gilets jaunes</CardTitle>
          <CardSubtitle style={styles.filmText}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
 }
}



var styles = {
  background : {
    backgroundColor : '#131A20',
    height: '100%'
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
