import Player from './player';
import React, {
  AppRegistry,
  Component,
  Text,
  View,
  Slider,
  StyleSheet,
  ActivityIndicatorIOS,
  InteractionManager,
  WebView,
  TouchableOpacity,
  ListView,
  Image,
  Dimensions
} from 'react-native';

export default class PlayerWrapper extends Component {

  constructor() {
    super();
    this.state = {
      movieDirectURL: null
    }
  }

  onPress = () => {

    const remote = `http://awesome-xhub.herokuapp.com/getMovie?url=`;

    fetch(`${remote}${this.props.url}`)
    .then(response => {
      return response.text();
    })
    .then(data => JSON.parse(data))
    .then(data => {
      this.setState({
        movieDirectURL: data.movie[0].file
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.movieDirectURL) {
      return (
        <Player
          movieDirectURL={this.state.movieDirectURL}
          />
      )
    }

    console.log(this.props);

    return (
      <TouchableOpacity onPress={this.onPress}>
        <Image
          source={{uri: this.props.image}}
          style={styles.cell} />
      </TouchableOpacity>
    )
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cell: {
    height: width,
    width: width,
    flex: 1
  }
});
