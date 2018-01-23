import { Image } from '../src/image';
import child_process from 'child_process';

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('./images/sample.jpg');
    expect(image).toBeInstanceOf(Image);
  });
});

describe('isPng', () => {
  it('if png image is given', () => {
    const image = new Image('./images/illust.png');
    expect(image.isPng()).toBeTruthy();
  });

  it('if jpg image is given', () => {
    const image = new Image('./images/sample.jpg');
    expect(image.isPng()).toBeFalsy();
  });
});

describe('PNG Image needsToOptimize', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp');
    child_process.execSync('bin/cli images/illust.png --out-dir ./tmp');
  });

  afterAll(() => {
    child_process.execSync('rm -rf tmp');
  });

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
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp');
  });

  afterAll(() => {
    child_process.execSync('rm -rf tmp');
  });

  xit('if optimized jpeg image is given', () => {
    // TODO: Pending
  });

  xit('if not optimized jpeg image is given', () => {
    // TODO: Pending
  });
});
