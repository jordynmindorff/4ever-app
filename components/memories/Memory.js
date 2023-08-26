import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useContext } from 'react';
import { Card } from '@rneui/themed';
import MemoryContext from '../../context/memory/memoryContext.js';

const Memory = ({ memory }) => {
	const memoryContext = useContext(MemoryContext);
	const { getMemory } = memoryContext;

	const { image_link, formattedDate, id } = memory;

	return (
		<Pressable onPress={() => getMemory(id)}>
			<Card>
				<Card.Title>{formattedDate}</Card.Title>
				<Card.Image style={{ padding: 0 }} source={{ uri: image_link }} />
			</Card>
		</Pressable>
	);
};

export default Memory;
