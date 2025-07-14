import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 4,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;