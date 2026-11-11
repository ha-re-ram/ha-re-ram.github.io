"use client";

import { useAdminDashboardMachine, CmsTab } from "@/lib/machines/adminMachine";
import { Edit2, Trash2, Github, GripVertical, Save, Loader2, Check, X } from "lucide-react";
import { Reorder } from "framer-motion";

export default function AdminDashboard() {
  const {
    user,
    authChecked,
    tab,
    items,
    form,
    isSaving,
    isSavingOrder,
    githubRepos,
    showGithub,
    isFetchingGithub,
    deleteConfirmId,
    setTab,
    setFormField,
    resetForm,
    editItem,
    handleSave,
    confirmDelete,
    handleDelete,
    handleReorder,
    saveReorder,
    fetchGithubRepos,
    importFromGithub,
    handleLogout,
  } = useAdminDashboardMachine();

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5D5D0] text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm animate-pulse">
        Verifying Session...
      </div>
    );
  }

  if (!user) return null;

  const tabOptions: { key: CmsTab; label: string }[] = [
    { key: "blogs", label: "📝 Blogs" },
    { key: "projects", label: "🚀 Projects" },
    { key: "certifications", label: "🏆 Certs" },
  ];

  return (
    <main
      data-admin-tab={tab}
      data-admin-items-count={items.length}
      className="min-h-screen pt-32 p-8 relative z-20 text-[#1a1a1a]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-5xl md:text-6xl font-syne font-black uppercase tracking-tighter text-[#1a1a1a]">
            Admin <span className="font-cormorant italic font-light lowercase">CMS</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] px-6 py-2 rounded-full border border-[#1a1a1a]/10 font-syne font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 border-b border-[#1a1a1a]/10 pb-4">
          {tabOptions.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 font-syne font-bold uppercase tracking-widest text-sm transition-colors relative capitalize cursor-pointer ${
                tab === t.key
                  ? "text-[#1a1a1a]"
                  : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]/80"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1a1a1a]"></span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 flex flex-col h-fit shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-syne font-bold tracking-tight text-[#1a1a1a]">
                {form.editId ? "Edit" : "Add New"} {tab.slice(0, -1)}
              </h2>
              {form.editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/60 hover:text-[#1a1a1a] px-4 py-2 bg-white/50 rounded-full border border-[#1a1a1a]/10 cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {tab === "projects" && (
              <div className="mb-8">
                <button
                  type="button"
                  onClick={fetchGithubRepos}
                  disabled={isFetchingGithub}
                  className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-xs py-4 rounded-2xl border border-[#1a1a1a]/10 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isFetchingGithub ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Github size={18} />
                  )}
                  {isFetchingGithub
                    ? "Fetching Repositories..."
                    : showGithub
                    ? "Hide GitHub Repos"
                    : "Fetch / Import from GitHub"}
                </button>

                {showGithub && githubRepos.length > 0 && (
                  <div className="mt-4 max-h-56 overflow-y-auto space-y-2 p-3 bg-white/40 rounded-2xl border border-white/60 custom-scrollbar">
                    {githubRepos.slice(0, 20).map((repo: any) => (
                      <div
                        key={repo.id}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/60 text-xs"
                      >
                        <span className="font-syne font-bold truncate max-w-[200px]">
                          {repo.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => importFromGithub(repo)}
                          className="px-3 py-1 bg-[#1a1a1a] text-[#E5D5D0] rounded-full font-syne text-[9px] uppercase tracking-wider font-bold cursor-pointer"
                        >
                          Import
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                  {tab === "certifications" ? "Certificate Name" : "Title"}
                </label>
                <input
                  type="text"
                  required
                  disabled={isSaving}
                  className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium disabled:opacity-50"
                  value={form.title}
                  onChange={(e) => setFormField("title", e.target.value)}
                />
              </div>

              {tab === "certifications" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                      Issuer
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSaving}
                      className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium disabled:opacity-50"
                      value={form.issuer}
                      onChange={(e) => setFormField("issuer", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                      Year/Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2024"
                      disabled={isSaving}
                      className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium disabled:opacity-50"
                      value={form.date}
                      onChange={(e) => setFormField("date", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {tab === "projects" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                      Category
                    </label>
                    <select
                      disabled={isSaving}
                      className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium appearance-none disabled:opacity-50"
                      value={form.category}
                      onChange={(e) => setFormField("category", e.target.value)}
                    >
                      <option>Completed</option>
                      <option>Working</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                      Source URL
                    </label>
                    <input
                      type="text"
                      disabled={isSaving}
                      className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium disabled:opacity-50"
                      value={form.githubUrl}
                      onChange={(e) => setFormField("githubUrl", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="/projects/example.png or https://..."
                      disabled={isSaving}
                      className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium disabled:opacity-50"
                      value={form.imageUrl}
                      onChange={(e) => setFormField("imageUrl", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {tab !== "certifications" && (
                <div>
                  <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">
                    Content (Markdown)
                  </label>
                  <textarea
                    required
                    rows={8}
                    disabled={isSaving}
                    className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium custom-scrollbar disabled:opacity-50"
                    value={form.content}
                    onChange={(e) => setFormField("content", e.target.value)}
                    placeholder={
                      tab === "projects"
                        ? "## The Problem\n\n## The Architecture\n\n## The Impact & Results"
                        : "Write your blog..."
                    }
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full font-syne font-bold uppercase tracking-widest text-sm py-4 mt-6 rounded-full bg-[#1a1a1a] text-[#E5D5D0] transition-all hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSaving
                  ? "Saving..."
                  : form.editId
                  ? `Update ${tab.slice(0, -1)}`
                  : `Publish ${tab.slice(0, -1)}`}
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <h2 className="text-2xl font-syne font-bold tracking-tight mb-8 flex justify-between items-center text-[#1a1a1a]">
              <span>Manage {tab}</span>
              <div className="flex items-center gap-4">
                {items.length > 1 && (
                  <button
                    onClick={saveReorder}
                    disabled={isSavingOrder}
                    className="flex items-center gap-2 text-[10px] font-syne font-bold uppercase tracking-widest bg-[#1a1a1a] text-[#E5D5D0] hover:bg-[#1a1a1a]/80 px-6 py-3 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingOrder ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}
                    {isSavingOrder ? "Saving..." : "Save Order"}
                  </button>
                )}
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#1a1a1a] bg-white px-4 py-2 rounded-full border border-white/40 shadow-sm">
                  {items.length} Items
                </span>
              </div>
            </h2>

            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar flex-1 overflow-x-hidden">
              {items.length === 0 ? (
                <div className="text-center py-20 text-[#1a1a1a]/40 bg-white/20 rounded-3xl border border-dashed border-[#1a1a1a]/20 font-cormorant italic text-lg">
                  No {tab} found. Create your first one.
                </div>
              ) : (
                <Reorder.Group
                  axis="y"
                  values={items}
                  onReorder={handleReorder}
                  className="space-y-4"
                >
                  {items.map((item) => (
                    <Reorder.Item
                      key={item.id}
                      value={item}
                      className={`bg-white/50 p-5 rounded-2xl border transition-all group flex justify-between items-center cursor-grab active:cursor-grabbing ${
                        form.editId === item.id
                          ? "border-[#1a1a1a] shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                          : "border-[#1a1a1a]/5 hover:border-[#1a1a1a]/20 hover:bg-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1 overflow-hidden pointer-events-none">
                        <div className="flex flex-col gap-1 items-center px-2 text-[#1a1a1a]/20 group-hover:text-[#1a1a1a]/40 transition-colors">
                          <GripVertical size={20} />
                        </div>
                        <div className="flex-1 truncate">
                          <h3 className="font-syne font-bold tracking-tight text-lg text-[#1a1a1a] truncate flex items-center gap-3">
                            {item.title || item.name}
                            {tab === "projects" && (
                              <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10">
                                {item.category || "Completed"}
                              </span>
                            )}
                            {tab === "certifications" && (
                              <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10">
                                {item.date}
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-[#4a4a4a] font-light truncate mr-4 mt-1">
                            {tab === "certifications"
                              ? item.issuer
                              : (item.content || "").substring(0, 80) + "..."}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center">
                        {deleteConfirmId === item.id ? (
                          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 p-1.5 rounded-xl">
                            <span className="text-[9px] font-syne font-bold uppercase text-rose-700 px-1">
                              Delete?
                            </span>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-white bg-rose-600 hover:bg-rose-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Confirm Delete"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => confirmDelete(null)}
                              className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => editItem(item)}
                              className="text-[#1a1a1a] opacity-40 hover:opacity-100 hover:bg-[#1a1a1a]/10 transition-colors p-3 rounded-xl bg-white/50 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => confirmDelete(item.id)}
                              className="text-red-500 opacity-60 hover:opacity-100 hover:bg-red-50 transition-colors p-3 rounded-xl bg-white/50 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
