import { Image } from '../src/image';

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('image.png', 400);
    expect(image).toBeInstanceOf(Image);
  });
});
