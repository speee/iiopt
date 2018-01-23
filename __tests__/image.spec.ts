import { Image } from '../src/image';
import child_process from 'child_process';

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('./images/sample.jpg');
    expect(image).toBeInstanceOf(Image);
  });
});

describe('PNG Image needsToOptimize', () => {
  it('if optimized png image is given', () => {
    const image = new Image('./images/illust.png');
    expect(image.isOptimized()).toBeFalsy();
  });

  it('if not optimized png image is given', () => {
    const image = new Image('./images/illust_optimized.png');
    expect(image.isOptimized()).toBeTruthy();
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
