import { View, Modal, Pressable, Text, TextInput, Image, Alert } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Button, Icon, makeStyles, Input } from '@rneui/themed';
import MemoryContext from '../../context/memory/memoryContext.js';
import MemoryList from '../memories/MemoryList.js';
import MemoryModal from '../memories/MemoryModal.js';
import * as ImagePicker from 'expo-image-picker';

const Memories = () => {
	const memoryContext = useContext(MemoryContext);
	const { getMemories, memories, memory, memoryVisible, clearMemory } = memoryContext;

	const [modalVisible, setModalVisible] = useState(false);
	const [bodyText, setBodyText] = useState('');
	const [image, setImage] = useState(null);

	const [permissionStatus, requestPermission] = ImagePicker.useCameraPermissions();

	const styles = useStyles();

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const takePhoto = async () => {
		try {
			if (permissionStatus.granted) {
				let result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});

				console.log(result);

				if (!result.canceled) {
					setImage(result.assets[0].uri);
				}
			} else {
				const response = await requestPermission();
				if (response.granted) {
					await takePhoto();
				} else {
					Alert.alert('Camera permission required.');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMemories();
	}, []);

	return (
		<View>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<TextInput
							multiline
							placeholder='Body Text'
							value={bodyText}
							onChangeText={setBodyText}
							style={styles.textInput}
						/>
						<View>
							<Button style={styles.btnGroup} onPress={takePhoto}>
								Access Camera
							</Button>
							<Button style={styles.btnGroup} onPress={pickImage}>
								Upload from Camera Roll
							</Button>
						</View>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Cancel</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<MemoryList memories={memories} />
			<MemoryModal memory={memory} memoryVisible={memoryVisible} clearMemory={clearMemory} />
			{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
				onPress={() => setModalVisible(!modalVisible)}>
				<Icon type='ionicons' name='add' color='white' />
			</Button>
		</View>
	);
};

const useStyles = makeStyles((theme) => ({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonClose: {
		marginTop: 10,
		backgroundColor: theme.colors.error,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	btnGroup: {
		margin: 3,
	},
}));

export default Memories;
