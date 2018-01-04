import fs from 'fs';
import execa from 'execa';
import child_process from 'child_process';

process.chdir(__dirname);

describe('help message', ()=>{
  test('show help screen', () => {
    const helpMessage = execa.shellSync('iiopt --help');
    expect(helpMessage.stdout).toMatch(/nice/);
  });
});

describe('flag や optionの確認',()=>{
  beforeAll(() => {
    child_process.execSync('mkdir tmp');
    console.log('create tmp directory to store compressed images');
  });

  afterAll(() => {
    child_process.execSync('rm -rf tmp');
    console.log('remove tmp directory');
  });

  test('--out-dir で指定されたpathに圧縮後の画像を出力する', () => {
  });

  test('--out-dir が指定されておらず、--overwrite flagも設定されていない場合、エラーとなる', () => {
  });
});

describe('上書きの確認', () => {
  test('--out-dir が指定されておらず、--overwrite flagが設定された場合、画像を上書きする', () => {
  });
});

describe('compress png images', () => {
  test('指定されたpathに圧縮後の画像を出力する', () => {
  });
});

describe('jpgの圧縮', ()=> {
  test('指定されたpathに圧縮後の画像を出力する', () => {
  });
});
