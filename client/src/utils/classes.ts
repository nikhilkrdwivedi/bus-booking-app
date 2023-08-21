import classnames from 'classnames';

export function parseClassNames(className: string) {
  if (!className) {
    return '';
  }

  if (typeof className === 'string') {
    return className.split(' ');
  }

  return className;
}

export function getClassName(...args: any) {
  if (!args) {
    return '';
  }

  return classnames(args.map(parseClassNames));
}
