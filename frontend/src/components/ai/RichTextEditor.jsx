import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Type,
  Underline,
  List,
  ListOrdered,
  Minus,
  Indent,
  Outdent,
  RotateCcw,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder, className = "" }) => {
  const editorRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current.focus();
  };

  const insertList = (type) => {
    if (type === "bullet") {
      execCommand("insertUnorderedList");
    } else if (type === "numbered") {
      execCommand("insertOrderedList");
    } else if (type === "dash") {
      // For dash lists, we'll insert a custom format
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const textNode = document.createTextNode("- ");
      range.insertNode(textNode);
      range.collapse(false);
      execCommand("insertLineBreak");
    }
  };

  const handleIndent = () => {
    execCommand("indent");
  };

  const handleOutdent = () => {
    execCommand("outdent");
  };

  const clearFormatting = () => {
    execCommand("removeFormat");
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertLineBreak");
      handleInput();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    handleInput();
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
        {/* Text formatting buttons */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("bold");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("italic");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("underline");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment buttons */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("justifyLeft");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("justifyCenter");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("justifyRight");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* List buttons */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            insertList("bullet");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Bullet List (•)"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            insertList("numbered");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Numbered List (1, 2, 3)"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            insertList("dash");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Dash List (-)"
        >
          <Minus size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Indentation buttons */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleOutdent();
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Decrease Indent"
        >
          <Outdent size={16} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleIndent();
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Increase Indent"
        >
          <Indent size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Color picker */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowColorPicker(!showColorPicker);
            }}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
            title="Text Color"
          >
            <Type size={16} />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-20">
              <div className="grid grid-cols-5 gap-1">
                {[
                  "#000000",
                  "#FF0000",
                  "#00FF00",
                  "#0000FF",
                  "#FFFF00",
                  "#FF00FF",
                  "#00FFFF",
                  "#FFA500",
                  "#800080",
                  "#008000",
                ].map((color) => (
                  <button
                    key={color}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execCommand("foreColor", color);
                      setShowColorPicker(false);
                    }}
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Highlight button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("backColor", "#FFFF00");
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Highlight Text"
        >
          <Highlighter size={16} />
        </button>

        {/* Clear formatting button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            clearFormatting();
          }}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors"
          title="Clear Formatting"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-3 min-h-[150px] focus:outline-none prose prose-sm max-w-none"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
};

export default RichTextEditor;
