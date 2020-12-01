const escapeRegex = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
const paramRegex = /([:*])(\w+)/g;

export default function createMatcher(
  path: string
): (url: string) => null | object {
  const names: string[] = [];
  const normalize = path
    .replace(escapeRegex, "\\$&")
    .replace(paramRegex, (_, mode, name) => {
      names.push(name);
      return mode === ":" ? "([^/]*)" : "(.*)";
    });
  const regex = new RegExp(`^${normalize}$`);

  return (url: string) => {
    const matches = url.match(regex);
    if (!matches) return null;

    const params: any = {};
    for (let i = 0; i < names.length; i++) {
      const param = names[i++];
      const value = matches[i];
      params[param] = value;
    }

    return params;
  };
}
