import { useState } from "react";
import {
  Megaphone,
  UploadCloud,
  Link2,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";

function NoticesPage() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [active, setActive] = useState(true);

  const [documentFile, setDocumentFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [notices, setNotices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setTitle("");
    setDepartment("");
    setDate("");
    setMessage("");
    setLink("");
    setActive(true);
    setDocumentFile(null);
    setVideoFile(null);
    setImageFile(null);
    setEditingId(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      id: editingId ?? Date.now(),
      title,
      department,
      date,
      message,
      link,
      active,
      documentName: documentFile?.name || "",
      videoName: videoFile?.name || "",
      imageName: imageFile?.name || "",
    };

    if (editingId) {
      setNotices((prev) => prev.map((n) => (n.id === editingId ? payload : n)));
    } else {
      setNotices((prev) => [payload, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setDepartment(notice.department);
    setDate(notice.date);
    setMessage(notice.message);
    setLink(notice.link);
    setActive(notice.active);
    setDocumentFile(notice.documentName ? { name: notice.documentName } : null);
    setVideoFile(notice.videoName ? { name: notice.videoName } : null);
    setImageFile(notice.imageName ? { name: notice.imageName } : null);
    setEditingId(notice.id);
  };

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-4">Notice / Information</h2>

      <form
        onSubmit={handleSave}
        className="bg-white border border-card rounded-xl p-4 mb-6 text-xs space-y-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="w-4 h-4 text-accent" />
          <p className="font-semibold text-main text-sm">
            Create or update notice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-muted mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Eg. Water supply shutdown in Sector 12"
              className="w-full px-3 py-2 border border-card rounded-md text-xs outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-muted mb-1">
              Department
            </label>
            <select
              className="w-full px-3 py-2 border border-card rounded-md text-xs outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select department</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="sewer">Sewer</option>
              <option value="garbage">Garbage</option>
              <option value="traffic">Traffic</option>
              <option value="emergency">Emergency services</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-muted mb-1">
                Effective date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-card rounded-md text-xs outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-6">
              <label className="inline-flex items-center gap-2 text-[11px]">
                <input
                  type="checkbox"
                  className="h-3 w-3"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                Active (visible to citizens)
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-muted mb-1">
            Message
          </label>
          <textarea
            rows={3}
            placeholder="Describe the notice / information that will be visible in citizen portal."
            className="w-full px-3 py-2 border border-card rounded-md text-xs outline-none resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FileInput
            label="Attach document"
            accept=".pdf,.doc,.docx"
            file={documentFile}
            onChange={setDocumentFile}
          />
          <FileInput
            label="Attach video"
            accept="video/*"
            file={videoFile}
            onChange={setVideoFile}
          />
          <FileInput
            label="Attach image"
            accept="image/*"
            file={imageFile}
            onChange={setImageFile}
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-muted mb-1">
            External website link (optional)
          </label>
          <div className="flex items-center gap-2 px-3 py-2 border border-card rounded-md bg-white">
            <Link2 className="w-4 h-4 text-muted" />
            <input
              type="url"
              placeholder="https://example.gov.in/details"
              className="flex-1 text-xs outline-none"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-3 py-1.5 rounded-md border border-card text-xs"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-md bg-accent-sky text-white text-xs"
          >
            {editingId ? "Update notice" : "Publish notice"}
          </button>
        </div>
      </form>

      <div className="bg-white border border-card rounded-xl p-4 text-xs">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-main text-sm">
            Notices summary ({notices.length})
          </p>
        </div>

        {notices.length === 0 && (
          <p className="text-muted text-[11px]">
            No notices yet. Use the form above to publish a new notice or
            information.
          </p>
        )}

        <div className="space-y-3">
          {notices.map((n) => (
            <div
              key={n.id}
              className="border border-card rounded-md px-3 py-2 flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-[13px] font-medium flex items-center gap-2">
                  {n.title}
                  {n.active ? (
                    <span className="px-2 py-[2px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px]">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-[2px] rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px]">
                      Inactive
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted">
                  {n.department || "All departments"} · {n.date || "No date"}
                </p>
                <p className="text-[11px] text-main mt-1 line-clamp-2">
                  {n.message}
                </p>
                <div className="flex flex-wrap gap-2 mt-1 text-[10px] text-muted">
                  {n.documentName && <span>📄 {n.documentName}</span>}
                  {n.videoName && <span>🎥 {n.videoName}</span>}
                  {n.imageName && <span>🖼 {n.imageName}</span>}
                  {n.link && (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent underline"
                    >
                      <Link2 className="w-3 h-3" />
                      Link
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <button
                  className="p-1 rounded-md border border-card"
                  title="Preview"
                >
                  <Eye className="w-3 h-3" />
                </button>
                <button
                  className="p-1 rounded-md border border-card"
                  onClick={() => handleEdit(n)}
                  title="Edit"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  className="p-1 rounded-md border border-card text-red-500"
                  onClick={() => handleDelete(n.id)}
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FileInput({ label, accept, file, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-muted mb-1">
        {label}
      </label>
      <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-card rounded-md bg-slate-50 text-[11px] cursor-pointer">
        <UploadCloud className="w-4 h-4 text-muted" />
        <span className="flex-1">
          {file ? file.name : "Click to select file"}
        </span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}

export default NoticesPage;
