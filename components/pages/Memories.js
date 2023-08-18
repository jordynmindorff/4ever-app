import { View } from 'react-native';
import { useEffect, useContext } from 'react';
import { Button, Icon } from '@rneui/themed';
import AuthContext from '../../context/authentication/authContext.js';
import MemoryContext from '../../context/memory/memoryContext.js';
import MemoryList from '../memories/MemoryList.js';

const Memories = () => {
	const authContext = useContext(AuthContext);
	const { profile } = authContext;

	const memoryContext = useContext(MemoryContext);
	const { getMemories, memories } = memoryContext;

	useEffect(() => {
		getMemories();
	}, []);

	const triggerNewMemory = () => {};

	return (
		<View>
			<MemoryList memories={memories} />
			<Button
				containerStyle={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignItems: 'center',
					margin: 20,
					height: 50,
				}}
				buttonStyle={{
					flex: 1,
					width: 50,
					height: 100,
				}}
				onPress={triggerNewMemory}>
				<Icon type='ionicons' name='add' color='white' />
			</Button>
		</View>
	);
};

export default Memories;
