import { launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

async function captureCropAndRecognizeText() {
  try {
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

export default captureCropAndRecognizeText;
