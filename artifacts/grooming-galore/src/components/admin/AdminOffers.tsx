import { useState } from "react";
import { useListOffers, useCreateOffer, useUpdateOffer, useDeleteOffer, getListOffersQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Edit, Trash, Plus } from "lucide-react";

export function AdminOffers() {
  const { data: offers = [] } = useListOffers();
  const createOffer = useCreateOffer();
  const updateOffer = useUpdateOffer();
  const deleteOffer = useDeleteOffer();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountPercent: "" as number | string,
    discountAmount: "" as number | string,
    validUntil: "",
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discountPercent: "",
      discountAmount: "",
      validUntil: "",
      isActive: true,
    });
    setEditingId(null);
  };

  const handleEdit = (offer: any) => {
    setFormData({
      title: offer.title,
      description: offer.description,
      discountPercent: offer.discountPercent || "",
      discountAmount: offer.discountAmount || "",
      validUntil: offer.validUntil ? offer.validUntil.split('T')[0] : "",
      isActive: offer.isActive,
    });
    setEditingId(offer.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      deleteOffer.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListOffersQueryKey() });
          toast.success("Offer deleted");
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      discountPercent: formData.discountPercent ? Number(formData.discountPercent) : null,
      discountAmount: formData.discountAmount ? Number(formData.discountAmount) : null,
      validUntil: formData.validUntil ? new Date(formData.validUntil).toISOString() : null,
    };

    if (editingId) {
      updateOffer.mutate({ id: editingId, data: payload }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListOffersQueryKey() });
          toast.success("Offer updated");
          setIsDialogOpen(false);
        }
      });
    } else {
      createOffer.mutate({ data: payload }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListOffersQueryKey() });
          toast.success("Offer created");
          setIsDialogOpen(false);
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-foreground">Offers</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> Add Offer</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingId ? 'Edit Offer' : 'Add Offer'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border-border bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border-border bg-background" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount Percent (%)</Label>
                  <Input type="number" value={formData.discountPercent} onChange={e => setFormData({...formData, discountPercent: e.target.value})} className="border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label>Discount Amount ($)</Label>
                  <Input type="number" value={formData.discountAmount} onChange={e => setFormData({...formData, discountAmount: e.target.value})} className="border-border bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Valid Until</Label>
                <Input type="date" value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} className="border-border bg-background" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={formData.isActive} onCheckedChange={(c) => setFormData({...formData, isActive: c})} />
                <Label>Is Active</Label>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground">Save Offer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="border-border">
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell>
                  {offer.discountPercent ? `${offer.discountPercent}%` : offer.discountAmount ? `$${offer.discountAmount}` : '-'}
                </TableCell>
                <TableCell>{offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'Ongoing'}</TableCell>
                <TableCell>{offer.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(offer)}><Edit className="w-4 h-4 text-primary" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id)}><Trash className="w-4 h-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {offers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">No offers found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
