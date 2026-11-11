"use client";

import { useCommentsMachine } from "@/lib/machines/commentsMachine";
import { Loader2 } from "lucide-react";

export default function Comments({ itemId }: { itemId: string }) {
  const {
    authStatus,
    feedStatus,
    user,
    comments,
    commentText,
    isSubmitting,
    setCommentText,
    loginWithGoogle,
    addComment,
  } = useCommentsMachine(itemId);

  return (
    <div
      data-comments-auth={authStatus}
      data-comments-status={feedStatus}
      className="mt-24 pt-16 border-t border-[#1a1a1a]/10"
    >
      <h3 className="text-4xl font-syne font-bold uppercase tracking-tighter mb-12 text-[#1a1a1a]">
        Comments
      </h3>

      <div className="space-y-8 mb-12">
        {feedStatus === "loading" ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md p-6 rounded-[2rem] border border-white/40 animate-pulse h-28"
              />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-[#1a1a1a]/40 font-cormorant italic text-xl">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-white/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/40 flex gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
            >
              {c.authorParams?.photo ? (
                <img
                  src={c.authorParams.photo}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full shadow-sm object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a]/5 text-[#1a1a1a] flex items-center justify-center font-syne font-bold text-lg border border-[#1a1a1a]/10">
                  {c.authorParams?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-syne font-bold tracking-tight text-[#1a1a1a] text-lg">
                    {c.authorParams?.name || "Anonymous"}
                  </span>
                  <span className="text-xs font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                    {new Date(c.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[#4a4a4a] font-light leading-relaxed">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={addComment} className="flex flex-col gap-4">
          <textarea
            className="w-full bg-white/30 backdrop-blur-md border border-[#1a1a1a]/10 rounded-[2rem] p-6 text-[#1a1a1a] font-light focus:outline-none focus:border-[#1a1a1a]/30 focus:bg-white/50 transition-all placeholder-[#1a1a1a]/30 resize-none shadow-[0_5px_15px_rgba(0,0,0,0.01)]"
            rows={3}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
            required
          />
          <div className="flex justify-between items-center">
            <p className="text-xs font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/40">
              Commenting as {user.displayName || user.email}
            </p>
            <button
              type="submit"
              disabled={isSubmitting || !commentText.trim()}
              className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 text-[#E5D5D0] px-8 py-3 rounded-full font-syne font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white/30 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/40 text-center shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
          <p className="mb-8 text-[#1a1a1a]/60 font-cormorant italic text-xl">
            You must be logged in to leave a comment.
          </p>
          <button
            onClick={loginWithGoogle}
            disabled={authStatus === "authenticating"}
            className="bg-[#1a1a1a] text-[#E5D5D0] font-syne font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-[#1a1a1a]/80 transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            {authStatus === "authenticating" ? "Connecting..." : "Login with Google"}
          </button>
        </div>
      )}
    </div>
  );
}
