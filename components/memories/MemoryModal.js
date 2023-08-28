import { Text, View, Modal, Pressable, Image, Dimensions, Alert } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { useContext } from 'react';
import MemoryContext from '../../context/memory/memoryContext.js';

const MemoryModal = () => {
	const styles = useStyles();

	const memoryContext = useContext(MemoryContext);
	const { memory, memoryVisible, clearMemory, deleteMemory } = memoryContext;

	const handleDelete = () => {
		Alert.alert(
			'Permanent Deletion',
			'Are you sure you want to permanently delete this memory?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: () => deleteMemory(),
					style: 'destructive',
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			<Modal
				animationType='slide'
				transparent={true}
				visible={memoryVisible}
				onRequestClose={() => {
					clearMemory();
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.title}>{memory.formattedDate}</Text>
						<Text>{memory.body}</Text>
						<Image style={styles.image} source={{ uri: memory.image_link }} />
						<View style={styles.buttonGroup}>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => clearMemory()}>
								<Text style={styles.textStyle}>Close</Text>
							</Pressable>
							<Pressable
								style={[styles.button, styles.buttonDelete]}
								onPress={() => handleDelete()}>
								<Text style={styles.textStyle}>Delete Memory</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
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
		marginHorizontal: 2,
	},
	buttonClose: {
		marginTop: 10,
		backgroundColor: theme.colors.primary,
	},
	buttonDelete: {
		marginTop: 10,
		backgroundColor: theme.colors.error,
	},
	buttonGroup: {
		display: 'flex',
		flexDirection: 'row',
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
	image: {
		width: Dimensions.get('window').width * 0.6,
		height: 200,
		marginVertical: 20,
		resizeMode: 'cover',
	},
	title: {
		fontWeight: 'bold',
		marginVertical: 10,
	},
}));

export default MemoryModal;
