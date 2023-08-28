import { ScrollView, Pressable, FlatList } from 'react-native';
import Memory from './Memory.js';

const MemoryList = ({ memories }) => {
	return (
		<FlatList
			data={memories}
			renderItem={({ item: memory }) => <Memory memory={memory} />}
			keyExtractor={(memory) => memory.id}
		/>
	);
};

export default MemoryList;
