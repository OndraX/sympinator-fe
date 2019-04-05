import React from "react"
import WordArt from "react-wordart"
import logo from "./logo.png"

const isSensible = true;
const styles = [
	"rainbow", "blues", "superhero", "radial", "tilt", "purple", "horizon", "italicOutline", "slate" ];

class UIHeaderStyle extends React.Component {
	render(){
		if(isSensible){
			return( <span>{this.props.text}</span>);
		}else{
			return(<WordArt text={this.props.text} size="40" theme={styles[Math.floor(Math.random()*styles.length)]} />);
		}
}

}
class UILinkStyle extends React.Component {
	render(){
		if(isSensible){
			return( <span>{this.props.text}</span>);
		}else{
			return(<WordArt text={this.props.text} theme={styles[Math.floor(Math.random()*styles.length)]}  size="20"/>);
		}
}
}

class UILogo extends React.Component {
	render(){
		const imageStyle = {width: "auto", height: "40px",position: "relative",}
		return(
			<img src={logo} style={imageStyle} alt={this.props.alt}/>
		);
}
}

const UIConstants = {
	bgDark: "#2193b0",
	bgLight:"#6dd5ed",
	linkColour:"#efefff"

}

export {UIHeaderStyle, UILinkStyle, UILogo, UIConstants};
