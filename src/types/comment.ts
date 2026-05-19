export interface Attachment {
  fileName: string;
  fileSize: string;
}

export interface CommentData {
  id: string;
  currentValue: string;
  fieldLabel?: string;
  comment: string;
  attachment?: Attachment;
  state: 'INITIAL' | 'EDITING' | 'SUBMITTED';
}
