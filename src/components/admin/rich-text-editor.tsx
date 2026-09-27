"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Minus,
  Link as LinkIcon,
  Unlink,
  Highlighter,
  RemoveFormatting,
  Pilcrow,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value?: string;
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  height?: string;
  className?: string;
  disabled?: boolean;
}

// ─── Toolbar Action Button ───────────────────────────────────────────────────
interface ToolbarBtnProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarBtn({
  onClick,
  active,
  disabled,
  title,
  children,
}: ToolbarBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "h-7 w-7 sm:h-7.5 sm:w-7.5 inline-flex items-center justify-center rounded-md text-xs font-medium transition-all duration-150 cursor-pointer select-none shrink-0",
        active
          ? "bg-primary/15 text-primary border border-primary/25 shadow-xs"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-transparent",
        disabled && "opacity-35 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
}

// ─── Toolbar Divider ─────────────────────────────────────────────────────────
function ToolbarDivider() {
  return <div className="w-px h-4 bg-border/60 mx-0.5 shrink-0 self-center hidden sm:block" />;
}

// ─── Main Rich Text Editor Component ─────────────────────────────────────────
export function RichTextEditor({
  value,
  content,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "min-h-full",
  height = "h-64 sm:h-72",
  className,
  disabled = false,
}: RichTextEditorProps) {
  const initialContent = value ?? content ?? "";
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary font-medium transition-colors",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: initialContent,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // If the editor only contains empty tags, normalize to empty string
      const isEmpty = editor.isEmpty;
      onChange?.(isEmpty ? "" : html);
    },
    editorProps: {
      attributes: {
        class: cn(
          "outline-none text-foreground text-sm leading-relaxed prose-editor px-4 py-3.5 focus:outline-none w-full min-w-0 max-w-full break-words overflow-x-hidden box-border",
          minHeight
        ),
      },
    },
    immediatelyRender: false,
  });

  // Keep editor content synchronized with external value updates (e.g. form resets or async data fetch)
  useEffect(() => {
    if (editor && (value !== undefined || content !== undefined)) {
      const targetVal = value ?? content ?? "";
      if (editor.getHTML() !== targetVal && !editor.isFocused) {
        editor.commands.setContent(targetVal, { emitUpdate: false });
      }
    }
  }, [editor, value, content]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  if (!editor) return null;

  const handleOpenLinkDialog = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setIsLinkDialogOpen(true);
  };

  const handleApplyLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      let finalUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(finalUrl) && !/^mailto:/i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl })
        .run();
    }
    setIsLinkDialogOpen(false);
    setLinkUrl("");
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
    setIsLinkDialogOpen(false);
    setLinkUrl("");
  };

  return (
    <div
      className={cn(
        "relative w-full min-w-0 max-w-full rounded-xl border border-border bg-background transition-all duration-200 overflow-hidden isolate focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15 shadow-xs",
        disabled && "opacity-60 pointer-events-none bg-muted/20",
        className
      )}
    >
      {/* ── Toolbar Header ────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 w-full min-w-0 max-w-full flex flex-wrap items-center gap-1 p-1.5 border-b border-border/80 bg-card/95 backdrop-blur-xs select-none rounded-t-[calc(0.75rem-1px)]">
        {/* Hierarchy Group */}
        <div className="flex items-center flex-wrap gap-0.5">
          <ToolbarBtn
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={editor.isActive("paragraph") && !editor.isActive("heading")}
            title="Paragraph"
          >
            <Pilcrow className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>

        <ToolbarDivider />

        {/* Inline Marks Group */}
        <div className="flex items-center flex-wrap gap-0.5">
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
            title="Highlight Text"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>

        <ToolbarDivider />

        {/* Lists & Quotes Group */}
        <div className="flex items-center flex-wrap gap-0.5">
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <FileCode className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>

        <ToolbarDivider />

        {/* Link & Clear Actions */}
        <div className="flex items-center flex-wrap gap-0.5">
          <ToolbarBtn
            onClick={handleOpenLinkDialog}
            active={editor.isActive("link")}
            title="Insert / Edit Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>
          {editor.isActive("link") && (
            <ToolbarBtn onClick={handleRemoveLink} title="Remove Link">
              <Unlink className="w-3.5 h-3.5 text-destructive" />
            </ToolbarBtn>
          )}
          <ToolbarBtn
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </ToolbarBtn>
        </div>
      </div>

      {/* ── Link Insertion Floating Popover/Bar ───────────────────── */}
      {isLinkDialogOpen && (
        <div className="sticky top-[41px] z-10 w-full min-w-0 max-w-full p-2.5 bg-muted/95 border-b border-border flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
          <LinkIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-1" />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyLink();
              } else if (e.key === "Escape") {
                setIsLinkDialogOpen(false);
              }
            }}
            placeholder="Paste or type URL (e.g. https://example.com)..."
            className="flex-1 bg-background border border-border text-foreground text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary font-mono"
            autoFocus
          />
          <button
            type="button"
            onClick={() => handleApplyLink()}
            className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setIsLinkDialogOpen(false)}
            className="px-2.5 py-1.5 bg-muted text-muted-foreground hover:text-foreground text-xs font-medium rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* ── Editor Editable Area ───────────────────────────────────── */}
      <div
        className={cn(
          "cursor-text bg-background w-full min-w-0 max-w-full overflow-y-auto",
          height
        )}
      >
        <EditorContent editor={editor} className="min-h-full" />
      </div>

      {/* ── Bottom Status Bar ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-border/60 bg-muted/25 text-[11px] text-muted-foreground font-mono select-none w-full min-w-0 max-w-full overflow-hidden rounded-b-[calc(0.75rem-1px)]">
        <div className="flex items-center gap-2">
          <span>Rich Text</span>
          <span>•</span>
          <span>HTML formatted</span>
        </div>
      </div>

      {/* Scoped CSS for TipTap Content */}
      <style jsx global>{`
        .prose-editor,
        .ProseMirror {
          outline: none !important;
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          word-break: break-word !important;
          overflow-wrap: anywhere !important;
          white-space: pre-wrap !important;
          color: var(--foreground);
        }
        .ProseMirror:focus,
        .ProseMirror-focused {
          outline: none !important;
        }
        .prose-editor * {
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        .prose-editor > * + * {
          margin-top: 0.75em;
        }
        .prose-editor h1 {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.025em;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--foreground);
        }
        .prose-editor h2 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.015em;
          margin-top: 1rem;
          margin-bottom: 0.4rem;
          color: var(--foreground);
        }
        .prose-editor h3 {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 0.85rem;
          margin-bottom: 0.35rem;
          color: var(--foreground);
        }
        .prose-editor p {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }
        .prose-editor ul,
        .prose-editor ol {
          padding-left: 1.4rem;
          margin: 0.5rem 0;
        }
        .prose-editor ul {
          list-style-type: disc;
        }
        .prose-editor ol {
          list-style-type: decimal;
        }
        .prose-editor li {
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 0.25rem;
        }
        .prose-editor blockquote {
          border-left: 3px solid var(--primary);
          padding-left: 0.875rem;
          margin: 0.75rem 0;
          color: var(--muted-foreground);
          font-style: italic;
        }
        .prose-editor code {
          font-family: monospace;
          font-size: 0.8125rem;
          background-color: var(--muted);
          color: var(--primary);
          padding: 0.15rem 0.35rem;
          border-radius: 0.375rem;
          border: 1px solid var(--border);
        }
        .prose-editor pre {
          background-color: var(--card);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.875rem;
          margin: 0.75rem 0;
          overflow-x: auto;
        }
        .prose-editor pre code {
          background-color: transparent;
          border: none;
          padding: 0;
          color: var(--foreground);
          font-size: 0.8125rem;
        }
        .prose-editor hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 1.25rem 0;
        }
        .prose-editor mark {
          background-color: rgba(var(--primary-rgb, 59, 130, 246), 0.25);
          color: var(--foreground);
          border-radius: 0.25rem;
          padding: 0.1rem 0.25rem;
        }
        .prose-editor strong {
          font-weight: 600;
          color: var(--foreground);
        }
        .prose-editor em {
          font-style: italic;
        }
        .prose-editor s {
          text-decoration: line-through;
        }
        .prose-editor .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: var(--muted-foreground);
          opacity: 0.45;
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
