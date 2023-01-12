export function getFileExtension(fileName: string) {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function filterFiles(files: string[], validExtensions: string[]) {
  return files.filter((file) =>
    validExtensions.includes(getFileExtension(file))
  );
}
