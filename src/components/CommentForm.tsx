import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Attachment, CommentData } from '../types/comment';

interface CommentFormProps {
  initialData?: CommentData;
  onSubmit: (data: Partial<CommentData>) => void;
  onDiscard: () => void;
  isNew?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ initialData, onSubmit, onDiscard, isNew = false }) => {
  const currentValue = initialData?.currentValue || "The quick brown fox jumps over the lazy dog";
  const [fieldLabel, setFieldLabel] = useState(initialData?.fieldLabel || '');
  const [comment, setComment] = useState(initialData?.comment || '');
  const [attachment, setAttachment] = useState<Attachment | undefined>(initialData?.attachment);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment({
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
      });
    }
  };

  const handleSubmit = () => {
    if (!comment && !fieldLabel && !attachment) return;
    onSubmit({
      fieldLabel,
      comment,
      attachment,
      state: 'SUBMITTED'
    });
    if (isNew) {
      setFieldLabel('');
      setComment('');
      setAttachment(undefined);
    }
  };

  const handleDiscardClick = () => {
    if (isNew) {
      setFieldLabel('');
      setComment('');
      setAttachment(undefined);
    }
    onDiscard();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full flex flex-col gap-4 text-sm text-gray-700">
       <div>
          <p className="text-xs text-gray-500 mb-1">Current value</p>
          <p className="font-medium text-gray-800">{currentValue}</p>
       </div>
       
       <div>
          <p className="text-xs text-gray-500 mb-1">Field label</p>
          <input 
            type="text" 
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
            placeholder="Placeholder" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-400 text-gray-800 bg-white transition-colors" 
          />
       </div>
       
       <div>
          <p className="text-xs text-gray-500 mb-1">Comment</p>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Please provide a reason for the change" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-400 h-20 resize-none text-gray-800 bg-white transition-colors"
          ></textarea>
       </div>

       <div>
          <p className="text-xs text-gray-500 mb-1">Upload support document</p>
          <div className="relative">
              <input type="file" className="hidden" id={`file-upload-${initialData?.id || 'new'}`} onChange={handleFileChange} />
              <label htmlFor={`file-upload-${initialData?.id || 'new'}`} className="flex justify-between items-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
                 <span className={attachment ? "text-gray-800 truncate pr-2" : "text-gray-400"}>
                   {attachment ? attachment.fileName : "Select a file to upload"}
                 </span>
                 <Upload size={16} className="text-gray-400" />
              </label>
          </div>
       </div>

       <div className="flex justify-between items-center mt-2">
           <button onClick={handleDiscardClick} className="px-5 py-2 border border-outlineOrange text-outlineOrange rounded-full font-medium hover:bg-outlineOrangeHover transition bg-transparent">Discard</button>
           <button onClick={handleSubmit} className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-primaryHover transition shadow-sm">Submit Suggestion</button>
       </div>
    </div>
  );
};

export default CommentForm;
