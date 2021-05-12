import React from 'react';  
import SideBar from './SideBar'
import Wrapper from './Wrapper'
import MyFoot from './Foot'

require(
    './Home.css'
);

class Home extends React.Component {  
    render() {  
        return( 
            <div>
            <SideBar></SideBar>
            <Wrapper></Wrapper>
            <MyFoot></MyFoot>
            </div>
        )
    }  
}  
export default Home;