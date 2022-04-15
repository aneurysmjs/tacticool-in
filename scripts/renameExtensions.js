/**
 * @see https://gabrieleromanato.name/nodejs-renaming-files-recursively
 * 
 * @see https://gist.github.com/slinkardbrandon/2a693695fb3044036b78a16e82ecdfcchttps://gist.github.com/slinkardbrandon/2a693695fb3044036b78a16e82ecdfcc
 */
const path = require('path');
const fs = require('fs');

const DIRECTORY = path.resolve(__dirname, '../', 'src');

const listDir = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = listDir(path.join(dir, file), fileList);
    } else if (/\.scss$/.test(file)) {
      const name = `${file.split('.')[0].replace(/\s/g, '_')}.css`;
      const src = path.join(dir, file);
      const newSrc = path.join(dir, name);
      fileList.push({
        oldSrc: src,
        newSrc,
      });
    }
  });

  return fileList;
};

const foundFiles = listDir(DIRECTORY);
foundFiles.forEach((f) => {
  fs.renameSync(f.oldSrc, f.newSrc);
});


