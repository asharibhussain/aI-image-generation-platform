# AI Image Generation Platform

A comprehensive web application for generating AI-powered images using text-to-image and image-to-image conversion technologies. The platform features user authentication, API key management, and a gallery for viewing generated images.

Email: superadmin@gmaill.com  

Password: password

⚠️ Note: This account is for demo/testing only. Do not use it in production environments.

Important Notes About API Keys & Usage
The top-tier image generation models require paid API keys.

If no paid key is configured, the platform will return limited or no response for those models.

Make sure you add a valid and active API key from the API Configuration section in the admin dashboard to enable full functionality.


## Features

- **Text-to-Image Generation**: Create images from text prompts using AI models
- **Image-to-Image Conversion**: Transform existing images with new styles and prompts
- **User Authentication**: Secure login and registration system with role-based access
- **API Key Management**: Admin interface for managing API keys and usage limits
- **Image Gallery**: View and manage all generated images
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS with Material Tailwind components
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **File Storage**: Firebase Storage
- **Backend**: Node.js/Express server (external API integration)
- **Deployment**: Vite for development, deployable to various platforms

## Installation

1. Clone the repository:
```bash
git clone https://github.com/asharibhussain/aI-image-generation-platform.git
cd ai_image
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following:
```env
REPLICATE_API_TOKEN=your_replicate_api_token
```

4. Configure Firebase:
- Create a Firebase project at https://console.firebase.google.com
- Enable Authentication and Firestore
- Update the Firebase configuration in `src/firebase.js` with your project credentials

5. Start the development server:
```bash
npm run dev
```

## Firebase Setup

1. Go to Firebase Console and create a new project
2. Enable Firebase Authentication (Email/Password provider)
3. Create Firestore database with the following rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    
    match /images/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /api_config/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /replicate_keys/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## API Configuration

1. Admin users can configure API keys through the dashboard
2. Navigate to "API Configuration" in the dashboard
3. Add your API keys for text-to-image and image-to-image generation
4. Set usage limits and manage active/inactive status

## Usage

1. **Sign Up**: Create an account to access the platform
2. **Text-to-Image**: Use the "Text to Image" page to generate images from text prompts
3. **Image-to-Image**: Upload an image and apply transformations on the "Image to Image" page
4. **Gallery**: View all your generated images in the gallery
5. **Profile**: Manage your account information

## Project Structure

```
src/
├── components/          # Reusable UI components
├── configs/            # Configuration files
├── context/            # React context providers
├── data/               # Static data and mock data
├── layouts/            # Page layouts
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── components/     # Feature-specific pages
│   └── dashboard/      # Dashboard pages
├── widgets/            # UI widgets and components
├── firebase.js         # Firebase configuration
├── App.jsx             # Main application component
└── routes.jsx          # Application routes
```

## Environment Variables

- `REPLICATE_API_TOKEN`: API token for Replicate service (optional)

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory.

## API Endpoints

The application integrates with external AI image generation APIs:
- Text-to-Image: Uses a RapidAPI endpoint
- Image-to-Image: Uses Replicate API through an Express server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please file an issue in the repository.
