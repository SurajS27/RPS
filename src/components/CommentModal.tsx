import React, { useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import { CommentData } from '../types/comment';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comments, setComments }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [comments]);

  if (!isOpen) return null;

  const handleUpdate = (id: string, data: Partial<CommentData>) => {
    setComments(comments.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleEdit = (id: string) => {
    handleUpdate(id, { state: 'EDITING' });
  };

  const handleDiscardEdit = (id: string) => {
    // If it was already submitted, reverting edit usually goes back to submitted. 
    // Or we reset to initial if they want to clear it. Let's reset to SUBMITTED since it was already in the list.
    handleUpdate(id, { state: 'SUBMITTED' });
  };

  const handleAddNew = (data: Partial<CommentData>) => {
    setComments([...comments, {
      id: Date.now().toString(),
      currentValue: "The quick brown fox jumps over the lazy dog",
      fieldLabel: data.fieldLabel || '',
      comment: data.comment || '',
      attachment: data.attachment,
      state: 'SUBMITTED'
    }]);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-darkBg w-full max-w-[500px] flex flex-col rounded-xl shadow-2xl overflow-hidden h-[650px] max-h-[90vh]">
        {/* Header (Matches functionality from Image 2) */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700/50">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <MessageSquare size={20} className="text-gray-300" />
            Comment
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-darkSurface"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body (Light background to contrast white cards) */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#f3f4f6] flex flex-col gap-4">
          
          {comments.map((comment) => (
            comment.state === 'SUBMITTED' ? (
              <CommentCard 
                key={comment.id} 
                data={comment} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ) : (
              <CommentForm 
                key={comment.id} 
                initialData={comment} 
                onSubmit={(data) => handleUpdate(comment.id, data)}
                onDiscard={() => handleDiscardEdit(comment.id)}
              />
            )
          ))}

          {/* Form to add a new suggestion */}
          <CommentForm 
            isNew={true}
            onSubmit={handleAddNew}
            onDiscard={() => {}}
          />

        </div>
      </div>
    </div>
  );
};

export default CommentModal;
