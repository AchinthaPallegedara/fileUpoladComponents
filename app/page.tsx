"use client";

import React, { useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import Image from "next/image";

type resType = {
  url: string;
  thumbnailUrl: string | null;
  size: number;
  uploadedAt: Date;
  metadata: Record<string, never>;
  path: Record<string, never>;
  pathOrder: string[];
};

export default function Home() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [uploadResponse, setUploadResponse] = useState<resType>({
    url: "",
    thumbnailUrl: "",
    size: 0,
    uploadedAt: new Date(),
    metadata: {},
    path: {},
    pathOrder: [""],
  });
  return (
    <div>
      <h1 className="text-3xl text-bold mb-2">Basic Image Uploader</h1>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />

      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicImages.upload({
              file,
              options: {
                temporary: true,
              },
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database

            console.log(res);
            setUploadResponse(res);
          }
        }}
      >
        Upload
      </button>
      {uploadResponse.url === "" ? null : (
        <button
          onClick={async () => {
            await edgestore.publicFiles.confirmUpload({
              url: uploadResponse.url,
            });
            console.log("confirmed");
          }}
        >
          SUBMIT
        </button>
      )}
    </div>
  );
}
