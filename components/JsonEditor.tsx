import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";

export default function JsonEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDocChange = useCallback(
    (update: any) => {
      if (update.docChanged) {
        const doc = update.state.doc;
        const text = doc.toString();
        try {
          JSON.parse(text);
          setError(null);
        } catch (e: any) {
          setError(e.message || "Invalid JSON");
        }
        onChange(text);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        json(),
        syntaxHighlighting(defaultHighlightStyle),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged || update.selectionSet) {
            const doc = update.state.doc;
            const text = doc.toString();
            try {
              JSON.parse(text);
              setError(null);
            } catch (e: any) {
              setError(e.message || "Invalid JSON");
            }
            onChange(text);
          }
        }),
        EditorView.theme({
          "&": { height: "320px", fontSize: "13px", fontFamily: "ui-monospace, SFMono-Regular, monospace" },
          ".cm-scroller": { overflow: "auto" },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    editorViewRef.current = view;

    return () => {
      view.destroy();
      editorViewRef.current = null;
    };
  }, [onChange]);

  // Keep editor doc in sync with external value prop (e.g. reset)
  useEffect(() => {
    const view = editorViewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="w-full border border-gray-700 rounded-lg overflow-hidden bg-[#1a1a2e] shadow-inner"
      />
      {error && (
        <div className="text-red-400 text-xs">• {error}</div>
      )}
    </div>
  );
}
