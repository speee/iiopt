import { Image } from '../src/image';
import { RawImageExtractor } from '../src/raw_image_extractor';
import child_process from 'child_process';

describe('extract png images', () => {
  it('only raw images are extracted', async () => {
    const rawImagePath = './images/illust.png';
    const optimizedImagePath = './images/illust_optimized.png';
    const images = [rawImagePath, optimizedImagePath].map((path) => new Image(path));
    const extractor = new RawImageExtractor(images);
    await expect(extractor.extract()).resolves.toEqual([rawImagePath]);
  });
});
