import React from 'react'
class SideBar extends React.Component{
    render(){
        return(
            <section id="sidebar">
            <div className="inner">
                <nav>
                <ul>
                    <li><a href="#intro">Renderer</a></li>
                    <li><a href="#one">Chart selection</a></li>
                    <li><a href="#two">How to use</a></li>
                    <li><a href="#three">Get in touch</a></li>
                </ul>
                </nav>
            </div>
            </section>
        )
    }
}

export default SideBar;