import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("File uploaded successfully!");
        setFiles((prevFiles) => [
          ...prevFiles,
          { name: result.fileName, path: result.filePath },
        ]);
        setFile(null); // Reset file input
      } else {
        const errorResult = await response.json();
        alert(errorResult.message || "Failed to upload file.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="uploadPage">
      <h1>Upload File</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {/* Tabel untuk menampilkan file */}
      {files.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nama File</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>
                <a href={`${import.meta.env.VITE_API_URL}/uploads/${file.path}`} download>
                  Download
                </a>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadPage;
