import React from "react"
import WordArt from "react-wordart"

const isSensible = true;
const styles = [
	"rainnbow", "blues", "superhero", "radial", "tilt", "purple", "horizon", "italicOutline", "slate" ];

class UIHeaderStyle extends React.Component {
	render(){
		if(isSensible){
			return( <span>{this.props.text}</span>);
		}else{
			return(<WordArt text={this.props.text} size="100" theme={styles[Math.floor(Math.random()*styles.length)]} />);
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

export {UIHeaderStyle, UILinkStyle};
