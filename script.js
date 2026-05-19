class CommentComponent {
    constructor(containerId, initialData = {}) {
        this.container = document.getElementById(containerId);
        
        // State
        this.state = initialData.state || 'INITIAL'; // INITIAL, EDITING, SUBMITTED
        
        // Data
        this.data = {
            id: initialData.id || Date.now().toString(),
            currentValue: initialData.currentValue || "The quick brown fox jumps over the lazy dog",
            fieldLabel: initialData.fieldLabel || "",
            commentText: initialData.commentText || "",
            fileName: initialData.fileName || "",
            fileSize: initialData.fileSize || ""
        };

        this.render();
    }

    setState(newState) {
        this.state = newState;
        this.render();
        updateBadgeCount();
    }

    updateData(field, value) {
        this.data[field] = value;
        if (this.state === 'INITIAL' && (this.data.fieldLabel || this.data.commentText || this.data.fileName)) {
            this.state = 'EDITING';
        } else if (this.state === 'EDITING' && !this.data.fieldLabel && !this.data.commentText && !this.data.fileName) {
            this.state = 'INITIAL';
        }
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.updateData('fileName', file.name);
            this.updateData('fileSize', (file.size / (1024 * 1024)).toFixed(1) + 'MB');
            this.render();
        }
    }

    handleDiscard() {
        this.data.fieldLabel = "";
        this.data.commentText = "";
        this.data.fileName = "";
        this.data.fileSize = "";
        this.setState('INITIAL');
    }

    handleSubmit() {
        if (!this.data.commentText && !this.data.fieldLabel) return; // Optional validation
        this.setState('SUBMITTED');
    }

    handleEdit() {
        this.setState('EDITING');
    }

    handleDelete() {
        this.container.innerHTML = "";
        // If we want to remove from a list, we'd trigger a callback here.
        this.handleDiscard(); // reset for demo purposes
        updateBadgeCount();
    }

    render() {
        let html = '';
        
        if (this.state === 'INITIAL' || this.state === 'EDITING') {
            const hasData = this.state === 'EDITING';
            const fileLabel = hasData && this.data.fileName ? this.data.fileName : 'Select a file to upload';
            const fileLabelColor = hasData && this.data.fileName ? 'text-gray-800' : 'text-gray-400';

            html = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full flex flex-col gap-4 text-sm text-gray-700">
               <div>
                  <p class="text-xs text-gray-500 mb-1">Current value</p>
                  <p class="font-medium text-gray-800">${this.data.currentValue}</p>
               </div>
               
               <div>
                  <p class="text-xs text-gray-500 mb-1">Field label</p>
                  <input type="text" id="field-label-${this.data.id}" value="${this.data.fieldLabel}" placeholder="Placeholder" class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-400 transition-colors">
               </div>
               
               <div>
                  <p class="text-xs text-gray-500 mb-1">Comment</p>
                  <textarea id="comment-text-${this.data.id}" placeholder="Please provide a reason for the change" class="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-400 h-20 resize-none transition-colors">${this.data.commentText}</textarea>
               </div>

               <div>
                  <p class="text-xs text-gray-500 mb-1">Upload support document</p>
                  <div class="relative">
                      <input type="file" class="hidden" id="file-upload-${this.data.id}">
                      <label for="file-upload-${this.data.id}" class="flex justify-between items-center w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
                         <span class="${fileLabelColor} truncate pr-2">${fileLabel}</span>
                         <i class="fa-solid fa-arrow-up-from-bracket text-gray-400"></i>
                      </label>
                  </div>
               </div>

               <div class="flex justify-between items-center mt-2">
                   <button id="discard-btn-${this.data.id}" class="px-6 py-2 border border-[#f58442] text-[#f58442] rounded-full font-medium hover:bg-orange-50 transition-colors">Discard</button>
                   <button id="submit-btn-${this.data.id}" class="px-6 py-2 bg-[#f05252] text-white rounded-full font-medium hover:bg-red-600 transition shadow-sm">Submit Suggestion</button>
               </div>
            </div>
            `;
        } else if (this.state === 'SUBMITTED') {
            html = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full flex flex-col gap-4 text-sm text-gray-700">
               <div>
                  <p class="text-xs text-gray-500 mb-1">Current value</p>
                  <p class="font-medium text-gray-800">${this.data.currentValue}</p>
               </div>

               <div>
                  <p class="text-xs text-gray-500 mb-1">Comment</p>
                  <p class="font-medium text-gray-800">${this.data.commentText || this.data.fieldLabel || "No comment provided."}</p>
               </div>
               
               ${this.data.fileName ? `
               <div>
                  <p class="text-xs text-gray-500 mb-1">Supporting document attached</p>
                  <div class="flex items-center justify-between border border-gray-200 rounded-md p-3">
                      <div class="flex items-center gap-3">
                          <div class="bg-red-100 text-red-500 rounded p-2 flex items-center justify-center">
                             <i class="fa-solid fa-file-pdf text-xl"></i>
                          </div>
                          <div>
                              <p class="font-medium text-gray-800 w-32 sm:w-48 truncate">${this.data.fileName}</p>
                              <p class="text-xs text-gray-500">${this.data.fileSize}</p>
                          </div>
                      </div>
                      <div class="flex gap-2">
                          <button class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500 transition-colors"><i class="fa-regular fa-eye"></i></button>
                          <button class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-500 transition-colors"><i class="fa-solid fa-download"></i></button>
                      </div>
                  </div>
               </div>
               ` : ''}

               <div class="flex justify-between items-center mt-2">
                   <button id="delete-btn-${this.data.id}" class="px-6 py-2 border border-[#f58442] text-[#f58442] rounded-full font-medium hover:bg-orange-50 transition-colors">Delete Comment</button>
                   <button id="edit-btn-${this.data.id}" class="px-6 py-2 bg-[#f05252] text-white rounded-full font-medium hover:bg-red-600 transition shadow-sm">Edit Comment</button>
               </div>
            </div>
            `;
        }

        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    attachEventListeners() {
        if (this.state === 'INITIAL' || this.state === 'EDITING') {
            const fieldLabelInput = document.getElementById(`field-label-${this.data.id}`);
            const commentTextInput = document.getElementById(`comment-text-${this.data.id}`);
            const fileUploadInput = document.getElementById(`file-upload-${this.data.id}`);
            const discardBtn = document.getElementById(`discard-btn-${this.data.id}`);
            const submitBtn = document.getElementById(`submit-btn-${this.data.id}`);

            if (fieldLabelInput) {
                fieldLabelInput.addEventListener('input', (e) => this.updateData('fieldLabel', e.target.value));
            }
            if (commentTextInput) {
                commentTextInput.addEventListener('input', (e) => this.updateData('commentText', e.target.value));
            }
            if (fileUploadInput) {
                fileUploadInput.addEventListener('change', (e) => this.handleFileChange(e));
            }
            if (discardBtn) {
                discardBtn.addEventListener('click', () => this.handleDiscard());
            }
            if (submitBtn) {
                submitBtn.addEventListener('click', () => this.handleSubmit());
            }
        } else if (this.state === 'SUBMITTED') {
            const deleteBtn = document.getElementById(`delete-btn-${this.data.id}`);
            const editBtn = document.getElementById(`edit-btn-${this.data.id}`);

            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.handleDelete());
            }
            if (editBtn) {
                editBtn.addEventListener('click', () => this.handleEdit());
            }
        }
    }
}

// Global state and UI management
let mainComponent = null;

function updateBadgeCount() {
    const badge = document.getElementById('comment-count-badge');
    if (mainComponent && mainComponent.state === 'SUBMITTED') {
        badge.textContent = "1";
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Dialog Controls
    const dialogOverlay = document.getElementById('dialog-overlay');
    const openDialogBtn = document.getElementById('open-dialog-btn');
    const closeDialogBtn = document.getElementById('close-dialog-btn');
    const commentsContainer = document.getElementById('comments-container');

    openDialogBtn.addEventListener('click', () => {
        dialogOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    closeDialogBtn.addEventListener('click', () => {
        dialogOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Close on overlay click
    dialogOverlay.addEventListener('click', (e) => {
        if (e.target === dialogOverlay) {
            dialogOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Initialize the Comment Component inside the container
    // We create a wrapper div for the component to attach to
    const componentWrapper = document.createElement('div');
    componentWrapper.id = 'main-comment-component';
    commentsContainer.appendChild(componentWrapper);

    mainComponent = new CommentComponent('main-comment-component', {
        state: 'INITIAL'
    });

    updateBadgeCount();
});
