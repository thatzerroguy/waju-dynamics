'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, UploadCloud, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Metric { label: string; value: string; }
interface MediaItem { type: 'image' | 'video'; url: string; alt: string; }

export default function UploadProjectDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '', category: '', client: '', year: '',
    location: '', duration: '', description: '', mainImage: '',
  });
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const reset = () => {
    setFormData({ name: '', category: '', client: '', year: '', location: '', duration: '', description: '', mainImage: '' });
    setMetrics([]);
    setMedia([]);
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      if (!res.ok) throw new Error('Upload failed');
      const json = await res.json();
      return json.url;
    } catch (e) {
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
      setFormData(prev => ({ ...prev, mainImage: url }));
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast.error('Name and Category are required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, metrics, media }),
      });
      if (!res.ok) throw new Error('Failed to create project');
      toast.success('Project created!');
      setOpen(false);
      reset();
      router.refresh();
    } catch {
      toast.error('Failed to create project.');
    } finally {
      setLoading(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-[#111111] hover:bg-[#333333] text-white h-9 px-4 text-xs font-medium rounded-md">
          + Add Project
        </Button>
      } />
      <DialogContent className="sm:max-w-[660px] bg-white border border-[#EAEAEA] p-0 gap-0 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-[#EAEAEA]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#111111]">Add New Project</DialogTitle>
            <DialogDescription className="text-sm text-[#666666] mt-1">
              Add a new project to the Waju Dynamics portfolio.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSave} className="px-6 py-6 max-h-[72vh] overflow-y-auto">
          <div className="flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Project Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. National Grid Supply" className="h-10 border-[#EAEAEA]" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Category *</Label>
                <Select required value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val || '' })}>
                  <SelectTrigger id="category" className="h-10 border-[#EAEAEA]"><SelectValue placeholder="Select category" /></SelectTrigger>
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
                <Label htmlFor="client" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Client</Label>
                <Input id="client" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} placeholder="e.g. Ministry of Works" className="h-10 border-[#EAEAEA]" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="year" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Year</Label>
                <Input id="year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g. 2025" className="h-10 border-[#EAEAEA]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="location" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Location</Label>
                <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Lagos, Nigeria" className="h-10 border-[#EAEAEA]" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Duration</Label>
                <Input id="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 6 Months" className="h-10 border-[#EAEAEA]" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="mainImage" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Main Image URL / Upload</Label>
              <div className="flex gap-2">
                <Input id="mainImage" value={formData.mainImage} onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })} placeholder="https://... or upload local file" className="h-10 border-[#EAEAEA] flex-1" />
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleMainImageUpload} />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="h-10 border-[#EAEAEA] gap-2 whitespace-nowrap min-w-[100px]">
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UploadCloud className="w-4 h-4" /> Upload</>}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Briefly describe scope of work and outcomes..." className="resize-none h-24 border-[#EAEAEA]" />
            </div>

            {/* Metrics */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-[#444444] uppercase tracking-wider">Project Metrics</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMetric} className="h-7 px-2 text-[11px] border-[#EAEAEA] gap-1"><Plus className="w-3 h-3" /> Add</Button>
              </div>
              {metrics.map((metric, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                  <Input value={metric.label} onChange={(e) => updateMetric(i, 'label', e.target.value)} placeholder="Label (e.g. Fleet)" className="h-9 text-xs border-[#EAEAEA]" />
                  <Input value={metric.value} onChange={(e) => updateMetric(i, 'value', e.target.value)} placeholder="Value (e.g. 25)" className="h-9 text-xs border-[#EAEAEA]" />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeMetric(i)} className="h-9 w-9 p-0 text-[#888888] hover:text-red-500"><X className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>

            {/* Media */}
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

          <div className="mt-8 border-t border-[#EAEAEA] pt-4 flex justify-end gap-3 -mx-6 px-6 bg-[#FAFAFA] -mb-6 pb-6">
            <Button type="button" variant="outline" onClick={() => { setOpen(false); reset(); }} className="h-9 px-4 text-xs font-medium border-[#EAEAEA] text-[#444444] hover:bg-[#F2F2F2]">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-[#111111] hover:bg-[#333333] text-white h-9 px-4 text-xs font-medium disabled:opacity-50">
              {loading ? 'Saving...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
