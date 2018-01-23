import { Image } from '../src/image';

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('image.png', 400);
    expect(image).toBeInstanceOf(Image);
  });
});

describe('isPng', () => {
  it('if png image is given', () => {
    const image = new Image('../images/illust.png', 400);
    expect(image.isPng).toBeTruthy();
  });

  it('if jpg image is given', () => {
    const image = new Image('../images/sample.jpg', 400);
    expect(image.isPng).toBeFalsy();
  });
});
