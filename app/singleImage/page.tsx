"use client";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

const Page = () => {
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    setUploadProgress(0); // Reset progress on new upload
    const res = await edgestore.publicFiles.upload({
      file,
      options: {
        temporary: true,
      },
      onProgressChange: (progress) => {
        setUploadProgress(progress);
      },
    });
    // Handle the result of the upload if needed
    console.log("URL:", res.url);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <h1 className="text-3xl text-bold mb-2">Single Image Componet</h1>
      <SingleImageDropzone
        className="dark:text-black"
        width={400}
        height={400}
        value={file}
        onChange={(file) => {
          setFile(file);
          if (file) {
            handleUpload(file);
          }
        }}
        progress={uploadProgress} // Pass progress to SingleImageDropzone
      />
    </div>
  );
};

export default Page;
