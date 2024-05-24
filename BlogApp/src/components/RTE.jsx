
import React from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from "../conf/conf.js"


function RTE({ name, control, label, defaultValue = '' }) {
  // control (comes from react-hook-form) - responsible to move the state of this (RTE) component to the form
  return (
    <>
      <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}

        <Controller
          name = {name || 'content'}
          control = {control} // by this, the parent element can get control of RTE
          render = {({ field: { onChange } }) => (
            <Editor
            apiKey='x3jm9ayergddlj0nb1ahmml1iv3lta461nsktbjocr8hv7td'
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  'image',
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                  'anchor',
                ],
                toolbar:
                  'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </>
  )
}

export default RTE;