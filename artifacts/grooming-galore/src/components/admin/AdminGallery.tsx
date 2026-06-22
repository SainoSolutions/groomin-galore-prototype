import { useState } from "react";
import { useListGallery, useCreateGalleryImage, useDeleteGalleryImage, getListGalleryQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash, Plus } from "lucide-react";

export function AdminGallery() {
  const { data: gallery = [] } = useListGallery();
  const createGalleryImage = useCreateGalleryImage();
  const deleteGalleryImage = useDeleteGalleryImage();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    url: "",
    alt: "",
    category: "",
    sortOrder: 0,
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteGalleryImage.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListGalleryQueryKey() });
          toast.success("Image deleted");
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGalleryImage.mutate({ data: formData }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListGalleryQueryKey() });
        toast.success("Image added to gallery");
        setFormData({ url: "", alt: "", category: "", sortOrder: 0 });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-foreground">Gallery Images</h2>
      </div>

      <div className="bg-card border border-border p-6 rounded-md">
        <h3 className="font-semibold mb-4 text-foreground">Add New Image</h3>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-wrap">
          <div className="space-y-2 flex-grow min-w-[200px]">
            <label className="text-sm">Image URL</label>
            <Input required value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://..." className="border-border bg-background" />
          </div>
          <div className="space-y-2 flex-grow min-w-[200px]">
            <label className="text-sm">Alt Text</label>
            <Input required value={formData.alt} onChange={e => setFormData({...formData, alt: e.target.value})} placeholder="Description" className="border-border bg-background" />
          </div>
          <div className="space-y-2 w-[100px]">
            <label className="text-sm">Sort Order</label>
            <Input type="number" value={formData.sortOrder} onChange={e => setFormData({...formData, sortOrder: Number(e.target.value)})} className="border-border bg-background" />
          </div>
          <Button type="submit" className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add</Button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {gallery.map((image) => (
          <div key={image.id} className="relative group aspect-square rounded-md overflow-hidden border border-border bg-background">
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
              <span className="text-xs text-white mb-2 line-clamp-2">{image.alt}</span>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground border border-dashed border-border rounded-md">
            No images in the gallery yet.
          </div>
        )}
      </div>
    </div>
  );
}
