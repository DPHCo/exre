const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
  path.join(root, 'android', 'capacitor-cordova-android-plugins', 'build.gradle'),
  path.join(root, 'node_modules', '@capacitor', 'android', 'capacitor', 'build.gradle'),
  path.join(root, 'node_modules', '@capacitor', 'app', 'android', 'build.gradle'),
];

const aliyunRepos = `maven { url = uri('https://maven.aliyun.com/repository/google') }
        maven { url = uri('https://maven.aliyun.com/repository/public') }`;

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(
    /classpath\s+'com\.android\.tools\.build:gradle:[^']+'/g,
    "classpath 'com.android.tools.build:gradle:9.4.0'"
  );
  text = text.replace(
    /maven\s*\{\s*url\s*=\s*uri\("\$\{rootProject\.projectDir\}\/local-maven"\)\s*\}/g,
    ''
  );
  if (!text.includes('maven.aliyun.com/repository/google')) {
    text = text.replace(
      /buildscript\s*\{\s*repositories\s*\{/,
      `buildscript {\n    repositories {\n        ${aliyunRepos}`
    );
    text = text.replace(
      /repositories\s*\{\s*\n\s*google\(\)/g,
      `repositories {\n    ${aliyunRepos}\n    google()`
    );
  }
  fs.writeFileSync(file, text);
  console.log('patched', path.relative(root, file));
}
