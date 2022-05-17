export const replaceDirtyImgUrls = (imgs: string):Array<string> => {
  let newImgs: string | Array<string> = imgs;
  if (typeof imgs !== 'object') {
    newImgs = imgs.split(`","`);
  }
  if (Array.isArray(newImgs)) {
    return newImgs.map((url) => {
      return url.replaceAll(`\"]`, '').replaceAll(`[\"`, '');
    });
  }
  return [''];
};
