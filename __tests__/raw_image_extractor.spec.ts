import { Image } from '../src/image';
import { RawImageExtractor } from '../src/raw_image_extractor';
import child_process from 'child_process';

describe('extract png images', () => {
  it('only raw images are extracted', async () => {
    const rawImagePath = './images/illust.png';
    const optimizedImagePath = './images/illust_optimized.png';
    const extractor = new RawImageExtractor([rawImagePath, optimizedImagePath]);
    const rawImage = new Image(rawImagePath);
    await expect(extractor.extract()).resolves.toEqual([rawImage]);
  });
});
