let vsPath: string | undefined =
  'https://cdn.jsdelivr.net/npm/monaco-editor@0.35.0/min/vs';

export function setVsPath(value: string | undefined) {
  vsPath = value;
}

export function getVsPath() {
  return (
    ((self as unknown as Record<string, unknown>).__MONACO_VS_PATH__ as
      | string
      | undefined) ?? vsPath
  );
}
