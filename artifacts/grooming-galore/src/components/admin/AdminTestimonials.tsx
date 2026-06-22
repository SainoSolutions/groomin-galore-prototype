import { useState } from "react";
import { useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Edit, Trash, Plus, Star } from "lucide-react";

export function AdminTestimonials() {
  const { data: testimonials = [] } = useListTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: "",
    role: "",
    review: "",
    rating: 5,
    avatarUrl: "",
    isVisible: true,
  });

  const resetForm = () => {
    setFormData({
      clientName: "",
      role: "",
      review: "",
      rating: 5,
      avatarUrl: "",
      isVisible: true,
    });
    setEditingId(null);
  };

  const handleEdit = (t: any) => {
    setFormData({
      clientName: t.clientName,
      role: t.role || "",
      review: t.review,
      rating: t.rating,
      avatarUrl: t.avatarUrl || "",
      isVisible: t.isVisible,
    });
    setEditingId(t.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          toast.success("Testimonial deleted");
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateTestimonial.mutate({ id: editingId, data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          toast.success("Testimonial updated");
          setIsDialogOpen(false);
        }
      });
    } else {
      createTestimonial.mutate({ data: formData }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          toast.success("Testimonial created");
          setIsDialogOpen(false);
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-foreground">Testimonials</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input required value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="border-border bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Role (Optional)</Label>
                <Input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="border-border bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Review</Label>
                <Textarea required value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} className="border-border bg-background" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Rating (1-5)</Label>
                <Input type="number" min="1" max="5" required value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="border-border bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Avatar URL (Optional)</Label>
                <Input value={formData.avatarUrl} onChange={e => setFormData({...formData, avatarUrl: e.target.value})} className="border-border bg-background" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={formData.isVisible} onCheckedChange={(c) => setFormData({...formData, isVisible: c})} />
                <Label>Is Visible</Label>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground">Save Testimonial</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id} className="border-border">
                <TableCell className="font-medium">{t.clientName}</TableCell>
                <TableCell>
                  <div className="flex">
                    {Array.from({length: t.rating}).map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{t.review}</TableCell>
                <TableCell>{t.isVisible ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}><Edit className="w-4 h-4 text-primary" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}><Trash className="w-4 h-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No testimonials found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
