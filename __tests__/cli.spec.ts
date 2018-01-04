import fs from 'fs';
import execa from 'execa';

process.chdir(__dirname);

describe('flag や optionの確認',()=>{
  it('show help screen', () => {
    const helpMessage = execa.shellSync('iiopt --help');
    expect(helpMessage.stdout).toMatch(/nice/);
  });

  it('--out-dir で指定されたpathに圧縮後の画像を出力する', () => {
  });

  it('--out-dir が指定されておらず、--overwrite flagが設定された場合、画像を上書きする', () => {
  });

  it('--out-dir が指定されておらず、--overwrite flagも設定されていない場合、エラーとなる', ()=> {
  });
});


describe('compress png images', () => {
  it('指定されたpathに圧縮後の画像を出力する', () => {
  });
});

describe('jpgの圧縮', ()=> {
  it('指定されたpathに圧縮後の画像を出力する', () => {
  });
});
