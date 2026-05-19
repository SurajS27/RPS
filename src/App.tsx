import { useState } from 'react';
import CommentModal from './components/CommentModal';
import { MessageSquare } from 'lucide-react';
import { CommentData } from './types/comment';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([
    {
      id: '1',
      currentValue: 'The quick brown fox jumps over the lazy dog',
      comment: 'Initial feedback applied.',
      state: 'SUBMITTED'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-4xl flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-blue-600 font-medium hover:bg-gray-50 transition-colors relative"
        >
          <MessageSquare size={18} />
          Comments
          {comments.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {comments.length}
            </span>
          )}
        </button>
      </div>

      <CommentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default App;
