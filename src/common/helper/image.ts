export const replaceDirtyImgUrls = (imgs: string, needToRelaceTinbanxeUrl = true): Array<string> => {
  let newImgs: string | Array<string> = imgs;
  if (typeof imgs !== 'object') {
    newImgs = imgs?.split(`","`);
  }
  if (Array.isArray(newImgs)) {
    return newImgs.map((url) => {
      if (needToRelaceTinbanxeUrl) {
        return url.replaceAll(`\"]`, '').replaceAll(`[\"`, '').replaceAll('https://img.tinbanxe.vn/', '');
      } else {
        return url.replaceAll(`\"]`, '').replaceAll(`[\"`, '');
      }
    });
  }
  return [''];
};
