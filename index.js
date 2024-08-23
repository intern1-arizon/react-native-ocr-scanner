import { launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { PERMISSIONS, request } from 'react-native-permissions';

async function captureCropAndRecognizeText() {
  try {
    await requestCameraPermission();
    const result = await launchCamera({ mediaType: 'photo' });

    if (result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;

      // Crop the image using react-native-image-crop-picker
      const croppedImage = await ImagePicker.openCropper({
        path: imageUri,
        freeStyleCropEnabled: true,
        showCropFrame: true,
        cropping: true,
      });

      // Recognize text from the cropped image
      const recognizedText = await TextRecognition.recognize(croppedImage.path);

      // Log the recognized text
      console.log('Recognized Text:', recognizedText);

      // Return the recognized text
      return recognizedText;
    } else {
      throw new Error('No image captured');
    }
  } catch (error) {
    console.error('Error capturing, cropping, or recognizing text from image:', error);
    throw error;
  }
}

const requestCameraPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);

  switch (result) {
    case "unavailable":
      setErrorText('Camera is not available on this device.');
      break;
    case "denied":
      setErrorText('Camera permission denied. Please enable it in settings.');
      break;
    case "limited":
      setErrorText('Camera permission is limited. Some features may not be available.');
      break;
    case "granted":
      break;
    case "blocked":
      setErrorText('Camera permission is blocked. Please enable it in settings.');
      break;
    }
  }

export default captureCropAndRecognizeText;
