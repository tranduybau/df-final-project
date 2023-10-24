// eslint-disable-next-line import/prefer-default-export
export function removeDotGitURL(url: string) {
  return url.replace(/\.git$/, '');
}
