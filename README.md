# react-native-ocr-scanner

`react-native-ocr-scanner` is a React Native package that allows you to capture an image using the camera, crop it, and recognize text from the image using machine learning.

## Features

- Capture images directly from the camera.
- Crop images with a customizable cropping UI.
- Recognize text from images using ML Kit.

## Installation

To install the package, use npm:

`npm install react-native-ocr-scanner`

This package has the following peer dependencies that you'll need to install as well:

- `react-native-image-picker`
- `react-native-image-crop-picker`
- `@react-native-ml-kit/text-recognition`
- `react-native-permissions`

## Usage

### Simple Usage Example

`import captureCropAndRecognizeText from 'react-native-ocr-scanner';

const recognizedText = await captureCropAndRecognizeText();
console.log('Recognized Text:', recognizedText);
`

### Detailed Usage Example

`import captureCropAndRecognizeText from 'react-native-ocr-scanner';

async function handleTextRecognition() {
 try {
   const recognizedText = await captureCropAndRecognizeText();

   if (recognizedText) {
     console.log('Recognized Text:', recognizedText);
     // You can use the recognized text here
   } else {
     console.log('No text recognized');
   }
 } catch (error) {
   console.error('Error during text recognition:', error);
   // Handle errors appropriately
 }
}

// Call this function when needed
handleTextRecognition();
`

The `captureCropAndRecognizeText` function performs the following steps:

1. Captures an image using the device's camera.
2. Crops the image using the `react-native-image-crop-picker` library.
3. Recognizes text from the cropped image using the `@react-native-ml-kit/text-recognition` library.
4. Returns the recognized text.

## Dependencies

This package relies on the following dependencies:

- `react-native-image-picker`: For capturing images using the device camera.
- `react-native-image-crop-picker`: For cropping images after capture.
- `@react-native-ml-kit/text-recognition`: For recognizing text from images using ML Kit.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.