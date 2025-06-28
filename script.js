let editors;

const livePreviewFrame = document.getElementById("live-preview");

document.getElementById("downloadCode").addEventListener("click", () => {
  const html = editors.html.getValue();
  const css = `<style>${editors.css.getValue()}</style>`;
  const js = `<script>${editors.js.getValue()}<\/script>`;
  const blob = new Blob([html + css + js], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "code.html";
  link.click();
});

function initializePreview() {
  const doc = livePreviewFrame.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style id="live-preview-style"></style></head><body></body></html>`);
  doc.close();
}

function updatePreviewHTML() {
  livePreviewFrame.contentWindow.document.body.innerHTML = editors.html.getValue();
}

function updatePreviewCSS() {
  const style = livePreviewFrame.contentWindow.document.getElementById("live-preview-style");
  style.innerHTML = editors.css.getValue();
}

function updatePreviewJS() {
  const script = document.createElement("script");
  script.innerHTML = editors.js.getValue();
  livePreviewFrame.contentWindow.document.body.appendChild(script);
}

function initializeEditors() {
  return {
    html: CodeMirror(document.getElementById("html"), {
      mode: "htmlmixed",
      lineNumbers: true,
      autoCloseTags: true,
      theme: "dracula"
    }),
    css: CodeMirror(document.getElementById("css"), {
      mode: "css",
      lineNumbers: true,
      theme: "dracula"
    }),
    js: CodeMirror(document.getElementById("js"), {
      mode: "javascript",
      lineNumbers: true,
      theme: "dracula"
    }),
  };
}

function bindEditorEvents() {
  CodeMirror.on(editors.html, "change", () => updatePreviewHTML());
  CodeMirror.on(editors.css, "change", () => updatePreviewCSS());
  CodeMirror.on(editors.js, "change", () => updatePreviewJS());
}

document.addEventListener("DOMContentLoaded", () => {
  initializePreview();
  editors = initializeEditors();
  bindEditorEvents();
});
