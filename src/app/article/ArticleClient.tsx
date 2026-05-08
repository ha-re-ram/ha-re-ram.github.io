"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";
import Comments from "@/components/Comments";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { Clock, List, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

interface ArticleClientProps {
  id: string;
  type: string;
}

export default function ArticleClient({ id, type }: ArticleClientProps) {
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const [adjacent, setAdjacent] = useState<{ prev: any; next: any }>({ prev: null, next: null });
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchArticleAndAdjacent = async () => {
      if (!id || !db) {
        setLoading(false);
        return;
      }
      try {
        // Fetch current article
        const docRef = doc(db, type, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setArticle({ id: docSnap.id, ...data });

          // Extract TOC from content (## headings)
          const content = data.content || "";
          const headings = content.match(/^##\s+(.+)$/gm);
          if (headings) {
            const tocItems = headings.map((h: string) => {
              const text = h.replace(/^##\s+/, "");
              const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
              return { id, text };
            });
            setToc(tocItems);
          }
        }

        // Fetch adjacent articles
        const q = query(collection(db, type), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const articles: any[] = [];
        querySnapshot.forEach((doc) => {
          articles.push({ id: doc.id, title: doc.data().title });
        });
        
        const currentIndex = articles.findIndex(a => a.id === id);
        if (currentIndex !== -1) {
          setAdjacent({
            next: currentIndex > 0 ? articles[currentIndex - 1] : null,
            prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
          });
        }
      } catch (error) {
        console.error("Error fetching article or adjacent", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleAndAdjacent();
  }, [id, type]);

  const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (loading) return <div className="text-center py-32 text-[#1a1a1a]/40 font-syne font-bold uppercase tracking-widest text-sm animate-pulse">Loading article...</div>;
  if (!article) return <div className="text-center py-32 text-red-500/80 font-syne font-bold uppercase tracking-widest text-sm">Article not found</div>;

  const readTime = calculateReadTime(article.content || "");

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#1a1a1a] origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* TOC Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] shadow-sm">
            <h3 className="font-syne font-black uppercase tracking-tighter text-xl mb-8 flex items-center gap-3">
              <List className="w-5 h-5 text-[#1a1a1a]/40" />
              Contents
            </h3>
            <nav className="space-y-4">
              {toc.length > 0 ? (
                toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block font-cormorant italic text-lg text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:translate-x-2 transition-all"
                  >
                    {item.text}
                  </a>
                ))
              ) : (
                <p className="font-cormorant italic text-[#1a1a1a]/40">No subheadings found.</p>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 max-w-4xl mx-auto w-full">
          <button
            onClick={() => router.back()}
            className="mb-16 text-[#1a1a1a]/60 hover:text-[#1a1a1a] flex items-center gap-4 transition-colors font-syne font-bold uppercase tracking-widest text-xs group"
          >
            <span className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] transition-all">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Go Back
          </button>

          <header className="mb-20">
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <span className="font-syne font-black uppercase tracking-[0.3em] text-[10px] text-[#1a1a1a]/40 bg-white/40 px-4 py-2 rounded-full border border-white/60">
                {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <div className="flex items-center gap-2 font-syne font-bold uppercase tracking-widest text-[10px] text-[#1a1a1a]/60">
                <Clock className="w-4 h-4" />
                {readTime} MIN READ
              </div>
            </div>
            
            <h1 className="text-[clamp(2.5rem,10vw,6rem)] md:text-7xl lg:text-8xl font-syne font-black mb-8 uppercase tracking-tighter text-[#1a1a1a] leading-tight md:leading-[0.9]">
              {article.title}
            </h1>
          </header>

          <div 
            ref={contentRef}
            className="mb-32 prose prose-xl prose-neutral max-w-none 
              prose-p:text-[#4a4a4a] prose-p:font-light prose-p:leading-relaxed 
              prose-headings:text-[#1a1a1a] prose-headings:font-syne prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight 
              prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:scroll-mt-32
              prose-a:text-[#1a1a1a] prose-a:underline prose-a:underline-offset-4 prose-a:decoration-[#1a1a1a]/30 hover:prose-a:decoration-[#1a1a1a] 
              prose-strong:text-[#1a1a1a] prose-strong:font-bold
              prose-blockquote:border-l-[#1a1a1a]/20 prose-blockquote:font-cormorant prose-blockquote:italic prose-blockquote:text-3xl prose-blockquote:text-[#1a1a1a]/60 prose-blockquote:bg-white/10 prose-blockquote:p-10 prose-blockquote:rounded-[2rem]
              prose-ul:text-[#4a4a4a] prose-li:font-light"
          >
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => {
                  const text = props.children?.toString() || "";
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                  return <h2 id={id} {...props} />;
                }
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Adjacent Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 pt-16 border-t border-[#1a1a1a]/10">
            {adjacent.prev && (
              <Link 
                href={`/article?id=${adjacent.prev.id}&type=${type}`}
                className="group flex flex-col p-8 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[2.5rem] hover:bg-white/40 transition-all text-left"
              >
                <span className="flex items-center gap-2 font-syne font-bold uppercase tracking-widest text-[10px] text-[#1a1a1a]/30 mb-4 group-hover:-translate-x-2 transition-transform">
                  <ChevronLeft className="w-3 h-3" /> Previous
                </span>
                <span className="font-syne font-bold text-xl uppercase tracking-tight text-[#1a1a1a]">{adjacent.prev.title}</span>
              </Link>
            )}
            <div className={adjacent.prev ? "" : "md:col-start-2"}>
              {adjacent.next && (
                <Link 
                  href={`/article?id=${adjacent.next.id}&type=${type}`}
                  className="group flex flex-col p-8 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[2.5rem] hover:bg-white/40 transition-all text-right"
                >
                  <span className="flex items-center gap-2 justify-end font-syne font-bold uppercase tracking-widest text-[10px] text-[#1a1a1a]/30 mb-4 group-hover:translate-x-2 transition-transform">
                    Next <ChevronRight className="w-3 h-3" />
                  </span>
                  <span className="font-syne font-bold text-xl uppercase tracking-tight text-[#1a1a1a]">{adjacent.next.title}</span>
                </Link>
              )}
            </div>
          </div>

          <Comments itemId={article.id} />
        </div>
      </div>
    </>
  );
}
