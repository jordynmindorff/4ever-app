import { Text, View, Modal, Pressable, Image, Dimensions } from 'react-native';
import { makeStyles } from '@rneui/themed';

const MemoryModal = ({ memory, memoryVisible, clearMemory }) => {
	const styles = useStyles();

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
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => clearMemory()}>
							<Text style={styles.textStyle}>Close</Text>
						</Pressable>
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
