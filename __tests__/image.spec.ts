import { Image } from '../src/image';
import child_process from 'child_process';

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('./images/sample.jpg');
    expect(image).toBeInstanceOf(Image);
  });
});

describe('needsToOptimize', () => {
  it('if optimized png image is given', async () => {
    const image = new Image('./images/illust.png');
    await expect(image.isOptimized()).resolves.toBeFalsy();
  });

  it('if not optimized png image is given', async () => {
    const image = new Image('./images/illust_optimized.png');
    await expect(image.isOptimized()).resolves.toBeTruthy();
  });

  xit('if optimized jpeg image is given', () => {
    // TODO: Pending
  });

  xit('if not optimized jpeg image is given', () => {
    // TODO: Pending
  });

  it('if not image file is given', async () => {
    const image = new Image('./LICENSE.md');
    return image.isOptimized().catch(e =>
      expect(e).toEqual( new Error('Only PNG or JPG image is allowed.'))
    );
  });
});
