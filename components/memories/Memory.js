import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from '@rneui/themed';

const Memory = ({ imageLink, date }) => {
	return (
		<Card>
			<Card.Title>{date}</Card.Title>
			<Card.Image style={{ padding: 0 }} source={{ uri: imageLink }} />
		</Card>
	);
};

export default Memory;
