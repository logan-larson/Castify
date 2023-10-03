npm run build
npx cap sync
cd android
./gradlew assembleDebug
~/./Android/Sdk/platform-tools/adb install app/build/outputs/apk/debug/app-debug.apk
cd ..