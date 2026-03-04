
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 text-gray-700 font-medium">{label}</label>}
      
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey='ylfogy9rdvr00etlf16oqq907baz5rtjm6ecky67g2isda3v'
            value={value}
            onEditorChange={onChange}
            init={{
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
                'link', 'lists', 'media', 'searchreplace', 'table',
                'visualblocks', 'wordcount'
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              paste_data_images: false,
              menubar: 'edit view insert format tools',
              menu: {
                edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall' },
              },
              height: 400,
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        )}
      />
    </div>
  );
}