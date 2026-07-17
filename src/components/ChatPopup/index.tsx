import { useState, useCallback } from "react";
import { ChatPanel } from "./ChatPanel";

const STORAGE_KEY = "chat_conversation_id";

export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(() => Date.now());

  const handleNewChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setChatKey(Date.now());
  }, []);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-white shadow-lg transition-all hover:bg-charcoal-light hover:shadow-xl"
          aria-label="Open chat"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed right-4 bottom-4 z-50 h-[500px] w-[380px] max-h-[80vh] animate-slide-up max-sm:inset-2 max-sm:h-auto max-sm:w-auto">
          <ChatPanel
            key={chatKey}
            onClose={() => setIsOpen(false)}
            onNewChat={handleNewChat}
          />
        </div>
      )}
    </>
  );
}
