import {
  readTXT,
  writeTXT,
  removeFile,
} from "https://deno.land/x/flat@0.0.15/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const filename = Deno.args[0];
const html = await readTXT(filename);

await removeFile(filename);
await removeFile("home-head.html");

const doc = new DOMParser().parseFromString(html, "text/html");

doc.querySelector("title")?.remove();
doc.querySelector("meta[name='description']")?.remove();
doc.querySelector("meta[name='generator']")?.remove();
doc.querySelector("meta[name='viewport']")?.remove();
doc.querySelector("meta[name='robots']")?.remove();
doc.querySelector("meta[name='googlebot']")?.remove();
doc.querySelector("meta[name='google']")?.remove();

await writeTXT("home-body.html", doc.querySelector("body").innerHTML);
await writeTXT("home-head.html", doc.querySelector("head").innerHTML);
