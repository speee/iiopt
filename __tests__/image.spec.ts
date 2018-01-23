import { Image } from '../src/image';
import child_process from 'child_process';

beforeAll(() => {
  child_process.execSync('rm -rf tmp && mkdir tmp');
  child_process.execSync('bin/cli images/illust.png --out-dir ./tmp');
});

afterAll(() => {
  child_process.execSync('rm -rf tmp');
});

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('./images/sample.jpg');
    expect(image).toBeInstanceOf(Image);
  });
});

describe('PNG Image needsToOptimize', () => {
  it('if optimized png image is given', () => {
    const image = new Image('./images/illust.png');
    expect(image.needsToOptimize()).toBeTruthy();
  });

  it('if not optimized png image is given', () => {
    const image = new Image('./tmp/illust.png');
    expect(image.needsToOptimize()).toBeFalsy();
  });
});

xdescribe('JPG image needsToOptimize', () => {
  xit('if optimized jpeg image is given', () => {
    // TODO: Pending
  });

  xit('if not optimized jpeg image is given', () => {
    // TODO: Pending
  });
});
