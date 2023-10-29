export default function removeDotGitURL(url: string) {
  return url.replace(/\.git$/, '');
}
