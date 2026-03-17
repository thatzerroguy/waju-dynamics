'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, Plus, X, UploadCloud, Loader2 } from 'lucide-react';

interface Metric { label: string; value: string; }
interface MediaItem { type: 'image' | 'video'; url: string; alt: string; }

interface Project {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  client: string | null;
  year: string | null;
  location: string | null;
  duration: string | null;
  description: string | null;
  mainImage: string | null;
  media: string | null;
  metrics: string | null;
  status: string;
}

interface ManageProjectDialogProps {
  project: Project;
  children: React.ReactNode;
}

export default function ManageProjectDialog({ project, children }: ManageProjectDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseJson = <T,>(val: string | null, fallback: T): T => {
    if (!val) return fallback;
    try { return JSON.parse(val) as T; } catch { return fallback; }
  };

  const [formData, setFormData] = useState({
    name: project.name,
    category: project.category,
    client: project.client || '',
    year: project.year || '',
    location: project.location || '',
    duration: project.duration || '',
    description: project.description || '',
    mainImage: project.mainImage || '',
    status: project.status,
  });

  const [metrics, setMetrics] = useState<Metric[]>(parseJson<Metric[]>(project.metrics, []));
  const [media, setMedia] = useState<MediaItem[]>(parseJson<MediaItem[]>(project.media, []));

  const uploadFile = async (file: File): Promise<string | null> => {
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      if (!res.ok) throw new Error('Upload failed');
      const json = await res.json();
      return json.url;
    } catch {
      toast.error('File upload failed');
      return null;
    }
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const url = await uploadFile(file);
    if (url) {
      setFormData((prev) => ({ ...prev, mainImage: url }));
      toast.success('Main image uploaded');
    }
    setUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleMediaUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const toastId = toast.loading('Uploading media file...');
    const url = await uploadFile(file);
    if (url) {
      updateMedia(index, 'url', url);
      toast.success('Media file uploaded', { id: toastId });
    } else {
      toast.error('Media upload failed', { id: toastId });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, metrics, media }),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('Project updated successfully!');
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Failed to update project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Project deleted.');
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Failed to delete project.');
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const addMetric = () => setMetrics((m) => [...m, { label: '', value: '' }]);
  const removeMetric = (i: number) => setMetrics((m) => m.filter((_, idx) => idx !== i));
  const updateMetric = (i: number, key: keyof Metric, val: string) =>
    setMetrics((m) => m.map((item, idx) => (idx === i ? { ...item, [key]: val } : item)));

  const addMedia = () => setMedia((m) => [...m, { type: 'image', url: '', alt: '' }]);
  const removeMedia = (i: number) => setMedia((m) => m.filter((_, idx) => idx !== i));
  const updateMedia = (i: number, key: keyof MediaItem, val: string) =>
    setMedia((m) => m.map((item, idx) => (idx === i ? { ...item, [key]: val } : item)));

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); setConfirmDelete(false); }}>
      <DialogTrigger render={<span>{children}</span>} />
      <DialogContent className="sm:max-w-[660px] bg-white border border-[#EAEAEA] p-0 gap-0 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-[#EAEAEA]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#111111]">Manage Project</DialogTitle>
            <DialogDescription className="text-sm text-[#666666] mt-1">
              Edit or delete <span className="font-medium text-[#111111]">{project.name}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleUpdate} className="px-6 py-6 max-h-[72vh] overflow-y-auto">
          <div className="flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="m-name" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Project Name</Label>
                <Input id="m-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-10 border-[#EAEAEA]" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="m-category" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Category</Label>
                <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val || '' })}>
                  <SelectTrigger id="m-category" className="h-10 border-[#EAEAEA]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fuel Haulage & Delivery">Fuel Haulage & Delivery</SelectItem>
                    <SelectItem value="Heavy Duty Equipment">Heavy Duty Equipment</SelectItem>
                    <SelectItem value="Real Estate Solutions">Real Estate Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="m-client" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Client</Label>
                <Input id="m-client" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="h-10 border-[#EAEAEA]" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="m-year" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Year</Label>
                <Input id="m-year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="h-10 border-[#EAEAEA]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="m-location" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Location</Label>
                <Input id="m-location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="h-10 border-[#EAEAEA]" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="m-duration" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Duration</Label>
                <Input id="m-duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="h-10 border-[#EAEAEA]" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="m-mainImage" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Main Image URL / Upload</Label>
              <div className="flex gap-2">
                <Input id="m-mainImage" value={formData.mainImage} onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })} placeholder="https://..." className="h-10 border-[#EAEAEA] flex-1" />
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleMainImageUpload} />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="h-10 border-[#EAEAEA] gap-2 whitespace-nowrap min-w-[100px]">
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UploadCloud className="w-4 h-4" /> Upload</>}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="m-description" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Description</Label>
              <Textarea id="m-description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="resize-none h-24 border-[#EAEAEA]" />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Project Metrics</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMetric} className="h-7 px-2 text-[11px] border-[#EAEAEA] gap-1"><Plus className="w-3 h-3" /> Add</Button>
              </div>
              {metrics.map((metric, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <Input value={metric.label} onChange={(e) => updateMetric(i, 'label', e.target.value)} placeholder="Label" className="h-9 text-xs border-[#EAEAEA]" />
                  <Input value={metric.value} onChange={(e) => updateMetric(i, 'value', e.target.value)} placeholder="Value" className="h-9 text-xs border-[#EAEAEA]" />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeMetric(i)} className="h-9 w-9 p-0 text-[#888888] hover:text-red-500"><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Gallery / Media</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMedia} className="h-7 px-2 text-[11px] border-[#EAEAEA] gap-1"><Plus className="w-3 h-3" /> Add</Button>
              </div>
              {media.map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-3 border border-[#EAEAEA] rounded-lg bg-[#FAFAFA]">
                   <div className="flex gap-2 items-center w-full">
                    <Select value={item.type} onValueChange={(val) => updateMedia(i, 'type', val as 'image' | 'video')}>
                      <SelectTrigger className="h-9 w-24 text-xs border-[#EAEAEA] shrink-0"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex flex-1 gap-1">
                       <Input value={item.url} onChange={(e) => updateMedia(i, 'url', e.target.value)} placeholder="URL or upload..." className="h-9 text-xs border-[#EAEAEA] min-w-0" />
                       <Label className="flex items-center justify-center shrink-0 w-9 h-9 border border-[#EAEAEA] rounded-md bg-white hover:bg-[#F2F2F2] cursor-pointer" title="Upload Media File">
                         <UploadCloud className="w-4 h-4 text-[#666666]" />
                         <input type="file" className="hidden" accept={item.type === 'video' ? 'video/*' : 'image/*'} onChange={(e) => handleMediaUpload(i, e)} />
                       </Label>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeMedia(i)} className="h-9 w-9 p-0 shrink-0 text-[#888888] hover:text-red-500"><X className="w-4 h-4" /></Button>
                  </div>
                  <Input value={item.alt} onChange={(e) => updateMedia(i, 'alt', e.target.value)} placeholder="Alt text / caption" className="h-8 text-[11px] border-[#EAEAEA] mt-1" />
                </div>
              ))}
            </div>

          </div>

          <div className="mt-8 border-t border-[#EAEAEA] pt-4 flex items-center justify-between -mx-6 px-6 bg-[#FAFAFA] -mb-6 pb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              disabled={deleting}
              className={`h-9 px-3 text-xs font-medium flex items-center gap-2 ${confirmDelete ? 'text-white bg-red-600 hover:bg-red-700' : 'text-red-500 hover:bg-red-50 hover:text-red-700'}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deleting ? 'Deleting...' : confirmDelete ? 'Confirm Delete' : 'Delete Project'}
            </Button>

            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="h-9 px-4 text-xs font-medium border-[#EAEAEA] text-[#444444] hover:bg-[#F2F2F2]">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-[#111111] hover:bg-[#333333] text-white h-9 px-4 text-xs font-medium disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
