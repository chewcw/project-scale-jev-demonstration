import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { defaultKeymap } from "@codemirror/commands";

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

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

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
        onChangeRef.current(text);
      }
    },
    []
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
        keymap.of(defaultKeymap),
        EditorView.updateListener.of(handleDocChange),
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
  }, []);

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
        className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner"
      />
      {error && (
        <div className="text-red-500 text-xs">• {error}</div>
      )}
    </div>
  );
}
