import { ScrollView } from 'react-native';
import Memory from './Memory.js';

const MemoryList = ({ memories }) => {
	return (
		<ScrollView>
			{memories.map((mem) => (
				<Memory key={mem.id} imageLink={mem.image_link} date={mem.date} />
			))}
		</ScrollView>
	);
};

export default MemoryList;
