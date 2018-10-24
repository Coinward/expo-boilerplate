import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MonoText } from '../../components/StyledText';
import { addHeaderLeftNavigator } from '../../helpers';
import I18n from '../../i18n';
import { logout } from '../../store/actions/UserActions';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    return { ...headerLeftNav, title: 'Home' };
  };

  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func
  };

  state = {
    modalVisible: false
  };

  _signOutAsync = async () => {
    this.props.logout();
  };

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { isLoggedIn, user } = this.props.user;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>{I18n.t('helloWorld')}</Text>
            {isLoggedIn && <Text>{user.email}</Text>}
            <Image
              source={
                __DEV__
                  ? require('../../assets/images/robot-dev.png')
                  : require('../../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />

          <Button
            onPress={() => {
              this._setModalVisible(true);
            }}
            title="Show Modal"
          />

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <SafeAreaView style={styles.container}>
              <View>
                <Text>{I18n.t('helloWorld')}</Text>

                <Button
                  onPress={() => {
                    this._setModalVisible(!this.state.modalVisible);
                  }}
                  title="Hide Modal"
                />
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  }
});
