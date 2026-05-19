import React from 'react';
import { Eye, Download, FileText } from 'lucide-react';
import { CommentData } from '../types/comment';

interface CommentCardProps {
  data: CommentData;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full flex flex-col gap-4 text-sm text-gray-700">
       <div>
          <p className="text-xs text-gray-500 mb-1">Current value</p>
          <p className="font-medium text-gray-800">{data.currentValue}</p>
       </div>

       <div>
          <p className="text-xs text-gray-500 mb-1">Comment</p>
          <p className="font-medium text-gray-800">{data.comment || "No comment provided"}</p>
       </div>
       
       {data.attachment && (
       <div>
          <p className="text-xs text-gray-500 mb-1">Supporting document attached</p>
          <div className="flex items-center justify-between border border-gray-200 rounded-md p-3">
              <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-500 rounded p-2 flex items-center justify-center">
                     <FileText size={20} />
                  </div>
                  <div>
                      <p className="font-medium text-gray-800 w-32 sm:w-48 truncate">{data.attachment.fileName}</p>
                      <p className="text-xs text-gray-500">{data.attachment.fileSize}</p>
                  </div>
              </div>
              <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500 transition-colors bg-white"><Eye size={16} /></button>
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500 transition-colors bg-white"><Download size={16} /></button>
              </div>
          </div>
       </div>
       )}

       <div className="flex justify-between items-center mt-2">
           <button onClick={() => onDelete(data.id)} className="px-5 py-2 border border-outlineOrange text-outlineOrange rounded-full font-medium hover:bg-outlineOrangeHover transition bg-transparent">Delete Comment</button>
           <button onClick={() => onEdit(data.id)} className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-primaryHover transition shadow-sm">Edit Comment</button>
       </div>
    </div>
  );
};

export default CommentCard;
