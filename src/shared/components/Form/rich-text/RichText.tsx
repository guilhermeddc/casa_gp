"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Typography } from "@mui/material";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

export const RichText: React.FC<RichTextProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div>
      {label && (
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
      )}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Digite aqui..."}
        modules={modules}
        formats={formats}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image",
];
