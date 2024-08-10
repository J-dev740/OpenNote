import { ChangeCodeMirrorLanguage, codeBlockPlugin, codeMirrorPlugin, ConditionalContents, headingsPlugin, InsertCodeBlock, InsertSandpack, linkPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin, SandpackConfig, sandpackPlugin, ShowSandpackInfo, toolbarPlugin } from '@mdxeditor/editor'
import { useMarkDownEditor } from '@renderer/hooks/useMarkDownEditor'
import React from 'react'
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
  ]
}
const MarkDownEditor = () => {
    const {selectedNote}=useMarkDownEditor()
    if(!selectedNote) return null
  return (
    <MDXEditor 
    key={selectedNote.title}
    plugins={[headingsPlugin(),listsPlugin(),quotePlugin(),markdownShortcutPlugin(),linkPlugin(),
        codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
        // sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        // codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
        // toolbarPlugin({toolbarContents: () => (
        //   <ConditionalContents
        //     options={[
        //         { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
        //         { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
        //         { fallback: () => ( <> 
        //         <InsertCodeBlock />
        //         <InsertSandpack />
        //       </>) }
        //       ]}
        //     />)
        // })
    ]}
    // markdown={'# Hello from Mdx Editor'}
    markdown={selectedNote.content}
     contentEditableClassName="outline-none min-h-screen text-lg px-8 py-5 caret-yellow-500 max-w-none
    prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 
    prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"/>
  )
}

export default MarkDownEditor