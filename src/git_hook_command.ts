import * as child_process from 'child_process';
import * as git from 'simple-git/promise';

const ShellScript = `
  for file in \`git diff --cached --name-status | awk '$1 ~ /[AM]/ && tolower($2) ~ /\.(jpe?g|png)$/ {print $2}' \`
  do
    iiopt $file -o
    git add $file
  done
`;

export function run() {
  child_process.exec(ShellScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(stdout);
  });
}
