import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

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
    var moviesLast
     if (this.props.listeMovies.length == 0) {
       moviesLast = 'Aucun film sélectionné'
     } else if (this.props.listeMovies.length == 1){
       moviesLast = this.props.listeMovies
     } else if (this.props.listeMovies.length == 2 || this.props.listeMovies.length == 3) {
       moviesLast = this.props.listeMovies.join(', ')
     } else {
       moviesLast = this.props.listeMovies.slice(this.props.listeMovies.length - 3).join(', ') + '...'
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
              <Button id="UncontrolledPopover" type="button" style={styles.navLinksLikes}>{this.props.heartCount} {(this.props.heartCount > 1) ? 'films' : 'film'}</Button>
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

export default Header;
