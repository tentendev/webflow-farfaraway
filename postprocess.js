// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import {
  readTXT,
  writeTXT,
  removeFile,
} from "https://deno.land/x/flat@0.0.15/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0];
const html = await readTXT(filename);
console.log(html);

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
