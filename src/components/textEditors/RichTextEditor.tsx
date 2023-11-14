import { Editor } from "@tinymce/tinymce-react";

export const RichTextEditor = () => {
  return (
    <>
      <Editor
        apiKey="6t3jjaakgoewxb7mczb0i6kce72wwzrj7i12cusi5jjxlok3"
        init={{
          plugins:
            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:14px }",
          skin: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "oxide-dark"
            : "",
          content_css: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "",
        }}
        initialValue=""
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
};
