export type PossibleClassName = string | undefined | null | boolean;

export function getClassName(classNames: PossibleClassName[]) {
  const validClassNames = classNames.filter((className) => Boolean(className));
  return validClassNames.join(' ');
}
