import { Image } from '../src/image';

describe('constructer', () => {
  it('Image need filepath and filesize', () => {
    const image = new Image('./images/sample.jpg');
    expect(image).toBeInstanceOf(Image);
  });
});

describe('isPng', () => {
  it('if png image is given', () => {
    const image = new Image('./images/illust.png');
    expect(image.isPng).toBeTruthy();
  });

  it('if jpg image is given', () => {
    const image = new Image('./images/sample.jpg');
    expect(image.isPng).toBeFalsy();
  });
});
