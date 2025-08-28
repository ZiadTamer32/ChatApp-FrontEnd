import { X, Image, Send, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import toast from "react-hot-toast";
import { globalError } from "../lib/constants";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { sendMessage, isSendingMessage } = useChatStore();
  const imgRef = useRef(null);

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (imgRef.current) imgRef.current.value = "";
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: message, image: imagePreview });
      setMessage("");
      setImagePreview("");
    } catch (error) {
      console.error(globalError(error));
      toast.error(globalError(error));
    }
  };

  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-warning-content hover:bg-warning-content/90	 transition-colors flex items-center justify-center"
              onClick={handleRemoveImage}
            >
              <X className="size-4 text-warning" />
            </button>
          </div>
        </div>
      )}
      {/* Form */}
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="flex-1">
          <input
            placeholder="Type a message..."
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="w-full p-2 border border-primary/50 bg-transparent rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <input
            type="file"
            className="hidden"
            ref={imgRef}
            onChange={handleImageChange}
          />
          <button
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors"
            type="button"
            onClick={() => imgRef.current.click()}
          >
            <Image className="size-5 text-primary" />
          </button>
        </div>
        <div>
          <button
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/30 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={(!message.trim() && !imagePreview) || isSendingMessage}
          >
            {isSendingMessage ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send className="size-5 text-primary" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
