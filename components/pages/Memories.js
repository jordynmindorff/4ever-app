import { View, Modal, Pressable, Text, TextInput, Image, Alert, Dimensions } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Button, Icon, makeStyles } from '@rneui/themed';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import AuthContext from '../../context/authentication/authContext.js';
import MemoryContext from '../../context/memory/memoryContext.js';
import MemoryList from '../memories/MemoryList.js';
import MemoryModal from '../memories/MemoryModal.js';
import * as ImagePicker from 'expo-image-picker';

const Memories = () => {
	const memoryContext = useContext(MemoryContext);
	const { getMemories, memories, memory, memoryVisible, clearMemory, createMemory } =
		memoryContext;

	const authContext = useContext(AuthContext);
	const { profile } = authContext;

	const [modalVisible, setModalVisible] = useState(false);
	const [bodyText, setBodyText] = useState('');
	const [image, setImage] = useState(null);

	const [permissionStatus, requestPermission] = ImagePicker.useCameraPermissions();

	const styles = useStyles();

	const client = new S3Client({
		credentials: {
			accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
		},
		region: process.env.EXPO_PUBLIC_S3_REGION,
	});

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0]);
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

				if (!result.canceled) {
					setImage(result.assets[0]);
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

	const handleUpload = async (pickerResult) => {
		const res = await fetch(pickerResult.uri);
		const imgBlob = await res.blob();

		const Key = `${profile.id}-${Date.now().toString()}.JPG`;

		const command = new PutObjectCommand({
			ACL: 'public-read',
			Bucket: process.env.EXPO_PUBLIC_S3_BUCKET,
			Key,
			Body: imgBlob,
			ContentType: 'image/jpeg',
		});

		const data = await client.send(command);

		return Promise.resolve({ data, Key });
	};

	const handleCreation = async () => {
		if (!image || !bodyText) {
			return Alert.alert('Missing image or body text. Both required.');
		}
		const { data, Key } = await handleUpload(image);

		const imageURL = `https://4ever.s3.amazonaws.com/${Key}`;

		if (data.$metadata.httpStatusCode === 200 || data.$metadata.httpStatusCode === 201) {
			await createMemory(bodyText, imageURL);

			setImage(null);
			setBodyText('');
			setModalVisible(false);
		} else {
			Alert.alert('Error uploading image.');
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
							blurOnSubmit
							returnKeyType='done'
						/>
						{!image && (
							<View>
								<Button style={styles.btnGroup} onPress={takePhoto}>
									Access Camera
								</Button>
								<Button style={styles.btnGroup} onPress={pickImage}>
									Upload from Camera Roll
								</Button>
							</View>
						)}
						{image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Cancel</Text>
						</Pressable>

						<Pressable
							style={[styles.button, styles.buttonSubmit]}
							onPress={handleCreation}>
							<Text style={styles.textStyle}>Create</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<MemoryList memories={memories} />
			<MemoryModal />
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ position: 'absolute', bottom: 0 }}>
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
			</View>
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
	buttonSubmit: {
		marginTop: 10,
		backgroundColor: theme.colors.success,
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
	textInput: {
		marginVertical: 10,
	},
	imagePreview: {
		width: Dimensions.get('window').width * 0.6,
		height: 200,
		marginVertical: 20,
		resizeMode: 'cover',
	},
}));

export default Memories;
