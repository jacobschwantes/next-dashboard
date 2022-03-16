import React, { useCallback, useEffect, useMemo, useState } from "react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import isHotkey from "is-hotkey";
import {
  Editable,
  useSlate,
  Slate,
  useSlateStatic,
  useSelected,
  useFocused,
  withReact,
  ReactEditor,
} from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";

import {
  FaItalic,
  FaBold,
  FaCode,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaImage,
} from "react-icons/fa";
import {
  BiItalic,
  BiBold,
  BiCode,
  BiUnderline,
  BiListOl,
  BiListUl,
} from "react-icons/bi";
const ICONS = {
  italic: FaItalic,
  bold: FaBold,
  code: FaCode,
  underlined: FaUnderline,
  format_quote: FaQuoteRight,
  format_list_numbered: FaListOl,
  format_list_bulleted: FaListUl,
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

const RichText = (props) => {
  const [value, setValue] = useState(props.document);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editor] = useState(() => withImages(withReact(createEditor())));

  const externalSetValue = useCallback(
    (newValue) => {
      editor.children = newValue;
      setValue(newValue);
    },
    [editor]
  );
  useEffect(() => {
    externalSetValue(props.document);
    Transforms.select(editor, { path: [0, 0], offset: 0 });
  }, [props.document]);
  useEffect(() => {
    props.setBody(value);
  }, [value]);

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };
  return (
    <div className=" flex flex-1  flex-col overflow-hidden rounded-2xl border border-gray-300 ">
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(value);
        }}
      >
        {props.readOnly ? null : (
          <div className="flex items-start space-x-2 rounded-t-2xl border-b bg-gray-50 p-3">
            <MarkButton format="bold" icon="bold" />
            <MarkButton format="italic" icon="italic" />
            <MarkButton format="underline" icon="underlined" />
            <MarkButton format="code" icon="code" />
            <BlockButton format="numbered-list" icon="format_list_numbered" />
            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
            <InsertImageButton />
          </div>
        )}
        <div
          className={
            " scrollbar scrollbarY black overflow-auto rounded-2xl bg-gray-50 p-3 " +
            (props.expand ? " flex-1" : "h-64")
          }
        >
          <Editable
            readOnly={props.readOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  console.log(1, editor, format);
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  console.log(2, isActive, isList);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "image":
      return <Image {...props} />;
    case "bulleted-list":
      return <ul className="list-disc pl-5">{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li>{children}</li>;
    case "numbered-list":
      return <ol className="list-decimal pl-4">{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const Icon = ICONS[icon];
  const editor = useSlate();
  return (
    <button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon
        className={
          " h-5 w-5 " + (isBlockActive(editor, format) ? "text-blue-600" : "")
        }
      />
    </button>
  );
};

const MarkButton = ({ format, icon }) => {
  const Icon = ICONS[icon];
  const editor = useSlate();
  return (
    <button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon
        className={
          " h-5 w-5 " + (isMarkActive(editor, format) ? "text-blue-600" : "")
        }
      />
    </button>
  );
};

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false}>
        <img src={element.url} />
        <button onClick={() => Transforms.removeNodes(editor, { at: path })}>
          delete
        </button>
      </div>
    </div>
  );
};

const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        insertImage(editor, url);
      }}
    >
      <FaImage className="h-5 w-5" />
    </button>
  );
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

export default RichText;
