import styled from "styled-components"
import { signOutApi } from "../redux/actions"
import { connect } from "react-redux"


const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
            <a href="/home">
                <img src="/images/home-logo.svg" alt=""/>
            </a> 
        </Logo>
        <Search>
            <div>
                <SearchIcon>
                    <img src="/images/search-icon.svg" alt=""/>
                </SearchIcon>
                <input type="text" placeholder="Search"/>
            </div>
        </Search>
        <Nav>
            <NavListWrap>
                <NavList className="active">
                    <a>
                        <img src="/images/nav-home.svg" alt=""/> 
                        <span>Home</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="/images/nav-network.svg" alt=""/> 
                        <span>My Network</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="/images/nav-jobs.svg" alt="" /> 
                        <span>Jobs</span>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="/images/nav-messaging.svg" alt=""/> 
                        <span>Messaging</span>
                        <small>1</small>
                    </a>
                </NavList>
                <NavList>
                    <a>
                        <img src="/images/nav-notifications.svg" alt="" /> 
                        <span>Notifications</span>
                        <small>2</small>
                    </a>
                </NavList>
                <User>
                    <a>
                      {props.user && props.user.photoURL? (
                        <img src={props.user.photoURL} alt=""/>
                      ) : (
                        <img src="/images/user.svg" alt="" />
                      )}
                        <span>
                            Me
                            <img src="/images/down-icon.svg" alt=""/>
                        </span>
                    </a>
                    <SignOut onClick={() => props.signOut()}>
                        <a>
                            Sign Out
                        </a>
                    </SignOut>
                </User>
                <Work>
                    <a>
                        <img src="/images/nav-work.svg" alt=""/>
                        <span>
                            Work
                            <img src="/images/down-icon.svg" alt=""/>
                        </span>
                    </a>
                </Work>
            </NavListWrap>
        </Nav>
      </Content>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutApi())
  }
}

const Container = styled.div`
   background-color: white;
   border-bottom: 1px solid rgba(0, 0, 0, 0.08);
   width: 100vw;
   padding: 0 24px;
   postition: fixed;
   top: 0;
   left: 0;
   z-index: 100;
   @media (max-width: 767px) {
     padding: 15px;
   }
`;

const Content = styled.div`
   display: flex;
   align-items: center;
   margin: 0 auto;
   min-height: 100%;
   max-width: 1128px;
`;

const Logo = styled.span`
   margin-right: 8px;
   font-size: 0;
`;

const Search = styled.div`
   opacity: 1;
   flex-grow: 1;
   position: relative;
   & > div{
    max-width: 280px;
    input{
      border: none;
      outline: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
   }
`;

const SearchIcon = styled.div`
   width: 40px;
   position: absolute;
   top: 10px;
   left: 2px;
   z-index: 1;
   border-radius: 0 2px 2px 0;
   margin: 0;
   pointer-events: none;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const Nav = styled.nav`
   margin-left: auto;
   display: block;
   @media (max-width: 768px) {
     position: fixed;
     left: 0;
     bottom: 0;
     background: white;
     width: 100%;
   }
`;

const NavListWrap = styled.ul`
   display: flex;
   flex-wrap: nowrap;
   list-style-type: none;
   .active{
      span:after{
        content: "";
        border-bottom: 2px solid var(--white, #fff);
      }
   }
`;

const NavList = styled.li`
   display: flex;
   align-items: center;
   position: relative;
   a{
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
     background: transparent;
     font-size: 12px;
     font-weight: 400
     line-height: 1.5;
     min-height: 52px;
     min-width: 80px;
     position: relative;
     text-decoration: none;
     cursor: pointer;
     span{
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
     }

     small{
        width: 15px;
        height: 15px;
        color: white;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: #6363f3;
        position: absolute;
        top: 2px;
        right: 24px;
     }

    @media (max-width: 768px) {
      min-width: 75px;
    }
   }
   &:hover, &:active{
      a{
        span{
           color: rgba(0, 0, 0, 0.9);
        }
      }
   }  
`;

const SignOut = styled(NavList)`
   position: absolute;
   top: 45px;
   background: white;
   width: 100px;
   height: 40px;
   border-radius: 0 0 5px 5px;
   font-size: 16px;
   transition-duration: 167ms;
   text-align: center;
   display: none;
   cursor: pointer;
   @media (max-width: 767px) {
     position: absolute;
     top: -45px;
     right: 15px;
     background: #eee;
  }
`;

const User = styled(NavList)`
   a > svg{
      width: 24px;
      border-radius: 50%;
   }

   a > img{
      width: 24px;
      height: 24px;
      border-radius: 50%;
   }

   span {
      display: flex;
      align-items: center;
    }

    &:hover{
      ${SignOut}{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
`;

const Work = styled(User)`
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    @media (max-width: 575px) {
      display: none;
    }
`;

export default connect(mapStateToProps, mapDispatchToProps) (Header)
