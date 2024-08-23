import { launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

/**
 * @typedef {Object} CaptureOptions
 * @property {import('react-native-image-picker').CameraOptions} [cameraOptions]
 * @property {import('react-native-image-crop-picker').Options} [cropOptions]
 */

/**
 * @typedef {Object} PermissionResult
 * @property {boolean} granted
 * @property {string} [error]
 */

/**
 * Request camera permission
 * @returns {Promise<PermissionResult>}
 */
async function requestCameraPermission() {
  const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      return { granted: false, error: 'Camera is not available on this device.' };
    case RESULTS.DENIED:
      return { granted: false, error: 'Camera permission denied. Please enable it in settings.' };
    case RESULTS.LIMITED:
      return { granted: true, error: 'Camera permission is limited. Some features may not be available.' };
    case RESULTS.GRANTED:
      return { granted: true };
    case RESULTS.BLOCKED:
      return { granted: false, error: 'Camera permission is blocked. Please enable it in settings.' };
    default:
      return { granted: false, error: 'Unknown permission result.' };
  }
}

/**
 * Capture an image, crop it, and recognize text
 * @param {CaptureOptions} [options={}]
 * @returns {Promise<import('@react-native-ml-kit/text-recognition').TextRecognitionResult | null>}
 */
async function captureCropAndRecognizeText(options = {}) {
  try {
    const permissionResult = await requestCameraPermission();
    if (!permissionResult.granted) {
      throw new Error(permissionResult.error || 'Camera permission not granted');
    }

    const cameraResult = await launchCamera(options.cameraOptions || { mediaType: 'photo' });

    if (cameraResult.assets && cameraResult.assets.length > 0) {
      const imageUri = cameraResult.assets[0].uri;

      // Crop the image using react-native-image-crop-picker
      const croppedImage = await ImagePicker.openCropper({
        path: imageUri,
        freeStyleCropEnabled: true,
        showCropFrame: true,
        cropping: true,
        ...options.cropOptions,
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
    if (error instanceof Error) {
      console.error('Error capturing, cropping, or recognizing text from image:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return null;
  }
}

export default captureCropAndRecognizeText;