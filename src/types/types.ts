export interface AcceptedFile extends File {
    // Add any additional properties if needed
}


export interface ChatFile {
  name: string;
  content: string;
}

export interface ChatState {
  file: ChatFile | null;
  setFile: (file: ChatFile) => void;
  clearFile: () => void;
}