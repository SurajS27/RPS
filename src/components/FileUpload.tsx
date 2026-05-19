import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Attachment } from '../types/comment';

interface FileUploadProps {
  attachment: Attachment | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ attachment, onFileSelect, onFileRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  if (attachment) {
    return (
      <div className="flex items-center justify-between p-2 bg-darkBg rounded-lg border border-gray-700 mt-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-primary/20 text-primary p-2 rounded shrink-0">
             <Upload size={16} />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-medium text-textMain truncate">{attachment.fileName}</span>
            <span className="text-[10px] text-textMuted">{attachment.fileSize}</span>
          </div>
        </div>
        <button 
          type="button"
          onClick={onFileRemove}
          className="p-1 text-textMuted hover:text-danger hover:bg-darkSurface rounded transition-colors shrink-0"
          aria-label="Remove file"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        id="file-upload"
      />
      <label 
        htmlFor="file-upload" 
        className="flex justify-between items-center w-full bg-darkBg border border-gray-700 rounded-lg px-3 py-2 cursor-pointer hover:bg-darkSurface transition-colors"
      >
         <span className="text-sm text-textMuted">Select a file to upload</span>
         <Upload size={16} className="text-textMuted" />
      </label>
    </div>
  );
};

export default FileUpload;
