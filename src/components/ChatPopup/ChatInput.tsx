import { useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import type { ChatStatus } from "./types";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
  status: ChatStatus;
  disabled?: boolean;
  rateLimitCountdown?: number;
  conversationId?: string | null;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onStop,
  status,
  disabled,
  rateLimitCountdown,
  conversationId,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim() && status !== "streaming") {
        onSend();
      }
    }
  };

  const isStreaming = status === "streaming" || status === "submitted";
  const isDisabled = disabled || (!isStreaming && !value.trim());

  return (
    <div className="border-t border-cream-dark bg-white/90 backdrop-blur-sm p-4 rounded-b-2xl">
      {rateLimitCountdown !== undefined && rateLimitCountdown > 0 && (
        <p className="mb-2 text-center text-xs text-amber-600">
          Rate limited. Try again in {rateLimitCountdown}s
        </p>
      )}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-cream-dark bg-cream px-4 py-3 text-sm text-charcoal placeholder-charcoal-muted focus:border-charcoal focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />
        <button
          onClick={isStreaming ? onStop : onSend}
          disabled={isDisabled && !isStreaming}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-charcoal text-white transition-colors hover:bg-charcoal-light disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={isStreaming ? "Stop" : "Send"}
        >
          {isStreaming ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
      {conversationId && (
        <p className="mt-2 text-center text-[11px] text-charcoal-muted">
          <a
            href={`https://chat.docs.bffless.app/chat/${conversationId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-charcoal transition-colors underline"
          >
            Open in full chat
          </a>
        </p>
      )}
    </div>
  );
}
