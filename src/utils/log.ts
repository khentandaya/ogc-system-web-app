export default function log(content: any) {
  if (process.env.NODE_ENV === "development") console.log(content);
}
