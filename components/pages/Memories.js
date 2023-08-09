import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useContext } from 'react';
import AuthContext from '../../context/authentication/authContext.js';
import MemoryContext from '../../context/memory/memoryContext.js';
import * as SecureStore from 'expo-secure-store';
import MemoryList from '../memories/MemoryList.js';

const getValueFor = async (key) => await SecureStore.getItemAsync(key);

const Memories = () => {
	const authContext = useContext(AuthContext);
	const { profile } = authContext;

	const memoryContext = useContext(MemoryContext);
	const { getMemories, memories } = memoryContext;

	useEffect(() => {
		const data = async () => {
			const token = await getValueFor('authToken');

			await getMemories(token);
		};

		data();
	}, []);

	return (
		<View>
			<Text>Welcome home, {profile.username}!</Text>
			<MemoryList memories={memories} />
		</View>
	);
};

export default Memories;
