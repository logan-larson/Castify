## Running Castify on the Android Emulator

### Prerequisites
1. Install the Android SDK and Android Studio
2. Install the Android Emulator

### Setting up the android project
3. Run `npm install` in the webapp directory
4. Run `npx cap add android` to add the android platform to the project if the `android` directory does not exist

### Setting the environment variables in `webapp/.env`
5. Set the `PUBLIC_PROD` environment variable to `false` (this will enable the correct API calls)
6. Set the `PUBLIC_MOBILE_API_URL` environment variable to your local IP address (this is how the mobile app will connect to the API running on your localhost)
7. Set the `PUBLIC_MOBILE` environment variable to `true` (this will enable the correct API calls)

Start here to rebuild -- (I also wrote a tiny script called `rebuild_mobile.sh` that rebuilds the app if you are in the `webapp` directory)

### Building the android project
8. Run `npm run build` in the webapp directory to build the web build
9. Run `npx cap sync` to copy the web build to the android project
10. `cd` into the `android` directory
11. Run `./gradlew assembleDebug` to build the android project (you might need to run `./gradlew clean` to remove the old build first)

### Running the android project
9. Open your android emulator through VSCode
10. Run `~/./Android/Sdk/platform-tools/adb install app/build/outputs/apk/debug/app-debug.apk` to install the app on the emulator
11. Navigate to the app on the emulator and open it

