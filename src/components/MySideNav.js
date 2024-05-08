import { useNavigate } from 'react-router-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import './MySideNav.css'

function MySideNav() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <SideNav
            style={{ background: "white" }}
            onSelect={selected => {
                console.log(selected)
            }}
            className="mysidenav"
        >
            <SideNav.Toggle style={{ background: "black" }} />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap');
            </style>
            <SideNav.Nav style={{ color: "black" }} defaultSelected="home">
                <NavItem eventKey="manage">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: "1.5em", color: "black" }} />
                    </NavIcon>
                    <NavText className="txt" style={{ fontSize: "1.5em", color: "black", }}>Manage</NavText>
                    <NavItem>
                        <NavIcon>
                            <i className="fa-solid fa-book" style={{ color: "black" }}></i>
                        </NavIcon>
                        <NavText className="txt" style={{ fontSize: "1em", color: "black", }} onClick={() => handleClick('/library')}>Manage Library</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <i className="fa-solid fa-car"></i>
                        </NavIcon>
                        <NavText className="txt" style={{ fontSize: "1em", color: "black", }} onClick={() => handleClick("/library_car")}>Manage Car Race</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <i className="fa-solid fa-hourglass-half" />
                        </NavIcon>
                        <NavText className="txt" style={{ fontSize: "1em", color: "black", }} onClick={() => handleClick("/library_sess")}>Manage Car Session</NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="login">
                    <NavIcon>
                        <i className="fa-solid fa-user" style={{ fontSize: "1.5em", color: "black" }}></i>
                    </NavIcon>
                    <NavText className="txt" style={{ fontSize: "1.5em", color: "black" }} onClick={() => handleClick('/loginsignup')}>Login/Signup</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default MySideNav;
