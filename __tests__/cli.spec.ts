import fs from 'fs';
import execa from 'execa';
import child_process from 'child_process';

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
    child_process.execSync('iiopt images/illust.png --out-dir tmp');
    const images = execa.shellSync('ls ./tmp');
    expect(images.stdout).toEqual('illust.png');
  });

  test('--out-dir が指定されておらず、--overwrite flagも設定されていない場合、エラーとなる', () => {
    try {
      execa.shellSync('iiopt images/illust.png');
    } catch(error) {
      expect(error.message).toMatch('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
    }
  });
});

describe('上書きの確認', () => {
  beforeAll(() => {
    child_process.execSync('mkdir tmp && cp images/illust.png ./tmp/');
    console.log('create tmp directory to check overwrite images');
  });

  afterAll(() => {
    child_process.execSync('rm -rf tmp');
    console.log('remove tmp directory');
  });

  test('--out-dir が指定されておらず、--overwrite flagが設定された場合、画像を上書きする',() => {
    const rawImage = fs.readFileSync('tmp/illust.png');
    child_process.execSync('iiopt tmp/illust.png --overwrite');
    const compressedImage = fs.readFileSync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
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
