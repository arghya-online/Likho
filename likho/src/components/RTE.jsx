import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

/**
 * Rich Text Editor (RTE) Component integrated with React Hook Form.
 * @param {object} props - Component properties.
 * @param {object} props.control - The control object from useForm.
 * @param {string} props.name - The field name for React Hook Form.
 * @param {string} props.label - Optional label for the editor.
 * @param {string} [props.defaultValue] - The initial content of the editor.
 */
export default function RTE({
  control,
  name,
  label,
  defaultValue = "Welcome to TinyMCE!", // Using your initialValue from the first example
}) {
  // Your API Key from the original component
  const TINY_MCE_API_KEY = 'br8duxixs9krowd00nrmuzhebaakb8zaxbtsp2nax2x3r7r2';

  // Your original plugin list
  const TINY_MCE_PLUGINS = [
    // Core editing features
    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
    // Premium features (as listed in your example)
    'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
  ];

  // Your original toolbar configuration
  const TINY_MCE_TOOLBAR = 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat';


  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Controller is responsible for connecting the external UI component (Editor) 
          to the React Hook Form state management. */}
      <Controller
        name={name || "content"}
        control={control}
        // This defaultValue is used for RHF's state, but we also pass it to the Editor for initial rendering
        defaultValue={defaultValue} 
        
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={TINY_MCE_API_KEY}
            
            // This 'initialValue' is for TinyMCE's first load and works best when the RHF 'value' is initially undefined/null
            initialValue={defaultValue} 
            
            // The 'value' prop ensures the editor is controlled by React Hook Form's state
            value={value} 
            
            // 'onEditorChange' is TinyMCE's callback; we map it to RHF's 'onChange'
            onEditorChange={onChange} 

            init={{
              height: 500,
              menubar: true, // Assuming you want menubar on by default
              plugins: TINY_MCE_PLUGINS,
              toolbar: TINY_MCE_TOOLBAR,

              // Merged Configuration from your original component
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
              uploadcare_public_key: '99394527e38776e8dd00',
              
              // Optional: You can add content_style from the second example here if needed:
              // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              // formats: { alignleft: { selector: "p", styles: { textAlign: "left" } } },
            }}
          />
        )}
      />
    </div>
  );
}