import { ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import Memory from './Memory.js';

const MemoryList = ({ memories }) => {
	const [pressed, setPressed] = useState(false);

	return (
		<ScrollView>
			{memories.map((mem) => (
				<Pressable key={mem.id} onPress={() => setPressed(!pressed)}>
					<Memory imageLink={mem.image_link} date={mem.formattedDate} />
				</Pressable>
			))}
		</ScrollView>
	);
};

export default MemoryList;
