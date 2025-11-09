export type PathLike = string | Array<string | number>;

export const toSegments = (part?: PathLike): string[] => {
  if (part == null) return [];
  if (Array.isArray(part)) {
    return part
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return part
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
};

export const joinPath = (...parts: Array<PathLike | undefined>): string => {
  return parts.flatMap(toSegments).join(".");
};
