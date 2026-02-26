"use client"

import { useEffect, useCallback } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
    Bold, Italic, UnderlineIcon, Strikethrough, List, ListOrdered,
    Heading2, Heading3, LinkIcon, Quote, Undo, Redo, Code, RemoveFormatting,
} from "lucide-react"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

function ToolbarButton({ onClick, active, title, children }: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-1.5 rounded transition-colors ${active ? "bg-primary-100 text-primary-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
            {children}
        </button>
    )
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing…" }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "prose-content min-h-[200px] max-h-[500px] overflow-y-auto p-4 focus:outline-none",
            },
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false)
        }
    }, [editor, value])

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes("link").href
        const url = window.prompt("URL", previousUrl)
        if (url === null) return
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run()
            return
        }
        editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }, [editor])

    if (!editor) return null

    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough size={15} /></ToolbarButton>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2"><Heading2 size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3"><Heading3 size={15} /></ToolbarButton>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List"><ListOrdered size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote"><Quote size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Code"><Code size={15} /></ToolbarButton>
                <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Link"><LinkIcon size={15} /></ToolbarButton>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting"><RemoveFormatting size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={15} /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={15} /></ToolbarButton>
            </div>

            <EditorContent editor={editor} />
        </div>
    )
}
